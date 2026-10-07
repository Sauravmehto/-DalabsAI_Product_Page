import { Router } from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import * as XLSX from "xlsx";
import { createRequire } from "module";
import { v4 as uuidv4 } from "uuid";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");
import { db, MAX_QUERIES, TRIAL_DURATION_DAYS } from "../db.js";
const router = Router();
/* -------------------------------------------------------------------------- */
/* Configuration                                                              */
/* -------------------------------------------------------------------------- */
const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";
const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com/v1";
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5";
const MAX_FILE_SIZE = 200 * 1024; // 200 KB
const MAX_EXCEL_FILES = 2;
const MAX_PDF_FILES = 1;
function isTrialExpired(user) {
    return user.trial_ends_at !== null && Date.now() >= user.trial_ends_at;
}
function daysRemaining(user) {
    if (user.trial_ends_at === null)
        return TRIAL_DURATION_DAYS;
    return Math.max(0, Math.ceil((user.trial_ends_at - Date.now()) / 86_400_000));
}
/* -------------------------------------------------------------------------- */
/* Multer                                                                    */
/* -------------------------------------------------------------------------- */
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE,
        files: 3,
    },
    fileFilter(_req, file, cb) {
        const isExcel = /\.(xlsx|xls)$/i.test(file.originalname);
        const isPdf = /\.pdf$/i.test(file.originalname);
        if (isExcel || isPdf) {
            cb(null, true);
            return;
        }
        cb(new Error("Only .xlsx, .xls, and .pdf files are allowed."));
    },
});
/* -------------------------------------------------------------------------- */
/* Authentication                                                             */
/* -------------------------------------------------------------------------- */
function authMiddleware(req, res) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
        res.status(401).json({
            error: "Unauthorized.",
        });
        return null;
    }
    const token = header.slice(7);
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (!payload.sub) {
            res.status(401).json({
                error: "Invalid authentication token.",
            });
            return null;
        }
        return payload.sub;
    }
    catch {
        res.status(401).json({
            error: "Invalid or expired token.",
        });
        return null;
    }
}
/* -------------------------------------------------------------------------- */
/* File text extraction                                                       */
/* -------------------------------------------------------------------------- */
async function extractText(file) {
    const fileName = file.originalname;
    /* ------------------------------- PDF ----------------------------------- */
    if (/\.pdf$/i.test(fileName)) {
        const data = await pdf(file.buffer);
        const text = data.text.slice(0, 12000);
        return `[PDF: ${fileName}]\n${text}`;
    }
    /* ------------------------------ Excel ---------------------------------- */
    if (/\.(xlsx|xls)$/i.test(fileName)) {
        const workbook = XLSX.read(file.buffer, {
            type: "buffer",
        });
        const parts = workbook.SheetNames.map((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            if (!sheet) {
                return `[Sheet: ${sheetName}]\n`;
            }
            const csv = XLSX.utils
                .sheet_to_csv(sheet)
                .slice(0, 8000);
            return `[Sheet: ${sheetName}]\n${csv}`;
        });
        return `[Excel: ${fileName}]\n${parts.join("\n\n")}`;
    }
    throw new Error(`Unsupported file type: ${fileName}`);
}
async function callAnthropic(systemPrompt, userPrompt) {
    if (!ANTHROPIC_API_KEY) {
        throw new Error("Anthropic API key is not configured on the server.");
    }
    const url = `${ANTHROPIC_BASE_URL.replace(/\/$/, "")}/messages`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
            model: ANTHROPIC_MODEL,
            system: systemPrompt,
            messages: [
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            max_tokens: 1024,
        }),
    });
    const data = (await response.json());
    if (!response.ok) {
        console.error("Anthropic API error:", response.status, data?.error?.message ?? "Unknown Anthropic error");
        throw new Error(data?.error?.message ??
            `Anthropic API returned HTTP ${response.status}`);
    }
    const content = data?.content
        ?.filter((block) => block.type === "text")
        .map((block) => block.text ?? "")
        .join("");
    if (!content) {
        throw new Error("Anthropic API returned an empty response.");
    }
    return content;
}
/* -------------------------------------------------------------------------- */
/* POST /api/chat/ask                                                         */
/* -------------------------------------------------------------------------- */
router.post("/ask", upload.array("files", 3), async (req, res) => {
    /* -------------------------- Authentication --------------------------- */
    const userId = authMiddleware(req, res);
    if (!userId) {
        return;
    }
    /* ------------------------------ Prompt -------------------------------- */
    const prompt = String(req.body?.prompt ?? "").trim();
    if (!prompt) {
        return res.status(400).json({
            error: "Prompt is required.",
        });
    }
    /* ------------------------------- User --------------------------------- */
    const user = db
        .prepare("SELECT * FROM users WHERE id = ?")
        .get(userId);
    if (!user) {
        return res.status(401).json({
            error: "User not found.",
        });
    }
    /* -------------------------------- Trial -------------------------------- */
    if (isTrialExpired(user)) {
        return res.status(403).json({
            error: "trial_expired",
            message: `Your ${TRIAL_DURATION_DAYS}-day free trial has ended. Upgrade to keep using DA One.`,
            daysRemaining: 0,
        });
    }
    /* ------------------------------- Quota -------------------------------- */
    if (user.queries_used >= MAX_QUERIES) {
        return res.status(403).json({
            error: "quota_exceeded",
            message: "Your free chat quota is over. You've used all 4 available queries.",
            queriesUsed: user.queries_used,
            queriesRemaining: 0,
            maxQueries: MAX_QUERIES,
        });
    }
    /* ------------------------- Anthropic config ---------------------------- */
    if (!ANTHROPIC_API_KEY) {
        return res.status(500).json({
            error: "Anthropic API key is not configured on the server.",
        });
    }
    /* ------------------------------- Files -------------------------------- */
    const files = (req.files ?? []);
    const excelFiles = files.filter((file) => /\.(xlsx|xls)$/i.test(file.originalname));
    const pdfFiles = files.filter((file) => /\.pdf$/i.test(file.originalname));
    /* --------------------------- File limits ------------------------------ */
    if (excelFiles.length > MAX_EXCEL_FILES) {
        return res.status(400).json({
            error: "Maximum 2 Excel files are allowed.",
        });
    }
    if (pdfFiles.length > MAX_PDF_FILES) {
        return res.status(400).json({
            error: "Maximum 1 PDF file is allowed.",
        });
    }
    /* -------------------------- Extract files ----------------------------- */
    let fileContext = "";
    try {
        if (files.length > 0) {
            const texts = await Promise.all(files.map(extractText));
            fileContext = texts.join("\n\n---\n\n");
        }
    }
    catch (error) {
        console.error("File extraction error:", error);
        return res.status(400).json({
            error: "Could not read uploaded file.",
            message: error instanceof Error
                ? error.message
                : undefined,
        });
    }
    /* --------------------------- System prompt ---------------------------- */
    let systemPrompt = `You are DA One, an AI data analyst.

Your job is to help users understand their business and data.

Answer questions clearly, accurately, and concisely.

When data is provided, base your answer on the provided data.

Do not invent numbers or facts that are not present in the data.

If the uploaded data does not contain enough information to answer the question, clearly explain what is missing.`;
    if (fileContext) {
        systemPrompt += `

The user has uploaded the following files:

${fileContext}

Use the uploaded file contents as the primary source for answering the user's question.`;
    }
    /* ---------------------------- Anthropic -------------------------------- */
    try {
        const responseText = await callAnthropic(systemPrompt, prompt);
        /* -------------------------- Save messages --------------------------- */
        const now = Date.now();
        db.prepare("INSERT INTO messages (id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)").run(uuidv4(), userId, "user", prompt, now);
        db.prepare("INSERT INTO messages (id, user_id, role, content, created_at) VALUES (?, ?, ?, ?, ?)").run(uuidv4(), userId, "assistant", responseText, now + 1);
        /* ------------------------- Increment quota ------------------------- */
        db.prepare(`
        UPDATE users
        SET queries_used = queries_used + 1
        WHERE id = ?
        `).run(userId);
        const updated = db
            .prepare(`
          SELECT queries_used
          FROM users
          WHERE id = ?
          `)
            .get(userId);
        const queriesUsed = updated?.queries_used ??
            user.queries_used + 1;
        const queriesRemaining = Math.max(0, MAX_QUERIES - queriesUsed);
        /* ----------------------------- Response ---------------------------- */
        return res.json({
            response: responseText,
            queriesUsed,
            queriesRemaining,
            maxQueries: MAX_QUERIES,
        });
    }
    catch (error) {
        console.error("Anthropic request failed:", error instanceof Error
            ? error.message
            : error);
        return res.status(502).json({
            error: "AI service error.",
            message: "DA One could not process your request right now. Please try again.",
        });
    }
});
/* -------------------------------------------------------------------------- */
/* GET /api/chat/quota                                                        */
/* -------------------------------------------------------------------------- */
router.get("/quota", (req, res) => {
    const userId = authMiddleware(req, res);
    if (!userId) {
        return;
    }
    const user = db
        .prepare(`
        SELECT queries_used, trial_ends_at
        FROM users
        WHERE id = ?
        `)
        .get(userId);
    if (!user) {
        return res.status(401).json({
            error: "User not found.",
        });
    }
    const queriesUsed = user.queries_used;
    const queriesRemaining = Math.max(0, MAX_QUERIES - queriesUsed);
    return res.json({
        queriesUsed,
        queriesRemaining,
        maxQueries: MAX_QUERIES,
        trialActive: !isTrialExpired(user),
        trialEndsAt: user.trial_ends_at,
        trialDurationDays: TRIAL_DURATION_DAYS,
        daysRemaining: daysRemaining(user),
    });
});
/* -------------------------------------------------------------------------- */
/* GET /api/chat/history                                                      */
/* -------------------------------------------------------------------------- */
router.get("/history", (req, res) => {
    const userId = authMiddleware(req, res);
    if (!userId) {
        return;
    }
    const rows = db
        .prepare("SELECT role, content FROM messages WHERE user_id = ? ORDER BY created_at ASC LIMIT 200")
        .all(userId);
    return res.json({
        messages: rows.map((row) => ({ role: row.role, content: row.content })),
    });
});
/* -------------------------------------------------------------------------- */
/* DELETE /api/chat/history                                                   */
/* -------------------------------------------------------------------------- */
router.delete("/history", (req, res) => {
    const userId = authMiddleware(req, res);
    if (!userId) {
        return;
    }
    db.prepare("DELETE FROM messages WHERE user_id = ?").run(userId);
    return res.json({ ok: true });
});
/* -------------------------------------------------------------------------- */
/* Multer error handler                                                       */
/* -------------------------------------------------------------------------- */
router.use((error, _req, res, _next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                error: "File size must be 200 KB or less.",
            });
        }
        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                error: "Maximum 3 files can be uploaded.",
            });
        }
        return res.status(400).json({
            error: error.message,
        });
    }
    if (error instanceof Error) {
        return res.status(400).json({
            error: error.message,
        });
    }
    return res.status(400).json({
        error: "File upload failed.",
    });
});
export default router;

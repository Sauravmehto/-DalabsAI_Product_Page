import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db, TRIAL_DURATION_DAYS, TRIAL_DURATION_MS, MAX_QUERIES } from "../db.js";
import { validateEmailFormat, validateEmailDomain, validatePassword } from "../validation.js";
import { upsertHubspotContact } from "../hubspot.js";
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
const TOKEN_EXPIRY = "7d";
function jwtSign(userId) {
    return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}
function trialStatus(user) {
    const trialEndsAt = user.trial_ends_at ?? null;
    const trialActive = trialEndsAt === null ? true : Date.now() < trialEndsAt;
    const daysRemaining = trialEndsAt === null ? TRIAL_DURATION_DAYS : Math.max(0, Math.ceil((trialEndsAt - Date.now()) / 86_400_000));
    return {
        trialActive,
        trialEndsAt,
        trialDurationDays: TRIAL_DURATION_DAYS,
        daysRemaining,
        queriesUsed: user.queries_used,
        queriesRemaining: Math.max(0, MAX_QUERIES - user.queries_used),
        maxQueries: MAX_QUERIES,
    };
}
// POST /api/auth/signup
router.post("/signup", async (req, res) => {
    const { fullName, email, password, company, jobTitle } = req.body ?? {};
    if (!fullName?.trim() || !email?.trim() || !password || !company?.trim()) {
        return res.status(400).json({ error: "Full name, work email, company, and password are required." });
    }
    const formatCheck = validateEmailFormat(email.trim());
    if (!formatCheck.valid)
        return res.status(400).json({ error: formatCheck.reason });
    const domainCheck = await validateEmailDomain(email.trim());
    if (!domainCheck.valid)
        return res.status(400).json({ error: domainCheck.reason });
    const pwCheck = validatePassword(password);
    if (!pwCheck.valid)
        return res.status(400).json({ error: pwCheck.reason });
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email.trim());
    if (existing) {
        return res.status(409).json({ error: "An account with this email already exists. Please log in instead." });
    }
    const id = uuidv4();
    const passwordHash = await bcrypt.hash(password, 12);
    const now = Date.now();
    const trialEndsAt = now + TRIAL_DURATION_MS;
    const trimmedJobTitle = jobTitle?.trim() || null;
    db.prepare(`INSERT INTO users
      (id, full_name, email, password_hash, created_at, company, job_title, trial_started_at, trial_ends_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(id, fullName.trim(), email.trim().toLowerCase(), passwordHash, now, company.trim(), trimmedJobTitle, now, trialEndsAt);
    const token = jwtSign(id);
    res.status(201).json({
        token,
        user: { id, fullName: fullName.trim(), email: email.trim().toLowerCase(), company: company.trim(), jobTitle: trimmedJobTitle },
        trial: trialStatus({ trial_ends_at: trialEndsAt, queries_used: 0 }),
    });
    // Fire-and-forget: never let a slow/unavailable HubSpot delay or fail signup.
    void upsertHubspotContact(fullName.trim(), email.trim().toLowerCase(), company.trim(), trimmedJobTitle ?? undefined);
});
// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase());
    // Constant-time compare even for unknown emails (prevents timing attacks)
    const hashToCheck = user?.password_hash ?? "$2a$12$invalidhashfortimingreasons000000000000000000000";
    const match = await bcrypt.compare(password, hashToCheck);
    if (!user || !match) {
        return res.status(401).json({ error: "Incorrect email or password." });
    }
    const token = jwtSign(user.id);
    return res.json({
        token,
        user: { id: user.id, fullName: user.full_name, email: user.email, company: user.company, jobTitle: user.job_title },
        trial: trialStatus(user),
    });
});
// GET /api/auth/me  (requires Authorization: Bearer <token>)
router.get("/me", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized." });
    }
    const token = authHeader.slice(7);
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = db.prepare("SELECT * FROM users WHERE id = ?").get(payload.sub);
        if (!user)
            return res.status(401).json({ error: "User not found." });
        return res.json({
            id: user.id,
            fullName: user.full_name,
            email: user.email,
            company: user.company,
            jobTitle: user.job_title,
            trial: trialStatus(user),
        });
    }
    catch {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
});
export default router;

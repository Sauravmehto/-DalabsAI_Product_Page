import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";
import contactRouter from "./routes/contact.js";
const app = express();
const PORT = Number(process.env.SERVER_PORT ?? 3001);
const frontendDir = path.resolve(process.cwd(), "dist");
app.use(cors({
    origin: process.env.APP_URL ?? "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/contact", contactRouter);
app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use(express.static(frontendDir));
app.get(/^\/(?!api(?:\/|$)).*/, (_req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
});
app.listen(PORT, () => {
    console.log(`Auth server running on http://localhost:${PORT}`);
});

import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import chatRouter from "./routes/chat.js";

const app = express();
const PORT = Number(process.env.SERVER_PORT ?? 3001);

app.use(cors({
  origin: process.env.APP_URL ?? "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});

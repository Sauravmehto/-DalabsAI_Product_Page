import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { db, type UserRow } from "../db.js";
import { validateEmailFormat, validateEmailDomain, validatePassword } from "../validation.js";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET ?? "change-me-in-production";
const TOKEN_EXPIRY = "7d";

function jwtSign(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

// POST /api/auth/signup
router.post("/signup", async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body ?? {};

  if (!fullName?.trim() || !email?.trim() || !password) {
    return res.status(400).json({ error: "Full name, email, and password are required." });
  }

  const formatCheck = validateEmailFormat(email.trim());
  if ('reason' in formatCheck) return res.status(400).json({ error: formatCheck.reason });

  const domainCheck = await validateEmailDomain(email.trim());
  if ('reason' in domainCheck) return res.status(400).json({ error: domainCheck.reason });

  const pwCheck = validatePassword(password);
  if ('reason' in pwCheck) return res.status(400).json({ error: pwCheck.reason });

  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email.trim()) as { id: string } | undefined;
  if (existing) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const id = uuidv4();
  const passwordHash = await bcrypt.hash(password, 12);

  db.prepare(
    "INSERT INTO users (id, full_name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, fullName.trim(), email.trim().toLowerCase(), passwordHash, Date.now());

  const token = jwtSign(id);
  return res.status(201).json({
    token,
    user: { id, fullName: fullName.trim(), email: email.trim().toLowerCase() },
  });
});

// POST /api/auth/login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email.toLowerCase()) as UserRow | undefined;
  // Constant-time compare even for unknown emails (prevents timing attacks)
  const hashToCheck = user?.password_hash ?? "$2a$12$invalidhashfortimingreasons000000000000000000000";
  const match = await bcrypt.compare(password, hashToCheck);

  if (!user || !match) {
    return res.status(401).json({ error: "Incorrect email or password." });
  }

  const token = jwtSign(user.id);
  return res.json({
    token,
    user: { id: user.id, fullName: user.full_name, email: user.email },
  });
});

// GET /api/auth/me  (requires Authorization: Bearer <token>)
router.get("/me", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized." });
  }
  const token = authHeader.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
    const user = db.prepare("SELECT id, full_name, email, email_verified, created_at FROM users WHERE id = ?").get(payload.sub) as Omit<UserRow, "password_hash" | "verification_token" | "verification_token_expires_at"> | undefined;
    if (!user) return res.status(401).json({ error: "User not found." });
    return res.json({ id: user.id, fullName: user.full_name, email: user.email });
  } catch {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
});

export default router;

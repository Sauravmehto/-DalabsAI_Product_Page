import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "auth.db");

export const db = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    queries_used INTEGER NOT NULL DEFAULT 0
  );
`);

// Migrate existing rows that predate later columns
try { db.exec("ALTER TABLE users ADD COLUMN queries_used INTEGER NOT NULL DEFAULT 0"); } catch { /* already exists */ }
try { db.exec("ALTER TABLE users ADD COLUMN company TEXT"); } catch { /* already exists */ }
try { db.exec("ALTER TABLE users ADD COLUMN job_title TEXT"); } catch { /* already exists */ }
try { db.exec("ALTER TABLE users ADD COLUMN trial_started_at INTEGER"); } catch { /* already exists */ }
try { db.exec("ALTER TABLE users ADD COLUMN trial_ends_at INTEGER"); } catch { /* already exists */ }

db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
`);
db.exec("CREATE INDEX IF NOT EXISTS idx_messages_user_created ON messages(user_id, created_at);");

export type MessageRow = {
  id: string;
  user_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: number;
};

export const MAX_QUERIES = 4;

// Centralized trial length — override via TRIAL_DURATION_DAYS env var rather
// than scattering the number across routes/components.
export const TRIAL_DURATION_DAYS = Number(process.env.TRIAL_DURATION_DAYS ?? 14);
export const TRIAL_DURATION_MS = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000;

export type UserRow = {
  id: string;
  full_name: string;
  email: string;
  password_hash: string;
  created_at: number;
  queries_used: number;
  company: string | null;
  job_title: string | null;
  trial_started_at: number | null;
  trial_ends_at: number | null;
};

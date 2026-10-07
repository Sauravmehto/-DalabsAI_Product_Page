import isEmail from "validator/lib/isEmail";

// Single source of truth for personal/free email domains on the client.
// Kept in sync with server/validation.ts's BLOCKED_DOMAINS — duplicated there
// because the server list also pulls in Node's dns/util modules, which can't
// be bundled into the browser build.
export const BLOCKED_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.fr", "yahoo.de",
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "outlook.com", "live.com", "msn.com",
  "icloud.com", "me.com", "mac.com", "aol.com", "protonmail.com", "proton.me", "mail.com",
  "zoho.com", "yandex.com", "yandex.ru", "gmx.com", "gmx.net", "web.de", "inbox.com",
  "fastmail.com", "tutanota.com", "hushmail.com", "rediffmail.com", "rocketmail.com",
  "guerrillamail.com", "mailinator.com", "tempmail.com", "throwam.com", "sharklasers.com",
  "10minutemail.com", "dispostable.com", "trashmail.com", "yopmail.com",
]);

// Domain-only check, independent of overall format validity — safe to call
// while the user is still mid-typing without flashing a misleading error.
export function isPersonalEmailDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  return !!domain && BLOCKED_DOMAINS.has(domain);
}

export function isWorkEmail(email: string): boolean {
  if (!isEmail(email)) return false;
  return !isPersonalEmailDomain(email);
}

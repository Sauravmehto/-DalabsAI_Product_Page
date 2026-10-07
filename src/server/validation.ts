import validator from "validator";
const { isEmail } = validator;
import dns from "dns";
import { promisify } from "util";

const resolveMx = promisify(dns.resolveMx);

// Well-known personal/free email domains
const BLOCKED_DOMAINS = new Set([
  "gmail.com","googlemail.com","yahoo.com","yahoo.co.uk","yahoo.co.in","yahoo.fr","yahoo.de",
  "hotmail.com","hotmail.co.uk","hotmail.fr","hotmail.de","outlook.com","live.com","msn.com",
  "icloud.com","me.com","mac.com","aol.com","protonmail.com","proton.me","mail.com",
  "zoho.com","yandex.com","yandex.ru","gmx.com","gmx.net","web.de","inbox.com",
  "fastmail.com","tutanota.com","hushmail.com","rediffmail.com","rocketmail.com",
  "guerrillamail.com","mailinator.com","tempmail.com","throwam.com","sharklasers.com",
  "10minutemail.com","dispostable.com","trashmail.com","yopmail.com",
]);

export type EmailValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validateEmailFormat(email: string): EmailValidationResult {
  if (!isEmail(email)) return { valid: false, reason: "Invalid email address format." };
  const domain = email.split("@")[1].toLowerCase();
  if (BLOCKED_DOMAINS.has(domain)) {
    return { valid: false, reason: "Please use your company email address. Personal email providers are not accepted." };
  }
  return { valid: true };
}

export async function validateEmailDomain(email: string): Promise<EmailValidationResult> {
  const domain = email.split("@")[1];
  try {
    const records = await resolveMx(domain);
    if (!records || records.length === 0) {
      return { valid: false, reason: "Email domain has no mail server. Please use a valid company email." };
    }
  } catch {
    // DNS lookup failed — could be a network issue, don't hard-block
    // but treat as suspicious only if format check already passed
  }
  return { valid: true };
}

export type PasswordValidationResult =
  | { valid: true }
  | { valid: false; reason: string };

export function validatePassword(password: string): PasswordValidationResult {
  if (password.length < 8) return { valid: false, reason: "Password must be at least 8 characters." };
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, reason: "Password must contain at least one special character." };
  }
  return { valid: true };
}

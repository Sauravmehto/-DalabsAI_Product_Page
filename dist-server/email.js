import nodemailer from "nodemailer";
function createTransport() {
    // Prefer production SMTP; fall back to Ethereal test account when env vars are absent
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
    }
    // Development: log emails to console instead of sending
    return null;
}
export async function sendVerificationEmail(to, fullName, token) {
    const appUrl = process.env.APP_URL ?? "http://localhost:5173";
    const link = `${appUrl}/verify-email?token=${token}`;
    const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px">
      <h2 style="font-size:20px;font-weight:600;color:#0f1117;margin-bottom:8px">
        Verify your email address
      </h2>
      <p style="color:#5c6570;font-size:14px;line-height:1.6">
        Hi ${fullName}, thanks for signing up for DataAlpha ONE.
        Click the button below to verify your email address and activate your account.
      </p>
      <a href="${link}"
         style="display:inline-block;margin-top:24px;padding:12px 24px;background:#0B6E6A;color:#fff;
                border-radius:10px;font-size:14px;font-weight:500;text-decoration:none">
        Verify email address
      </a>
      <p style="margin-top:24px;color:#9ca3af;font-size:12px">
        This link expires in 24 hours. If you did not create an account, you can safely ignore this email.
      </p>
      <p style="color:#9ca3af;font-size:12px">
        Or copy this link: <a href="${link}" style="color:#0B6E6A">${link}</a>
      </p>
    </div>
  `;
    const transport = createTransport();
    if (!transport) {
        // Dev mode — print to console
        console.log("\n─── VERIFICATION EMAIL (dev) ───");
        console.log(`To: ${to}`);
        console.log(`Link: ${link}`);
        console.log("─────────────────────────────\n");
        return;
    }
    await transport.sendMail({
        from: `"DataAlpha ONE" <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`,
        to,
        subject: "Verify your DataAlpha ONE email address",
        html,
    });
}

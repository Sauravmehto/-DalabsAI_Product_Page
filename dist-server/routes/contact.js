import { Router } from "express";
import { upsertHubspotContact } from "../hubspot.js";
import { isWorkEmail } from "../validation.js";
const router = Router();
// POST /api/contact
router.post("/", async (req, res) => {
    const { fullName, email, company } = req.body ?? {};
    if (!fullName?.trim()) {
        return res.status(400).json({ error: "Full name is required." });
    }
    if (!isWorkEmail(email ?? "")) {
        return res.status(400).json({
            error: "Please enter your work email address. Personal email addresses such as Gmail, Yahoo, or Hotmail are not accepted.",
        });
    }
    if (!company?.trim()) {
        return res.status(400).json({ error: "Company is required." });
    }
    const ok = await upsertHubspotContact(fullName.trim(), email.trim(), company.trim());
    if (!ok) {
        return res.status(500).json({ error: "Something went wrong. Please try again in a moment." });
    }
    return res.json({ ok: true });
});
export default router;

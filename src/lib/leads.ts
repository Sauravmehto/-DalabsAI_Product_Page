import { getCampaignParams } from "./analytics";
import { site } from "./site";

export type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  reportingChallenge: string;
  nextStep: string;
};

export async function submitLead(data: LeadPayload): Promise<{ ok: boolean }> {
  const record = {
    ...data,
    source: site.campaign,
    campaign: getCampaignParams(),
    capturedAt: new Date().toISOString(),
    href: window.location.href,
  };

  const endpoint = import.meta.env.VITE_LEAD_ENDPOINT;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    return { ok: res.ok };
  }

  try {
    const existing = JSON.parse(localStorage.getItem("da_leads") || "[]") as unknown[];
    existing.push(record);
    localStorage.setItem("da_leads", JSON.stringify(existing));
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export type ContactPayload = {
  fullName: string;
  email: string;
  company: string;
};

export async function submitContact(
  data: ContactPayload,
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}

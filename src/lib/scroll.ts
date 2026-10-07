export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export type LeadIntent = "demo" | "meeting";

export function readLeadIntent(): LeadIntent | null {
  const params = new URLSearchParams(window.location.search);
  const intent = params.get("intent") ?? window.location.hash.replace(/^#/, "");
  return intent === "demo" || intent === "meeting" ? intent : null;
}

export type AnalyticsEvent =
  | "page_view"
  | "hero_cta_click"
  | "demo_click"
  | "demo_play"
  | "event_meeting_click"
  | "post_event_demo_click"
  | "free_trial_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "use_case_change"
  | "product_demo_interaction"
  | "ask_demo_submit";

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type CampaignParams = Partial<Record<(typeof CAMPAIGN_KEYS)[number], string>>;

const STORAGE_KEY = "da_campaign";

export function captureCampaignParams(): CampaignParams {
  const params = new URLSearchParams(window.location.search);
  const captured: CampaignParams = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) captured[key] = value;
  }
  if (Object.keys(captured).length) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  }
  return getCampaignParams();
}

export function getCampaignParams(): CampaignParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CampaignParams) : {};
  } catch {
    return {};
  }
}

export function track(
  event: AnalyticsEvent,
  props: Record<string, unknown> = {},
) {
  const payload = {
    event,
    ...getCampaignParams(),
    ...props,
    ts: Date.now(),
    path: window.location.pathname,
  };

  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] })
    .dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push(payload);
  }

  if (import.meta.env.DEV) {
    console.debug("[dataalpha]", payload);
  }
}

import type { LeadIntent } from "./scroll";
import { scrollToId } from "./scroll";

export const bookingUrls = {
  demo: import.meta.env.VITE_DEMO_BOOKING_URL ?? "",
  meeting: import.meta.env.VITE_POST_EVENT_MEETING_URL ?? "",
};

export function bookingUrlFor(intent: LeadIntent) {
  if (intent === "demo") return "https://cal.com/meetdaone/20min";
  return bookingUrls.meeting;
}

export function openBookingOrLead(intent: LeadIntent) {
  const url = bookingUrlFor(intent);
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  sessionStorage.setItem("da_intent", intent);
  scrollToId("lead");
}

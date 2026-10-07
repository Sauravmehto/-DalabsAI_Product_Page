/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEAD_ENDPOINT?: string;
  readonly VITE_TEASER_VIDEO_URL?: string;
  readonly VITE_DEMO_VIDEO_URL?: string;
  readonly VITE_EVENT_BOOKING_URL?: string;
  readonly VITE_DEMO_BOOKING_URL?: string;
  readonly VITE_POST_EVENT_MEETING_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

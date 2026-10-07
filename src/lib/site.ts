export const site = {
  name: "DA One",
  company: "DataAlpha",
  url: "https://dataalpha.ai/",
  email: "sales@dataalpha.ai",
  campaign: "DA One Website",
  logo: "/DAOne_Blue logo.png",
  trialDays: Number(import.meta.env.VITE_TRIAL_DURATION_DAYS ?? 14),
  linkedin: {
    company: "https://www.linkedin.com/company/dataalpha-ai/",
    ceo: "https://www.linkedin.com/in/vineetgavri/",
    bd: "https://www.linkedin.com/in/sahilbrijmalhotrapmp/",
  },
  pdf: {
    flyer: "/pdf/flyer.pdf",
    brochure: "/pdf/brochure.pdf",
  },
} as const;

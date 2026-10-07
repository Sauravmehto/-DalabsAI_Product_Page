export const DEMO_DISCLAIMER = "Example data for product demonstration";

export type DemoKpi = {
  label: string;
  display: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  positive?: boolean;
};

export type DemoRegion = {
  name: string;
  revenue: number;
  share: number;
  growth: number;
  transactions: number;
};

export function formatMillions(n: number) {
  if (n >= 1) return `$${n.toFixed(2)}M`;
  return `$${Math.round(n * 1000)}K`;
}

export const kpis = {
  revenue: {
    label: "Revenue",
    value: 4.82,
    display: "$4.82M",
    prefix: "$",
    suffix: "M",
    decimals: 2,
  },
  growth: {
    label: "Growth",
    value: 18.4,
    display: "+18.4%",
    prefix: "+",
    suffix: "%",
    decimals: 1,
    positive: true,
  },
  transactions: {
    label: "Transactions",
    value: 24_892,
    display: "24,892",
    decimals: 0,
  },
} satisfies Record<string, DemoKpi>;

export const regions: DemoRegion[] = [
  { name: "UAE", revenue: 1.92, share: 39.8, growth: 21.2, transactions: 9907 },
  { name: "Saudi Arabia", revenue: 1.45, share: 30.1, growth: 16.8, transactions: 7492 },
  { name: "Qatar", revenue: 0.68, share: 14.1, growth: 12.4, transactions: 3510 },
  { name: "Kuwait", revenue: 0.47, share: 9.8, growth: 9.1, transactions: 2439 },
  { name: "Oman", revenue: 0.3, share: 6.2, growth: 7.6, transactions: 1544 },
];

export const months = [
  { month: "Mar", revenue: 0.68 },
  { month: "Apr", revenue: 0.71 },
  { month: "May", revenue: 0.79 },
  { month: "Jun", revenue: 0.82 },
  { month: "Jul", revenue: 0.88 },
  { month: "Aug", revenue: 0.94 },
];

export const quarters = {
  previous: {
    label: "Mar–May",
    revenue: Number((0.68 + 0.71 + 0.79).toFixed(2)),
  },
  current: {
    label: "Jun–Aug",
    revenue: Number((0.82 + 0.88 + 0.94).toFixed(2)),
  },
};

export const products = [
  { name: "Product A", share: 32.8, revenue: 1.58 },
  { name: "Product B", share: 24.1, revenue: 1.16 },
  { name: "Product C", share: 18.6, revenue: 0.9 },
  { name: "Product D", share: 14.2, revenue: 0.68 },
  { name: "Other", share: 10.3, revenue: 0.5 },
];

export const processingSteps = [
  "Understanding your question…",
  "Analyzing your data…",
  "Building your visualization…",
  "Analysis complete.",
];

export type PromptId =
  | "region"
  | "march"
  | "compare"
  | "products"
  | "report"
  | "dashboard";

export type DemoPrompt = {
  id: PromptId;
  label: string;
  question: string;
  answer: string;
  insight: string;
};

export const prompts: DemoPrompt[] = [
  {
    id: "region",
    label: "Show revenue growth by region.",
    question: "Show me revenue growth by region for the last 6 months.",
    answer:
      "UAE led the period at $1.92M (39.8% of revenue), followed by Saudi Arabia at $1.45M. Growth is positive across all five markets in this example set.",
    insight: "UAE and Saudi Arabia together account for 69.9% of example revenue.",
  },
  {
    id: "march",
    label: "Why did revenue fall in March?",
    question: "Why did revenue decline in March?",
    answer:
      "In this example dataset, March is the lowest month at $0.68M. The dip sits before a steady climb through August, with the largest recovery between April and May.",
    insight: "March is a trough in the sample series, not a sustained reversal.",
  },
  {
    id: "compare",
    label: "Compare UAE vs Saudi Arabia.",
    question: "Compare UAE and Saudi Arabia.",
    answer:
      "UAE contributes $1.92M vs $1.45M for Saudi Arabia in this sample. UAE growth is +21.2%; Saudi Arabia is +16.8%.",
    insight: "UAE is the larger market in the example data, with a wider growth gap of 4.4 points.",
  },
  {
    id: "products",
    label: "Which products are performing best?",
    question: "What were our top-performing products this quarter?",
    answer:
      "Product A generated 32.8% of total revenue in this example, followed by Product B at 24.1% and Product C at 18.6%.",
    insight: "Product A generated 32.8% of total revenue.",
  },
  {
    id: "report",
    label: "Create an executive sales report.",
    question: "Create an executive sales report.",
    answer:
      "A structured report can be generated from this conversation: period summary, regional performance, product mix, and recommended follow-up questions.",
    insight: "The same analysis can be turned into a business-ready report.",
  },
  {
    id: "dashboard",
    label: "Build a dashboard from this analysis.",
    question: "Build a dashboard for Q3.",
    answer:
      "This analysis can be pinned as a reusable view: revenue, growth, transactions, regional mix, and product contribution.",
    insight: "Dashboards keep the same metrics available without repeating the question.",
  },
];

export const industries = [
  "Fintech",
  "Payments",
  "Logistics",
  "Ecommerce",
  "Retail",
  "Hospitality",
] as const;

export type Industry = (typeof industries)[number];

export const industryViews: Record<
  Industry,
  {
    title: string;
    description: string;
    question: string;
    kpis: { label: string; value: string }[];
    bars: { name: string; value: number }[];
    queries: string[];
  }
> = {
  Fintech: {
    title: "Revenue performance",
    description: "Period revenue, growth, and mix across markets.",
    question: "Show revenue growth by region.",
    kpis: [
      { label: kpis.revenue.label, value: kpis.revenue.display },
      { label: kpis.growth.label, value: kpis.growth.display },
      { label: kpis.transactions.label, value: kpis.transactions.display },
    ],
    bars: regions.map((r) => ({ name: r.name, value: r.share })),
    queries: ["Revenue performance", "Transaction trends", "Customer analysis", "Operational reporting"],
  },
  Payments: {
    title: "Transaction trends",
    description: "The same 24,892 example transactions, framed as payment volume.",
    question: "How did transaction volume break down by region?",
    kpis: [
      { label: "Volume", value: kpis.transactions.display },
      { label: "Revenue", value: kpis.revenue.display },
      { label: "Growth", value: kpis.growth.display },
    ],
    bars: regions.map((r) => ({ name: r.name, value: r.share })),
    queries: ["Payment mix", "Volume by region", "Growth vs prior period", "Channel performance"],
  },
  Logistics: {
    title: "Delivery performance",
    description: "The same regional split, read as lane contribution.",
    question: "Which lanes contribute most to volume?",
    kpis: [
      { label: "Shipments", value: kpis.transactions.display },
      { label: "Value", value: kpis.revenue.display },
      { label: "Growth", value: kpis.growth.display },
    ],
    bars: regions.map((r) => ({ name: r.name, value: r.share })),
    queries: ["Delivery performance", "Cost analysis", "Operational efficiency", "Performance reporting"],
  },
  Ecommerce: {
    title: "Ecommerce performance",
    description: "Analyze sales, customers, and channel performance across your store.",
    question: "How did sales break down by channel and region?",
    kpis: [
      { label: "Orders", value: kpis.transactions.display },
      { label: "Revenue", value: kpis.revenue.display },
      { label: "Growth", value: kpis.growth.display },
    ],
    bars: regions.map((r) => ({ name: r.name, value: r.share })),
    queries: ["Sales by channel", "Customer acquisition", "Basket analysis", "Return rate trends"],
  },
  Retail: {
    title: "Retail performance",
    description: "Track sales, customer trends, and product performance across stores.",
    question: "Which stores and products drove the most revenue this quarter?",
    kpis: [
      { label: "Revenue", value: kpis.revenue.display },
      { label: "Transactions", value: kpis.transactions.display },
      { label: "Growth", value: kpis.growth.display },
    ],
    bars: regions.map((r) => ({ name: r.name, value: r.share })),
    queries: ["Top performing stores", "Product mix", "Foot traffic trends", "Customer retention"],
  },
  Hospitality: {
    title: "Hospitality analytics",
    description: "Analyze bookings, revenue, and guest performance across properties.",
    question: "What is our occupancy and RevPAR trend over the last six months?",
    kpis: [
      { label: "Revenue", value: kpis.revenue.display },
      { label: "Bookings", value: kpis.transactions.display },
      { label: "Growth", value: kpis.growth.display },
    ],
    bars: regions.map((r) => ({ name: r.name, value: r.share })),
    queries: ["Occupancy rate", "RevPAR analysis", "Guest satisfaction", "Booking channel mix"],
  },
};

export const dataSources = [
  { id: "pdf", label: "PDF", ext: "PDF" },
  { id: "document", label: "Document", ext: "DOC" },
  { id: "spreadsheet", label: "Spreadsheet", ext: "XLSX" },
  { id: "dataset", label: "Dataset", ext: "CSV" },
  { id: "sources", label: "Supported sources", ext: "DATA" },
] as const;

export const countries = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "India",
  "United Kingdom",
  "United States",
  "Germany",
  "Singapore",
  "Other",
];

export const reportingChallenges = [
  "Multiple data silos",
  "Manual / recurring reporting",
  "Slow turnaround on questions",
  "Inconsistent reports",
  "Need a product demo",
];

export const nextStepOptions = [
  { id: "demo", label: "20-minute Demo" },
  { id: "meeting", label: "Follow-up Meeting" },
];

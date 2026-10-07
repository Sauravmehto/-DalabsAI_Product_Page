import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Brain,
  Building2,
  ChevronDown,
  Cloud,
  Database,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Globe2,
  Plug,
  Server,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";
import { PricingSection } from "@/components/dataalpha-one/PricingPage";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataFlowBackground } from "@/components/ui/DataFlowBackground";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";

const connectSources = [
  { label: "Database", icon: Database },
  { label: "ERP / CRM", icon: Building2 },
  { label: "Cloud", icon: Cloud },
  { label: "API", icon: Plug },
  { label: "Spreadsheet", icon: FileSpreadsheet },
  { label: "Document", icon: FileText },
];

const analyzeBars = [40, 65, 50, 85, 60];

const enterpriseFeatures = [
  {
    tag: "Configurable",
    heading: "Built around your business",
    copy: "Business processes, data models and KPIs.",
    icon: Settings2,
  },
  {
    tag: "Secure",
    heading: "Enterprise-grade security",
    copy: "Designed for controlled enterprise environments.",
    icon: ShieldCheck,
  },
  {
    tag: "On-Premises",
    heading: "Deploy in your environment",
    copy: "Operate within your own infrastructure when required.",
    icon: Server,
  },
  {
    tag: "Data Residency",
    heading: "Keep control of your data",
    copy: "Support data residency and governance requirements.",
    icon: Globe2,
  },
];

const faqs = [
  {
    question: "What is DA One and what business problem does it solve?",
    answer:
      "DA One is an enterprise Data, Analytics and Reporting platform that helps organizations bring fragmented data from multiple systems into a unified, structured and decision-ready environment. It reduces dependence on manual data consolidation and reporting processes, enabling faster access to reliable information, analytics and management reporting.",
  },
  {
    question: "What types of data and systems can DA One work with?",
    answer:
      "DA One is designed to work with data from virtually any enterprise source—including databases, ERP and CRM platforms, cloud applications, APIs, data warehouses, spreadsheets, documents, system-generated files and internal applications. It can process structured, semi-structured and unstructured data and transform it into consistent, usable information.",
  },
  {
    question:
      "Can DA One be customized to our organization's reporting and analytics requirements?",
    answer:
      "Yes. DA One can be configured around an organization's existing business processes, data models, KPIs, reporting structures and decision-making requirements. Enterprises can create customized dashboards, management reports, predefined reporting formats and analytics aligned to their specific operational and strategic needs.",
  },
  {
    question: "Does our enterprise data need to leave our environment or country?",
    answer:
      "No. DA One can operate within an organization's own on-premises environment, allowing enterprise data to remain within the customer's infrastructure and, where required, within the country. This helps organizations maintain greater control over data residency, security and governance while adopting modern analytics and AI-enabled reporting capabilities.",
  },
  {
    question: "How can DA One improve enterprise reporting and decision-making?",
    answer:
      "DA One brings data preparation, analytics and reporting into a unified environment. By structuring fragmented data and making trusted information more accessible, it helps reduce manual reporting effort, improve reporting consistency and provide business leaders with faster access to actionable information for decision-making.",
  },
  {
    question: "How is DA One different from traditional BI and reporting tools?",
    answer:
      "Traditional BI tools typically focus on visualization and dashboards after data has already been prepared. DA One addresses a broader enterprise challenge by bringing together data ingestion, structuring, transformation, analytics and reporting within one configurable environment. This allows organizations to work with fragmented, structured and unstructured data while creating reporting and analytics experiences aligned to their own processes and decision-making needs.",
  },
];

function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-[18px] border border-line-strong bg-card">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-canvas-2 sm:px-6"
            >
              <span className="text-[14.5px] font-medium text-ink">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-muted"
              >
                <ChevronDown size={18} aria-hidden="true" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-4 text-[13.5px] leading-6 text-muted sm:px-6">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

const outcomes = [
  { label: "Structured Data", icon: Boxes },
  { label: "Accessible Analytics", icon: BarChart3 },
  { label: "Faster Reporting", icon: FileCheck2 },
  { label: "Actionable Intelligence", icon: Brain },
];

function FlowConnector({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex shrink-0 items-center justify-center text-line-strong">
      <svg width="24" height="32" viewBox="0 0 24 32" className="lg:hidden" aria-hidden="true">
        <motion.path
          d="M12 0 V22"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
        />
        <path d="M6 18 L12 26 L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <svg width="40" height="24" viewBox="0 0 40 24" className="hidden lg:block" aria-hidden="true">
        <motion.path
          d="M0 12 H30"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay }}
        />
        <path d="M26 6 L34 12 L26 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

export function ProductPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="px-4 sm:px-8 lg:px-16">
        {/* Hero */}
        <section
          id="top"
          className="relative overflow-hidden bg-canvas pb-12 pt-20 sm:pb-16 sm:pt-24"
        >
          <DataFlowBackground />
          <Container className="relative">
            <Reveal className="mx-auto max-w-3xl text-center">
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                One Enterprise Platform for{" "}
                <em className="not-italic text-accent">Data, Analytics</em>{" "}
                &amp; Reporting
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-muted sm:text-[17px] sm:leading-8">
                Connect your data, transform it into trusted information, and
                turn it into analytics, reporting and actionable intelligence.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => {
                    track("hero_cta_click", { source: "product_page" });
                    openBookingOrLead("demo");
                  }}
                >
                  Book a 20-minute Demo
                  <ArrowRight size={16} />
                </Button>
                <Button href="/pricing" variant="secondary">
                  View Pricing
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <div
                className="mx-auto max-w-4xl overflow-hidden rounded-[20px] border border-line-strong bg-card shadow-[0_24px_80px_rgb(12_18_32/0.12)]"
                style={{ boxShadow: "0 0 90px 20px color-mix(in srgb, var(--color-accent) 14%, transparent)" }}
              >
                <img
                  src="/gif/DAOne_Gif1.gif"
                  alt="DA One live product preview"
                  className="w-full object-contain"
                />
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Workflow */}
        <section id="workflow" className="bg-canvas-2/50 py-4 sm:py-6">
          <Container>
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="The DA One workflow"
                title="From enterprise data to decision-ready intelligence."
                copy="Connect data from virtually any source, transform it into trusted information, and turn it into analytics, reporting and actionable intelligence."
              />
            </Reveal>

            <div className="mt-14 flex flex-col items-stretch gap-1 lg:flex-row lg:items-stretch">
              {/* Connect */}
              <Reveal className="flex-1">
                <div className="flex h-full flex-col items-center gap-3 rounded-[18px] border border-line-strong bg-card p-6 text-center shadow-card">
                  <div className="flex size-11 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
                    <Plug size={20} aria-hidden="true" />
                  </div>
                  <p className="text-[15px] font-semibold text-ink">Connect</p>
                  <p className="text-[13px] leading-5 text-muted">
                    Connect databases, ERP/CRM, cloud applications, APIs,
                    spreadsheets and documents.
                  </p>
                  <div className="mt-1 flex flex-wrap items-center justify-center gap-1.5">
                    {connectSources.map(({ label, icon: Icon }) => (
                      <span
                        key={label}
                        title={label}
                        className="flex size-6 items-center justify-center rounded-full bg-canvas-2 text-ink-2"
                      >
                        <Icon size={11} aria-hidden="true" />
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>

              <FlowConnector delay={0.15} />

              {/* Transform */}
              <Reveal delay={0.08} className="flex-1">
                <div className="flex h-full flex-col items-center gap-3 rounded-[18px] border border-line-strong bg-card p-6 text-center shadow-card">
                  <div className="flex size-11 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
                    <Boxes size={20} aria-hidden="true" />
                  </div>
                  <p className="text-[15px] font-semibold text-ink">Transform</p>
                  <p className="text-[13px] leading-5 text-muted">
                    Ingest, standardize and transform structured,
                    semi-structured and unstructured data.
                  </p>
                  <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-2">
                    <span>Raw</span>
                    <ArrowRight size={10} className="text-line-strong" aria-hidden="true" />
                    <span className="flex size-6 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Boxes size={11} aria-hidden="true" />
                    </span>
                    <ArrowRight size={10} className="text-line-strong" aria-hidden="true" />
                    <span>Structured</span>
                  </div>
                </div>
              </Reveal>

              <FlowConnector delay={0.3} />

              {/* Analyze */}
              <Reveal delay={0.16} className="flex-1">
                <div className="flex h-full flex-col items-center gap-3 rounded-[18px] border border-line-strong bg-card p-6 text-center shadow-card">
                  <div className="flex size-11 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
                    <BarChart3 size={20} aria-hidden="true" />
                  </div>
                  <p className="text-[15px] font-semibold text-ink">Analyze</p>
                  <p className="text-[13px] leading-5 text-muted">
                    Turn trusted data into analytics, dashboards, KPIs and
                    AI-driven insights.
                  </p>
                  <div className="mt-1 flex h-8 items-end justify-center gap-1.5">
                    {analyzeBars.map((height, i) => (
                      <span
                        key={i}
                        className="w-1.5 rounded-full bg-accent/70"
                        style={{ height: `${height}%` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </Reveal>

              <FlowConnector delay={0.45} />

              {/* Report */}
              <Reveal delay={0.24} className="flex-1">
                <div className="flex h-full flex-col items-center gap-3 rounded-[18px] border border-line-strong bg-card p-6 text-center shadow-card">
                  <div className="flex size-11 items-center justify-center rounded-[12px] bg-accent-soft text-accent">
                    <FileCheck2 size={20} aria-hidden="true" />
                  </div>
                  <p className="text-[15px] font-semibold text-ink">Report</p>
                  <p className="text-[13px] leading-5 text-muted">
                    Create management reports, customized reports and
                    reusable reporting formats.
                  </p>
                  <div className="mt-1 flex w-full max-w-[110px] flex-col gap-1 rounded-[8px] border border-line bg-canvas-2 p-2">
                    <span className="h-1.5 w-3/4 rounded-full bg-line-strong" aria-hidden="true" />
                    <span className="h-1.5 w-full rounded-full bg-line-strong" aria-hidden="true" />
                    <span className="h-1.5 w-2/3 rounded-full bg-success/70" aria-hidden="true" />
                  </div>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Enterprise Ready */}
        <section id="enterprise" className="bg-canvas py-4 sm:py-6">
          <Container>
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="Enterprise ready"
                title="Built around your business. Designed for your environment."
                copy="Configure DA One around your business processes, reporting requirements and data environment while maintaining control over security, deployment and governance."
              />
            </Reveal>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
              {enterpriseFeatures.map(({ tag, heading, copy, icon: Icon }, index) => (
                <Reveal key={tag} delay={index * 0.06} className="h-full">
                  <div className="flex h-full flex-col items-center gap-2 rounded-[16px] border border-line-strong bg-card p-5 text-center shadow-card">
                    <div className="flex size-9 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                      <Icon size={17} aria-hidden="true" />
                    </div>
                    <p className="text-[11px] font-semibold tracking-[0.1em] text-accent uppercase">
                      {tag}
                    </p>
                    <p className="text-[13.5px] font-semibold leading-5 text-ink">{heading}</p>
                    <p className="text-[12px] leading-5 text-muted">{copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-canvas py-20 sm:py-28">
          <Container>
            <Reveal>
              <SectionHeading
                align="center"
                eyebrow="FAQ"
                title="Frequently Asked Questions"
                copy="Everything you need to know about DA One."
              />
            </Reveal>
            <Reveal delay={0.08} className="mx-auto mt-12 max-w-2xl">
              <FaqAccordion items={faqs} />
            </Reveal>
          </Container>
        </section>

        {/* Value strip */}
        <section id="value" className="bg-canvas-2/50 py-20 sm:py-28">
          <Container>
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                One platform. One trusted data foundation.
              </h2>
            </Reveal>
            <Reveal>
              <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-2.5">
                {outcomes.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3.5 py-2 text-[13px] font-medium text-ink-2 shadow-card"
                  >
                    <Icon size={14} className="text-success" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => {
                    track("hero_cta_click", { source: "product_page_value" });
                    openBookingOrLead("demo");
                  }}
                >
                  Book a 20-minute Demo
                  <ArrowRight size={16} />
                </Button>
                <Button href="/free-trial" variant="secondary">
                  Start Free Trial
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>

        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}

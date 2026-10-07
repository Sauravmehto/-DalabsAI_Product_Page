import { useState, type ReactElement } from "react";
import { Check } from "lucide-react";
import { Footer } from "@/components/dataalpha-one/Footer";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { PlanRequestModal, type PlanName } from "@/components/ui/PlanRequestModal";

type Currency = "AED" | "USD";

const GOLD_FEATURE_KEYS = new Set([
  "model-lockin",
  "local-ai",
  "on-prem",
  "faster",
  "private",
  "tokens",
]);
const isGoldFeature = (feature: string | ReactElement) =>
  typeof feature !== "string" && GOLD_FEATURE_KEYS.has(String(feature.key));

const formatPrice = (amount: number, currency: Currency) =>
  `${currency} ${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(amount)}`;

function CurrencyToggle({
  currency,
  onChange,
  featured,
}: {
  currency: Currency;
  onChange: (currency: Currency) => void;
  featured?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Select currency"
      className={`absolute left-6 top-0 -translate-y-1/2 inline-flex items-center gap-0.5 rounded-full border p-0.5 ${
        featured ? "border-white/20 bg-navy" : "border-line-strong bg-card"
      }`}
    >
      {(["AED", "USD"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={currency === c}
          className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent ${
            currency === c
              ? "bg-accent text-white"
              : featured
                ? "text-white/60 hover:text-white"
                : "text-muted hover:text-ink"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function FlippablePrice({
  currency,
  price,
  originalPrice,
  period,
  featured,
}: {
  currency: Currency;
  price: Record<Currency, number>;
  originalPrice?: Record<Currency, number>;
  period: string;
  featured?: boolean;
}) {
  const flipped = currency === "USD";

  const renderFace = (c: Currency) => (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight">
          {formatPrice(price[c], c)}
        </span>
        <span className={`text-sm ${featured ? "text-white/65" : "text-muted"}`}>
          {period}
        </span>
      </div>
      {originalPrice && (
        <span
          className={`mt-4 text-sm font-bold line-through ${
            featured ? "text-white/45" : "text-muted"
          }`}
        >
          {formatPrice(originalPrice[c], c)}
        </span>
      )}
    </div>
  );

  return (
    <div className="[perspective:1200px]">
      <div
        className={`grid transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none motion-reduce:duration-0 ${
          flipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        }`}
      >
        <div className="[grid-area:1/1] [backface-visibility:hidden]">{renderFace("AED")}</div>
        <div className="[grid-area:1/1] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {renderFace("USD")}
        </div>
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Monthly",
    description:
      "Enterprise data, analytics, and reporting with flexible monthly access",
    price: { AED: 7200, USD: 2000 },
    originalPrice: undefined as Record<Currency, number> | undefined,
    period: "/ month",
    href: "https://app.dataalpha.ai/settings/subscription?tier=Plus",
    cta: "Start with Monthly",
    features: [
      "Connect any enterprise data source, databases",
      "Supports Excel, PDF data sources",
      "Ask business questions in natural language",
      "Get answers from live, refreshable data",
      "Generate SQL automatically",
      "Configure exact reports/formats using AI",
      "Use AI securely on sample data only to configure report",
      "Reports run without hallucination and token consumption",
      "Configure & create standard business reports in Excel, PDF",
      "Save & reuse reporting workflows",
      "Unlimited users",
      "10 hours per month support",
       "Enterprise Guardrails in place",
      <span key="faster">
        At least{" "}
        <strong className="font-extrabold  [text-shadow:0_0_0.5px_currentColor]">
          10× faster report creation
        </strong>
      </span>,
       <span key="private">
        <strong className="font-extrabold  [text-shadow:0_0_0.5px_currentColor]">
          Connect privately without sharing your data with AI
        </strong>
      </span>,
     
      <span
        key="tokens"
        className="font-extrabold  [text-shadow:0_0_0.5px_currentColor]"
      >
        2,000,000 tokens per month
      </span>,
      
    ],
  },

  {
    name: "Annual",
    description:
      "Advanced enterprise capabilities for teams ready to scale their reporting",
    price: { AED: 72000, USD: 20000 },
    originalPrice: { AED: 86400, USD: 24000 } as Record<Currency, number> | undefined,
    period: "/ year",
    href: "https://app.dataalpha.ai/settings/subscription?tier=Pro",
    featured: true,
    cta: "Choose Annual & Save 16%",
    features: [
      "Everything included in Monthly",
      "Connect databases, APIs & enterprise data sources",
      "Build and scale for your growth and White label",
      "Custom reports built around your business",
      "Schedule Standardized reports",
      "Role-based access & permissions",
      "Complete query & interaction audit trail",
      "Enterprise SQL safety controls & Guardrails",
      "16 hours per month support",
      "Configuration & customization by DataAlpha",
      "Scale reporting workflows across teams",
      <span key="model-lockin">
        <strong className="font-extrabold text-white [text-shadow:0_0_0.5px_currentColor]">
          Choose your model with no AI model lock-in
        </strong>
      </span>,
      <span key="local-ai">
        <strong className="font-extrabold text-white [text-shadow:0_0_0.5px_currentColor]">
          Local AI Deployment option (no data sharing)
        </strong>
      </span>,
      <span key="on-prem">
        <strong className="font-extrabold text-white [text-shadow:0_0_0.5px_currentColor]">
          Private / on-prem deployment in your own environment
        </strong>
      </span>,

    ],
  },
];

export function PricingSection() {
  const [currency, setCurrency] = useState<Currency>("AED");
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null);

  return (
    <section id="pricing" className="bg-canvas py-4 sm:py-6">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
            Simple pricing
          </p>

          <h2 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Choose the plan that fits your work.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-muted">
            Start with the tools you need today and scale when your analysis
            gets more ambitious.
          </p>
        </Reveal>

        <div className="mx-auto mt-12 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.name}
              delay={index * 0.08}
              className="h-full"
            >
              <article
                className={`relative flex h-full flex-col rounded-[18px] border p-6 shadow-card sm:p-8 ${
                  plan.featured
                    ? "border-accent bg-navy text-white"
                    : "border-line-strong bg-card text-ink"
                }`}
              >
                <CurrencyToggle
                  currency={currency}
                  onChange={setCurrency}
                  featured={plan.featured}
                />

                {plan.featured && (
                  <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Recommended
                  </span>
                )}

                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold">{plan.name}</h3>

                  {plan.name === "Annual" && (
                    <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                      16% off
                    </span>
                  )}
                </div>

                <p
                  className={`mt-3 min-h-12 text-sm leading-6 ${
                    plan.featured ? "text-white/70" : "text-muted"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <FlippablePrice
                    currency={currency}
                    price={plan.price}
                    originalPrice={plan.originalPrice}
                    period={plan.period}
                    featured={plan.featured}
                  />
                </div>

                <Button
                  onClick={() => setSelectedPlan(plan.name as PlanName)}
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  {plan.cta}
                </Button>

                <div
                  className={`mt-8 border-t pt-6 ${
                    plan.featured ? "border-white/15" : "border-line"
                  }`}
                >
                  <p
                    className={`mb-4 text-xs ${
                      plan.featured ? "text-white/60" : "text-muted"
                    }`}
                  >
                    Included with {plan.name}:
                  </p>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={
                          typeof feature === "string"
                            ? feature
                            : `feature-${plan.name}-${featureIndex}`
                        }
                        className="flex items-start gap-2 text-lg leading-5"
                      >
                        <Check
                          size={16}
                          className={`mt-0.5 shrink-0 ${
                            isGoldFeature(feature)
                              ? "text-amber-400"
                              : plan.featured
                                ? "text-teal-300"
                                : "text-success"
                          }`}
                        />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
      {selectedPlan && (
        <PlanRequestModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </section>
  );
}

export function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("AED");
  const [selectedPlan, setSelectedPlan] = useState<PlanName | null>(null);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main id="main" className="pb-20 pt-28 sm:pt-36">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
              Simple pricing
            </p>

            <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Choose the plan that fits your work.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-muted">
              Start with the tools you need today and scale when your analysis
              gets more ambitious.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan, index) => (
              <Reveal
                key={plan.name}
                delay={index * 0.08}
                className="h-full"
              >
                <article
                  className={`relative flex h-full flex-col rounded-[18px] border p-6 shadow-card sm:p-8 ${
                    plan.featured
                      ? "border-accent bg-navy text-white"
                      : "border-line-strong bg-card text-ink"
                  }`}
                >
                  <CurrencyToggle
                    currency={currency}
                    onChange={setCurrency}
                    featured={plan.featured}
                  />

                  {plan.featured && (
                    <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                      Recommended
                    </span>
                  )}

                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-semibold">{plan.name}</h2>

                    {plan.name === "Annual" && (
                      <span className="rounded-full bg-accent px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                        16% off
                      </span>
                    )}
                  </div>

                  <p
                    className={`mt-3 min-h-12 text-sm leading-6 ${
                      plan.featured ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <FlippablePrice
                      currency={currency}
                      price={plan.price}
                      originalPrice={plan.originalPrice}
                      period={plan.period}
                      featured={plan.featured}
                    />
                  </div>

                  <Button
                    onClick={() => setSelectedPlan(plan.name as PlanName)}
                    variant={plan.featured ? "primary" : "secondary"}
                    className="mt-7 w-full"
                  >
                    {plan.cta}
                  </Button>

                  <div
                    className={`mt-8 border-t pt-6 ${
                      plan.featured ? "border-white/15" : "border-line"
                    }`}
                  >
                    <p
                      className={`mb-4 text-xs ${
                        plan.featured ? "text-white/60" : "text-muted"
                      }`}
                    >
                      Included with {plan.name}:
                    </p>

                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={
                            typeof feature === "string"
                              ? feature
                              : `feature-${plan.name}-${featureIndex}`
                          }
                          className="flex items-start gap-2 text-lg leading-5"
                        >
                          <Check
                            size={16}
                            className={`mt-0.5 shrink-0 ${
                              isGoldFeature(feature)
                                ? "text-amber-400"
                                : plan.featured
                                  ? "text-teal-300"
                                  : "text-success"
                            }`}
                          />

                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </main>

      <Footer />
      {selectedPlan && (
        <PlanRequestModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
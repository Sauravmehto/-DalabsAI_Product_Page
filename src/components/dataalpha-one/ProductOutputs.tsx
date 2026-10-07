import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductShell } from "@/components/product/ProductShell";
import { DataTable } from "@/components/product/DataTable";
import { BarChart, KpiCard, LineChart } from "@/components/charts/Charts";
import { kpis, months, products, prompts, regions } from "@/data/demoData";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

const tabs = [
  { id: "chat", label: "Chat", copy: "Talk to your data." },
  { id: "visualize", label: "Visualize", copy: "See what the data is telling you." },
  { id: "dashboard", label: "Dashboard", copy: "Build a view of what matters." },
  { id: "report", label: "Report", copy: "Create business-ready reports." },
] as const;

type Tab = (typeof tabs)[number]["id"];

function AnalysisCore({ tab }: { tab: Tab }) {
  return (
    <div className="space-y-4">
      <div className="max-w-xl rounded-[16px] bg-canvas px-4 py-3 text-sm">
        {prompts[0].question}
      </div>
      {tab !== "chat" && (
        <motion.div layout className="rounded-[16px] border border-line bg-card p-4">
          {tab === "dashboard" && (
            <div className="mb-4 grid grid-cols-3 gap-2">
              <KpiCard label={kpis.revenue.label} display={kpis.revenue.display} countValue={kpis.revenue.value} prefix="$" suffix="M" decimals={2} />
              <KpiCard label={kpis.growth.label} display={kpis.growth.display} accent countValue={kpis.growth.value} prefix="+" suffix="%" decimals={1} />
              <KpiCard label={kpis.transactions.label} display={kpis.transactions.display} countValue={kpis.transactions.value} />
            </div>
          )}
          {tab === "report" && (
            <div className="mb-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                Executive sales report · Example
              </p>
              <h3 className="mt-1 text-lg font-semibold">Revenue performance overview</h3>
              <p className="mt-2 text-sm leading-6 text-muted">
                Period revenue is $4.82M in this sample, up 18.4%. UAE and Saudi Arabia contribute 69.9% of the mix.
              </p>
            </div>
          )}
          <p className="mb-3 text-[12px] font-medium text-muted">Regional mix</p>
          <BarChart items={regions.map((r) => ({ name: r.name, value: r.share }))} />
          {tab === "dashboard" && (
            <div className="mt-4">
              <p className="mb-2 text-[12px] text-muted">Trend</p>
              <LineChart points={months.map((m) => m.revenue)} labels={months.map((m) => m.month)} />
            </div>
          )}
          {tab === "report" && <div className="mt-4"><DataTable rows={regions} /></div>}
        </motion.div>
      )}
      {tab === "chat" && (
        <div className="max-w-xl rounded-[16px] border border-line px-4 py-3 text-sm leading-6 text-ink-2">
          {prompts[0].answer}
        </div>
      )}
      {tab === "dashboard" && (
        <p className="text-[12px] text-muted">Product mix remains available as a second widget: Product A {products[0].share}%.</p>
      )}
    </div>
  );
}

export function ProductOutputs() {
  const [tab, setTab] = useState<Tab>("chat");
  const reduce = useReducedMotion();

  return (
    <section id="outputs" className="py-20 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Outputs"
            title="One conversation. Multiple ways to work with your data."
            copy="The same analysis moves from chat into a chart, a dashboard widget, and a report — not four unrelated screens."
          />
        </Reveal>
        <div
          className="mt-10 grid gap-2 sm:grid-cols-4"
          role="tablist"
          aria-label="Product outputs"
        >
          {tabs.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`output-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls="output-panel"
              onClick={() => {
                setTab(item.id);
                track("product_demo_interaction", { output: item.id });
              }}
              className={cn(
                "rounded-[16px] border px-4 py-4 text-left transition-colors",
                tab === item.id ? "border-accent bg-accent-soft" : "border-line bg-card",
              )}
            >
              <p className="text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
                {String(i + 1).padStart(2, "0")} — {item.label}
              </p>
              <p className="mt-1 text-sm text-muted">{item.copy}</p>
            </button>
          ))}
        </div>
        <Reveal className="mt-8" delay={0.04}>
          <ProductShell
            compactNav
            active={tab === "dashboard" ? "dashboards" : tab === "report" ? "reports" : "chat"}
          >
            <div
              id="output-panel"
              role="tabpanel"
              aria-labelledby={`output-tab-${tab}`}
              className="min-h-[380px] p-5"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <AnalysisCore tab={tab} />
                </motion.div>
              </AnimatePresence>
            </div>
          </ProductShell>
        </Reveal>
      </Container>
    </section>
  );
}

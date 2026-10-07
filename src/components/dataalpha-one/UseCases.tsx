import { useState } from "react";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductShell } from "@/components/product/ProductShell";
import { DataTable } from "@/components/product/DataTable";
import { BarChart, KpiCard } from "@/components/charts/Charts";
import { industries, industryViews, regions, type Industry } from "@/data/demoData";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

export function UseCases() {
  const [industry, setIndustry] = useState<Industry>("Fintech");
  const view = industryViews[industry];

  return (
    <section id="use-cases" className="py-16 sm:py-20" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Use cases"
            title="Built for the questions your business asks every day."
            copy="Select an industry. Example data — the same workspace, different questions."
          />
        </Reveal>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Industries">
          {industries.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={industry === item}
              onClick={() => {
                setIndustry(item);
                track("use_case_change", { industry: item });
              }}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                industry === item
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-card text-muted hover:text-ink",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <Reveal className="mt-8">
          <ProductShell compactNav>
            <div className="p-5">
              <p className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">
                {view.title}
              </p>
              <p className="mt-1 text-sm text-muted">{view.description}</p>
              <p className="mt-3 rounded-[12px] bg-canvas px-3 py-2 text-sm">“{view.question}”</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {view.kpis.map((kpi) => (
                  <KpiCard key={kpi.label} label={kpi.label} display={kpi.value} />
                ))}
              </div>
              <BarChart className="mt-6" items={view.bars} />
              <div className="mt-5">
                <DataTable rows={regions.slice(0, 4)} />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {view.queries.map((q) => (
                  <span key={q} className="rounded-full border border-line px-3 py-1.5 text-[12px] text-muted">
                    {q}
                  </span>
                ))}
              </div>
            </div>
          </ProductShell>
        </Reveal>
      </Container>
    </section>
  );
}

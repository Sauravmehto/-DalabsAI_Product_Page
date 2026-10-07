import { useEffect, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductShell } from "@/components/product/ProductShell";
import { DataTable } from "@/components/product/DataTable";
import { BarChart, KpiCard, LineChart } from "@/components/charts/Charts";
import { kpis, months, prompts, quarters, regions } from "@/data/demoData";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const beats = [
  { user: "Show me sales performance.", nav: "chat" as const },
  { user: "Show me sales performance.", nav: "chat" as const },
  { user: "Compare it with last quarter.", nav: "chat" as const },
  { user: "Create a report.", nav: "reports" as const },
  { user: "Add this to my dashboard.", nav: "dashboards" as const },
];

export function ProductShowcase() {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState(reduce ? 4 : 0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing || reduce) return;
    const t = window.setInterval(() => {
      setScene((s) => (s + 1) % beats.length);
    }, 2800);
    return () => window.clearInterval(t);
  }, [playing, reduce]);

  const replay = () => {
    setScene(0);
    setPlaying(true);
    track("product_demo_interaction", { showcase: "replay" });
  };

  return (
    <section id="showcase" className="py-20 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Workspace"
            title="See the intelligence come together."
            copy="One sequence on the same example dataset: ask, chart, compare, report, then pin it to a dashboard."
          />
        </Reveal>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)}>
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "Pause" : "Play"}
          </Button>
          <Button size="sm" variant="ghost" onClick={replay}>
            <RotateCcw size={14} />
            Replay
          </Button>
        </div>
        <Reveal className="mt-8">
          <ProductShell hideSidebar compactNav active={beats[scene].nav} className="lg:min-h-[540px]">
            <div className="grid lg:grid-cols-[168px_minmax(0,1fr)_260px]">
              <aside className="hidden border-r border-line bg-canvas/70 p-3 lg:block">
                <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
                  Navigation
                </p>
                {["Chat", "Dashboards", "Reports", "Data", "Semantic Layer"].map((item) => {
                  const current =
                    beats[scene].nav === "dashboards"
                      ? "Dashboards"
                      : beats[scene].nav === "reports"
                        ? "Reports"
                        : "Chat";
                  return (
                  <div
                    key={item}
                    className={cn(
                      "rounded-[10px] px-2.5 py-2 text-[12px]",
                      item === current
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-muted",
                    )}
                  >
                    {item}
                  </div>
                  );
                })}
              </aside>
              <div className="border-b border-line p-4 sm:p-5 lg:border-r lg:border-b-0">
                <p className="text-[12px] text-muted">Conversation</p>
                <div className="mt-3 space-y-2">
                  {beats.slice(0, scene + 1).filter((b, i, arr) => i === 0 || b.user !== arr[i - 1].user).map((b) => (
                    <div key={b.user} className="rounded-[14px] bg-canvas px-3 py-2 text-sm">
                      {b.user}
                    </div>
                  ))}
                </div>
                {scene >= 1 && (
                  <div className="mt-3 rounded-[14px] border border-line px-3 py-3 text-sm leading-6 text-ink-2">
                    {prompts[0].answer}
                  </div>
                )}
                {scene >= 1 && scene < 3 && (
                  <div className="mt-4">
                    <LineChart
                      points={
                        scene >= 2
                          ? [quarters.previous.revenue / 3, quarters.previous.revenue / 3, quarters.previous.revenue / 3, months[3].revenue, months[4].revenue, months[5].revenue]
                          : months.map((m) => m.revenue)
                      }
                      labels={months.map((m) => m.month)}
                    />
                  </div>
                )}
                {scene >= 3 && (
                  <div className="mt-4 rounded-[14px] border border-line bg-canvas p-3">
                    <p className="text-[11px] font-semibold tracking-[0.12em] text-muted uppercase">Report preview</p>
                    <p className="mt-1 text-sm font-medium">Revenue performance overview</p>
                    <p className="mt-2 text-[13px] text-muted">
                      {quarters.current.label} is ${quarters.current.revenue.toFixed(2)}M vs ${quarters.previous.revenue.toFixed(2)}M in {quarters.previous.label}.
                    </p>
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-[12px] text-muted">Insight</p>
                <div className="mt-3 grid gap-2">
                  <KpiCard label={kpis.revenue.label} display={kpis.revenue.display} countValue={kpis.revenue.value} prefix="$" suffix="M" decimals={2} />
                  <KpiCard label={kpis.growth.label} display={kpis.growth.display} accent countValue={kpis.growth.value} prefix="+" suffix="%" decimals={1} />
                </div>
                {scene >= 1 && (
                  <div className="mt-4">
                    <BarChart items={regions.slice(0, 4).map((r) => ({ name: r.name, value: r.share }))} />
                  </div>
                )}
                {scene >= 3 && <div className="mt-4"><DataTable rows={regions.slice(0, 3)} /></div>}
                {scene >= 4 && (
                  <div className="mt-4 rounded-[12px] bg-accent-soft px-3 py-2 text-[12px] text-accent">
                    Widget added to executive dashboard.
                  </div>
                )}
                <div className="mt-5 flex flex-wrap gap-2 text-[12px]">
                  <span className="rounded-[10px] border border-line px-2.5 py-1">Create report</span>
                  <span className="rounded-[10px] border border-line px-2.5 py-1">Add to dashboard</span>
                </div>
              </div>
            </div>
          </ProductShell>
        </Reveal>
      </Container>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Check, FileSpreadsheet, FileText } from "lucide-react";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataFlow } from "@/components/product/DataFlow";
import { cn } from "@/lib/cn";

const stack = [
  { label: "PDF", name: "board-pack.pdf", icon: FileText },
  { label: "XLSX", name: "sales-q3.xlsx", icon: FileSpreadsheet },
  { label: "DOC", name: "ops-notes.docx", icon: FileText },
];

const stages = [
  "Files ready",
  "Files enter DA One",
  "Processing",
  "Understanding data",
  "Ready to explore",
];

export function DataSources() {
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(reduce ? 4 : 0);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setStage((s) => (s + 1) % 5), 1600);
    return () => window.clearInterval(t);
  }, [reduce]);

  return (
    <section id="data" className="py-20 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Bring your data"
              title="Start with the data you already have."
              copy={<>Bring supported business data into DA <em>One</em> and give your AI agent the context it needs to help you explore and understand it.</>}
            />
            <p className="mt-4 text-sm text-muted">
              Support depends on the formats and sources available in your environment. This page does not claim specific third-party integrations.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-[28px] border border-line bg-card p-6 shadow-[0_16px_40px_rgb(12_18_32/0.06)]">
              <div className="flex flex-col items-center">
                {stack.map((file, i) => {
                  const Icon = file.icon;
                  const visible = stage >= i || reduce;
                  return (
                    <div key={file.label} className="flex w-full max-w-[260px] flex-col items-center">
                      <div
                        className={cn(
                          "flex w-full items-center gap-3 rounded-[16px] border px-3 py-3 transition-all",
                          visible ? "border-accent/30 bg-accent-soft opacity-100" : "border-line bg-canvas opacity-40",
                        )}
                      >
                        <Icon size={18} className="text-accent" />
                        <div>
                          <p className="text-sm font-medium">{file.label}</p>
                          <p className="text-[12px] text-muted">{file.name}</p>
                        </div>
                      </div>
                      {i < stack.length - 1 && <div className="h-3 w-px bg-accent/30" />}
                    </div>
                  );
                })}
                <div className="relative my-2 h-8 w-px bg-accent/25">
                  {!reduce && <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent particle" />}
                </div>
                <div className="w-full max-w-[260px] rounded-[16px] bg-ink px-4 py-3 text-center text-sm font-medium text-white">
                  DA <em>One</em>
                </div>
                <div className="relative my-2 h-8 w-px bg-accent/25">
                  {!reduce && <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent particle" />}
                </div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-accent">
                  {stage === 4 && <Check size={16} />}
                  {stages[stage]}
                </p>
              </div>
              <div className="mx-auto mt-5 h-1.5 max-w-[260px] overflow-hidden rounded-full bg-canvas-2">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${(stage + 1) * 20}%` }}
                />
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal className="mt-12 hidden lg:block">
          <DataFlow labels={["Supported sources", "DA One", "Ready to explore"]} />
        </Reveal>
      </Container>
    </section>
  );
}

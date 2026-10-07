import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataFlow } from "@/components/product/DataFlow";

const flow = [
  ["Your data", "Semantic layer", "AI data agent"],
  ["Chat", "Analysis", "Insights"],
  ["Charts", "Dashboards", "Reports"],
];

export function ProductIntro() {
  return (
    <section id="product" className="bg-ink py-24 text-white sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            invert
            eyebrow="DA One"
            title="Meet your AI data agent."
            copy={<>DA <em>One</em> gives you a conversational way to work with your data. Ask questions, explore answers, analyze information, and turn what you discover into useful business outputs.</>}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mt-14 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div className="pointer-events-none absolute inset-0 grid-bg-dark opacity-60" />
            <div className="relative space-y-6">
              {flow.map((row, ri) => (
                <div key={ri}>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {row.map((label) => (
                      <div
                        key={label}
                        className="rounded-[16px] border border-white/10 bg-white/[0.04] px-4 py-4 text-center text-sm font-medium"
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                  {ri < flow.length - 1 && (
                    <div className="flex justify-center py-2">
                      <span className="h-6 w-px bg-teal-400/50" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="relative mt-8 text-center text-sm text-white/55">
              One environment. A conversation. Outputs your business can use.
            </p>
            <div className="relative mt-10">
              <DataFlow
                invert
                labels={["Your data", "Semantic layer", "AI data agent", "Insights"]}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataFlow } from "@/components/product/DataFlow";

const nodes = ["Region", "Product", "Customer", "Channel", "Date"];

export function SemanticLayer() {
  return (
    <section id="semantic" className="py-20 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Context"
              title="AI that understands what your data means."
              copy="Data isn't just numbers and columns. A semantic layer provides the context and business meaning needed to work with data more intelligently."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-[28px] border border-line bg-card p-6 sm:p-8">
              <p className="text-lg font-semibold">Revenue</p>
              <div className="relative mt-4 space-y-2 border-l-2 border-accent/30 pl-4">
                {nodes.map((node) => (
                  <div
                    key={node}
                    className="relative rounded-[12px] border border-line bg-canvas px-3 py-2 text-sm"
                  >
                    <span className="absolute top-1/2 -left-[22px] size-2 -translate-y-1/2 rounded-full bg-accent" />
                    {node}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <DataFlow labels={["Semantic context", "AI data agent", "Business question", "Answer"]} />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

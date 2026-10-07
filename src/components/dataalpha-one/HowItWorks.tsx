import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  { n: "01", title: "Bring your data", copy: "Connect the sources you already use." },
  { n: "02", title: "Ask", copy: "Ask in plain language — sales, revenue, inventory, operations." },
  { n: "03", title: "See the insight", copy: "Get the answer with charts and tables." },
  { n: "04", title: "Create the output", copy: "Turn it into a report or dashboard you can reuse." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-canvas-2/50 py-16 sm:py-20" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            title="From your data to a report."
            copy="Four steps. No specialist queue in between."
          />
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.04}>
              <article className="h-full rounded-[18px] border border-line bg-card p-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-accent">{step.n}</p>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

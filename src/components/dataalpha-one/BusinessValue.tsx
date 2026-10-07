import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const outcomes = [
  {
    title: "Faster reporting",
    copy: "Get from question to useful output faster.",
  },
  {
    title: "Better data access",
    copy: "Make business information easier to explore.",
  },
  {
    title: "More flexible analysis",
    copy: "Move beyond static reporting workflows.",
  },
  {
    title: "Scalable intelligence",
    copy: "Extend data interaction across business teams.",
  },
  {
    title: "Consistent outputs",
    copy: "Create repeatable reporting workflows where supported.",
  },
];

export function BusinessValue() {
  return (
    <section className="py-24 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            title="Turn data work into business momentum."
            copy="The value is operational: shorter paths from a question to a chart, a dashboard, or a report — without inventing ROI figures."
          />
        </Reveal>
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {outcomes.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <article className="h-full rounded-[18px] border border-line bg-card p-5">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

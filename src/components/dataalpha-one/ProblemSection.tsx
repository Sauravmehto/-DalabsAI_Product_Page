import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const problems = [
  { title: "Data silos", copy: "Information scattered across sources." },
  { title: "Manual reporting", copy: "Recurring reports consume time." },
  { title: "Technical dependency", copy: "Simple questions wait on specialist teams." },
  { title: "Inconsistent reports", copy: "Different workflows produce different numbers." },
  { title: "Delayed insights", copy: "Answers arrive after the decision window." },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-16 sm:py-20" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            title="Reporting should not take a queue."
            copy={<>DA <em>One</em> sits alongside your teams — an acceleration layer for questions, reports, and decisions.</>}
          />
        </Reveal>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <article className="h-full rounded-[18px] border border-line bg-card p-4">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-accent uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

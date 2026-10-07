import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DataFlow } from "@/components/product/DataFlow";

const flow = [
  "Your data",
  "Controlled access",
  "Data / context",
  "AI agent",
  "Insights",
];

export function TrustSection() {
  return (
    <section id="security" className="py-24 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Trust"
              title="Your data stays at the center of the experience."
              copy={<>DA <em>One</em> is built around your data and your business workflows, with the appropriate controls needed to work with business information responsibly. Explore the platform with confidence while maintaining those controls.</>}
            />
            <p className="mt-4 text-sm text-muted">
              This page does not list certifications or architectural claims that have not been confirmed for publication.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[28px] border border-line bg-card p-6">
              <DataFlow labels={flow} />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

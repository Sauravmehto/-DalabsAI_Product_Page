import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { caseStudies } from "@/data/caseStudies";

const valuePoints = [
  { value: "40 hrs → 4 hrs", label: "Illustrative reporting-cycle improvement" },
  { value: "10×", label: "Illustrative reporting-efficiency improvement" },
  { value: "UAE / GCC", label: "Representative operating scenarios" },
  { value: "Executive-first", label: "Question → insight → action" },
];

export function UseCasesPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="px-4 sm:px-8 lg:px-16">
        {/* Hero */}
        <section className="bg-canvas pb-14 pt-28 sm:pb-16 sm:pt-32">
          <Container>
            <Reveal className="max-w-3xl">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
                Industry case studies
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                From fragmented data to decisions with{" "}
                <em className="not-italic text-accent">DA One</em>
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted sm:text-[17px] sm:leading-8">
                Explore how a configured Data, Analytics and Reporting layer can
                help management teams connect operational and financial data,
                accelerate reporting and surface the economics behind growth.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="#case-studies">Explore case studies</Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    track("hero_cta_click", { source: "use_cases_page" });
                    openBookingOrLead("demo");
                  }}
                >
                  Book a 20-minute Demo
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Case study grid */}
        <section id="case-studies" className="bg-canvas sm:py-6">
          <Container>
            <Reveal>
              <div className="flex flex-col items-end justify-between gap-4 sm:flex-row">
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Diverse Datasets. One decision layer.
                </h2>
                <p className="max-w-sm text-[14px] leading-6 text-muted">
                  Each case study begins with an executive business question,
                  connects fragmented systems and moves from reporting to
                  insight to modeled action.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05} className="h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line-strong bg-card shadow-card transition-shadow hover:shadow-frame">
                   <a
  href={`/use-cases/${item.slug}`}
  aria-label={`View ${item.industry} case study`}
  className="block aspect-video overflow-hidden rounded-t-[18px] bg-[#eef4fb]"
>
  <img
    src={item.image}
    alt={`${item.industry} DA One case study thumbnail`}
    loading="lazy"
    className="h-full w-full rounded-[10px] object-center"
  />
</a>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                        {item.industry}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-6 text-muted">
                        {item.summary}
                      </p>
                      <div className="mt-5 grid grid-cols-2 gap-2">
                        {item.cardMetrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-[10px] border border-line bg-canvas-2/60 px-3 py-2.5"
                          >
                            <p className="text-[13px] font-semibold text-ink">{metric.value}</p>
                            <p className="text-[11px] text-muted">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                      <a
                        href={`/use-cases/${item.slug}`}
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-2"
                      >
                        View case study
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>

        {/* Value band */}
        <section className="bg-navy py-16 text-white sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
              <Reveal>
                <p className="text-[12px] font-semibold tracking-[0.16em] text-teal-300/80 uppercase">
                  A consistent operating model
                </p>
                <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Data, Analytics and Reporting — configured around the decision.
                </h2>
                <p className="mt-4 text-[15px] leading-7 text-white/70">
                  Across all six scenarios, DA One connects fragmented data
                  sources into a customized reporting and analytics layer
                  designed around management questions, not around another
                  silo.
                </p>
              </Reveal>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {valuePoints.map((point, index) => (
                  <Reveal key={point.label} delay={index * 0.06} className="h-full">
                    <div className="h-full rounded-[16px] border border-white/10 bg-white/[0.06] p-5">
                      <p className="text-lg font-semibold">{point.value}</p>
                      <p className="mt-1 text-[13px] text-white/65">{point.label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-canvas-2/50 py-16 sm:py-20">
          <Container>
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-line-strong bg-card p-8 shadow-card sm:flex-row sm:items-center sm:p-10">
                <div>
                  <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
                    See DA One in action
                  </p>
                  <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                    Bring one real management question.
                  </h2>
                  <p className="mt-3 max-w-xl text-[14px] leading-6 text-muted">
                    We'll show how a configured data, analytics and reporting
                    layer can connect the underlying data and turn it into an
                    answer, dashboard and management report.
                  </p>
                </div>
                <Button
                  className="shrink-0"
                  onClick={() => {
                    track("hero_cta_click", { source: "use_cases_cta" });
                    openBookingOrLead("demo");
                  }}
                >
                  Book a 20-minute Demo
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

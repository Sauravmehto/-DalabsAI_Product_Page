import { useState } from "react";
import { ArrowRight, ChevronRight, Download } from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { getCaseStudy } from "@/data/caseStudies";

export function CaseStudyPage({ slug }: { slug: string }) {
  const [expanded, setExpanded] = useState(true);
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <div className="min-h-screen bg-canvas">
        <Navbar />
        <main id="main" className="flex min-h-screen items-center justify-center px-4 pb-20 pt-28 text-center">
          <div>
            <h1 className="text-2xl font-semibold text-ink">Case study not found</h1>
            <p className="mt-2 text-sm text-muted">
              We couldn't find that case study.
            </p>
            <Button href="/use-cases" className="mt-6">
              Back to case studies
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
       <main id="main" className="px-4 sm:px-8 lg:px-16">
        {/* Hero */}
        <section className="bg-canvas pb-10 pt-28 sm:pt-32">
          <Container>
            <Reveal>
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted">
                <a href="/use-cases" className="text-accent hover:underline">
                  Case Studies
                </a>
                <ChevronRight size={13} aria-hidden="true" />
                <span>{study.industry}</span>
              </nav>
            </Reveal>
            <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
              <Reveal>
                <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
                  {study.industry} case study
                </p>
                <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]">
                  {study.title}
                </h1>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted">
                  {study.summary}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Button
                    onClick={() => {
                      track("hero_cta_click", { source: `case_study_${study.slug}` });
                      openBookingOrLead("demo");
                    }}
                  >
                    Book a 20-minute Demo
                    <ArrowRight size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setExpanded(true);
                      document
                        .getElementById("full-case-study")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Read full case study
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="aspect-video overflow-hidden rounded-[20px]">
                  <img
                    src={study.datasetImage}
                    alt={`${study.industry} DA One case study dataset`}
                    className="h-full w-full object-contain"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {study.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[14px] border border-line-strong bg-card p-4"
                  >
                    <p className="text-[15px] font-semibold leading-tight text-ink">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[12px] text-muted">{metric.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* Full case study */}
        <section id="full-case-study" className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
              <Reveal>
                <article className="min-w-0">
                  <blockquote className="rounded-r-[16px] border-l-4 border-accent bg-accent-soft px-6 py-5">
                    <p className="text-[12px] font-semibold tracking-[0.1em] text-accent uppercase">
                      Executive ask
                    </p>
                    <p className="mt-2 text-[18px] font-semibold leading-snug text-ink">
                      "{study.executiveAsk}"
                    </p>
                  </blockquote>

                  <div className="mt-6 rounded-[16px] border border-line-strong bg-card">
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      aria-expanded={expanded}
                      className="flex w-full items-center justify-between rounded-[16px] bg-canvas-2 px-5 py-4 text-left text-[14px] font-semibold text-ink transition-colors hover:bg-canvas-2/70"
                    >
                      Read the full case study
                      <ChevronRight
                        size={16}
                        className={expanded ? "rotate-90 transition-transform" : "transition-transform"}
                        aria-hidden="true"
                      />
                    </button>
                    {expanded && (
                      <div className="px-5 pb-2 pt-4">
                        {study.sections.map((section, index) => (
                          <div
                            key={section.heading}
                            className={
                              index > 0 ? "mt-6 border-t border-line pt-6" : undefined
                            }
                          >
                            <h2 className="text-xl font-semibold text-ink">
                              {section.heading}
                            </h2>
                            <p className="mt-2.5 text-[14.5px] leading-7 text-muted">
                              {section.body}
                            </p>
                          </div>
                        ))}
                        <div className="mt-6 border-t border-line pt-6">
                          <a
                            href={study.pdf ?? study.image}
                            download
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-2"
                          >
                            <Download size={14} aria-hidden="true" />
                            {study.pdf ? "Download case study PDF" : "Download case study image"}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <p className="mt-6 rounded-[12px] border border-line bg-canvas-2/60 p-4 text-[12.5px] leading-6 text-muted">
                    Illustrative industry case study based on representative UAE/GCC
                    business scenarios and modeled performance outcomes.
                  </p>
                </article>
              </Reveal>

              <Reveal delay={0.08}>
                <aside className="lg:sticky lg:top-24">
                  <div className="rounded-[18px] border border-line-strong bg-card p-6 shadow-card">
                    <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
                      DA One
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-ink">
                      One configured solution for Data, Analytics and Reporting.
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-muted">
                      From question to insight to action.
                    </p>
                    <Button
                      className="mt-5 w-full"
                      onClick={() => {
                        track("hero_cta_click", { source: `case_study_sidebar_${study.slug}` });
                        openBookingOrLead("demo");
                      }}
                    >
                      Book a 20-minute Demo
                    </Button>
                  </div>
                </aside>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}

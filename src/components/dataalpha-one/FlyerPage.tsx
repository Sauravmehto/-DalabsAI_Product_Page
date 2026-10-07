import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { flyers } from "@/data/flyers";

export function FlyerPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="px-4 sm:px-8 lg:px-16">
        {/* Hero */}
        <section className="bg-canvas pb-14 pt-28 sm:pb-16 sm:pt-32">
          <Container>
            <Reveal className="max-w-3xl">
              <p className="text-[12px] font-semibold tracking-[0.16em] text-accent uppercase">
                Flyers &amp; resources
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
                DA One flyers, ready to share.
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] leading-7 text-muted sm:text-[17px] sm:leading-8">
                A one-page overview of the platform, plus an industry-specific
                flyer for each sector DA One serves. View any flyer or download
                it to share with your team.
              </p>
            </Reveal>
          </Container>
        </section>

        {/* Flyer grid */}
        <section className="bg-canvas py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Resource library"
                title="Choose a flyer."
                copy="Each flyer is a downloadable PDF you can open, save and share."
              />
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {flyers.map((flyer, index) => (
                <Reveal key={flyer.slug} delay={index * 0.05} className="h-full">
                  <a
                    href={flyer.file}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${flyer.label} flyer PDF`}
                    className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line-strong bg-card shadow-card transition-shadow hover:shadow-frame"
                  >
                    <div className="flex aspect-video items-center justify-center bg-accent-soft">
                      {/* <div className="flex aspect-video items-center justify-center overflow-hidden bg-accent-soft"></div> */}
                      <img
                        src={flyer.thumbnail}
                        alt={`${flyer.label} flyer preview`}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold leading-snug text-ink">
                        {flyer.label}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-6 text-muted">
                        {flyer.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent-2">
                        View flyer
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
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
                    Prefer a live walkthrough?
                  </h2>
                  <p className="mt-3 max-w-xl text-[14px] leading-6 text-muted">
                    Book a 20-minute demo and we'll show how DA One applies to
                    your own data.
                  </p>
                </div>
                <Button
                  className="shrink-0"
                  onClick={() => {
                    track("hero_cta_click", { source: "flyer_cta" });
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

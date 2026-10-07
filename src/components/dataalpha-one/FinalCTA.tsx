import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";

export function FinalCTA() {
  return (
    <section className="bg-navy py-16 text-white sm:py-20">
      <Container>
        <Reveal>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-teal-300/80 uppercase">
            Next step
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Ready to explore your data differently?
          </h2>
          <p className="mt-4 max-w-xl text-white/65">
            See what DA One can do with your data.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[12px] font-semibold tracking-[0.14em] text-teal-300 uppercase">
                Try it yourself
              </p>
              <h3 className="mt-3 text-2xl font-semibold">Start a free trial, no credit card required.</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Create an account and start asking questions of your data in minutes.
              </p>
              <Button
                className="mt-6"
                variant="dark"
                href="/free-trial"
                onClick={() => {
                  track("free_trial_click", { source: "final_cta" });
                }}
              >
                Start Free Trial
                <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
              <p className="text-[12px] font-semibold tracking-[0.14em] text-teal-300 uppercase">
                Prefer a walkthrough?
              </p>
              <h3 className="mt-3 text-2xl font-semibold">Schedule a product demo or meeting.</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Choose a time that works for your team.
              </p>
              <Button
                className="mt-6"
                variant="dark"
                onClick={() => {
                  track("post_event_demo_click", { source: "final_cta" });
                  openBookingOrLead("demo");
                }}
              >
                Book a 20-minute Demo
                <ArrowRight size={16} />
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

import {
  BadgeDollarSign,
  CalendarCheck2,
  ContactRound,
  Database,
  // FileDown, // unused while Flyer/Brochure links are commented out below
  Globe,
  Linkedin,
  Mail,
  Sparkles,
  Zap,
  // Workflow, // unused after the "How it works" footer link was removed
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Reveal";
import { openBookingOrLead } from "@/lib/booking";
import { scrollToId } from "@/lib/scroll";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

const groups = [
  {
    title: "Product",
    links: [
      { label: "Product", id: "ask", href: "/product", icon: Database },
      { label: "Use Cases", id: "use-cases", href: "/use-cases", icon: Sparkles },
      { label: "Pricing", id: "pricing", href: "/pricing", icon: BadgeDollarSign },
    ],
  },
  {
    title: "Get Started",
    links: [
      { label: "Start Free Trial", id: "free-trial", href: "/free-trial", icon: Zap },
      { label: "Book a meeting", id: "lead", href: "https://cal.com/meetdaone/20min", icon: CalendarCheck2 },
      { label: "Contact Us", id: "contact", href: "/contact", icon: ContactRound },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-2/50 px-6 pb-24 pt-16 sm:px-8 md:pb-10 lg:px-16">
      <Container>
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-6 text-ink-2">
              Ask your data. Get the report.
            </p>
            <p className="mt-4 text-sm">
              <a
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
                href={`mailto:${site.email}`}
              >
                <Mail size={14} />
                {site.email}
              </a>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                size="sm"
                href="/free-trial"
                onClick={() => {
                  track("free_trial_click", { source: "footer" });
                }}
              >
                Start Free Trial
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  track("post_event_demo_click", { source: "footer" });
                  openBookingOrLead("demo");
                }}
              >
                Book a 20-minute Demo
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.label}>
                        {link.href ? (
                          <a
                            href={link.href}
                            className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink"
                            {...(link.href.startsWith("http")
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                          >
                            <Icon size={14} />
                            <span>{link.label}</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            className="inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink"
                            onClick={() => scrollToId(link.id)}
                          >
                            <Icon size={14} />
                            <span>{link.label}</span>
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-accent uppercase">
                Connect
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink" href={site.url}>
                    <Globe size={14} /> dataalpha.ai
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
                    href={site.linkedin.company}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={14} /> Company
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
                    href={site.linkedin.ceo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={14} className="text-amber-500" aria-hidden="true" /> CEO
                  </a>
                </li>
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
                    href={site.linkedin.bd}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Linkedin size={14} className="text-muted" aria-hidden="true" /> BD
                  </a>
                </li>
                {/* <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
                    href="/flyer"
                  >
                    <FileDown size={14} /> Flyer
                  </a>
                </li> */}
                {/* <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
                    href={site.pdf.brochure}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileDown size={14} /> Brochure
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>© 2026 DataAlpha</p>
          <div className="flex gap-4">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

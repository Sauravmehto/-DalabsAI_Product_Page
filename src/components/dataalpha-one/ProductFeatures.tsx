import {
  Database,
  FileDown,
  LayoutDashboard,
  LayoutGrid,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Database,
    title: "Any Data Source",
    description: "Upload files or connect to databases, cloud apps and more.",
  },
  {
    icon: MessageSquare,
    title: "Natural-Language Q&A",
    description:
      "Ask questions in plain English and get instant, accurate answers from your data.",
  },
  {
    icon: LayoutDashboard,
    title: "Prompt-Built Dashboards",
    description:
      "Create interactive dashboards from a simple prompt — no coding required.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Accuracy",
    description:
      "Built on trusted data handling and intelligent validation for reliable, enterprise-grade insights.",
  },
  {
    icon: LayoutGrid,
    title: "Arrange Your View",
    description:
      "Move, resize and reorganize dashboard tiles to fit your needs.",
  },
  {
    icon: FileDown,
    title: "Excel & PDF Export",
    description:
      "Download your dashboards in Excel or PDF and share them with your team or stakeholders.",
  },
];

export function ProductFeatures() {
  return (
    <section id="features" className="bg-canvas py-4 sm:py-6">
      <Container>
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Product features"
            title="Your Data. Your Questions. Trusted Answers."
            copy={"Connect any data source, ask questions in plain English, create dashboards with a simple prompt, and export presentation-ready insights independently."}
          />
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-[18px] border border-line-strong bg-card p-6 shadow-card">
                <div className="flex size-10 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                  <Icon size={18} aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[17px] font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-muted">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

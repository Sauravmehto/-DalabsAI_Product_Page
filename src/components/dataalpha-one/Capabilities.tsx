import {
  BarChart3,
  Layers,
  LayoutDashboard,
  LineChart,
  MessageSquare,
  Repeat,
  Search,
  Sparkles,
  FileText,
} from "lucide-react";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const items = [
  {
    title: "AI data agent",
    copy: "A conversational interface to your information.",
    icon: Sparkles,
    ui: "Ask anything about your data…",
  },
  {
    title: "Natural language",
    copy: "Start with the question you actually want answered.",
    icon: MessageSquare,
    ui: "Compare UAE and Saudi Arabia.",
  },
  {
    title: "Data exploration",
    copy: "Follow the answer. Drill down. Ask the next question.",
    icon: Search,
    ui: "Filter · Region · Last 6 months",
  },
  {
    title: "Semantic layer",
    copy: "Context and business meaning, not just columns.",
    icon: Layers,
    ui: "Revenue → Region / Product / Time",
  },
  {
    title: "Analysis",
    copy: "Turn a question into a structured reading of the numbers.",
    icon: LineChart,
    ui: "Growth +18.4% · Mix 69.9% UAE+KSA",
  },
  {
    title: "Visualizations",
    copy: "Charts generated from the same conversation.",
    icon: BarChart3,
    ui: "████████ UAE   ██████ KSA",
  },
  {
    title: "Dashboards",
    copy: "Reusable views of the metrics that matter.",
    icon: LayoutDashboard,
    ui: "KPI · Trend · Mix",
  },
  {
    title: "Reports",
    copy: "Structured outputs your team can share.",
    icon: FileText,
    ui: "Executive sales report · Draft",
  },
  {
    title: "Reusable workflows",
    copy: "Repeat reporting paths where the product supports them.",
    icon: Repeat,
    ui: "Save this analysis as a template",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="bg-canvas-2/40 py-24 sm:py-28" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="More than a conversation."
            copy="Each capability is a working surface in the product — shown here as a fragment of the interface, not an icon wall."
          />
        </Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.03}>
                <article
                  className={cn(
                    "group h-full rounded-[18px] border border-line bg-card p-5 transition-transform hover:-translate-y-0.5",
                    i === 0 && "sm:col-span-2 lg:col-span-1",
                  )}
                >
                  <Icon size={18} className="text-accent" />
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{item.copy}</p>
                  <div className="mt-4 rounded-[12px] border border-line bg-canvas px-3 py-2 font-mono text-[11px] text-muted">
                    {item.ui}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

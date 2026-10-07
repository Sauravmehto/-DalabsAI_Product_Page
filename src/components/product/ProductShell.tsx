import type { ReactNode } from "react";
import {
  BarChart3,
  Database,
  FileText,
  Layers,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { DemoBadge } from "@/components/ui/Reveal";

const nav = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "dashboards", label: "Dashboards", icon: BarChart3 },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "data", label: "Data", icon: Database },
  { id: "semantic", label: "Semantic Layer", icon: Layers },
] as const;

export type ProductNav = (typeof nav)[number]["id"];

export function ProductShell({
  children,
  active = "chat",
  status = "Ready",
  title = <>DA <em>One</em></>,

  compact = false,
  compactNav = false,
  hideSidebar = false,
  className,
}: {
  children: ReactNode;
  active?: ProductNav;
  status?: string;
  title?: ReactNode;
  compact?: boolean;
  compactNav?: boolean;
  hideSidebar?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden border border-line-strong bg-card shadow-[0_24px_60px_rgb(12_18_32/0.12)]",
        compact ? "rounded-[20px]" : "rounded-[28px]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#E8B4B4]" />
            <span className="size-2 rounded-full bg-[#E2D09A]" />
            <span className="size-2 rounded-full bg-[#B7D4C2]" />
          </span>
          <p className="text-[11px] font-semibold tracking-[0.12em] text-ink">{title}</p>
        </div>
        <div className="flex items-center gap-2">
          <DemoBadge />
          <span className="hidden items-center gap-1.5 text-[11px] text-success sm:inline-flex">
            <span className="size-1.5 rounded-full bg-success" />
            {status}
          </span>
        </div>
      </div>
      <div className="flex min-h-0 flex-col md:flex-row">
        {(compactNav || !hideSidebar) && (
          <div className="flex gap-1 overflow-x-auto border-b border-line px-2 py-2 md:hidden">
            {nav.map((item) => {
              const Icon = item.icon;
              const on = item.id === active;
              return (
                <span
                  key={item.id}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
                    on ? "bg-accent-soft font-medium text-accent" : "text-muted",
                  )}
                >
                  <Icon size={12} />
                  {item.label}
                </span>
              );
            })}
          </div>
        )}
        {!hideSidebar && (
          <aside className="hidden w-[168px] shrink-0 border-r border-line bg-canvas/70 p-2.5 md:block">
            <p className="mb-2 px-2 text-[10px] font-semibold tracking-[0.14em] text-accent uppercase">
              Workspace
            </p>
            {nav.map((item) => {
              const Icon = item.icon;
              const on = item.id === active;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "mb-0.5 flex items-center gap-2 rounded-[10px] px-2.5 py-2 text-[12px]",
                    on ? "bg-accent-soft font-medium text-accent" : "text-muted",
                  )}
                >
                  <Icon size={14} />
                  {item.label}
                </div>
              );
            })}
          </aside>
        )}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

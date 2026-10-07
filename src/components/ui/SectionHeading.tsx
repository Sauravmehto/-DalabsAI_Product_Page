import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-2xl text-center")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[12px] font-semibold tracking-[0.16em] uppercase",
            invert ? "text-teal-300/80" : "text-accent",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
          invert ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={cn(
            "mt-4 max-w-2xl text-[15px] leading-7",
            invert ? "text-white/70" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

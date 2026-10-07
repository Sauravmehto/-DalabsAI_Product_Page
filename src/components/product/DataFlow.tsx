import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export function DataFlow({
  labels,
  invert = false,
}: {
  labels: string[];
  invert?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("flex flex-col items-center", invert && "text-white")}>
      {labels.map((label, i) => (
        <div key={label} className="flex w-full max-w-xs flex-col items-center">
          <div
            className={cn(
              "w-full rounded-[14px] border px-4 py-3 text-center text-sm font-medium",
              invert ? "border-white/10 bg-white/[0.04]" : "border-line bg-canvas",
            )}
          >
            {label}
          </div>
          {i < labels.length - 1 && (
            <div className="relative h-8 w-px overflow-hidden bg-accent/25">
              {!reduce && (
                <span className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent particle" />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

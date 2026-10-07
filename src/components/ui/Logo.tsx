import { useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Logo({
  invert = false,
  compact = false,
}: {
  invert?: boolean;
  compact?: boolean;
}) {
  const [broken, setBroken] = useState(false);

  return (
    <a href="/" className="flex items-center gap-2.5" aria-label="DA One home">
      {broken ? (
        <span
          className={cn(
            "font-semibold tracking-tight",
            compact ? "text-sm" : "text-base sm:text-lg",
            invert ? "text-white" : "text-ink",
          )}
        >
          {site.name}
        </span>
      ) : (
        <img
          src={site.logo}
          alt={site.name}
          className={cn(
            "max-w-[220px] sm:max-w-[260px] md:max-w-[300px]",
            compact ? "h-8 w-auto" : "h-12 w-auto sm:h-14 md:h-16",
            invert ? "brightness-0 invert" : "dark:brightness-0 dark:invert",
          )}
          onError={() => setBroken(true)}
        />
      )}
    </a>
  );
}

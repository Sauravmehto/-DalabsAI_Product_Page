import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";

export function MobileCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const lead = document.getElementById("lead");
    if (!lead) return;
    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(lead);
    return () => io.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <Button
        className="w-full"
        onClick={() => {
          track("hero_cta_click", { source: "mobile_sticky" });
          openBookingOrLead("demo");
        }}
      >
        Book a 20-minute Demo
      </Button>
    </div>
  );
}

import { Play } from "lucide-react";
// import { FileDown } from "lucide-react"; // unused while Flyer/Brochure buttons are commented out below
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";
// import { site } from "@/lib/site"; // unused while Flyer/Brochure buttons are commented out below

function VideoSlot({
  url,
  gifUrl,
  title,
  note,
}: {
  url?: string;
  gifUrl?: string;
  title: string;
  note: string;
}) {
  if (gifUrl) {
    return (
      <img
        src={gifUrl}
        alt={title}
        className="aspect-video w-full object-cover"
      />
    );
  }
  if (url) {
    return (
      <video className="aspect-video w-full" controls preload="none" onPlay={() => track("demo_play")}>
        <source src={url} />
      </video>
    );
  }
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/5 to-transparent p-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full border border-white/20">
        <Play size={18} />
      </div>
      <p className="font-medium">{title}</p>
      <p className="max-w-sm text-sm text-white/55">{note}</p>
    </div>
  );
}

export function DemoSection() {
  const videoUrl = import.meta.env.VITE_DEMO_VIDEO_URL;
  const teaserUrl = import.meta.env.VITE_TEASER_VIDEO_URL;

  return (
    <section id="demo" className="bg-navy py-16 text-white sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            invert
            title="See DA One in action."
            copy="A 30-second teaser for the booth, and a 3-minute walkthrough for a proper look."
          />
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
            <VideoSlot
              url={teaserUrl}
              gifUrl="/gif/DAOne_Gif.gif"
              title="30-second teaser"
              note="Add VITE_TEASER_VIDEO_URL when the file is ready."
            />
          </div>
          <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.04]">
            <VideoSlot
              url={videoUrl}
              gifUrl="/gif/DAOne_Gif1.gif"
              title="3-minute demo"
              note="Add VITE_DEMO_VIDEO_URL when the recording is ready."
            />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            variant="dark"
            onClick={() => {
              track("post_event_demo_click", { source: "demo_section" });
              openBookingOrLead("demo");
            }}
          >
            Book a 20-minute Demo
          </Button>
          {/* <Button
            variant="secondary"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
            href="/flyer"
          >
            <FileDown size={16} />
            Flyer
          </Button> */}
          {/* <Button
            variant="secondary"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
            href={site.pdf.brochure}
            target="_blank"
            rel="noreferrer"
          >
            <FileDown size={16} />
            Brochure
          </Button> */}
        </div>
      </Container>
    </section>
  );
}

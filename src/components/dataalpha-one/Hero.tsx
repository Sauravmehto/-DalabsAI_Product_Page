import { Container } from "@/components/ui/Reveal";
import { DataFlowBackground } from "@/components/ui/DataFlowBackground";
import { HeroProductDemo } from "./HeroProductDemo";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-canvas pb-12 pt-20 sm:pb-16 sm:pt-24">
      <DataFlowBackground />
      <Container className="relative max-w-[1200px] px-4 xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch md:gap-10">
          <HeroProductDemo />
          <div
            id="root"
            className="flex w-full items-center justify-center overflow-visible rounded-[20px] bg-transparent opacity-95 md:self-center"
            style={{ boxShadow: "0 0 70px 18px color-mix(in srgb, var(--color-accent) 22%, transparent)" }}
          >
            <img
              src="/gif/DAOne_Gif.gif"
              alt="DA One live product preview"
              className="w-full rounded-[20px] object-contain md:h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

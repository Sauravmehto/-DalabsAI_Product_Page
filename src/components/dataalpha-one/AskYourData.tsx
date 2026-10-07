import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductShell } from "@/components/product/ProductShell";
import { DataTable } from "@/components/product/DataTable";
import { ProductEmpty, ProductError, ProductProcessing } from "@/components/product/ProductStates";
import { BarChart } from "@/components/charts/Charts";
import { processingSteps, products, prompts, regions, type DemoPrompt } from "@/data/demoData";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { AuthModal } from "@/components/ui/AuthModal";

type Phase = "empty" | "process" | "done" | "error";

export function AskYourData() {
  const [active, setActive] = useState<DemoPrompt | null>(null);
  const [phase, setPhase] = useState<Phase>("empty");
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const run = (prompt: DemoPrompt) => {
    track("product_demo_interaction", { prompt: prompt.id });
    setActive(prompt);
    setPhase("process");
    setStep(0);
    if (timer.current) window.clearInterval(timer.current);
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setStep(i);
      if (i >= processingSteps.length) {
        if (timer.current) window.clearInterval(timer.current);
        setPhase("done");
      }
    }, 380);
  };

  const reset = () => {
    if (timer.current) window.clearInterval(timer.current);
    setActive(null);
    setDraft("");
    setPhase("empty");
    setStep(0);
  };

  const submitDraft = () => {
    const q = draft.trim().toLowerCase();
    if (!q) return;
    setShowModal(true);
    track("ask_demo_submit", { draft: q });
    return;
    // eslint-disable-next-line no-unreachable
    if (!q) {
      setPhase("error");
      return;
    }
    const match = prompts.find(
      (p) => p.label.toLowerCase().includes(q) || p.question.toLowerCase().includes(q) || q.includes(p.id),
    );
    if (match) {
      run(match!);
      return;
    }
    setActive({
      ...prompts[0],
      question: draft.trim(),
    });
    setPhase("error");
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <AuthModal
            prompt={draft}
            onClose={() => { setShowModal(false); inputRef.current?.focus(); }}
          />
        )}
      </AnimatePresence>
    <section id="ask" className="bg-canvas-2/60 py-16 sm:py-20" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Ask"
            title="Ask your data anything."
            copy={<>Start with a question. DA <em>One</em> turns it into an analysis.</>}
          />
        </Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <Reveal>
            <div>
              <p className="mb-3 text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">
                Try a question
              </p>
              <div className="space-y-2" role="list">
                {prompts.map((prompt) => (
                  <button
                    key={prompt.id}
                    type="button"
                    onClick={() => run(prompt)}
                    className={cn(
                      "w-full rounded-[14px] border px-4 py-3 text-left text-sm leading-6 transition-colors",
                      active?.id === prompt.id
                        ? "border-accent bg-accent-soft text-ink"
                        : "border-line bg-card text-muted hover:text-ink",
                    )}
                  >
                    “{prompt.label}”
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <ProductShell compact compactNav>
              <div className="p-5">
                <form
                  className="mb-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitDraft();
                  }}
                >
                  <label className="sr-only" htmlFor="ask-input">
                    Ask anything about your data
                  </label>
                  <input
                    ref={inputRef}
                    id="ask-input"
                    className="h-11 min-w-0 flex-1 rounded-[10px] border border-line bg-canvas px-3 text-sm outline-none focus:border-accent"
                    placeholder="Ask anything about your data..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="h-11 shrink-0 rounded-[10px] bg-accent px-4 text-sm font-medium text-white"
                  >
                    Ask
                  </button>
                </form>
                {phase === "empty" && <ProductEmpty />}
                {phase !== "empty" && active && (
                  <div className="mb-4 rounded-[14px] border border-line bg-canvas px-3.5 py-3 text-sm">
                    <div className="flex gap-2">
                      <Sparkles size={14} className="mt-1 text-accent" />
                      {active.question}
                    </div>
                  </div>
                )}
                {phase === "process" && <ProductProcessing step={step} />}
                {phase === "error" && (
                  <ProductError
                    onRetry={() => active && run(active)}
                    onAskAnother={reset}
                  />
                )}
                {phase === "done" && active && (
                  <div className="space-y-4">
                    <p className="text-sm leading-6 text-ink-2">{active.answer}</p>
                    {(active.id === "products" || active.id === "region" || active.id === "compare") && (
                      <BarChart
                        items={
                          active.id === "products"
                            ? products.slice(0, 4).map((p) => ({ name: p.name, value: p.share }))
                            : regions.slice(0, 4).map((r) => ({ name: r.name, value: r.share }))
                        }
                      />
                    )}
                    {(active.id === "region" || active.id === "compare" || active.id === "report") && (
                      <DataTable rows={active.id === "compare" ? regions.slice(0, 2) : regions} />
                    )}
                    <p className="rounded-[12px] bg-accent-soft px-3 py-2 text-[13px] text-accent">
                      {active.insight}
                    </p>
                  </div>
                )}
              </div>
            </ProductShell>
          </Reveal>
        </div>
      </Container>
    </section>
    </>  
  );
}

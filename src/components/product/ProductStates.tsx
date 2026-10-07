import { Check, MessageSquareWarning, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { processingSteps } from "@/data/demoData";
import { cn } from "@/lib/cn";

export function ProductEmpty() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <Sparkles className="text-accent" size={22} />
      <p className="mt-3 text-base font-medium">Ask a question to explore your data.</p>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Start with a question about your connected data.
      </p>
    </div>
  );
}

export function ProductProcessing({ step }: { step: number }) {
  return (
    <div className="space-y-3" role="status" aria-live="polite">
      {processingSteps.map((label, i) => (
        <div key={label} className="flex items-center gap-2 text-[13px]">
          <span
            className={cn(
              "flex size-4 items-center justify-center rounded-full",
              i < step ? "bg-accent" : "border border-line",
            )}
          >
            {i < step ? <Check size={10} className="text-white" /> : null}
          </span>
          <span className={i < step ? "text-ink" : "text-muted"}>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function ProductError({
  onRetry,
  onAskAnother,
}: {
  onRetry: () => void;
  onAskAnother: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <MessageSquareWarning className="text-ink-2" size={22} />
      <p className="mt-3 text-base font-medium">We couldn't complete that analysis.</p>
      <p className="mt-1 max-w-sm text-sm text-muted">
        Try rephrasing your question or explore another data point.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Button size="sm" onClick={onRetry}>
          <RotateCcw size={14} />
          Try Again
        </Button>
        <Button size="sm" variant="secondary" onClick={onAskAnother}>
          Ask Another Question
        </Button>
      </div>
    </div>
  );
}

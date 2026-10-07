import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

export function AuthModal({ prompt, onClose }: { prompt?: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md rounded-[20px] border border-line-strong bg-card p-7 shadow-[0_32px_80px_rgb(12_18_32/0.18)]"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
          >
            <X size={16} />
          </button>
          <div className="flex size-10 items-center justify-center rounded-[12px] bg-accent-soft">
            <Sparkles size={18} className="text-accent" />
          </div>
          <h2 className="mt-4 text-lg font-semibold tracking-tight text-ink">Start your free trial to continue</h2>
          <p className="mt-1.5 text-sm text-muted">Create a free account or log in to run your analysis.</p>
          {prompt && (
            <div className="mt-4 rounded-[12px] border border-line bg-canvas px-3.5 py-2.5 text-[13px] text-ink-2">
              <span className="mr-1.5 text-muted">Your question:</span>
              <span className="italic">"{prompt}"</span>
            </div>
          )}
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href="/free-trial"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-2"
            >
              Start free trial <ArrowRight size={15} />
            </a>
          </div>
          <p className="mt-5 text-center text-[12px] text-muted">No credit card required · Free to get started</p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

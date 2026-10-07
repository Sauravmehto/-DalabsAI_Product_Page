import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { isWorkEmail } from "@/lib/emailValidation";

export type PlanName = "Monthly" | "Annual";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
};

const empty: FormState = { fullName: "", email: "", phone: "" };

function Field({
  label,
  required,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-ink">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[12px] text-red-700">{error}</span>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-[10px] border border-line bg-card px-3 text-sm text-ink outline-none focus:border-accent";

export function PlanRequestModal({
  plan,
  onClose,
}: {
  plan: PlanName;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  // Success state is intentionally persistent — it stays up until the user
  // closes it themselves. No auto-dismiss timer.

  const set = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required";
    if (!isWorkEmail(values.email.trim())) {
      next.email = "Please enter your work email address.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = () => {
    if (status === "submitting") return; // guard against duplicate submits
    if (!validate()) return;

    setStatus("submitting");
    try {
      const fullName = values.fullName.trim();
      const email = values.email.trim();
      const phone = values.phone.trim() || "N/A";

      const subject = `DA One Plan Purchase Request - ${plan}`;
      const body = [
        "DA One Purchase Request",
        "",
        `Plan: ${plan}`,
        "",
        `Full Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        "",
        "Message:",
        `The user is interested in purchasing the DA One ${plan} plan.`,
      ].join("\n");

      const mailtoUrl =
        `mailto:sales@dataalpha.ai` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-modal-title"
      >
        <div
          className="absolute inset-0 bg-navy/50 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md overflow-hidden rounded-[20px] border border-line-strong bg-card shadow-[0_32px_80px_rgb(12_18_32/0.18)]"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
          >
            <X size={16} />
          </button>

          <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-8">
            {status === "success" ? (
              <div
                className="py-4 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-success/10">
                  <CheckCircle2 size={26} className="text-success" />
                </div>
                <h2 id="plan-modal-title" className="mt-5 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  Request Submitted Successfully
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-muted">
                  Thank you for your interest in the DA One <strong className="font-semibold text-ink">{plan}</strong> plan.
                  Your email app has opened with a pre-filled request to our
                  sales team — please review and send it to complete your
                  request. Our team will reach out to you shortly.
                </p>

                <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-2"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-[10px] border border-line-strong bg-card text-sm font-medium text-ink transition-colors hover:bg-canvas-2"
                  >
                    Back to Pricing
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-semibold tracking-[0.16em] text-accent uppercase">
                  DA ONE
                </p>
                <h2
                  id="plan-modal-title"
                  className="mt-2.5 text-xl font-semibold tracking-tight text-ink sm:text-2xl"
                >
                  Start Your DA One Plan
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-muted">
                  Enter your details and our team will get in touch with you
                  to complete your DA One subscription.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-[10px] border border-line-strong bg-canvas-2 px-3 py-2">
                  <span className="text-[13px] font-medium text-ink">
                    Selected Plan: {plan}
                  </span>
                  {plan === "Annual" && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                      Save 16%
                    </span>
                  )}
                </div>

                <div className="mt-6 grid gap-4">
                  <Field label="Full Name" required error={errors.fullName}>
                    <input
                      className={inputClass}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      value={values.fullName}
                      onChange={(e) => set("fullName", e.target.value)}
                    />
                  </Field>
                  <Field label="Email ID" required error={errors.email}>
                    <input
                      className={inputClass}
                      type="email"
                      placeholder="Enter your work email"
                      autoComplete="email"
                      inputMode="email"
                      value={values.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      className={inputClass}
                      type="tel"
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => set("phone", e.target.value)}
                    />
                  </Field>
                </div>

                {status === "error" && (
                  <p className="mt-4 text-sm text-red-700">
                    Something went wrong. Please try again or contact our sales team.
                  </p>
                )}

                <button
                  type="button"
                  onClick={onSubmit}
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-2 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {status === "submitting" ? "Submitting request..." : "Continue to Purchase"}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

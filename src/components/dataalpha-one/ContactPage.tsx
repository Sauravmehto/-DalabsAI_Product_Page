import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Linkedin, Mail, User, X } from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";
import { Container, Reveal } from "@/components/ui/Reveal";
import { submitContact } from "@/lib/contact";
import { isWorkEmail } from "@/lib/emailValidation";
import { site } from "@/lib/site";

type FormState = {
  fullName: string;
  email: string;
  company: string;
};

const empty: FormState = { fullName: "", email: "", company: "" };

function Field({
  label,
  icon: Icon,
  required,
  children,
  error,
}: {
  label: string;
  icon: typeof User;
  required?: boolean;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium text-ink">
        <Icon size={14} className="text-muted" aria-hidden="true" />
        {label}
        {required && <span className="text-accent">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block text-[12px] text-red-700">{error}</span>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-[10px] border border-line bg-card px-3 text-sm text-ink outline-none focus:border-accent";

function SuccessModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

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

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-success-title"
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
          className="relative w-full max-w-sm overflow-hidden rounded-[20px] border border-line-strong bg-card p-7 text-center shadow-[0_32px_80px_rgb(12_18_32/0.18)] sm:p-8"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-canvas-2 hover:text-ink"
          >
            <X size={16} />
          </button>

          <h2 id="contact-success-title" className="text-xl font-semibold tracking-tight text-ink">
            Thank You!
          </h2>
          <p className="mt-3 text-[14px] leading-6 text-muted">
            We have received your details. We will get back to you soon.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-2"
          >
            Close
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function ContactPage() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<FormState> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required";
    if (!isWorkEmail(values.email.trim())) {
      next.email =
        "Please enter your work email address. Personal email addresses such as Gmail, Yahoo, or Hotmail are not accepted.";
    }
    if (!values.company.trim()) next.company = "Company is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const result = await submitContact({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        company: values.company.trim(),
      });
      if (!result.ok) throw new Error("submit failed");
      setValues(empty);
      setStatus("idle");
      setShowSuccess(true);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="pb-20 pt-28 sm:pt-36">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent">
              Contact Us
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Let&apos;s talk about your data.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-muted">
              Tell us a little about your team and we&apos;ll get back to you
              to discuss how DA One can fit your enterprise reporting needs.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                <Mail size={14} aria-hidden="true" />
                {site.email}
              </a>
              <a
                href={site.linkedin.company}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-ink-2 hover:text-ink"
              >
                <Linkedin size={14} aria-hidden="true" />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="mx-auto mt-12 max-w-lg">
            <div className="rounded-[28px] border border-line bg-card p-6 shadow-[0_16px_40px_rgb(12_18_32/0.06)] sm:p-8">
              <div className="grid gap-4">
                <Field label="Full Name" icon={User} required error={errors.fullName}>
                  <input
                    className={inputClass}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    value={values.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                </Field>
                <Field label="Work Email" icon={Mail} required error={errors.email}>
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
                <Field label="Company" icon={Building2} required error={errors.company}>
                  <input
                    className={inputClass}
                    placeholder="Enter your company name"
                    autoComplete="organization"
                    value={values.company}
                    onChange={(e) => set("company", e.target.value)}
                  />
                </Field>
              </div>

              {status === "error" && (
                <p className="mt-4 text-sm text-red-700">
                  Something went wrong. Please try again in a moment.
                </p>
              )}

              <button
                type="button"
                disabled={status === "loading"}
                onClick={() => void onSubmit()}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
            </div>
          </Reveal>
        </Container>
      </main>
      <Footer />
      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}
    </div>
  );
}

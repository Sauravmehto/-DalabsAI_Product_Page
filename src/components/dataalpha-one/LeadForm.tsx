import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { countries, nextStepOptions, reportingChallenges } from "@/data/demoData";
import { submitLead } from "@/lib/leads";
import { readLeadIntent } from "@/lib/scroll";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  country: string;
  reportingChallenge: string;
  nextStep: string;
};

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  jobTitle: "",
  country: "",
  reportingChallenge: "",
  nextStep: "",
};

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[12px] text-red-700">{error}</span>}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-[10px] border border-line bg-card px-3 text-sm outline-none focus:border-accent";

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const intent = readLeadIntent();
    if (intent) setValues((v) => ({ ...v, nextStep: intent }));
  }, []);

  const set = (key: keyof FormState, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep1 = () => {
    const next: Partial<FormState> = {};
    if (!values.firstName.trim()) next.firstName = "Required";
    if (!values.lastName.trim()) next.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a business email";
    if (!values.company.trim()) next.company = "Required";
    if (!values.jobTitle.trim()) next.jobTitle = "Required";
    if (!values.country) next.country = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async () => {
    if (!values.reportingChallenge) {
      setErrors({ reportingChallenge: "Select one" });
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (!values.nextStep) {
      setErrors({ nextStep: "Select one" });
      return;
    }
    setStatus("loading");
    try {
      const result = await submitLead(values);
      if (!result.ok) throw new Error("submit failed");
      track("lead_form_submit", {
        nextStep: values.nextStep,
        reportingChallenge: values.reportingChallenge,
        source: "DA One Website",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="lead" className="py-16 sm:py-20" style={{ backgroundColor: "#feffff" }}>
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <Reveal>
            <SectionHeading
              title="Book a 20-minute conversation."
              copy="Schedule a demo or request a follow-up meeting. We’ll follow up from sales@dataalpha.ai."
            />
            <p className="mt-6 text-sm text-muted">We’ll follow up. This is a request, not a confirmed booking.</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="rounded-[28px] border border-line bg-card p-6 shadow-[0_16px_40px_rgb(12_18_32/0.06)]">
              {status === "success" ? (
                <div className="py-8 text-center">
                  <p className="text-2xl font-semibold">Thanks. Your request has been received.</p>
                  <p className="mt-3 text-sm text-muted">
                    A member of the team will follow up on the demo or meeting you requested.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex gap-2" aria-label="Form progress">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={cn(
                          "h-1 flex-1 rounded-full",
                          n <= step ? "bg-accent" : "bg-canvas-2",
                        )}
                      />
                    ))}
                  </div>
                  {step === 1 && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="First name" error={errors.firstName}>
                        <input
                          className={inputClass}
                          autoComplete="given-name"
                          value={values.firstName}
                          onChange={(e) => set("firstName", e.target.value)}
                        />
                      </Field>
                      <Field label="Last name" error={errors.lastName}>
                        <input
                          className={inputClass}
                          autoComplete="family-name"
                          value={values.lastName}
                          onChange={(e) => set("lastName", e.target.value)}
                        />
                      </Field>
                      <Field label="Business email" error={errors.email}>
                        <input
                          className={inputClass}
                          type="email"
                          autoComplete="email"
                          inputMode="email"
                          value={values.email}
                          onFocus={() => track("lead_form_start")}
                          onChange={(e) => set("email", e.target.value)}
                        />
                      </Field>
                      <Field label="Company" error={errors.company}>
                        <input
                          className={inputClass}
                          autoComplete="organization"
                          value={values.company}
                          onChange={(e) => set("company", e.target.value)}
                        />
                      </Field>
                      <Field label="Job title" error={errors.jobTitle}>
                        <input
                          className={inputClass}
                          autoComplete="organization-title"
                          value={values.jobTitle}
                          onChange={(e) => set("jobTitle", e.target.value)}
                        />
                      </Field>
                      <Field label="Country" error={errors.country}>
                        <select
                          className={inputClass}
                          value={values.country}
                          onChange={(e) => set("country", e.target.value)}
                        >
                          <option value="">Select</option>
                          {countries.map((c) => (
                            <option key={c}>{c}</option>
                          ))}
                        </select>
                      </Field>
                    </div>
                  )}
                  {step === 2 && (
                    <fieldset>
                      <legend className="mb-4 text-sm font-medium">What reporting challenge should we discuss?</legend>
                      <div className="grid gap-2">
                        {reportingChallenges.map((opt) => (
                          <label
                            key={opt}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-[12px] border px-4 py-3 text-sm",
                              values.reportingChallenge === opt ? "border-accent bg-accent-soft" : "border-line",
                            )}
                          >
                            <input
                              type="radio"
                              name="reportingChallenge"
                              className="accent-[#0B6E6A]"
                              checked={values.reportingChallenge === opt}
                              onChange={() => set("reportingChallenge", opt)}
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                      {errors.reportingChallenge && (
                        <p className="mt-2 text-[12px] text-red-700">{errors.reportingChallenge}</p>
                      )}
                    </fieldset>
                  )}
                  {step === 3 && (
                    <fieldset>
                      <legend className="mb-4 text-sm font-medium">Choose your next step</legend>
                      <div className="grid gap-2">
                        {nextStepOptions.map((opt) => (
                          <label
                            key={opt.id}
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-[12px] border px-4 py-3 text-sm",
                              values.nextStep === opt.id ? "border-accent bg-accent-soft" : "border-line",
                            )}
                          >
                            <input
                              type="radio"
                              name="nextStep"
                              className="accent-[#0B6E6A]"
                              checked={values.nextStep === opt.id}
                              onChange={() => set("nextStep", opt.id)}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                      {errors.nextStep && <p className="mt-2 text-[12px] text-red-700">{errors.nextStep}</p>}
                    </fieldset>
                  )}
                  {status === "error" && (
                    <p className="mt-4 text-sm text-red-700">
                      We couldn't complete that request. Try again.
                    </p>
                  )}
                  <div className="mt-6 flex gap-3">
                    {step > 1 && (
                      <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
                        Back
                      </Button>
                    )}
                    {step === 1 ? (
                      <Button
                        onClick={() => {
                          if (validateStep1()) setStep(2);
                        }}
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button disabled={status === "loading"} onClick={() => void onSubmit()}>
                        {status === "loading" ? "Sending…" : step === 2 ? "Continue" : "Submit"}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

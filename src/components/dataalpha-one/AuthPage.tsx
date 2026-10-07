import { useEffect, useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";
import { DataFlowBackground } from "@/components/ui/DataFlowBackground";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { isPersonalEmailDomain } from "@/lib/emailValidation";

// If a valid session already exists, skip the auth form and go straight
// into the product instead of asking a signed-in user to sign up again.
function useRedirectIfAuthenticated() {
  useEffect(() => {
    if (localStorage.getItem("da_token")) {
      window.location.href = "/dashboard";
    }
  }, []);
}

// Client-side fast check — backend validates authoritatively. Domain list
// lives in src/lib/emailValidation.ts (single source of truth).
const isPersonalEmail = isPersonalEmailDomain;

function checkPassword(pw: string) {
  return {
    length: pw.length >= 8,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
  };
}

function Field({
  id, label, type = "text", value, onChange, placeholder, error, autoComplete,
  rightElement,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string;
  autoComplete?: string; rightElement?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-ink">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          autoComplete={autoComplete}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-[10px] border bg-canvas px-3 text-sm text-ink outline-none transition-colors placeholder:text-muted",
            !!rightElement && "pr-10",
            error ? "border-red-400 focus:border-red-400" : "border-line focus:border-accent",
          )}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && <p className="mt-1.5 text-[12px] text-red-500">{error}</p>}
    </div>
  );
}

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const pwChecks = checkPassword(password);
  const pwValid = pwChecks.length && pwChecks.special;

  function handleEmailChange(value: string) {
    setEmail(value);
    setEmailError(value && isPersonalEmail(value) ? "Please use your company email address." : "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setServerError("");
    if (isPersonalEmail(email)) { setEmailError("Please use your company email address."); return; }
    if (!pwValid || !company.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password, company, jobTitle }),
      });
      const data = await res.json();
      if (!res.ok) { setServerError(data.error ?? "Something went wrong."); return; }
      // Trial account created and authenticated — go straight into the product.
      localStorage.setItem("da_token", data.token);
      window.location.href = "/dashboard";
    } catch {
      setServerError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[24px] border border-line-strong bg-card p-8 shadow-[0_24px_60px_rgb(12_18_32/0.10)]">
      <div className="flex size-11 items-center justify-center rounded-[14px] bg-accent-soft">
        <Sparkles size={20} className="text-accent" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Start your free trial</h1>
      <p className="mt-1.5 text-sm text-muted">Explore DA One free for {site.trialDays} days. No credit card required.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
        <Field id="auth-name" label="Full name" value={fullName} onChange={setFullName} placeholder="Saurav Mehto" autoComplete="name" />
        <Field id="auth-email" label="Work email address" type="email" value={email} onChange={handleEmailChange} placeholder="you@company.com" autoComplete="email" error={emailError} />
        <Field id="auth-company" label="Company name" value={company} onChange={setCompany} placeholder="Acme Capital" autoComplete="organization" />
        <Field id="auth-role" label="Job title (optional)" value={jobTitle} onChange={setJobTitle} placeholder="Head of Data" autoComplete="organization-title" />
        <div>
          <Field
            id="auth-password" label="Password"
            type={showPassword ? "text" : "password"} value={password}
            onChange={setPassword} placeholder="Min 8 chars + 1 special character" autoComplete="new-password"
            rightElement={
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"} className="text-muted transition-colors hover:text-ink">
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
          {password && (
            <div className="mt-2 flex gap-4">
              <span className={cn("text-[12px]", pwChecks.length ? "text-success" : "text-muted")}>{pwChecks.length ? "✓" : "○"} 8+ characters</span>
              <span className={cn("text-[12px]", pwChecks.special ? "text-success" : "text-muted")}>{pwChecks.special ? "✓" : "○"} Special character</span>
            </div>
          )}
        </div>
        {serverError && (
          <div className="rounded-[10px] bg-red-50 border border-red-200 px-3 py-2.5 text-[13px] text-red-600">{serverError}</div>
        )}
        <button type="submit" disabled={loading || !!emailError || !fullName.trim() || !email || !company.trim() || !pwValid} className="mt-1 h-11 w-full rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Creating your trial..." : "Start free trial"}
        </button>
      </form>
      <p className="mt-6 text-center text-[13px] text-muted">Already have an account? <a href="/login" className="font-medium text-accent hover:underline">Log in</a></p>
      <p className="mt-3 text-center text-[12px] text-muted">By signing up you agree to our <a href="#terms" className="hover:underline">Terms</a> and <a href="#privacy" className="hover:underline">Privacy Policy</a>.</p>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong.");
        return;
      }
      localStorage.setItem("da_token", data.token);
      window.location.href = "/dashboard";
    } catch {
      setServerError("Unable to reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[24px] border border-line-strong bg-card p-8 shadow-[0_24px_60px_rgb(12_18_32/0.10)]">
      <div className="flex size-11 items-center justify-center rounded-[14px] bg-accent-soft">
        <Sparkles size={20} className="text-accent" />
      </div>
      <h1 className="mt-5 text-2xl font-semibold tracking-tight text-ink">Welcome back</h1>
      <p className="mt-1.5 text-sm text-muted">Sign in to continue to DA One.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
        <Field id="login-email" label="Work email address" type="email" value={email} onChange={setEmail} placeholder="you@company.com" autoComplete="email" />
        <div>
          <Field
            id="login-password" label="Password"
            type={showPassword ? "text" : "password"} value={password}
            onChange={setPassword} placeholder="Your password" autoComplete="current-password"
            rightElement={
              <button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"} className="text-muted transition-colors hover:text-ink">
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
          <div className="mt-1.5 flex justify-end">
            <a href="mailto:support@dataalpha.ai" className="text-[13px] text-accent hover:underline">Forgot password?</a>
          </div>
        </div>
        {serverError && (
          <div className="rounded-[10px] bg-red-50 border border-red-200 px-3 py-2.5 text-[13px] text-red-600">{serverError}</div>
        )}
        <button type="submit" disabled={loading || !email || !password} className="mt-1 h-11 w-full rounded-[10px] bg-accent text-sm font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Signing in..." : "Log in"}
        </button>
      </form>
      <p className="mt-6 text-center text-[13px] text-muted">Don't have an account? <a href="/free-trial" className="font-medium text-accent hover:underline">Start free trial</a></p>
    </div>
  );
}

export function LoginPage() {
  useRedirectIfAuthenticated();

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-20 pt-28">
        <DataFlowBackground />
        <div className="relative mx-auto w-full max-w-md"><LoginForm /></div>
      </main>
      <Footer />
    </div>
  );
}

export function SignupPage() {
  useRedirectIfAuthenticated();

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-20 pt-28">
        <DataFlowBackground />
        <div className="relative mx-auto w-full max-w-md"><SignupForm /></div>
      </main>
      <Footer />
    </div>
  );
}

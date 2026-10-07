import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Footer } from "@/components/dataalpha-one/Footer";

type State = "loading" | "success" | "error";

export function VerifyEmailPage() {
  const [state, setState] = useState<State>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      setState("error");
      setMessage("No verification token found. Please use the link from your email.");
      return;
    }

    fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState("success");
          setMessage(data.message);
        } else {
          setState("error");
          setMessage(data.error ?? "Verification failed.");
        }
      })
      .catch(() => {
        setState("error");
        setMessage("Unable to reach the server. Please try again.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main id="main" className="flex min-h-screen items-center justify-center px-4 pb-20 pt-28">
        <div className="mx-auto w-full max-w-md rounded-[24px] border border-line-strong bg-card p-8 shadow-[0_24px_60px_rgb(12_18_32/0.10)] text-center">
          {state === "loading" && (
            <>
              <Loader2 size={36} className="mx-auto animate-spin text-accent" />
              <p className="mt-5 text-sm text-muted">Verifying your email…</p>
            </>
          )}

          {state === "success" && (
            <>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent-soft">
                <CheckCircle2 size={28} className="text-accent" />
              </div>
              <h1 className="mt-5 text-xl font-semibold tracking-tight text-ink">Email verified!</h1>
              <p className="mt-2 text-sm text-muted leading-6">{message}</p>
              <a
                href="/login"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-[10px] bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                Log in to your account
              </a>
            </>
          )}

          {state === "error" && (
            <>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-red-50">
                <XCircle size={28} className="text-red-500" />
              </div>
              <h1 className="mt-5 text-xl font-semibold tracking-tight text-ink">Verification failed</h1>
              <p className="mt-2 text-sm text-muted leading-6">{message}</p>
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href="/signup"
                  className="inline-flex h-11 items-center justify-center rounded-[10px] bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  Back to sign up
                </a>
                <a
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line-strong bg-card px-6 text-sm font-medium text-ink transition-colors hover:bg-canvas-2"
                >
                  Log in
                </a>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

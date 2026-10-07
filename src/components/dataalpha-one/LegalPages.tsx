import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas py-10">
      <Container className="max-w-3xl">
        <Logo />
        <h1 className="mt-10 text-4xl font-semibold tracking-tight">{title}</h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted">{children}</div>
        <Button className="mt-10" href="#top">
          Back to DA One
        </Button>
      </Container>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        This website collects the information you submit when you start a free trial, request a demo, or get in touch: name, business email, company, job title, and the details of your request.
      </p>
      <p>
        Campaign and referral parameters from the URL (such as utm_source) may be stored with the request so we can understand how you arrived.
      </p>
      <p>
        If no server endpoint is configured, submissions remain on the device used to fill the form. Privacy questions: sales@dataalpha.ai.
      </p>
    </LegalPage>
  );
}

export function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>
        This website describes DA One, DataAlpha's AI data analyst product. Product interfaces, figures, and analyses shown here are demonstration examples, not customer results.
      </p>
      <p>
        Starting a free trial, submitting the form, or booking a demo is a request to try or learn about the product. It is not a purchase, license, or service agreement.
      </p>
    </LegalPage>
  );
}

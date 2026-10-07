// import { lazy, Suspense } from "react"; // unused while DemoSection is commented out below
import { Navbar } from "@/components/dataalpha-one/Navbar";
import { Hero } from "@/components/dataalpha-one/Hero";
import { ProductFeatures } from "@/components/dataalpha-one/ProductFeatures";
import { FinalCTA } from "@/components/dataalpha-one/FinalCTA";
import { Footer } from "@/components/dataalpha-one/Footer";
import { PrivacyPage, TermsPage } from "@/components/dataalpha-one/LegalPages";
import { PricingPage, PricingSection } from "@/components/dataalpha-one/PricingPage";
import { ProductPage } from "@/components/dataalpha-one/ProductPage";
import { ContactPage } from "@/components/dataalpha-one/ContactPage";
import { UseCasesPage } from "@/components/dataalpha-one/UseCasesPage";
import { CaseStudyPage } from "@/components/dataalpha-one/CaseStudyPage";
import { FlyerPage } from "@/components/dataalpha-one/FlyerPage";
import { LoginPage, SignupPage } from "@/components/dataalpha-one/AuthPage";
import { DashboardPage } from "@/components/dataalpha-one/DashboardPage";
import { useHashPage } from "@/hooks/useHashPage";

// const DemoSection = lazy(() =>
//   import("@/components/dataalpha-one/DemoSection").then((m) => ({ default: m.DemoSection })),
// );

export default function App() {
  const page = useHashPage();

  if (window.location.pathname === "/dashboard") return <DashboardPage />;
  if (window.location.pathname === "/product") return <ProductPage />;
  if (window.location.pathname === "/use-cases" || window.location.pathname === "/use-cases/") return <UseCasesPage />;
  if (window.location.pathname.startsWith("/use-cases/")) {
    const slug = window.location.pathname.replace("/use-cases/", "").replace(/\/$/, "");
    return <CaseStudyPage slug={slug} />;
  }
  if (window.location.pathname === "/flyer") return <FlyerPage />;
  if (window.location.pathname === "/pricing") return <PricingPage />;
  if (window.location.pathname === "/contact") return <ContactPage />;
  if (window.location.pathname === "/login") return <LoginPage />;
  if (window.location.pathname === "/signup" || window.location.pathname === "/free-trial") return <SignupPage />;
  if (page === "privacy") return <PrivacyPage />;
  if (page === "terms") return <TermsPage />;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[10px] focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="px-4 sm:px-8 lg:px-16">
        <Hero />
        <ProductFeatures />
        <PricingSection />
        {/* <Suspense fallback={<div className="h-24" />}>
          <DemoSection />
        </Suspense> */}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}

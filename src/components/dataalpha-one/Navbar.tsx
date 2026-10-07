import {
  Menu,
  X,
  ChevronDown,
  Coins,
  CreditCard,
  Truck,
  ShoppingCart,
  Store,
  Hotel,
  Building2,
  BriefcaseBusiness,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/cn";
import { openBookingOrLead } from "@/lib/booking";
import { track } from "@/lib/analytics";

const useCases = [
  {
    title: "Asset Management",
    href: "/use-cases/asset-management",
    icon: BriefcaseBusiness,
  },
  {
    title: "Real Estate",
    href: "/use-cases/real-estate",
    icon: Building2,
  },
  {
    title: "Fintech",
    href: "/use-cases/fintech",
    icon: Coins,
  },
  {
    title: "Payments",
    href: "/use-cases/payments",
    icon: CreditCard,
  },
  {
    title: "Logistics",
    href: "/use-cases/logistics",
    icon: Truck,
  },
  {
    title: "Ecommerce",
    href: "/use-cases/ecommerce",
    icon: ShoppingCart,
  },
  {
    title: "Retail",
    href: "/use-cases/retail",
    icon: Store,
  },
  {
    title: "Hospitality",
    href: "/use-cases/hospitality",
    icon: Hotel,
  },
];

const otherLinks = [
  { id: "pricing", label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [useCasesDropdownOpen, setUseCasesDropdownOpen] = useState(false);
  const [mobileUseCasesOpen, setMobileUseCasesOpen] = useState(false);

  const useCasesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        useCasesDropdownRef.current &&
        !useCasesDropdownRef.current.contains(e.target as Node)
      ) {
        setUseCasesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setUseCasesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "border-b border-line/80 bg-canvas/85 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 sm:h-16 sm:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <a
            href="/product"
            className="text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-ink"
          >
            Product
          </a>

          {/* Use Cases Dropdown */}
          <div
            className="relative py-2"
            ref={useCasesDropdownRef}
            onMouseEnter={() => setUseCasesDropdownOpen(true)}
            onMouseLeave={() => setUseCasesDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setUseCasesDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-ink focus:outline-none cursor-pointer"
              aria-expanded={useCasesDropdownOpen}
              aria-haspopup="true"
            >
              <span>Use Cases</span>
              <ChevronDown
                size={15}
                className={cn(
                  "transition-transform duration-200",
                  useCasesDropdownOpen && "rotate-180",
                )}
              />
            </button>

            {useCasesDropdownOpen && (
              <div className="absolute left-0 top-full pt-1.5 w-56 animate-in fade-in-0 zoom-in-95 duration-150">
                <div className="rounded-xl border border-line bg-canvas/95 p-2 shadow-xl backdrop-blur-md">
                  <div className="grid gap-1">
                    {useCases.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.title}
                          href={item.href}
                          onClick={() => setUseCasesDropdownOpen(false)}
                          className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-line/60"
                        >
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line/80 bg-canvas/80 text-muted transition-colors group-hover:border-line group-hover:text-ink">
                            <Icon size={18} />
                          </div>
                          <div className="text-sm font-medium text-ink">
                            {item.title}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                  <a
                    href="/use-cases"
                    onClick={() => setUseCasesDropdownOpen(false)}
                    className="mt-1 flex items-center justify-center rounded-lg border-t border-line px-2.5 py-2.5 text-[13px] font-medium text-accent transition-colors hover:bg-line/60"
                  >
                    View all industries
                  </a>
                </div>
              </div>
            )}
          </div>

          {otherLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wide text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* <Button
            href="/login"
            size="sm"
            variant="ghost"
            className="hidden uppercase tracking-wide sm:inline-flex"
          >
            Log in
          </Button> */}
          <Button
            href="/free-trial"
            size="sm"
            variant="secondary"
            className="hidden uppercase tracking-wide sm:inline-flex"
          >
            Start Free Trial
          </Button>
          <Button
            size="sm"
            className="hidden uppercase tracking-wide sm:inline-flex"
            onClick={() => {
              track("hero_cta_click", { source: "nav" });
              openBookingOrLead("demo");
            }}
          >
            Book a 20-minute Demo
          </Button>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[10px] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="fixed inset-0 top-14 z-40 bg-canvas lg:hidden">
          <nav className="flex h-full flex-col px-6 py-8 overflow-y-auto" aria-label="Mobile">
            <a
              href="/product"
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-left text-lg font-medium"
            >
              Product
            </a>

            {/* Mobile Use Cases Accordion */}
            <div className="border-b border-line py-3">
              <button
                type="button"
                onClick={() => setMobileUseCasesOpen((v) => !v)}
                className="flex w-full items-center justify-between py-1 text-left text-lg font-medium"
              >
                <span>Use Cases</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    mobileUseCasesOpen && "rotate-180",
                  )}
                />
              </button>
              {mobileUseCasesOpen && (
                <div className="mt-2 pl-2 grid gap-2">
                  {useCases.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-line/40"
                      >
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line/80 bg-canvas text-muted">
                          <Icon size={16} />
                        </div>
                        <div className="text-sm font-medium text-ink">{item.title}</div>
                      </a>
                    );
                  })}
                  <a
                    href="/use-cases"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-2 py-2 text-center text-sm font-medium text-accent transition-colors hover:bg-line/40"
                  >
                    View all industries
                  </a>
                </div>
              )}
            </div>

            {otherLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-left text-lg font-medium"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-8 flex gap-2">
              <Button
                href="/login"
                variant="secondary"
                className="flex-1"
              >
                Log in
              </Button>
              <Button
                href="/free-trial"
                className="flex-1"
              >
                Start Free Trial
              </Button>
            </div>
            <Button
              className="mt-3"
              onClick={() => {
                setOpen(false);
                track("hero_cta_click", { source: "nav_mobile" });
                openBookingOrLead("demo");
              }}
            >
              Book a 20-minute Demo
            </Button>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
              <span className="text-sm text-muted">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
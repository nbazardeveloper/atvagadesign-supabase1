import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/3d-rendering", label: "3D Rendering" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;
  const isMenuVisible = isTransparent && menuOpen;

  useEffect(() => {
    const onScroll = () => {
      const nextScrolled = window.scrollY > 60;
      setScrolled(nextScrolled);
      if (nextScrolled) setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full",
        isTransparent
          ? "bg-transparent"
          : "bg-white shadow-[0_1px_0_0_rgba(10,10,10,0.08)]",
      ].join(" ")}
    >
      <div className="section-wrap flex h-[72px] items-center justify-between">
        {/* Logotype */}
        <Link
          to="/"
          aria-label="ATVAGA Designs – home"
          className="inline-flex items-center"
        >
          <img
            src={isTransparent ? "/images/logo-white.webp" : "/images/logo-black.webp"}
            alt="ATVAGA Designs"
            className="block h-9 w-auto md:h-11"
          />
        </Link>

        {/* Desktop nav — transparent mode: just CTA + burger */}
        {isTransparent ? (
          <div className="hidden items-center gap-5 md:flex">
            <Link
              to="/contact"
              className="cta-brand-light-hover px-6 py-3"
            >
              Start Your Project
            </Link>
            <button
              className="flex flex-col items-end justify-center gap-[5px] text-white"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuVisible}
            >
              <span className={["block h-px w-6 bg-current transition-transform", isMenuVisible ? "translate-y-[7px] rotate-45" : ""].join(" ")} />
              <span className={["block h-px bg-current transition-all", isMenuVisible ? "w-6 opacity-0" : "w-4"].join(" ")} />
              <span className={["block h-px w-6 bg-current transition-transform", isMenuVisible ? "-translate-y-[7px] -rotate-45" : ""].join(" ")} />
            </button>
          </div>
        ) : (
          /* Desktop nav — solid mode: links + CTA */
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={[
                  "text-[0.7rem] font-semibold uppercase tracking-widest transition-colors",
                  pathname === to
                    ? "text-brand-black"
                    : "text-brand-gray hover-text-brand-black",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="cta-charcoal px-6 py-3"
            >
              Get a Quote
            </Link>
          </nav>
        )}

        {/* Mobile: CTA + burger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/contact"
            className="cta-brand-light-hover px-3 py-2 text-[0.55rem]"
          >
            Quote
          </Link>
          <button
            className={[
              "flex flex-col items-end justify-center gap-[5px]",
              isTransparent ? "text-white" : "text-brand-black",
            ].join(" ")}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={["block h-px w-6 bg-current transition-transform", isMenuVisible ? "translate-y-[7px] rotate-45" : ""].join(" ")} />
            <span className={["block h-px bg-current transition-all", isMenuVisible ? "w-6 opacity-0" : "w-4"].join(" ")} />
            <span className={["block h-px w-6 bg-current transition-transform", isMenuVisible ? "-translate-y-[7px] -rotate-45" : ""].join(" ")} />
          </button>
        </div>
      </div>

      {/* Mobile + transparent-desktop drawer */}
      <div
        className={[
          "overflow-hidden transition-all duration-300",
          isTransparent
            ? "bg-brand-charcoal/80 backdrop-blur-md"
            : "bg-white md:hidden",
          isMenuVisible || (!isTransparent && menuOpen) ? "max-h-screen py-6" : "max-h-0",
        ].join(" ")}
      >
        <nav
          className="section-wrap flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={[
                "border-b py-4 text-[0.7rem] font-semibold uppercase tracking-widest transition-colors",
                isTransparent
                  ? "border-white/15 text-white/80 hover:text-white"
                  : "border-brand-light text-brand-black hover-text-brand-pink",
                pathname === to ? (isTransparent ? "text-white" : "text-brand-pink") : "",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className={[
              "btn-base mt-4 w-full border text-center text-[0.65rem] tracking-widest",
              isTransparent
                ? "border-white bg-white text-brand-black"
                : "border-brand-black bg-brand-charcoal text-white",
            ].join(" ")}
          >
            {isTransparent ? "Start Your Project" : "Get a Quote"}
          </Link>
        </nav>
      </div>
    </header>
  );
}

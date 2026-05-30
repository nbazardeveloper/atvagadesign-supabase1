import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import {
  SITE_EMAIL_HREF,
  SITE_FACEBOOK_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/contact-info";

const NAV_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/3d-rendering", label: "3D Rendering" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const MOBILE_CALL_LINK = {
  href: SITE_PHONE_HREF,
  label: "Call",
} as const;

const MOBILE_SOCIAL_LINKS = [
  { href: SITE_INSTAGRAM_URL, label: "Instagram", icon: Instagram },
  { href: SITE_FACEBOOK_URL, label: "Facebook", icon: Facebook },
  { href: SITE_LINKEDIN_URL, label: "LinkedIn", icon: Linkedin },
  { href: SITE_EMAIL_HREF, label: "Email", icon: Mail },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;
  const isMenuVisible = isTransparent && menuOpen;
  const isDrawerOpen = isTransparent ? isMenuVisible : menuOpen;

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
          ? "bg-transparent md:overflow-visible"
          : "bg-[#f0ece6] shadow-[0_1px_0_0_rgba(10,10,10,0.08)] md:bg-transparent md:shadow-none md:overflow-visible",
      ].join(" ")}
    >
      {/* Desktop logo — absolute, shrinks on scroll */}
      <div className={[
        "hidden md:block absolute left-0 top-0 z-[55] w-[300px] lg:w-[320px] transition-all duration-300",
        isTransparent ? "h-[112px]" : "h-[64px] w-[220px] lg:w-[240px]",
      ].join(" ")}>
        <Link
          to="/"
          aria-label="ATVAGA Design – home"
          className="relative z-10 flex h-full items-center pl-8 lg:pl-10 xl:pl-12"
        >
          <img
            src={isTransparent ? "/images/logo-white.webp" : "/images/logo-black.webp"}
            alt="ATVAGA Design"
            className={["w-auto transition-all duration-300", isTransparent ? "h-[96px]" : "h-[44px]"].join(" ")}
          />
        </Link>
      </div>

      {/* Single unified header bar — shrinks and gets background on scroll */}
      <div className={[
        "w-full transition-all duration-300",
        isTransparent ? "md:bg-transparent" : "md:bg-[#f0ece6] md:shadow-[0_1px_0_0_rgba(10,10,10,0.08)]",
      ].join(" ")}>
        <div className={[
          "section-wrap relative flex items-center justify-between transition-all duration-300",
          isTransparent ? "h-[112px]" : "h-[64px]",
        ].join(" ")}>

          {/* Mobile logo (in-flow, hidden on desktop) */}
          <Link
            to="/"
            aria-label="ATVAGA Design – home"
            className="inline-flex items-center md:hidden"
          >
            <img
              src={isTransparent ? "/images/logo-white.webp" : "/images/logo-black.webp"}
              alt="ATVAGA Design"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav links — centered horizontally */}
          <div className="hidden md:flex absolute inset-x-0 h-full items-center justify-center pointer-events-none">
            <nav className="flex items-center gap-8 pointer-events-auto" aria-label="Main navigation">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={[
                    "text-[0.7rem] font-semibold uppercase tracking-widest transition-colors",
                    isTransparent
                      ? "text-white/75 hover:text-white"
                      : "text-brand-black/70 hover:text-brand-black",
                  ].join(" ")}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* GET A QUOTE — desktop only, far right */}
          <Link
            to="/contact"
            className="cta-brand-light-hover px-6 py-3 hidden md:inline-flex ml-auto"
          >
            Get a Quote
          </Link>

          {/* Mobile: CTA + burger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href={MOBILE_CALL_LINK.href}
              className="cta-brand-light-hover px-3 py-2 text-[0.55rem]"
            >
              {MOBILE_CALL_LINK.label}
            </a>
            <button
              className={[
                "flex flex-col items-end justify-center gap-[5px]",
                isTransparent ? "text-white" : "text-brand-black",
              ].join(" ")}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span className={["block h-px w-6 bg-current transition-transform", isDrawerOpen ? "translate-y-[7px] rotate-45" : ""].join(" ")} />
              <span className={["block h-px bg-current transition-all", isDrawerOpen ? "w-6 opacity-0" : "w-4"].join(" ")} />
              <span className={["block h-px w-6 bg-current transition-transform", isDrawerOpen ? "-translate-y-[7px] -rotate-45" : ""].join(" ")} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile + transparent-desktop drawer */}
      <div
        className={[
          "overflow-hidden transition-all duration-300",
          isTransparent
            ? "bg-brand-charcoal/80 backdrop-blur-md"
            : "bg-[#f0ece6] md:hidden",
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
                ? "border-white bg-[#f0ece6] text-brand-black"
                : "border-brand-black bg-brand-charcoal text-white",
            ].join(" ")}
          >
            {isTransparent ? "Start Your Project" : "Get a Quote"}
          </Link>
          <div className="mt-6 flex items-center gap-4">
            {MOBILE_SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={[
                  "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                  isTransparent
                    ? "border-white/20 text-white/80 hover:border-white hover:text-white"
                    : "border-brand-light text-brand-black hover:border-brand-black hover:text-brand-pink",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

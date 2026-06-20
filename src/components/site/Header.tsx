import { Link, useRouterState } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  SITE_EMAIL_HREF,
  SITE_FACEBOOK_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_HREF,
} from "@/lib/contact-info";
import { SERVICES } from "@/lib/services-data";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About Us" },
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
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;
  const isMenuVisible = isTransparent && menuOpen;
  const isDrawerOpen = isTransparent ? isMenuVisible : menuOpen;

  const isServicesActive = pathname.startsWith("/services");

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

  function openServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  }

  function scheduleCloseServices() {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  }

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 w-full",
        isTransparent
          ? "bg-transparent lg:overflow-visible"
          : "bg-[#f0ece6] shadow-[0_1px_0_0_rgba(10,10,10,0.08)] lg:bg-transparent lg:shadow-none lg:overflow-visible",
      ].join(" ")}
    >
      {/* Desktop logo — absolute */}
      <div className={[
        "hidden lg:block absolute left-0 top-0 z-[55] transition-all duration-300",
        isTransparent
          ? "h-[112px] w-[300px] xl:w-[320px]"
          : !isHome
            ? "h-[96px] w-[300px] xl:w-[320px]"
            : "h-[76px] w-[260px] xl:w-[280px]",
      ].join(" ")}>
        <Link
          to="/"
          aria-label="ATVAGA Design – home"
          className="relative z-10 flex h-full items-center pl-8 xl:pl-10 2xl:pl-12"
        >
          <img
            src={isTransparent ? "/images/logo-white.webp" : "/images/logo-black.webp"}
            alt="ATVAGA Design"
            className={[
              "w-auto transition-all duration-300",
              isTransparent ? "h-[96px]" : !isHome ? "h-[76px]" : "h-[56px]",
            ].join(" ")}
          />
        </Link>
      </div>

      {/* Single unified header bar */}
      <div className={[
        "w-full transition-all duration-300",
        isTransparent ? "lg:bg-transparent" : "lg:bg-[#f0ece6] lg:shadow-[0_1px_0_0_rgba(10,10,10,0.08)]",
      ].join(" ")}>
        <div className={[
          "section-wrap relative flex items-center justify-between transition-all duration-300",
          isTransparent ? "h-[112px]" : !isHome ? "h-[96px]" : "h-[76px]",
        ].join(" ")}>

          {/* Mobile/tablet logo */}
          <Link
            to="/"
            aria-label="ATVAGA Design – home"
            className="inline-flex items-center lg:hidden"
          >
            <img
              src={isTransparent ? "/images/logo-white.webp" : "/images/logo-black.webp"}
              alt="ATVAGA Design"
              className={["w-auto transition-all duration-300", !isHome ? "h-11" : "h-9"].join(" ")}
            />
          </Link>

          {/* Desktop nav links — centered horizontally */}
          <div className="hidden lg:flex absolute inset-x-0 h-full items-center justify-center pointer-events-none">
            <nav className="flex items-center gap-8 pointer-events-auto" aria-label="Main navigation">
              {/* Home */}
              <Link
                to="/"
                className={[
                  "text-[0.8rem] font-bold uppercase tracking-widest transition-colors",
                  isTransparent
                    ? "text-white/75 hover:text-white"
                    : "text-brand-black/70 hover:text-brand-black",
                ].join(" ")}
              >
                Home
              </Link>

              {/* Services — with mega dropdown */}
              <div
                ref={servicesRef}
                className="relative"
                onMouseEnter={openServices}
                onMouseLeave={scheduleCloseServices}
              >
                <Link
                  to="/services/"
                  className={[
                    "inline-flex items-center gap-1 text-[0.8rem] font-bold uppercase tracking-widest transition-colors",
                    isTransparent
                      ? isServicesActive ? "text-white" : "text-white/75 hover:text-white"
                      : isServicesActive ? "text-brand-pink" : "text-brand-black/70 hover:text-brand-black",
                  ].join(" ")}
                >
                  Services
                  <ChevronDown
                    className={[
                      "h-3 w-3 transition-transform duration-200",
                      servicesOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </Link>

                {/* Dropdown panel */}
                <div
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                  className={[
                    "absolute left-1/2 -translate-x-1/2 top-[calc(100%+16px)] z-[60]",
                    "w-[680px] bg-[#f0ece6] border border-border shadow-xl",
                    "transition-all duration-200 origin-top",
                    servicesOpen
                      ? "opacity-100 scale-y-100 pointer-events-auto"
                      : "opacity-0 scale-y-95 pointer-events-none",
                  ].join(" ")}
                >
                  {/* Arrow */}
                  <div className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#f0ece6] border-l border-t border-border rotate-45" />

                  <div className="p-6 grid grid-cols-3 gap-px bg-border">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        onClick={() => setServicesOpen(false)}
                        className="bg-[#f0ece6] px-4 py-4 hover:bg-[#e8e2da] transition-colors group"
                      >
                        <span className="block text-[0.65rem] font-semibold text-brand-pink tracking-[0.18em] uppercase">
                          {s.n}
                        </span>
                        <span className="block mt-1 text-[0.8rem] font-semibold text-brand-black leading-tight group-hover:text-brand-pink transition-colors">
                          {s.t}
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Footer link */}
                  <div className="px-6 py-3 border-t border-border flex items-center justify-between">
                    <span className="text-[0.72rem] text-brand-gray">All services →</span>
                    <Link
                      to="/services/"
                      onClick={() => setServicesOpen(false)}
                      className="text-[0.72rem] font-semibold uppercase tracking-widest text-brand-black hover:text-brand-pink transition-colors"
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              </div>

              {/* Rest of nav */}
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={[
                    "text-[0.8rem] font-bold uppercase tracking-widest transition-colors",
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
            className="cta-brand-light-hover px-6 py-3 hidden lg:inline-flex ml-auto"
          >
            Get a Quote
          </Link>

          {/* Mobile/tablet: CTA + burger */}
          <div className="flex items-center gap-3 lg:hidden">
            <a
              href={MOBILE_CALL_LINK.href}
              className="cta-brand-light-hover px-3 py-2 text-[0.7rem]"
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
            : "bg-[#f0ece6] lg:hidden",
          isMenuVisible || (!isTransparent && menuOpen) ? "max-h-screen py-6" : "max-h-0",
        ].join(" ")}
      >
        <nav
          className="section-wrap flex flex-col gap-1"
          aria-label="Mobile navigation"
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={[
              "border-b py-4 text-[0.8rem] font-semibold uppercase tracking-widest transition-colors",
              isTransparent
                ? "border-white/15 text-white/80 hover:text-white"
                : "border-brand-light text-brand-black hover-text-brand-pink",
              pathname === "/" ? (isTransparent ? "text-white" : "text-brand-pink") : "",
            ].join(" ")}
          >
            Home
          </Link>

          {/* Mobile Services — expandable */}
          <div className="border-b border-brand-light">
            <button
              className={[
                "w-full flex items-center justify-between py-4 text-[0.8rem] font-semibold uppercase tracking-widest transition-colors",
                isTransparent
                  ? "border-white/15 text-white/80 hover:text-white"
                  : "text-brand-black",
                isServicesActive ? (isTransparent ? "text-white" : "text-brand-pink") : "",
              ].join(" ")}
              onClick={() => setMobileServicesOpen((o) => !o)}
            >
              Services
              <ChevronDown className={["h-4 w-4 transition-transform duration-200", mobileServicesOpen ? "rotate-180" : ""].join(" ")} />
            </button>

            <div className={["overflow-hidden transition-all duration-300", mobileServicesOpen ? "max-h-[500px] pb-3" : "max-h-0"].join(" ")}>
              <Link
                to="/services/"
                onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                className={[
                  "block py-2 pl-4 text-[0.75rem] font-semibold uppercase tracking-widest transition-colors",
                  isTransparent ? "text-white/60 hover:text-white" : "text-brand-gray hover:text-brand-pink",
                ].join(" ")}
              >
                → All Services
              </Link>
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                  className={[
                    "flex items-center gap-3 py-2 pl-4 text-[0.75rem] transition-colors",
                    isTransparent ? "text-white/60 hover:text-white" : "text-brand-gray hover:text-brand-pink",
                  ].join(" ")}
                >
                  <span className="text-brand-pink text-[0.65rem]">{s.n}</span>
                  {s.t}
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={[
                "border-b py-4 text-[0.8rem] font-semibold uppercase tracking-widest transition-colors",
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
              "btn-base mt-4 w-full border text-center text-[0.72rem] tracking-widest",
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

import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import {
  SITE_EMAIL,
  SITE_EMAIL_HREF,
  SITE_FACEBOOK_URL,
  SITE_INSTAGRAM_URL,
  SITE_LINKEDIN_URL,
} from "@/lib/contact-info";

const FOOTER_LINKS = {
  Services: [
    { label: "Design Drawings", to: "/services" },
    { label: "Permit Plans", to: "/services" },
    { label: "ADU/DADU Design", to: "/services" },
    { label: "3D Rendering", to: "/3d-rendering" },
  ],
  Company: [
    { label: "Portfolio", to: "/portfolio" },
    { label: "About", to: "/about" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Use", to: "/terms" },
  ],
};

export function Footer() {
  const socialLinks = [
    {
      href: SITE_INSTAGRAM_URL,
      label: "Instagram",
      text: "Follow Us on Instagram",
      icon: Instagram,
    },
    {
      href: SITE_FACEBOOK_URL,
      label: "Facebook",
      text: "Follow Us on Facebook",
      icon: Facebook,
    },
    {
      href: SITE_LINKEDIN_URL,
      label: "LinkedIn",
      text: "Connect on LinkedIn",
      icon: Linkedin,
    },
    {
      href: SITE_EMAIL_HREF,
      label: "Email",
      text: SITE_EMAIL,
      icon: Mail,
    },
  ] as const;

  return (
    <footer className="w-full" aria-label="Site footer">
      {/* CTA section */}
      <section className="relative w-full overflow-hidden bg-brand-charcoal py-24 lg:py-28">
        <div className="section-wrap">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h2 className="text-white">READY TO START?</h2>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-[1.65] text-white/70">
                Transform your residential goals into detailed, permit-ready
                design drawings. Let&apos;s discuss your project today.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="cta-brand px-10"
              >
                REQUEST A QUOTE
              </Link>
              <Link
                to="/portfolio"
                className="cta-light-outline px-10"
              >
                VIEW PORTFOLIO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info section */}
      <div className="w-full bg-[var(--warm)] text-brand-black">
        <div className="section-wrap py-20 lg:py-24">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.15fr] lg:gap-16">
            {/* Brand column */}
            <div>
              <img
                src="/images/logo-black.webp"
                alt="ATVAGA Design"
                className="block h-14 w-auto sm:h-16"
              />
              <p className="mt-6 max-w-[16rem] text-[0.9375rem] leading-[1.75] text-brand-gray">
                Technical precision meets refined residential design. Specializing in
                permit-ready drafting for Washington State.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-brand-black">
                  {group}
                </h3>
                <ul className="mt-5 space-y-3">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-[0.9375rem] text-brand-gray underline-offset-4 transition-colors hover-text-brand-black hover:underline"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Office column */}
            <div>
              <h3 className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-brand-black">
                Office
              </h3>
              <div className="mt-5 space-y-1 text-[0.9375rem] leading-[1.75] text-brand-gray">
                <p>Mon – Fri: 9am – 5pm</p>
                <p>Seattle, Washington</p>
              </div>
              <div className="mt-6 space-y-4">
                {socialLinks.map(({ href, label, text, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-black transition-colors hover-text-brand-pink"
                  >
                    <Icon className="h-4 w-4" />
                    {text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="section-wrap border-t border-brand-black/8 py-6">
          <p className="text-[0.75rem] uppercase tracking-[0.12em] text-brand-gray">
            © {new Date().getFullYear()} ATVAGA Design. Design Drawings &amp; Permit Services in Washington State.
          </p>
        </div>
      </div>
    </footer>
  );
}

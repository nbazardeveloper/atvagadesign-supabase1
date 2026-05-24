import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

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
};

export function Footer() {
  return (
    <footer className="w-full">
      {/* CTA section */}
      <section className="relative w-full overflow-hidden bg-brand-charcoal py-24 lg:py-28">
        <div className="section-wrap">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-3xl">
              <h2 className="text-white">READY TO START?</h2>
              <p className="mt-5 max-w-2xl text-[1.05rem] leading-[1.65] text-white/70">
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
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_1.15fr] lg:gap-16">
            {/* Brand column */}
            <div>
              <img
                src="/images/logo-black.webp"
                alt="ATVAGA Designs"
                className="block h-14 w-auto sm:h-16"
              />
              <p className="mt-6 max-w-[16rem] text-[1rem] leading-[1.75] text-brand-gray">
                Technical precision meets refined residential design. Specializing in
                permit-ready drafting for Washington State.
              </p>
            </div>

            {/* Link columns */}
            {Object.entries(FOOTER_LINKS).map(([group, links]) => (
              <div key={group}>
                <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-black">
                  {group}
                </h3>
                <ul className="mt-5 space-y-3">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link
                        to={to}
                        className="text-[1rem] text-brand-gray underline-offset-4 transition-colors hover-text-brand-black hover:underline"
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
              <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-black">
                Office
              </h3>
              <div className="mt-5 space-y-1 text-[1rem] leading-[1.75] text-brand-gray">
                <p>Mon – Fri: 9am – 5pm</p>
                <p>Seattle, Washington</p>
              </div>
              <a
                href="https://www.instagram.com/atvaga_llc?igsh=MWc2Y2NjbWJkMDB6Nw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-3 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-brand-black transition-colors hover-text-brand-pink"
              >
                <Instagram className="h-4 w-4" />
                Follow Us on Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="section-wrap border-t border-brand-black/8 py-6">
          <p className="text-[0.72rem] uppercase tracking-[0.16em] text-brand-gray">
            © {new Date().getFullYear()} ATVAGA Designs. Design Drawings &amp; Permit Services in Washington State.
          </p>
        </div>
      </div>
    </footer>
  );
}

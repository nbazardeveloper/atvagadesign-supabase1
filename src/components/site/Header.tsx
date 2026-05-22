import { Link } from "@tanstack/react-router";
import { Phone, Instagram, Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/faq", label: "FAQ" },
  { to: "/contacts", label: "Contacts" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-luxe flex items-center justify-between h-20">
        <Link to="/" className="flex items-center" aria-label="Asti Designs home">
          <img src="/images/logo.webp" alt="Asti Designs" className="h-12 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[11px] uppercase tracking-[0.22em] text-foreground/80 hover:text-foreground link-underline"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <a href="tel:+18324549303" aria-label="Call" className="hover:opacity-70 transition"><Phone className="w-4 h-4" /></a>
          <a href="https://wa.me/18324549303" aria-label="WhatsApp" className="hover:opacity-70 transition">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.6 6.3A7.84 7.84 0 0 0 12 4a7.9 7.9 0 0 0-6.7 12L4 20l4.1-1.3a7.9 7.9 0 0 0 3.9 1h0a7.9 7.9 0 0 0 7.9-7.9 7.8 7.8 0 0 0-2.3-5.5Zm-5.6 12.1a6.5 6.5 0 0 1-3.3-.9l-.2-.1-2.4.8.8-2.3-.2-.3a6.6 6.6 0 1 1 12.2-3.5 6.5 6.5 0 0 1-6.9 6.3Zm3.6-4.9c-.2-.1-1.2-.6-1.3-.7-.2-.1-.3-.1-.5.1s-.5.7-.6.8c-.1.1-.2.1-.4 0a5.3 5.3 0 0 1-1.6-1 6 6 0 0 1-1.1-1.3c-.1-.2 0-.3.1-.4l.3-.3.2-.3a.4.4 0 0 0 0-.4c0-.1-.5-1.2-.7-1.6-.2-.4-.3-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.7 1.7 4.1 4.1 0 0 0 .9 2.2c.1.1 1.5 2.3 3.6 3.1.5.2.9.3 1.2.4a3 3 0 0 0 1.3.1c.4-.1 1.2-.5 1.4-1a1.7 1.7 0 0 0 .1-1c-.1-.1-.2-.1-.4-.2Z"/></svg>
          </a>
          <a href="https://www.instagram.com/astidesigns/" aria-label="Instagram" className="hover:opacity-70 transition"><Instagram className="w-4 h-4" /></a>
          <Link to="/quote" className="ml-4 inline-flex items-center px-5 py-2.5 bg-foreground text-background text-[10px] uppercase tracking-[0.25em] hover:bg-foreground/85 transition">
            Request Estimate
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-luxe py-6 flex flex-col gap-5">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="text-sm uppercase tracking-[0.2em]">
                {n.label}
              </Link>
            ))}
            <div className="mt-1 flex items-center gap-5">
              <a href="tel:+18324549303" aria-label="Call" className="hover:opacity-70 transition"><Phone className="w-4 h-4" /></a>
              <a href="https://wa.me/18324549303" aria-label="WhatsApp" className="hover:opacity-70 transition">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M17.6 6.3A7.84 7.84 0 0 0 12 4a7.9 7.9 0 0 0-6.7 12L4 20l4.1-1.3a7.9 7.9 0 0 0 3.9 1h0a7.9 7.9 0 0 0 7.9-7.9 7.8 7.8 0 0 0-2.3-5.5Zm-5.6 12.1a6.5 6.5 0 0 1-3.3-.9l-.2-.1-2.4.8.8-2.3-.2-.3a6.6 6.6 0 1 1 12.2-3.5 6.5 6.5 0 0 1-6.9 6.3Zm3.6-4.9c-.2-.1-1.2-.6-1.3-.7-.2-.1-.3-.1-.5.1s-.5.7-.6.8c-.1.1-.2.1-.4 0a5.3 5.3 0 0 1-1.6-1 6 6 0 0 1-1.1-1.3c-.1-.2 0-.3.1-.4l.3-.3.2-.3a.4.4 0 0 0 0-.4c0-.1-.5-1.2-.7-1.6-.2-.4-.3-.4-.5-.4h-.4a.8.8 0 0 0-.6.3 2.4 2.4 0 0 0-.7 1.7 4.1 4.1 0 0 0 .9 2.2c.1.1 1.5 2.3 3.6 3.1.5.2.9.3 1.2.4a3 3 0 0 0 1.3.1c.4-.1 1.2-.5 1.4-1a1.7 1.7 0 0 0 .1-1c-.1-.1-.2-.1-.4-.2Z"/></svg>
              </a>
              <a href="https://www.instagram.com/astidesigns/" aria-label="Instagram" className="hover:opacity-70 transition"><Instagram className="w-4 h-4" /></a>
            </div>
            <Link to="/quote" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center px-5 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.25em]">
              Request Estimate
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

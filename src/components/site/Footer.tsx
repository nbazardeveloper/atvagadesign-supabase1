import { Link } from "@tanstack/react-router";
import { Instagram, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex items-center" aria-label="Asti Designs home">
            <img src="/images/logo.webp" alt="Asti Designs" className="h-16 w-auto" />
          </Link>
          <p className="mt-5 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Luxury decorative plaster &amp; Venetian finish studio. Hand-crafted, custom interiors for premium spaces.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Studio</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/about" className="link-underline">About</Link></li>
            <li><Link to="/services" className="link-underline">Services</Link></li>
            <li><Link to="/portfolio" className="link-underline">Portfolio</Link></li>
            <li><Link to="/faq" className="link-underline">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> <a href="tel:+18324549303" className="link-underline">+1 (832) 454-9303</a></li>
            <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> <a href="mailto:Asticonstructiontx@gmail.com" className="link-underline">Asticonstructiontx@gmail.com</a></li>
            <li className="flex items-center gap-2"><Instagram className="w-3.5 h-3.5" /> <a href="https://www.instagram.com/astidesigns/" className="link-underline">@astidesigns</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Studio Hours</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Mon — Sat · 8am — 5pm<br/>
            Seattle, Washington
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-luxe py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Asti Designs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-foreground transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

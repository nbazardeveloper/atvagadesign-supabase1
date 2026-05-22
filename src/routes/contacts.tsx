import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { LeadForm } from "@/components/site/LeadForm";
import { Phone, Instagram, Mail, MapPin } from "lucide-react";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/contacts")({
  component: Contacts,
  head: () =>
    buildSeoMeta({
      title: "Contact Asti Designs — Decorative Plaster Studio",
      description: "Get in touch with Asti Designs. Reach us by phone, WhatsApp, Instagram or email to discuss your Venetian plaster or microcement project.",
      path: "/contacts",
      imageAlt: "Contact Asti Designs decorative plaster studio",
    }),
});

function Contacts() {
  return (
    <>
      <section className="container-luxe pt-24 pb-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Contacts</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em]">Let's begin.</h1>
        </FadeIn>
      </section>

      <section className="container-luxe pb-24 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-10">
          <FadeIn>
            <div className="grid gap-4">
              <a href="tel:+18324549303" className="group flex items-center justify-between border border-border p-6 hover:border-foreground transition">
                <span className="flex items-center gap-4"><Phone className="w-4 h-4" /><span className="text-sm">+1 (832) 454-9303</span></span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground">Call</span>
              </a>
              <a href="https://wa.me/18324549303" className="group flex items-center justify-between border border-border p-6 hover:border-foreground transition">
                <span className="flex items-center gap-4">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.6 6.3A7.84 7.84 0 0 0 12 4a7.9 7.9 0 0 0-6.7 12L4 20l4.1-1.3a7.9 7.9 0 0 0 3.9 1h0a7.9 7.9 0 0 0 7.9-7.9 7.8 7.8 0 0 0-2.3-5.5Z"/></svg>
                  <span className="text-sm">WhatsApp</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground">Message</span>
              </a>
              <a href="https://www.instagram.com/astidesigns/" className="group flex items-center justify-between border border-border p-6 hover:border-foreground transition">
                <span className="flex items-center gap-4"><Instagram className="w-4 h-4" /><span className="text-sm">@astidesigns</span></span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground">Follow</span>
              </a>
              <a href="mailto:Asticonstructiontx@gmail.com" className="group flex items-center justify-between border border-border p-6 hover:border-foreground transition">
                <span className="flex items-center gap-4"><Mail className="w-4 h-4" /><span className="text-sm">Asticonstructiontx@gmail.com</span></span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground group-hover:text-foreground">Email</span>
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="border-t border-border pt-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">Studio</p>
              <p className="font-display text-2xl">Seattle, Washington</p>
              <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Mon — Sat · 8am — 5pm</p>
              <p className="mt-4 text-sm text-muted-foreground">Phone, Instagram, WhatsApp, and email available for project inquiries.</p>
            </div>
          </FadeIn>
        </div>

        <FadeIn className="lg:col-span-7" delay={100}>
          <div className="border border-border p-8 md:p-12">
            <h2 className="font-display text-3xl mb-2">Send a message</h2>
            <p className="text-sm text-muted-foreground mb-8">We respond within 24 hours.</p>
            <LeadForm source="contacts_page" />
          </div>
        </FadeIn>
      </section>
    </>
  );
}

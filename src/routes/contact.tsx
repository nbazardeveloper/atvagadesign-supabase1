import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { LeadForm } from "@/components/site/LeadForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { buildSeoMeta } from "@/lib/seo";
import { SITE_EMAIL, SITE_EMAIL_HREF, SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/contact-info";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () =>
    buildSeoMeta({
      title: "Contact ATVAGA Design — Residential Design & Permit Plans",
      description:
        "Get in touch with ATVAGA Design for residential design drawings, permit plans, ADU/DADU design, and remodel services in Seattle and Washington State.",
      path: "/contact",
      imageAlt: "Contact ATVAGA Design residential design studio",
    }),
});

const CONTACT_ITEMS = [
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Phone",
    value: SITE_PHONE_DISPLAY,
    href: SITE_PHONE_HREF,
    action: "Call",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Email",
    value: SITE_EMAIL,
    href: SITE_EMAIL_HREF,
    action: "Email",
  },
  {
    icon: <MapPin className="w-4 h-4" />,
    label: "Location",
    value: "Seattle, Washington",
    href: null,
    action: null,
  },
  {
    icon: <Clock className="w-4 h-4" />,
    label: "Office Hours",
    value: "Mon – Fri · 9am – 5pm",
    href: null,
    action: null,
  },
];

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Begin."
        description="Tell us about your residential project. We'll respond within 24 hours to schedule a consultation."
        sectionClassName="pt-28 pb-16"
        descriptionClassName="max-w-xl"
      />

      <section className="section-wrap pb-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Contact info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="grid gap-4">
              {CONTACT_ITEMS.map(({ icon, label, value, href, action }) => (
                <div key={label} className="surface-card group flex items-center justify-between p-6 transition-colors hover-border-brand-black">
                  {href ? (
                    <a href={href} className="flex items-center gap-4 flex-1">
                      <span className="text-brand-gray">{icon}</span>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-gray">{label}</p>
                        <p className="mt-0.5 text-sm text-brand-black">{value}</p>
                      </div>
                    </a>
                  ) : (
                    <span className="flex items-center gap-4 flex-1">
                      <span className="text-brand-gray">{icon}</span>
                      <div>
                        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-brand-gray">{label}</p>
                        <p className="mt-0.5 text-sm text-brand-black">{value}</p>
                      </div>
                    </span>
                  )}
                  {action && (
                    <span className="meta-label text-[0.6rem] transition-colors group-hover:text-brand-black">
                      {action}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Service area callout */}
            <div className="border-t border-border pt-8">
              <p className="meta-label mb-4">Service Area</p>
              <p className="font-heading text-[1.5rem] text-brand-black">Washington State</p>
              <p className="mt-3 text-sm leading-relaxed text-brand-gray">
                We serve residential clients throughout Seattle, Bellevue, Kirkland, Redmond, Bothell,
                Edmonds, Mukilteo, Sammamish, and the greater Washington State area.
              </p>
            </div>
          </div>

          {/* Lead form */}
          <div className="lg:col-span-7">
            <div className="surface-card p-8 md:p-12">
              <h2 className="mb-2 font-heading text-[2rem] text-brand-black">Send a Message</h2>
              <p className="mb-8 text-sm text-brand-gray">We respond within 24 hours.</p>
              <LeadForm source="contact_page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

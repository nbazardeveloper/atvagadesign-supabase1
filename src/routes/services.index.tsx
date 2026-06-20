import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { buildSeoMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services-data";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/services/")({
  component: Services,
  head: () =>
    buildSeoMeta({
      title: "Services | ADU Design, Permit Plans & Home Additions — ATVAGA Design",
      description:
        "Full range of residential design services: ADU design, permit plans, home additions, 3D renderings, city permit submittals and engineering coordination.",
      keywords: "residential design services, ADU design Seattle, permit plans Washington, home additions, 3D renderings, engineering coordination, DADU design",
      path: "/services",
      imageAlt: "ATVAGA Design residential design and permit services",
    }),
});

function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <>
      {/* Hero */}
      <section className="w-full pt-36 pb-12 px-5 md:px-10 lg:px-20">
        <div className="max-w-3xl">
          <span className="eyebrow">Catalog of Services</span>
          <h1 className="section-title mt-4">Our Services</h1>
          <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed text-brand-gray">
            We provide much more than just design. Our studio leads clients through the complete process of a build, seamlessly managing every phase from initial spatial planning through to final construction.
          </p>
        </div>
      </section>

      {/* Split Panel */}
      <section className="w-full pb-24 px-5 md:px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row border border-border bg-border gap-px min-h-[640px]">

          {/* LEFT — service list */}
          <div className="bg-[#f0ece6] lg:w-[38%] flex-shrink-0">
            {SERVICES.map((s, i) => (
              <button
                key={s.slug}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={[
                  "w-full text-left flex items-center gap-5 px-8 py-5 border-b border-border transition-all duration-200 group",
                  i === active
                    ? "bg-brand-charcoal text-white"
                    : "bg-[#f0ece6] hover:bg-[#e8e2da]",
                  i === SERVICES.length - 1 ? "border-b-0" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-heading text-2xl transition-colors duration-200 flex-shrink-0 w-8",
                    i === active ? "text-brand-pink" : "text-brand-black-20",
                  ].join(" ")}
                >
                  {s.n}
                </span>
                <div className="flex-1 min-w-0">
                  <p
                    className={[
                      "text-[0.8rem] font-bold uppercase tracking-widest transition-colors duration-200 truncate",
                      i === active ? "text-white" : "text-brand-black",
                    ].join(" ")}
                  >
                    {s.t}
                  </p>
                </div>
                <span
                  className={[
                    "text-lg transition-all duration-200 flex-shrink-0",
                    i === active ? "text-brand-pink translate-x-0 opacity-100" : "text-brand-black-20 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                  ].join(" ")}
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {/* RIGHT — detail panel */}
          <div className="bg-[#f0ece6] flex-1 flex flex-col lg:flex-row overflow-hidden">

            {/* Image */}
            <div className="lg:w-[45%] flex-shrink-0 relative overflow-hidden">
              {SERVICES.map((s, i) => (
                <div
                  key={s.slug}
                  className={[
                    "absolute inset-0 transition-opacity duration-500",
                    i === active ? "opacity-100" : "opacity-0 pointer-events-none",
                  ].join(" ")}
                >
                  <img
                    src={s.img}
                    alt={s.t}
                    className="h-full w-full object-cover object-center"
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f0ece6]/30" />
                </div>
              ))}
              {/* Mobile fallback height */}
              <div className="aspect-[4/3] lg:hidden" />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between p-8 md:p-10 lg:p-12 relative overflow-hidden">
              {SERVICES.map((s, i) => (
                <div
                  key={s.slug}
                  className={[
                    "absolute inset-0 p-8 md:p-10 lg:p-12 flex flex-col justify-between transition-all duration-400",
                    i === active
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 pointer-events-none",
                  ].join(" ")}
                >
                  <div>
                    <span className="font-heading text-5xl text-brand-black-20 leading-none">{s.n}</span>
                    <h2 className="font-heading text-[2.2rem] text-brand-black mt-3 leading-tight">{s.t}</h2>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-brand-gray max-w-sm">{s.d}</p>

                    <ul className="mt-8 space-y-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-[0.875rem] text-brand-black">
                          <span className="h-px w-5 bg-brand-pink flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact"
                      className="cta-dark px-8 py-3 text-[0.75rem] tracking-widest"
                    >
                      Get a Quote
                    </Link>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="cta-link text-[0.8rem]"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-brand-light py-24">
        <div className="w-full px-5 md:px-10 lg:px-20 text-center">
          <span className="eyebrow">Get Started</span>
          <h2 className="section-title">Every project is quoted individually.</h2>
          <p className="mt-6 text-brand-gray">
            Project scope, square footage, site conditions, and timeline all shape the proposal. Tell us about your project and we'll prepare a tailored estimate within 24 hours.
          </p>
          <Link
            to="/contact"
            className="cta-dark mt-10 px-10"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}

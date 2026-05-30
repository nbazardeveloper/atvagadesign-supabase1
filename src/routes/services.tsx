import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () =>
    buildSeoMeta({
      title: "Services | ADU Design, Permit Plans & Home Additions — ATVAGA Design",
      description:
        "Full range of residential design services: ADU design, permit plans, home additions, 3D renderings, city permit submittals and engineering coordination.",
      path: "/services",
      imageAlt: "ATVAGA Design residential design and permit services",
    }),
});

const SERVICES = [
  {
    n: "01",
    t: "Design Drawings",
    d: "Precise, permit-ready design drawings that communicate your vision clearly to contractors and city reviewers.",
    img: "/images/services/design-drawings.webp",
    items: ["Floor plan layout", "Elevation drawings", "Section views", "Dimension and annotation sets"],
  },
  {
    n: "02",
    t: "Permit Plans",
    d: "Comprehensive permit documentation packages built to Washington State municipal requirements for smooth approval.",
    img: "/images/services/permit-plans.webp",
    items: ["Site plans", "Structural notes", "Energy compliance", "Zoning compliance sheets"],
  },
  {
    n: "03",
    t: "ADU / DADU Design",
    d: "Detached and attached accessory dwelling unit design from concept to permit-ready drawings — maximizing your property value.",
    img: "/images/services/daduesign-card.jpg",
    items: ["Detached ADU (DADU)", "Attached ADU", "Garage conversions", "Basement ADU conversions"],
  },
  {
    n: "04",
    t: "Additions & Remodels",
    d: "Full-scope residential additions and interior remodel documentation, coordinated with structural engineers and city codes.",
    img: "/images/services/additions-remodels.webp",
    items: ["Room additions", "Second-story additions", "Kitchen & bath remodels", "Open-concept conversions"],
  },
  {
    n: "05",
    t: "Interior Layout Planning",
    d: "Functional interior space planning that balances livability, light flow, and code compliance.",
    img: "/images/services/interior-layout-planning.webp",
    items: ["Space planning", "Furniture layout", "Traffic flow analysis", "Accessibility reviews"],
  },
  {
    n: "06",
    t: "Exterior & Facade Improvements",
    d: "Facade redesign and exterior upgrade documentation to modernize curb appeal with permit-ready drawings.",
    img: "/images/services/exterior-facade-Improvements.webp",
    items: ["Facade redesigns", "Window & door changes", "Deck & porch additions", "Siding and cladding updates"],
  },
  {
    n: "07",
    t: "3D Renderings",
    d: "Photorealistic 3D visualizations that bring your project to life before a single nail is driven.",
    img: "/images/services/3D-renderings.webp",
    items: ["Exterior 3D views", "Interior renders", "360° virtual tours", "Before/after comparisons"],
  },
  {
    n: "08",
    t: "City Permit Submittals",
    d: "End-to-end permit submission management — we prepare, submit, track, and correct until approval is issued.",
    img: "/images/services/city-permit-submittals.webp",
    items: ["Online portal submissions", "Over-the-counter submittals", "Correction response packages", "Permit tracking"],
  },
  {
    n: "09",
    t: "Engineering Coordination",
    d: "Seamless coordination with licensed structural, geotechnical, and MEP engineers to complete your drawing set.",
    img: "/images/services/coordination-engineers.webp",
    items: ["Structural engineering liaison", "Geotechnical reports", "MEP coordination", "SEPA documentation"],
  },
];

function Services() {
  return (
    <>
      <PageHero
        eyebrow="Catalog of Services"
        title="Residential Design Services"
        description="From first concept sketch to final city approval — ATVAGA Design handles every stage of the residential design and permitting process across Washington State."
        sectionClassName="pt-28 pb-16"
        titleClassName="max-w-4xl"
        descriptionClassName="max-w-2xl"
      />

      {/* Services list */}
      <section className="section-wrap pb-24">
        <div className="grid gap-px border border-border bg-border">
          {SERVICES.map((s, i) => (
            <div key={s.n} className="bg-[#f0ece6] grid lg:grid-cols-12 gap-8 p-8 md:p-12">
              <div className="lg:col-span-1">
                <p className="font-heading text-3xl text-brand-black-20">{s.n}</p>
              </div>
              <div className="lg:col-span-3 hidden lg:block">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    className="h-full w-full object-cover object-center"
                    loading={i < 3 ? "eager" : "lazy"}
                  />
                </div>
              </div>
              <div className="lg:col-span-4">
                <h2 className="font-heading text-[2rem] text-brand-black">{s.t}</h2>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-brand-gray">{s.d}</p>
              </div>
              <div className="lg:col-span-3">
                <ul className="space-y-3 mt-3">
                  {s.items.map((item) => (
                    <li key={item} className="border-b border-border pb-3 text-sm text-brand-gray">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-1 flex lg:justify-end items-start">
                <Link
                  to="/contact"
                  className="cta-link whitespace-nowrap"
                >
                  Inquire →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-brand-light py-24">
        <div className="section-wrap text-center">
          <span className="eyebrow">Get Started</span>
          <h2 className="section-title">Every project is quoted individually.</h2>
          <p className="mt-6 text-brand-gray">
            Project scope, square footage, site conditions, and timeline all shape the proposal. Tell us about
            your project and we'll prepare a tailored estimate within 24 hours.
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

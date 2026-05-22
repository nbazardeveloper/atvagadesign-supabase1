import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () =>
    buildSeoMeta({
      title: "Services — Venetian Plaster, Microcement & More | Asti Designs",
      description: "Venetian plaster, microcement, Tadelakt and bespoke decorative wall finishes. Premium artisan services for residential and commercial interiors nationwide.",
      path: "/services",
      imageAlt: "Decorative plaster and microcement services by Asti Designs",
    }),
});

const services = [
  {
    n: "01",
    t: "Venetian Plaster",
    d: "Lime-based plasters polished to a soft sheen or mirror gloss. Authentic marmorino, stucco veneziano, and burnished finishes.",
    items: ["High-gloss veneziano", "Matte marmorino", "Burnished lime plaster", "Bathroom-grade waterproof Venetian"],
  },
  {
    n: "02",
    t: "Microcement & Concrete",
    d: "Seamless mineral coatings on walls, floors, and wet rooms. Industrial elegance with the refinement of plaster.",
    items: ["Architectural microcement", "Concrete cire", "Cement-look surfaces", "Wet-room application"],
  },
  {
    n: "03",
    t: "Custom Texturing",
    d: "Bespoke decorative surfaces — rustic relief, skip-trowel rhythms, cloud blending, metallics and velvet finishes.",
    items: ["Stone & travertine effects", "Metallic stucco", "Velvet & cloud finishes", "Sculptural relief textures"],
  },
];

function Services() {
  return (
    <>
      <section className="container-luxe pt-24 pb-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Catalog of Services</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-4xl">
            Surfaces, considered.
          </h1>
        </FadeIn>
      </section>

      <section className="container-luxe py-12">
        <div className="grid gap-px bg-border border border-border">
          {services.map((s, i) => (
            <FadeIn key={s.n} delay={i * 80}>
              <div className="bg-background grid lg:grid-cols-12 gap-8 p-10 md:p-14">
                <div className="lg:col-span-1">
                  <p className="font-display text-foreground/40 text-3xl">{s.n}</p>
                </div>
                <div className="lg:col-span-5">
                  <h2 className="font-display text-4xl md:text-5xl">{s.t}</h2>
                  <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">{s.d}</p>
                </div>
                <div className="lg:col-span-4">
                  <ul className="space-y-3 mt-3">
                    {s.items.map(item => (
                      <li key={item} className="text-sm border-b border-border pb-3">{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="lg:col-span-2 flex lg:justify-end items-start">
                  <Link to="/quote" className="text-[10px] uppercase tracking-[0.3em] link-underline">Estimate →</Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-24 mt-16">
        <div className="container-luxe text-center">
          <FadeIn>
            <h2 className="font-display text-5xl">Every project is quoted by hand.</h2>
            <p className="mt-6 text-muted-foreground">Material, square footage, wall condition, finish complexity — each variable shapes the proposal. Tell us about your space and we'll prepare a tailored estimate.</p>
            <Link to="/quote" className="mt-10 inline-flex items-center px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.3em]">Request Estimate</Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

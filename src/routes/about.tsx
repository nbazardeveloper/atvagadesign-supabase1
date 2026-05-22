import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  component: About,
  head: () =>
    buildSeoMeta({
      title: "About the Studio — Artisan Craftsmanship | Asti Designs",
      description: "The philosophy, craftsmanship and premium materials behind Asti Designs. A master-artisan studio devoted to Venetian plaster and decorative wall finishes.",
      path: "/about",
      imageAlt: "About Asti Designs decorative plaster studio",
    }),
});

function About() {
  return (
    <>
      <section className="container-luxe pt-24 pb-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">About the Studio</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] max-w-4xl">
            A studio for those who notice the wall.
          </h1>
        </FadeIn>
      </section>

      <section className="container-luxe py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          <FadeIn className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden border border-border bg-secondary">
              <img
                src="/images/master/master.webp"
                alt="Asti Designs artisan at work"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Philosophy</p>
              <h2 className="mt-4 font-display text-4xl">Patience, then precision.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                We treat plaster as a slow material. It cannot be rushed — and that is precisely what gives a finish its depth. Our work begins with listening: to the architecture, the light, and the way a room is lived in.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container-luxe grid md:grid-cols-3 gap-10">
          {[
            { t: "Hand-mixed materials", d: "Marble dust, lime putty, mineral pigments — sourced from European mills used by restoration ateliers." },
            { t: "One artisan per project", d: "A single master hand from first coat to final burnish. No subcontracting, no shortcuts." },
            { t: "Archival quality", d: "Finishes designed to outlast trends. A wall installed today will look right in thirty years." },
          ].map((p, i) => (
            <FadeIn key={p.t} delay={i * 80}>
              <div className="border-t border-foreground/30 pt-6">
                <h3 className="font-display text-2xl">{p.t}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container-luxe py-24">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="font-display text-5xl">Materials we work with.</h2>
            <p className="mt-4 text-muted-foreground">A curated palette of authentic, mineral-based finishes.</p>
          </div>
        </FadeIn>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {[
            "Venetian lime plaster", "Marmorino", "Microcement", "Tadelakt",
            "Travertine effect", "Concrete cire", "Metallic stucco", "Mineral paint",
          ].map((m) => (
            <div key={m} className="bg-background p-8">
              <p className="font-display text-xl">{m}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-luxe py-24 text-center">
        <FadeIn>
          <h2 className="font-display text-5xl max-w-3xl">Begin a conversation.</h2>
          <Link to="/quote" className="mt-10 inline-flex items-center px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.3em]">Request Estimate</Link>
        </FadeIn>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/site/FadeIn";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { LeadForm } from "@/components/site/LeadForm";
import { getPortfolioImageSrc } from "../lib/portfolio-images";
import { ArrowUpRight } from "lucide-react";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    buildSeoMeta({
      title: "Luxury Decorative Plaster & Venetian Finishes | Asti Designs",
      description: "Hand-crafted Venetian plaster, microcement and decorative wall finishes for premium interiors. Bespoke artisan work by a master craftsman.",
      path: "/",
      imageAlt: "Luxury Venetian plaster interior by Asti Designs",
    }),
});

function Home() {
  const { data: items = [] } = useQuery({
    queryKey: ["portfolio_items_home"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  return (
    <>
      {/* HERO — full-bleed edge-to-edge */}
      <section className="relative flex w-full flex-col overflow-hidden min-h-[calc(100svh-5rem)] md:block md:h-screen md:min-h-[680px]">
        <div
          className="absolute inset-0 hidden md:block bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: 'url("/images/hero/hero.webp")' }}
        />
        <div className="absolute inset-0 hidden md:block marble-bg opacity-60 mix-blend-overlay" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-foreground/80 via-foreground/45 via-50% to-transparent" />

        <div className="relative md:hidden w-full h-[43svh] min-h-[280px] max-h-[390px] overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: 'url("/images/hero/hero-mobile.webp")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-1 w-full flex-col justify-end px-6 py-6 md:h-full md:px-10 md:pb-24 lg:px-16">
          <FadeIn delay={120}>
            <h1 className="mt-5 font-display text-[clamp(2.35rem,7vw,9rem)] leading-[0.95] tracking-[-0.03em] text-balance max-w-[92vw] text-foreground md:mt-6 md:text-[clamp(3rem,9vw,9rem)] md:leading-[0.92] md:text-white">
              Venetian Plaster Seattle, WA
            </h1>
          </FadeIn>
          <FadeIn delay={240}>
            <p className="mt-5 max-w-xl text-sm md:mt-8 md:text-lg text-foreground/80 md:text-white/85 leading-relaxed">
              A master-artisan studio crafting bespoke Venetian plaster, microcement, and architectural finishes for luxury residences and commercial interiors that demand a singular signature. Serving Seattle, Bellevue, Redmond, Kirkland, and surrounding areas.
            </p>
          </FadeIn>
          <FadeIn delay={360}>
            <div className="mt-6 flex flex-col gap-3 md:mt-10 md:flex-row md:flex-wrap md:gap-4">
              <Link to="/quote" className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/85 transition md:w-auto md:px-8 md:py-4">
                Request Estimate <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/portfolio" className="inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 border border-foreground/20 text-foreground text-[10px] uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition md:w-auto md:px-8 md:py-4 md:border-white/70 md:text-white md:hover:bg-white md:hover:text-foreground md:backdrop-blur-sm md:bg-white/10">
                Explore Portfolio
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-24 w-full">
        <div className="w-full px-6 md:px-10 lg:px-12">
          <FadeIn>
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Selected Techniques</p>
                <h2 className="mt-4 font-display text-5xl md:text-6xl">Mastered techniques</h2>
              </div>
              <Link to="/portfolio" className="text-[10px] uppercase tracking-[0.3em] link-underline">View full archive →</Link>
            </div>
          </FadeIn>
        </div>

        {(() => {
          const featuredTitles = [
            "Polished Marble Effect",
            "Travertine Effect",
            "Concrete Effect",
            "Stone Texture",
            "Burnished Venetian Plaster",
            "Skip Trowel Texture",
          ];
          const featured = featuredTitles.map((t, idx) => {
            const match = items.find(
              (i) => i.title?.toLowerCase().trim() === t.toLowerCase()
            );
            return (
              match ?? {
                id: `static-${idx}`,
                title: t,
                category: "Signature Finish",
              }
            );
          });
          const layout = [
            { col: "md:col-span-2 lg:col-span-2", row: "md:row-span-2", aspect: "aspect-[4/5]" },
            { col: "md:col-span-2 lg:col-span-2", row: "", aspect: "aspect-[16/10]" },
            { col: "md:col-span-2 lg:col-span-1", row: "md:row-span-2", aspect: "aspect-[3/5]" },
            { col: "md:col-span-2 lg:col-span-1", row: "", aspect: "aspect-[4/3]" },
            { col: "md:col-span-2 lg:col-span-2", row: "md:row-span-2", aspect: "aspect-[5/6]" },
            { col: "md:col-span-2 lg:col-span-3", row: "", aspect: "aspect-[21/9]" },
          ];
          return (
            <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 auto-rows-auto gap-1">
              {featured.map((it, i) => {
                const l = layout[i];
                const imageSrc = getPortfolioImageSrc(it);
                return (
                  <FadeIn key={it.id} delay={i * 70} className={`${l.col} ${l.row}`}>
                    <Link to="/portfolio" className="group block h-full">
                      <div className={`relative ${l.aspect} h-full w-full overflow-hidden bg-secondary`}>
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={it.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="absolute inset-0 placeholder-tile transition-transform duration-700 ease-out group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />

                        <div
                          className={`absolute ${i % 2 === 0 ? "left-5 md:left-7" : "right-5 md:right-7"} bottom-5 md:bottom-7
                            backdrop-blur-md bg-white/30 border border-white/20
                            px-5 py-3 md:px-6 md:py-3.5
                            shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)]
                            transition-all duration-500
                            group-hover:-translate-y-1 group-hover:bg-white/40
                            group-hover:shadow-[0_14px_44px_-10px_rgba(0,0,0,0.4)]`}
                        >
                          <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-900/60">{it.category}</p>
                          <p className="mt-1 font-display text-base md:text-xl leading-tight text-zinc-900">{it.title}</p>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                );
              })}
            </div>
          );
        })()}
      </section>

      {/* MASTER ARTISAN */}
      <section className="py-32 bg-secondary">
        <div className="container-luxe grid lg:grid-cols-12 gap-12">
          <FadeIn className="lg:col-span-5">
            <div className="aspect-[3/4] overflow-hidden border border-border bg-background">
              <img
                src="/images/master/master.webp"
                alt="Master artisan applying Venetian plaster"
                className="h-full w-full object-cover"
              />
            </div>
          </FadeIn>
          <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-center">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">The Master Artisan</p>
              <h2 className="mt-6 font-display text-5xl md:text-6xl leading-[1.05]">The Visionaries Behind the Craft</h2>
            </FadeIn>
            <FadeIn delay={120}>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-xl">
                What began as a shared dream between husband and wife has grown into Asti Designs — a company rooted in creativity, craftsmanship, and genuine connection with the people we work with.
                <br />
                <br />
                Georgii specializes in the technical artistry behind our Venetian plaster and specialty finishes, combining years of experience with an exceptional eye for texture, movement, and detail. His meticulous application process is what gives each project its custom, high-end appearance.
                <br />
                <br />
                Chloe focuses on the client experience, design collaboration, and project coordination, helping guide each client from inspiration to completion with clear communication and thoughtful service.
                <br />
                <br />
                Together, we've created Asti Designs to be more than a finishing company — it's a reflection of our passion for craftsmanship, beauty, and creating spaces that feel one of a kind.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                {[["12+","Years"],["180+","Projects"],["100%","Hand-applied"]].map(([n,l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl">{n}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={280}>
              <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] link-underline">
                Read our philosophy →
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION */}
      <section className="py-32">
        <div className="container-luxe">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">The Transformation</p>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">Drag to reveal the difference.</h2>
              <p className="mt-6 text-muted-foreground">A plain wall becomes a surface with depth, tone, and quiet luxury.</p>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <BeforeAfter />
          </FadeIn>
        </div>
      </section>

      {/* WORK PROCESS — 3 pillars */}
      <section className="py-32 bg-secondary">
        <div className="container-luxe">
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">How We Work</p>
              <h2 className="mt-4 font-display text-5xl md:text-6xl">Three paths to your finish.</h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", t: "By Client Reference", d: "You bring the inspiration — an image, a hotel lobby, a Pinterest board. We replicate the spirit and surpass the execution." },
              { n: "02", t: "Master Techniques", d: "Choose from our curated catalog of seventeen signature finishes, refined over a decade of practice." },
              { n: "03", t: "Individual Author Finish", d: "A fully bespoke composition created for your space. One wall, one author, one of a kind." },
            ].map((p, i) => (
              <FadeIn key={p.n} delay={i * 100}>
                <div className="border-t border-foreground/30 pt-6 h-full">
                  <p className="font-display text-foreground/40 text-2xl">{p.n}</p>
                  <h3 className="mt-6 font-display text-2xl">{p.t}</h3>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-32">
        <div className="container-luxe">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-16">Client Voices</p>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { q: "Professional, talented, and detail-oriented. Asti Designs does beautiful work and clearly knows the craft. Georgii really know his Venetian Plaster!", a: "Travis Tracy", c: "Craft praised" },
              { q: "Asti Designs demonstrates an exceptional eye for design and detail. Their work is distinctive, and I've consistently been impressed by their professionalism and reliability. I would confidently recommend them to others.", a: "Jessica", c: "Strong recommendation" },
              { q: "What stands out is how well Chloe and Georgii communicate. Straightforward, responsive and easy to work with.", a: "Kim Bancroft", c: "Easy collaboration" },
            ].map((r, i) => (
              <FadeIn key={i} delay={i * 80}>
                <figure className="border-t border-border pt-8">
                  <blockquote className="font-display text-2xl leading-snug">"{r.q}"</blockquote>
                  <figcaption className="mt-8 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {r.a} · {r.c}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section className="py-32 bg-secondary">
        <div className="container-luxe">
          <FadeIn>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Where We Work</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl">Coverage area.</h2>
            <p className="mt-6 text-muted-foreground max-w-2xl">Service areas across the Seattle region, Eastside, South Sound, Kitsap Peninsula, and surrounding communities.</p>
            {(() => {
              const cities = [
                "Seattle",
                "Bellevue",
                "Redmond",
                "Kirkland",
                "Bothell",
                "Kenmore",
                "Shoreline",
                "Edmonds",
                "Lynnwood",
                "Mountlake Terrace",
                "Everett",
                "Mukilteo",
                "Mill Creek",
                "Snohomish",
                "Monroe",
                "Woodinville",
                "Issaquah",
                "Sammamish",
                "Renton",
                "Kent",
                "Auburn",
                "Federal Way",
                "Tacoma",
                "Gig Harbor",
                "Bremerton",
                "Silverdale",
                "Poulsbo",
                "Bainbridge Island",
                "Burien",
                "Des Moines",
                "SeaTac",
                "Tukwila",
                "Mercer Island",
                "Newcastle",
                "Covington",
                "Maple Valley",
                "Black Diamond",
                "North Bend",
                "Snoqualmie",
                "Carnation",
                "Duvall",
                "Lake Stevens",
                "Marysville",
                "Arlington",
                "Camano Island",
              ];

              return (
                <>
                  <ul className="mt-10 hidden gap-x-8 gap-y-3 text-sm sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {cities.map((city) => (
                      <li key={city} className="border-b border-border/60 pb-3 text-foreground/85">
                        {city}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 sm:hidden">
                    <ul className="grid gap-y-3 text-sm">
                      {cities.slice(0, 8).map((city) => (
                        <li key={city} className="border-b border-border/60 pb-3 text-foreground/85">
                          {city}
                        </li>
                      ))}
                    </ul>

                    <details className="mt-4 group">
                      <summary className="cursor-pointer list-none text-[10px] uppercase tracking-[0.3em] text-foreground/70">
                        <span className="group-open:hidden">Show all locations</span>
                        <span className="hidden group-open:inline">Hide locations</span>
                      </summary>
                      <ul className="mt-4 grid gap-y-3 text-sm">
                        {cities.slice(8).map((city) => (
                          <li key={city} className="border-b border-border/60 pb-3 text-foreground/85">
                            {city}
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </>
              );
            })()}
          </FadeIn>
        </div>
      </section>

      {/* CTA LEAD */}
      <section className="py-32">
        <div className="container-luxe grid lg:grid-cols-12 gap-12">
          <FadeIn className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Begin</p>
            <h2 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">Tell us about your project.</h2>
            <p className="mt-6 text-muted-foreground max-w-md">A short note is enough. We'll respond within 24 hours to schedule a consultation or studio visit.</p>
          </FadeIn>
          <FadeIn className="lg:col-span-7" delay={120}>
            <LeadForm source="home_cta" />
          </FadeIn>
        </div>
      </section>
    </>
  );
}

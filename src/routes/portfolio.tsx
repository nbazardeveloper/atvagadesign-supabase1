import { createFileRoute, useSearch, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FadeIn } from "@/components/site/FadeIn";
import { getPortfolioImageSrc } from "../lib/portfolio-images";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/portfolio")({
  component: Portfolio,
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  head: () =>
    buildSeoMeta({
      title: "Portfolio — Residential Design Projects | ATVAGA Design",
      description: "Explore completed ADU/DADU, home additions, remodels, and permit plan projects by ATVAGA Design across Seattle and Washington State.",
      path: "/portfolio",
      imageAlt: "Portfolio of residential design projects by ATVAGA Design",
    }),
});

function Portfolio() {
  const { category } = useSearch({ from: "/portfolio" });
  const navigate = useNavigate();
  const filter = category ?? "all";

  const setFilter = (cat: string) => {
    navigate({ to: "/portfolio", search: cat === "all" ? {} : { category: cat } });
  };

  const { data: items = [] } = useQuery({
    queryKey: ["portfolio_items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.category));
    return ["all", ...Array.from(set)];
  }, [items]);

  const visible = filter === "all" ? items : items.filter(i => i.category === filter);

  return (
    <>
      <section className="container-luxe pt-24 pb-12">
        <FadeIn>
          <span className="eyebrow">Portfolio Archive</span>
          <h1 className="mt-6 font-heading text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-brand-black">Selected Projects.</h1>
        </FadeIn>
      </section>

      <section className="container-luxe py-8">
        <div className="flex flex-wrap gap-2 border-b border-border pb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.25em] border transition ${
                filter === c ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="w-full pb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {visible.map((it, i) => (
            <FadeIn key={it.id} delay={i * 30}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  {getPortfolioImageSrc(it) ? (
                    <img
                      src={getPortfolioImageSrc(it) ?? undefined}
                      alt={it.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 placeholder-tile transition-transform duration-700 ease-out group-hover:scale-105" />
                  )}
                  <div className="absolute left-5 bottom-5 backdrop-blur-md bg-white/30 border border-white/20 px-5 py-3 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.18)] transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-white/40 group-hover:shadow-[0_14px_44px_-10px_rgba(0,0,0,0.4)]">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-900/60">{it.category}</p>
                    <p className="mt-1 font-heading text-lg leading-tight text-zinc-900">{it.title}</p>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}

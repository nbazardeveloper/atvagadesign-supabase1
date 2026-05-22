import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () =>
    buildSeoMeta({
      title: "FAQ — Venetian Plaster & Microcement Questions | Asti Designs",
      description: "Common questions about Venetian plaster and microcement: durability, project timelines, surface preparation, bathroom suitability and maintenance.",
      path: "/faq",
      imageAlt: "FAQ about Venetian plaster and microcement by Asti Designs",
    }),
});

const faqs = [
  { q: "How durable is Venetian plaster?", a: "Properly applied lime plaster lasts decades and only deepens in character. It is harder than gypsum, resistant to mold, and breathable — ideal for both residential and commercial interiors." },
  { q: "How long does a project take?", a: "Most residential walls take three to seven working days per room, depending on finish complexity, surface preparation and drying conditions. We provide a precise timeline with every estimate." },
  { q: "What preparation is required?", a: "Walls must be smooth, dust-free and primed. For new builds we coordinate with your contractor; for renovations we handle full surface preparation, including patching and skim-coating." },
  { q: "Can plaster be used in bathrooms?", a: "Yes. We apply waterproof Venetian plaster and Tadelakt finishes designed for wet zones, including shower enclosures, with proper sealing." },
  { q: "How is it cleaned and maintained?", a: "A soft cloth with mild soap is sufficient. Lime plaster is inherently antibacterial. We provide a care guide with every installation." },
  { q: "Do you work outside the metropolitan area?", a: "Yes — select projects nationwide. Travel and accommodation are quoted as part of the estimate." },
  { q: "Can you match a specific reference image?", a: "Almost always. Bring an inspiration image and we'll prepare physical samples on your wall before any work begins." },
  { q: "What is the cost range?", a: "Pricing varies by finish, square footage, and substrate condition. Most projects fall between premium painting and natural stone cladding. Every estimate is hand-prepared." },
];

function Faq() {
  return (
    <>
      <section className="container-luxe pt-24 pb-16">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Frequently Asked</p>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em]">Questions answered.</h1>
        </FadeIn>
      </section>

      <section className="container-luxe pb-32">
        <div className="max-w-3xl">
          <FadeIn>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`q-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-7 text-left font-display text-xl md:text-2xl hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-7 text-base">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

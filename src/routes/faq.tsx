import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  component: Faq,
  head: () =>
    buildSeoMeta({
      title: "FAQ — Permits, ADU Design & Residential Projects | ATVAGA Design",
      description:
        "Common questions about residential permits, ADU/DADU design, city submittals, and the design process in Washington State. Answered by ATVAGA Design.",
      path: "/faq",
      keywords: "ADU permit FAQ, residential design questions, permit timeline Washington, DADU permit requirements",
      imageAlt: "FAQ about residential design and permits by ATVAGA Design",
    }),
});

const FAQ_CATEGORIES = [
  {
    category: "Permits & Approvals",
    faqs: [
      {
        q: "How long does permit approval take in Washington State?",
        a: "Permit timelines vary by municipality and project complexity. In Seattle, over-the-counter permits for simple projects may be issued same-day, while larger ADU or addition projects typically take 4–12 weeks. We track every submission and respond promptly to city corrections to minimize delays.",
      },
      {
        q: "What documents are required for a residential permit?",
        a: "Most residential permits require a site plan, floor plans, elevations, energy code compliance documentation, and structural details. For ADUs, additional requirements may include owner-occupancy affidavits and utility connection plans. We prepare the complete package.",
      },
      {
        q: "Do I need a permit for an ADU or DADU?",
        a: "Yes. Accessory dwelling units require building permits in all Washington State jurisdictions. Requirements vary by city — Seattle, Bellevue, Kirkland, and other municipalities each have specific ADU codes regarding setbacks, lot coverage, and size limits. We handle the full permitting process.",
      },
    ],
  },
  {
    category: "ADU & DADU Design",
    faqs: [
      {
        q: "What is the difference between an ADU and a DADU?",
        a: "An ADU (Accessory Dwelling Unit) is a secondary living space on a property — it can be attached to the main home or detached. A DADU (Detached Accessory Dwelling Unit) specifically refers to a standalone structure separate from the main residence, such as a backyard cottage or converted garage.",
      },
      {
        q: "How large can a detached ADU be in Seattle?",
        a: "In Seattle, DADUs can be up to 1,000 square feet (not including the garage). Maximum height is typically 24 feet, though this depends on lot size, zone, and proximity to lot lines. We conduct a full zoning analysis for each project to identify the maximum buildable envelope.",
      },
      {
        q: "Do you work with engineers on ADU projects?",
        a: "Yes. Most ADU projects require structural engineering for foundations and framing. We coordinate directly with licensed structural engineers to integrate their calculations into the permit drawing set, providing a single cohesive package for city review.",
      },
    ],
  },
  {
    category: "Process & Pricing",
    faqs: [
      {
        q: "How does the design process work from start to finish?",
        a: "Our process begins with a free discovery call where we assess your goals, site, and budget. From there we move into schematic design, design development, and permit documentation. We then handle city submission and track the project through to permit issuance. Most projects take 6–12 weeks from kickoff to permit approval.",
      },
      {
        q: "How much do your design and permit services cost?",
        a: "Pricing depends on project scope, square footage, and complexity. Permit plan packages for a DADU typically start around $3,500–$6,500. Full-service design and permit packages for additions and remodels are quoted individually. Contact us for a project-specific estimate.",
      },
      {
        q: "Do you work on projects outside the Seattle area?",
        a: "Yes. We serve clients throughout Washington State including Bellevue, Kirkland, Redmond, Bothell, Edmonds, Mukilteo, Sammamish, and many other communities. Remote consultations and digital-first workflows make us accessible across the state.",
      },
    ],
  },
];

function Faq() {
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked"
        title="Questions Answered"
        description="Everything you need to know about residential design, permits, ADU construction, and working with ATVAGA."
        sectionClassName="pt-28 pb-16"
        descriptionClassName="max-w-2xl"
      />

      {/* FAQ sections */}
      <section className="section-wrap pb-32">
        <div className="max-w-4xl">
          {FAQ_CATEGORIES.map(({ category, faqs }) => (
            <div key={category} className="mb-14">
              <h2 className="mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-brand-pink">
                {category}
              </h2>
              <Accordion
                type="single"
                collapsible
                defaultValue={`${category}-0`}
                className="w-full"
              >
                {faqs.map((f, i) => (
                  <AccordionItem key={i} value={`${category}-${i}`} className="border-b border-border">
                    <AccordionTrigger className="py-7 text-left font-heading text-xl transition-colors hover:no-underline hover-text-brand-pink md:text-2xl text-brand-black">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-7 text-base leading-relaxed text-brand-gray">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-brand-light py-24">
        <div className="section-wrap text-center">
          <span className="eyebrow">Still have questions?</span>
          <h2 className="section-title">Let's talk about your project.</h2>
          <p className="mt-6 text-brand-gray">
            Every project is unique. Schedule a free 30-minute consultation and we'll answer all your
            questions about design, permitting, and timelines specific to your site.
          </p>
          <Link
            to="/contact"
            className="cta-dark mt-10 px-10"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}

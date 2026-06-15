import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/3d-rendering")({
  component: ThreeDRendering,
  head: () =>
    buildSeoMeta({
      title: "3D Rendering Services — Photorealistic Visualization | ATVAGA Design",
      description:
        "Photorealistic 3D renderings and virtual tours for residential projects in Seattle and Washington State. See your design before it's built.",
      path: "/3d-rendering",
      keywords: "3D rendering services Seattle, residential visualization Washington, photorealistic renders, virtual tour design",
      imageAlt: "3D rendering of residential project by ATVAGA Design",
    }),
});

const OFFERINGS = [
  {
    title: "360° Virtual Tours",
    description: "Immersive walkthroughs of your future home — navigate every room at full resolution before construction begins.",
    img: "/images/services/3D-renderings.webp",
  },
  {
    title: "3D Animation",
    description: "Cinematic fly-through animations ideal for client presentations, investor packages, or listing marketing.",
    img: "/images/services/design-drawings.webp",
  },
  {
    title: "Exterior Visualization",
    description: "Photorealistic exterior views with accurate lighting, landscaping, and material representation.",
    img: "/images/services/additions-remodels.webp",
  },
  {
    title: "Interior Renders",
    description: "Detailed interior visualizations capturing finishes, furniture, lighting, and spatial proportions.",
    img: "/images/services/interior-layout-planning.webp",
  },
  {
    title: "Before / After Comparisons",
    description: "Side-by-side renders showing existing conditions versus proposed design — powerful for approvals and marketing.",
    img: "/images/services/exterior-facade-Improvements.webp",
  },
  {
    title: "Material & Finish Studies",
    description: "Focused renders to evaluate cladding, color palettes, and material combinations before any purchase commitments.",
    img: "/images/services/city-permit-submittals.webp",
  },
];

const HIGHLIGHTS = [
  {
    title: "Photorealistic Quality",
    body: "Studio-grade lighting and ray-traced rendering deliver images indistinguishable from photography.",
  },
  {
    title: "Fast Turnaround",
    body: "Most residential render packages are delivered within 5–7 business days with revision rounds included.",
  },
  {
    title: "Integrated with Design",
    body: "3D visualization is built directly from our design drawings, ensuring accuracy and eliminating re-modeling costs.",
  },
  {
    title: "Client-Ready Formats",
    body: "Deliverables in print-ready PDF, web-optimized JPEG, and interactive HTML formats for every use case.",
  },
];

function ThreeDRendering() {
  return (
    <>
      <PageHero
        eyebrow="Visualization Services"
        title="3D Rendering & Visualization"
        description="See your project in full photorealistic detail before construction begins. Our 3D visualization service bridges the gap between design drawings and built reality."
        tone="dark"
        sectionClassName="bg-brand-charcoal pt-28 pb-20"
        titleClassName="max-w-4xl"
        descriptionClassName="max-w-2xl"
        backgroundImageSrc="/images/services/3D-renderings.webp"
        backgroundImageAlt="3D rendering of a modern residence"
        backgroundImageClassName="opacity-30"
        overlayClassName="bg-[linear-gradient(180deg,rgba(10,10,10,0.6)_0%,rgba(10,10,10,0.85)_100%)]"
      >
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link to="/contact" className="cta-brand px-8">
            Request Renders
          </Link>
          <Link to="/portfolio" className="cta-light-outline px-8">
            View Portfolio
          </Link>
        </div>
      </PageHero>

      {/* Offerings grid */}
      <section className="w-full bg-[#f0ece6] py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro">
            <span className="eyebrow">What's Included</span>
            <h2 className="section-title">Rendering Services</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERINGS.map(({ title, description, img }) => (
              <article key={title} className="surface-card group overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="px-6 py-6">
                  <h3 className="font-heading text-[1.35rem] text-brand-black">{title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-brand-gray">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="w-full bg-brand-light py-24 lg:py-32">
        <div className="section-wrap">
          <div className="section-intro flex flex-col items-center text-center">
            <span className="eyebrow">Why It Matters</span>
            <h2 className="section-title">The ATVAGA Rendering Difference</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHTS.map(({ title, body }, i) => (
              <div key={title} className="surface-card flex flex-col px-8 py-8">
                <span className="font-heading text-[3rem] leading-none text-brand-pink/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-black">{title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-brand-gray">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-brand-black py-24">
        <div className="section-wrap text-center">
          <h2 className="text-white">See Your Project Before It's Built</h2>
          <p className="mt-6 text-white/60">
            3D rendering is available as a standalone service or as an add-on to any design package.
            Contact us to discuss your visualization needs.
          </p>
          <Link
            to="/contact"
            className="cta-brand-light-hover mt-10 px-10"
          >
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}

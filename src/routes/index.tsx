import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { LeadForm } from "@/components/site/LeadForm";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    buildSeoMeta({
      title: "ATVAGA Designs | ADU & Residential Design Services in Washington State",
      description:
        "Modern residential design, ADU plans, permit-ready drawings and home additions in Seattle, Bellevue, Kirkland, Tacoma and surrounding areas. Fast turnaround. City permit submittals.",
      keywords:
        "ADU design Washington, permit plans Seattle, permit plans Bellevue, home addition design, residential remodel design, ADU permit Seattle",
      path: "/",
      imageAlt: "ATVAGA Designs residential project",
    }),
});

/* ── Data ──────────────────────────────────────────── */
const SHOWCASE_ITEMS = [
  { title: "Design Drawings", src: "/images/services/design-drawings.webp" },
  { title: "Permit Plans", src: "/images/services/permit-plans.webp" },
  { title: "ADU/DADU Design", src: "/images/services/daduesign-card.jpg" },
  { title: "Additions & Remodels", src: "/images/services/additions-remodels.webp" },
  { title: "Interior Layout Planning", src: "/images/services/interior-layout-planning.webp" },
  { title: "Exterior & Facade", src: "/images/services/exterior-facade-Improvements.webp" },
  { title: "3D Renderings", src: "/images/services/3D-renderings.webp" },
  { title: "City Permit Submittals", src: "/images/services/city-permit-submittals.webp" },
  { title: "Engineering Coordination", src: "/images/services/coordination-engineers.webp" },
  { title: "Residential Design", src: "/images/services/desidential-design-services.webp" },
];

const WHY_CHOOSE = [
  {
    title: "Permit Coordination",
    body: "We handle the bureaucracy. From zoning analysis to final permit issuance, we navigate the city requirements so you don't have to.",
  },
  {
    title: "Design Aesthetics",
    body: "Minimalist principles meet functional living. We create spaces that feel expansive, intentional, and timelessly modern.",
  },
  {
    title: "Technical Precision",
    body: "Our plans are engineered for clarity, reducing contractor friction and ensuring the build stays true to the design vision.",
  },
  {
    title: "WA State Expertise",
    body: "Deep knowledge of local Washington State codes and environmental regulations for urban and suburban projects.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    body: "We learn about your project goals, site constraints, budget, and timeline during a complimentary 30-minute consultation.",
  },
  {
    number: "02",
    title: "Concept & Design",
    body: "Schematic drawings and design development that translate your vision into precise, beautiful design drawings.",
  },
  {
    number: "03",
    title: "Permit Documentation",
    body: "Full permit-ready drawing sets engineered for clarity and built to meet Washington State municipal requirements.",
  },
  {
    number: "04",
    title: "City Submittal",
    body: "We coordinate the submission, track city review progress, and respond to all corrections until approval is issued.",
  },
];

const PORTFOLIO_PROJECTS = [
  {
    title: "Maple Valley ADU",
    type: "Detached ADU",
    city: "Maple Valley, WA",
    src: "/images/projects/detachedadu.webp",
  },
  {
    title: "Bellevue Modern Addition",
    type: "Home Addition",
    city: "Bellevue, WA",
    src: "/images/projects/homeedition.webp",
  },
  {
    title: "Capitol Hill Remodel",
    type: "Full Remodel",
    city: "Seattle, WA",
    src: "/images/projects/fullremodel.webp",
  },
];

const CITIES = [
  {
    name: "Seattle",
    badge: "King County",
    src: "/images/serving-state/seattle.webp",
    description: "Urban ADU solutions, additions, and permit-ready residential designs across Seattle's dynamic neighborhoods.",
  },
  {
    name: "Bellevue",
    badge: "Eastside",
    src: "/images/serving-state/bellevue.webp",
    description: "Luxury residential design and full permit services for Bellevue's premier waterfront and hilltop homes.",
  },
  {
    name: "Kirkland",
    badge: "Lake Washington",
    src: "/images/serving-state/kirkland.webp",
    description: "Waterfront ADU projects and residential remodels along the shores of Lake Washington.",
  },
  {
    name: "Redmond",
    badge: "Eastside",
    src: "/images/serving-state/redmond.webp",
    description: "Modern residential design for Redmond's tech-forward community and growing suburban neighborhoods.",
  },
  {
    name: "Bothell",
    badge: "North King / Snohomish",
    src: "/images/projects/residential/Summit_at_Canyon_Park,_Bothell,_WA_view_1.webp",
    description: "Residential design support for Bothell neighborhoods, townhome communities, and growing suburban developments.",
  },
  {
    name: "Edmonds",
    badge: "Snohomish County",
    src: "/images/projects/residential/Town_Squire_Condominiums,__Edmonds,_WA_(1).webp",
    description: "Coastal residential design drawings and permit planning for Edmonds homes and condominium properties.",
  },
  {
    name: "Mukilteo",
    badge: "Puget Sound",
    src: "/images/projects/residential/Losvar_Condos_Mukilteo,_WA.webp",
    description: "Permit-ready residential design support for Mukilteo waterfront homes, condos, and renovation projects.",
  },
  {
    name: "Sammamish",
    badge: "Eastside",
    src: "/images/projects/residential/Sammamish_WA.webp",
    description: "Custom residential design drawings for Sammamish homes, additions, and carefully detailed remodels.",
  },
];

const TESTIMONIALS = [
  {
    quote: "The permit process seemed impossible until we met the ATVAGA team. They handled everything with the city of Seattle and our ADU is now under construction!",
    author: "James D.",
    location: "Homeowner, Seattle",
    initials: "JD",
  },
  {
    quote: "Modern aesthetics combined with deep technical knowledge. Their drawings were clean, professional, and approved with a single correction.",
    author: "Sarah L.",
    location: "Investor, Bellevue",
    initials: "SL",
  },
  {
    quote: "Highly recommend for anyone doing a major remodel. They listened to our needs and created a plan that was both stunning and practical.",
    author: "Mark K.",
    location: "General Contractor",
    initials: "MK",
  },
  {
    quote: "ATVAGA brought clarity to every step of the process. Their permit set was incredibly organized and made coordination with consultants much easier.",
    author: "Elena P.",
    location: "Property Owner, Kirkland",
    initials: "EP",
  },
];

/* ── Page ──────────────────────────────────────────── */
function Home() {
  const servicesScrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollServices = (direction: "prev" | "next") => {
    const scroller = servicesScrollerRef.current;
    if (!scroller) return;

    const step = Math.min(scroller.clientWidth * 0.82, 420);
    scroller.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative flex min-h-screen w-full items-end overflow-hidden bg-[#3a3a3c]">
        {/* Mobile hero image */}
        <img
          src="/images/hero/hero-mobil.webp"
          alt="ATVAGA residential project exterior"
          className="absolute inset-0 h-full w-full object-cover object-center md:hidden"
        />
        {/* Desktop hero image */}
        <img
          src="/images/hero/hero.webp"
          alt="ATVAGA residential project exterior"
          className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.22)_0%,rgba(7,7,7,0.08)_28%,rgba(7,7,7,0.24)_60%,rgba(7,7,7,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_28%,rgba(255,177,114,0.42),transparent_34%),radial-gradient(circle_at_78%_78%,rgba(10,10,10,0.2),transparent_32%)]" />

        <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-end px-5 pb-12 pt-24 md:px-8 md:pb-16 lg:px-10 xl:px-12">
          <p className="max-w-3xl text-xl font-light leading-tight text-white md:text-[1.9rem] lg:text-[2.2rem]">
            We turn your ideas into accurate, permit-ready construction drawings.
            Stress-free design services for homeowners, contractors, and real estate agents across Washington State.
          </p>
          <h1 className="mt-8 -mb-[0.08em] w-full font-italiana text-[20vw] font-light leading-[0.88] tracking-[-0.035em] text-white sm:text-[16.5vw] md:text-[15.1vw] md:leading-[0.9] lg:text-[14.2vw] xl:text-[13.6vw]">
            <span className="block md:inline">ATVAGA</span>{" "}
            <span className="block md:inline">DESIGN</span>
          </h1>
          <div className="mt-10 flex flex-col gap-4 pb-4 sm:flex-row">
            <Link to="/contact" className="cta-brand px-8">
              Start Your Project
            </Link>
            <Link to="/portfolio" className="cta-glass-light px-8">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVICES CAROUSEL ───────────────────────────── */}
      <section className="w-full bg-white py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">What We Do</span>
                <h2 className="section-title">Our Services</h2>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <button
                type="button"
                onClick={() => scrollServices("prev")}
                aria-label="Scroll services left"
                className="icon-button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollServices("next")}
                aria-label="Scroll services right"
                className="icon-button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div
            ref={servicesScrollerRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {SHOWCASE_ITEMS.map(({ title, src }) => (
              <Link
                key={title}
                to="/services"
                className="group relative block w-[14.5rem] shrink-0 snap-start overflow-hidden bg-white sm:w-[15.5rem] lg:w-[16.75rem]"
              >
                <div className="bg-white px-4 pt-4">
                  <div className="relative aspect-[0.8/1] overflow-hidden rounded-t-[50%] bg-brand-light">
                    <img
                      src={src}
                      alt={title}
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-brand-black-20 transition-colors group-hover:bg-brand-black-10" />
                  </div>
                </div>
                <div className="flex min-h-[4.75rem] items-center bg-white px-4 py-4">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-black">{title}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => scrollServices("prev")}
              aria-label="Scroll services left"
              className="icon-button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollServices("next")}
              aria-label="Scroll services right"
              className="icon-button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-10 text-center">
            <Link to="/services" className="cta-dark px-10">
              All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── VISIONARY SPACES ────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-brand-charcoal">
        <div className="relative h-[38vh] min-h-[16rem] w-full md:hidden">
          <img
            src="/images/visionary/hero-visionary.webp"
            alt="Visionary residential exterior project"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="relative w-full md:h-[calc(100svh-72px)] md:min-h-[42rem]">
          <img
            src="/images/visionary/hero-visionary.webp"
            alt="Visionary residential exterior project"
            className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
          />
          <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(10,10,10,0.1)_0%,rgba(10,10,10,0.04)_45%,rgba(10,10,10,0.18)_100%)] md:block" />

          <div className="relative z-10 flex w-full flex-col md:h-full md:w-1/2 md:justify-start">
            <div className="flex w-full flex-col md:h-[75%]">
            {/* Text block */}
            <div className="bg-brand-charcoal px-5 py-10 md:flex-1 md:px-0 md:py-0">
              <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block" />
                <div className="flex h-full items-center md:pr-10">
                  <div className="flex max-w-xl flex-col text-left">
                    <span className="text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-brand-gray">
                      Residential Design &amp; Permit Services
                    </span>
                    <h2 className="mt-5 text-[clamp(3.25rem,3.6vw,3.625rem)] leading-[1.02] text-white">
                      Visionary Spaces
                      <br />
                      Permit Ready
                    </h2>
                    <p className="mt-6 text-[0.875rem] leading-relaxed text-white/70">
                      ATVAGA Designs provides expert design drawings and permit plans for homeowners and
                      developers across Seattle, Bellevue, and beyond. From initial concept to final city
                      permit approval, we transform your vision into aesthetic, code-compliant residential solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* CTA strip */}
            <div className="bg-brand-light px-5 py-6 md:px-0 md:py-0 md:h-[80px]">
              <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                <div className="hidden md:block" />
                <div className="flex h-full items-center md:pr-10">
                  <Link to="/portfolio" className="cta-brand px-8">
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ATVAGA ───────────────────────────── */}
      <section className="w-full bg-white py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.03fr_1.45fr] lg:gap-8">
            <div className="flex flex-col justify-between gap-10 lg:min-h-[23.5rem]">
              <div className="max-w-[32rem]">
                <span className="eyebrow">Why Us</span>
                <h2 className="section-title">Why Choose ATVAGA</h2>
                <p className="mt-6 max-w-[31rem] text-[1.05rem] leading-[1.65] tracking-[0.01em] text-brand-gray">
                  We specialize in the complex intersection of high-end design aesthetics and municipal building
                  codes. Our team ensures your vision isn't just beautiful — it's buildable.
                </p>
              </div>
              {/* Rating badge */}
              <div className="flex min-h-[5.9rem] items-center border border-[#ebe7e3] bg-[#f8f5f2] px-8 py-6 lg:max-w-[32rem]">
                <div className="flex items-center gap-4 text-brand-pink">
                  <span className="text-[1.9rem] leading-none tracking-[0.08em]">★★★★★</span>
                  <div className="flex flex-col">
                    <span className="text-[1.05rem] font-semibold leading-none text-brand-black">4.9 / 5.0</span>
                    <span className="mt-1 text-[0.72rem] uppercase tracking-[0.18em] text-brand-gray">Google Reviews</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {WHY_CHOOSE.map(({ title, body }) => (
                <article
                  key={title}
                  className="min-h-[10.6rem] border border-[#ebe7e3] bg-white px-7 py-7 lg:px-8"
                >
                  <h3 className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-brand-black">{title}</h3>
                  <p className="mt-4 max-w-[22rem] text-[1rem] leading-[1.65] tracking-[0.01em] text-brand-gray">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ─────────────────────────────────────── */}
      <section className="w-full bg-brand-light py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro flex flex-col items-center text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">From Vision to Permit</h2>
          </div>
          <div className="grid grid-cols-1 gap-px bg-[#dedad7] sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map(({ number, title, body }) => (
              <div key={number} className="flex flex-col bg-brand-light px-8 py-10">
                <span className="font-italiana text-[4rem] leading-none text-brand-pink/25">{number}</span>
                <h3 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-brand-black">{title}</h3>
                <p className="mt-4 text-[0.875rem] leading-relaxed text-brand-gray">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADU / DADU FEATURE ──────────────────────────── */}
      <section className="w-full overflow-hidden bg-white py-24 lg:py-40">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Image + stat badge */}
            <div className="relative mx-auto w-[78%] lg:w-full">
              <div className="relative aspect-[15/16] overflow-hidden">
                <img
                  src="/images/services/daduesign-card.jpg"
                  alt="ADU interior project by ATVAGA Designs"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 z-10 translate-x-[22%] translate-y-[28%] bg-brand-pink px-[4.875rem] py-9">
                <p className="font-italiana text-[4.5rem] leading-none text-white">150+</p>
                <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/90">Projects Completed</p>
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <span className="eyebrow">ADU &amp; DADU</span>
              <h2 className="section-title">
                <span className="block">Modern ADU/DADU Design &amp;</span>
                <span className="block">Permit Solutions</span>
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-brand-gray">
                ATVAGA Designs specializes in detached and attached ADU solutions throughout Washington State.
                We handle the entire lifecycle of your project — from site analysis and design drafting to
                engineering coordination and city submittals.
              </p>
              <div className="mt-10">
                <Link
                  to="/portfolio"
                  className="cta-link"
                >
                  View ADU Projects →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ───────────────────────────── */}
      <section className="w-full bg-brand-charcoal py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="mb-14 flex items-end justify-between">
            <div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-pink">Portfolio</span>
              <h2 className="mt-4 text-white">Featured Projects</h2>
            </div>
            <Link
              to="/portfolio"
              className="hidden text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/40 hover:text-white transition-colors md:block"
            >
              View All Projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PORTFOLIO_PROJECTS.map(({ title, type, city, src }) => (
              <Link key={title} to="/portfolio" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={src}
                    alt={title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-black-25 transition-colors group-hover:bg-brand-black-10" />
                  <div className="absolute left-4 top-4 border border-brand-pink-50 bg-brand-black-60 px-3 py-1">
                    <span className="text-[0.58rem] font-semibold uppercase tracking-widest text-brand-pink">{type}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="font-italiana text-[1.45rem] leading-snug text-white transition-colors group-hover:text-brand-pink">{title}</h3>
                  <p className="mt-1 text-[0.72rem] uppercase tracking-widest text-brand-gray">{city}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 md:hidden">
            <Link
              to="/portfolio"
              className="cta-light-outline w-full justify-center"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVING WASHINGTON STATE ─────────────────────── */}
      <section className="w-full bg-white py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro">
            <span className="eyebrow">Service Area</span>
            <h2 className="section-title">Serving Washington State</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CITIES.map(({ name, badge, src, description }) => (
              <article key={name} className="surface-card group overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={src}
                    alt={`${name}, WA`}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="px-5 py-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-italiana text-[1.5rem] text-brand-black">{name}</h3>
                    <span className="mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-brand-pink">{badge}</span>
                  </div>
                  <p className="mt-3 text-[0.8rem] leading-relaxed text-brand-gray">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────── */}
      <section className="w-full bg-brand-light py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro flex flex-col items-center text-center">
            <span className="eyebrow">Client Voices</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {TESTIMONIALS.map(({ quote, author, location, initials }) => (
              <blockquote
                key={author}
                className="flex min-h-[14rem] flex-col border border-[#dedad7] bg-white px-5 py-5 lg:px-6"
              >
                <div className="mb-5 text-[0.9rem] leading-none tracking-[0.18em] text-brand-pink">★★★★★</div>
                <p className="flex-1 font-italiana text-[1.05rem] leading-[1.65] text-brand-black-78">"{quote}"</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-brand-light pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#f1e8eb] text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-brand-pink">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-black">{author}</p>
                    <p className="mt-1 text-[0.6rem] text-brand-gray">{location}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + LEAD FORM ──────────────────────────────── */}
      <section className="w-full py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <span className="eyebrow">Get Started</span>
              <h2 className="mt-4 text-brand-black">Tell us about your project.</h2>
              <p className="mt-6 max-w-md text-brand-gray">
                A short note is enough. We'll respond within 24 hours to schedule a consultation.
              </p>
            </div>
            <div className="lg:col-span-7">
              <LeadForm source="home_cta" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

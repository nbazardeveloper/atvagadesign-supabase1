import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { LeadForm } from "@/components/site/LeadForm";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  component: Home,
  head: () =>
    buildSeoMeta({
      title: "ATVAGA Design | ADU & Residential Design Services in Washington State",
      description:
        "Modern residential design, ADU plans, permit-ready drawings and home additions in Seattle, Bellevue, Kirkland, Tacoma and surrounding areas. Fast turnaround. City permit submittals.",
      keywords:
        "ADU design Washington, permit plans Seattle, permit plans Bellevue, home addition design, residential remodel design, ADU permit Seattle",
      path: "/",
      imageAlt: "ATVAGA Design residential project",
    }),
});

/* ── Data ──────────────────────────────────────────── */
const SHOWCASE_ITEMS = [
  { title: "Design Drawings", src: "/images/services/design-drawings.webp" },
  { title: "Permit Plans", src: "/images/services/permit-plans.webp" },
  { title: "ADU/DADU Design", src: "/images/services/daduesign-card.webp" },
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

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=atvaga&rlz=1C1JQPG_enUS1210US1213&oq=at&gs_lcrp=EgZjaHJvbWUqBggAEEUYOzIGCAAQRRg7MgYIARBFGDkyEAgCEC4YxwEYsQMY0QMYgAQyDQgDEAAYgwEYsQMYgAQyEAgEEC4YxwEYsQMY0QMYgAQyCggFEAAYsQMYgAQyEAgGEC4YxwEYsQMY0QMYgAQyDQgHEAAYgwEYsQMYgAQyDQgIEC4YgwEYsQMYgATSAQkyNzAyajBqMTWoAgiwAgHxBQkgRBoo7qhG&sourceid=chrome&ie=UTF-8#lrd=0x54900747738a3831:0xfa3d7b07626d4ab2,1,,,,";

const PORTFOLIO_PROJECTS = [
  {
    title: "Residential Projects",
    type: "residential",
    city: "Washington State",
    src: "/images/projects/detachedadu.webp",
  },
  {
    title: "Commercial Projects",
    type: "commercial",
    city: "Washington State",
    src: "/images/projects/homeedition.webp",
  },
  {
    title: "Permit Plans",
    type: "Permit Plans",
    city: "Washington State",
    src: "/images/projects/fullremodel.webp",
  },
];

const CITIES = [
  {
    name: "Seattle",
    badge: "King County",
    src: "/images/serving-state/seattle.webp",
    description: "Multi-level luxury townhomes featuring modern architectural lines, expansive private balconies, integrated garages, and premium structural additions tailored for upscale urban living.",
  },
  {
    name: "Bellevue",
    badge: "Eastside",
    src: "/images/serving-state/bellevue.webp",
    description: "Premium waterfront mid-rise condominium complex with private marina access, featuring an extensive pier, dedicated boat slips, and panoramic lakeside views.",
  },
  {
    name: "Kirkland",
    badge: "Lake Washington",
    src: "/images/serving-state/kirkland.webp",
    description: "Multi-family mixed-use development showcasing a contemporary facade, ground-floor commercial or retail storefront spaces, and mid-rise residential apartments above.",
  },
  {
    name: "Redmond",
    badge: "Eastside",
    src: "/images/serving-state/redmond.webp",
    description: "A massive, ultra-modern mid-rise apartment complex utilizing sleek dark-paneled architecture, expansive structural glazing, and multi-tier private balconies.",
  },
  {
    name: "Bothell",
    badge: "North King / Snohomish",
    src: "/images/serving-state/bothell.webp",
    description: "Contemporary multi-story apartment block featuring distinct geometric window bays, integrated ground-level parking garages, and urban streetscape integration.",
  },
  {
    name: "Edmonds",
    badge: "Snohomish County",
    src: "/images/serving-state/edmonds.webp",
    description: "Corporate commercial plaza with a soaring glass atrium facade, expansive polished concrete walkways, and open-concept architectural engineering.",
  },
  {
    name: "Mukilteo",
    badge: "Puget Sound",
    src: "/images/serving-state/mukilteo.webp",
    description: "Modern civic center or community facility showcasing dramatic, sharp-angled rooflines, a clean industrial-style aesthetic, and manicured perimeter landscaping.",
  },
  {
    name: "Sammamish",
    badge: "Eastside",
    src: "/images/serving-state/sammamish.webp",
    description: "High-ceilinged Scandinavian-inspired custom cabin or modern pavilion, featuring massive floor-to-ceiling glass windows and an open timber-frame structure.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Have hired them a few times to do my permit documents and never fail to show me they are rockstars! 1000% recommended for permit drawings and anything that has to do with professional quality renderings and animations. I can't thank them enough!",
    author: "Gabriel Vargas",
    location: "Verified Google Review",
    initials: "GV",
  },
  {
    quote: "Working with Atvaga on my project has been absolutely amazing. They offer outstanding service, deliver high quality work, and are readily available to answer questions and address feedback. Would recommend 10/10.",
    author: "Jaime E. Garcia",
    location: "Verified Google Review",
    initials: "JG",
  },
  {
    quote: "I hired Atvaga to do my permits for a flip home and I was super impressed with the quality of work. The team did the plans and submitted for permit within two weeks. This is my go-to architect now.",
    author: "Andrey K.",
    location: "Verified Google Review",
    initials: "AK",
  },
  {
    quote: "Responsive, courteous and qualified design team — they pay great attention to details. Highly recommended.",
    author: "Hazim Alwaali",
    location: "Verified Google Review",
    initials: "HA",
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
        {/* Text legibility gradient — left half only, fades right */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(to_right,rgba(7,7,7,0.55)_0%,transparent_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] w-full flex-col items-start justify-end px-5 pt-24 pb-16 md:px-8 md:pb-20 lg:px-10 xl:px-12">
          <h1 className="w-full font-heading text-[10vw] font-light leading-[0.9] tracking-[-0.035em] text-white sm:text-[8vw] md:text-[5.5vw] lg:text-[5vw] xl:text-[4.6vw]">
            <span className="block">PERMIT READY</span>
            <span className="block">DESIGN &amp; DRAFTING</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/80 md:text-[1.25rem]">
            We turn your ideas into accurate, permit-ready construction drawings.
            Stress-free design services for homeowners, contractors, and real estate agents across Washington State.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
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
      <section className="w-full bg-[#f0ece6] py-24 lg:py-32">
        {/* Header */}
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow">What We Do</span>
              <h2 className="section-title">Our Services</h2>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-brand-gray">
                Beyond Design. Complete Project Execution. — We provide much more than just conceptual design. Our studio guides clients through the entire lifecycle of a build—from initial feasibility planning and city permitting to final construction.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Feasibility Studies & Programming", "Concept Design", "Schematic Design", "Design Development", "Permitting"].map((item) => (
                  <span key={item} className="border border-border px-3 py-1 text-[0.72rem] uppercase tracking-[0.15em] text-brand-gray">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="hidden shrink-0 items-center gap-3 md:flex">
              <button type="button" onClick={() => scrollServices("prev")} aria-label="Scroll services left" className="icon-button">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => scrollServices("next")} aria-label="Scroll services right" className="icon-button">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Cards — full bleed, stretch to fill window on desktop */}
        <div
          ref={servicesScrollerRef}
          className="no-scrollbar mt-10 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {SHOWCASE_ITEMS.map(({ title, src }) => (
            <Link
              key={title}
              to="/services"
              className="group relative flex flex-col min-w-[16rem] flex-1 shrink-0 snap-start bg-[#f0ece6]"
            >
              <div className="px-2 pt-2">
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
              <div className="flex min-h-[4.75rem] items-center px-4 py-4">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-brand-black">{title}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile scroll arrows */}
        <div className="mt-6 flex items-center justify-center gap-3 md:hidden">
          <button type="button" onClick={() => scrollServices("prev")} aria-label="Scroll services left" className="icon-button">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => scrollServices("next")} aria-label="Scroll services right" className="icon-button">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-10 w-full px-5 text-center md:px-10 lg:px-20">
          <Link to="/services" className="cta-dark px-10">
            All Services
          </Link>
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
                      ATVAGA Design provides expert design drawings and permit plans for homeowners and
                      developers across Seattle, Bellevue, and beyond. From initial concept to final city
                      permit approval, we transform your vision into aesthetic, code-compliant residential solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* CTA strip */}
            <div className="bg-[#f0ece6] px-5 py-6 md:px-0 md:py-0 md:h-[80px]">
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
      <section className="w-full bg-[#f0ece6] py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.03fr_1.45fr] lg:gap-8">
            <div className="flex flex-col justify-between gap-10 lg:min-h-[23.5rem]">
              <div className="max-w-[32rem]">
                <span className="eyebrow">Why Us</span>
                <h2 className="section-title">Why Choose ATVAGA</h2>
                <p className="mt-6 max-w-[31rem] text-[0.9375rem] leading-[1.65] text-brand-gray">
                  We specialize in the complex intersection of high-end design aesthetics and municipal building
                  codes. Our team ensures your vision isn't just beautiful — it's buildable.
                </p>
              </div>
              {/* Rating badges */}
              <div className="flex flex-col gap-3 lg:max-w-[32rem]">
                {/* Google */}
                <div className="flex min-h-[5.9rem] items-center border border-[#ebe7e3] bg-[#f8f5f2] px-8 py-6">
                  <div className="flex items-center gap-5">
                    <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                      <path fill="#EA4335" d="M24 9.5c3.1 0 5.8 1.1 8 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.7l7 5.4C12.4 13.6 17.7 9.5 24 9.5z"/>
                      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.4 5.7c4.3-4 6.8-9.9 6.8-16.9z"/>
                      <path fill="#FBBC05" d="M10.7 28.1A14.6 14.6 0 0 1 9.5 24c0-1.4.2-2.8.6-4.1l-7-5.4A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l8.1-6.7z"/>
                      <path fill="#34A853" d="M24 47c5.5 0 10.2-1.8 13.6-4.9l-7.4-5.7c-1.8 1.2-4.2 2-6.2 2-6.3 0-11.6-4.2-13.3-9.9l-8.1 6.7C7 42.3 14.8 47 24 47z"/>
                    </svg>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[1.05rem] font-semibold leading-none text-brand-black">Google Reviews</span>
                        <span className="text-brand-pink leading-none">★★★★★</span>
                      </div>
                      <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noreferrer" className="mt-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-brand-gray underline underline-offset-4 transition-colors hover:text-brand-black">
                        See Current Rating
                      </a>
                    </div>
                  </div>
                </div>
                {/* Thumbtack */}
                <div className="flex min-h-[5.9rem] items-center border border-[#ebe7e3] bg-[#f8f5f2] px-8 py-6">
                  <div className="flex items-center gap-5">
                    <svg width="36" height="36" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Thumbtack">
                      <circle cx="24" cy="24" r="24" fill="#009FD9"/>
                      <path fill="#fff" d="M32.5 14H15.5a1.5 1.5 0 0 0-1.06 2.56L22 24.12V34a1 1 0 0 0 1.45.89l4-2A1 1 0 0 0 28 32v-7.88l7.56-7.56A1.5 1.5 0 0 0 32.5 14z"/>
                    </svg>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[1.05rem] font-semibold leading-none text-brand-black">Thumbtack</span>
                        <span className="text-brand-pink leading-none">★★★★</span>
                      </div>
                      <a href="https://www.thumbtack.com/wa/edmonds/architects/atvaga-design-llc-building-permit-drawings/service/421109884370501643?utm_medium=web&utm_source=txt&surface=sp&referrer_pk=421109884215058443" target="_blank" rel="noreferrer" className="mt-1.5 text-[0.72rem] uppercase tracking-[0.18em] text-brand-gray underline underline-offset-4 transition-colors hover:text-brand-black">
                        See Our Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {WHY_CHOOSE.map(({ title, body }) => (
                <article
                  key={title}
                  className="min-h-[10.6rem] border border-[#ebe7e3] bg-[#f0ece6] px-7 py-7 lg:px-8"
                >
                  <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-brand-black">{title}</h3>
                  <p className="mt-4 max-w-[22rem] text-[0.9375rem] leading-[1.65] text-brand-gray">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT PHASES ──────────────────────────────── */}
      <section className="w-full bg-brand-light py-24 lg:py-32">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="section-intro flex flex-col items-center text-center">
            <span className="eyebrow">How It Works</span>
            <h2 className="section-title">Project Phases</h2>
          </div>
          <div className="grid grid-cols-1 gap-px bg-[#dedad7] sm:grid-cols-2 lg:grid-cols-5">
            {[
              { number: "01", title: "Feasibility Studies & Programming", body: "We analyze site constraints, local zoning codes, and project requirements to establish a solid, realistic foundation for your build." },
              { number: "02", title: "Concept Design", body: "We explore initial spatial layouts, massing, and design directions, translating your vision into a clear conceptual framework." },
              { number: "03", title: "Schematic Design", body: "We refine the approved concept into detailed schematic drawings, defining precise scales, exterior forms, and interior relationships." },
              { number: "04", title: "Design Development", body: "We finalize structural specifications, material selections, and technical details, preparing the project for structural accuracy." },
              { number: "05", title: "Permitting", body: "We compile and manage the complete documentation package, guiding it through local jurisdictions to secure all necessary city approvals." },
            ].map(({ number, title, body }) => (
              <div key={number} className="flex flex-col bg-brand-light px-8 py-10">
                <span className="font-heading text-[4rem] leading-none text-brand-pink/25">{number}</span>
                <h3 className="mt-6 text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-brand-black">{title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-brand-gray">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADU / DADU FEATURE ──────────────────────────── */}
      <section className="w-full overflow-hidden bg-[#f0ece6] py-24 lg:py-40">
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Image + stat badge */}
            <div className="relative mx-auto w-[78%] lg:w-full">
              <div className="relative aspect-[15/16] overflow-hidden">
                <img
                  src="/images/services/daduesign-card.webp"
                  alt="ADU interior project by ATVAGA Design"
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 right-0 z-10 translate-x-[22%] translate-y-[28%] bg-brand-pink px-[4.875rem] py-9">
                <p className="font-heading text-[4.5rem] leading-none text-white">150+</p>
                <p className="mt-2 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white/90">Projects Completed</p>
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col">
              <span className="eyebrow">ADU &amp; DADU</span>
              <h2 className="section-title">
                <span className="block">Modern ADU & DADU Design</span>
                <span className="block">Complete Drafting & Permit Solutions</span>
              </h2>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-brand-gray">
                ATVAGA Design specializes in detached and attached ADU solutions throughout Washington State.
                We handle the entire lifecycle of your project — from site analysis and design drafting to
                engineering coordination and city submittals.
              </p>
              <div className="mt-10">
                <Link
                  to="/portfolio"
                  search={{ category: "ADU/DADU" }}
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
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-brand-pink">Portfolio</span>
              <h2 className="mt-4 text-white">Featured Projects</h2>
            </div>
            <Link
              to="/portfolio"
              className="hidden text-[0.75rem] font-bold uppercase tracking-[0.18em] text-white/40 hover:text-white transition-colors md:block"
            >
              View All Projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PORTFOLIO_PROJECTS.map(({ title, type, city, src }) => (
              <Link key={title} to="/portfolio" search={{ category: type }} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={src}
                    alt={title}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-brand-black-25 transition-colors group-hover:bg-brand-black-10" />
                  <div className="absolute left-4 top-4 border border-brand-pink-50 bg-brand-black-60 px-3 py-1">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-widest text-brand-pink">{type}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <h3 className="font-heading text-[1.45rem] leading-snug text-white transition-colors group-hover:text-brand-pink">{title}</h3>
                  <p className="mt-1 text-[0.75rem] uppercase tracking-widest text-brand-gray">{city}</p>
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
      <section className="w-full bg-[#f0ece6] py-24 lg:py-32">
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
                    <h3 className="font-heading text-[1.5rem] text-brand-black">{name}</h3>
                    <span className="mt-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-brand-pink">{badge}</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-brand-gray">{description}</p>
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
                className="flex min-h-[14rem] flex-col border border-[#dedad7] bg-[#f0ece6] px-5 py-5 lg:px-6"
              >
                <div className="mb-5 text-[0.9rem] leading-none tracking-[0.18em] text-brand-pink">★★★★★</div>
                <p className="flex-1 text-[0.9375rem] leading-[1.65] text-brand-black-78">"{quote}"</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-brand-light pt-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#f1e8eb] text-[0.72rem] font-semibold uppercase tracking-[0.05em] text-brand-pink">
                    {initials}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-brand-black">{author}</p>
                    <p className="mt-1 text-[0.72rem] text-brand-gray">{location}</p>
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

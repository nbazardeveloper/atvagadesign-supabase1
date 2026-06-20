import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { buildSeoMeta } from "@/lib/seo";
import { SERVICES } from "@/lib/services-data";
import { LeadForm } from "@/components/site/LeadForm";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetail,
  head: ({ params }) => {
    const svc = SERVICES.find((s) => s.slug === params.slug);
    if (!svc) return {};
    return buildSeoMeta({
      title: `${svc.t} | ATVAGA Design`,
      description: svc.d,
      keywords: `${svc.t.toLowerCase()}, residential design Washington, ATVAGA Design`,
      path: `/services/${svc.slug}`,
      imageAlt: `ATVAGA Design — ${svc.t}`,
    });
  },
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const svc = SERVICES.find((s) => s.slug === slug);

  if (!svc) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <p className="text-[0.72rem] uppercase tracking-[0.25em] text-brand-gray">Not Found</p>
          <h1 className="mt-4 font-heading text-5xl text-brand-black">Service not found</h1>
          <Link to="/services" className="cta-dark mt-8 px-8 py-3">
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const currentIdx = SERVICES.findIndex((s) => s.slug === slug);
  const prev = currentIdx > 0 ? SERVICES[currentIdx - 1] : null;
  const next = currentIdx < SERVICES.length - 1 ? SERVICES[currentIdx + 1] : null;

  return (
    <>
      <PageHero
        eyebrow={`Service ${svc.n}`}
        title={svc.t}
        description={svc.d}
        sectionClassName="pt-28 pb-16"
        titleClassName="max-w-3xl"
        descriptionClassName="max-w-2xl"
      />

      {/* Main content */}
      <section className="w-full pb-24 px-5 md:px-10 lg:px-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Image */}
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] overflow-hidden" style={{ borderRadius: "50% 50% 0 0 / 40% 40% 0 0" }}>
              <img
                src={svc.img}
                alt={svc.t}
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <h2 className="font-heading text-[2rem] text-brand-black">What's included</h2>
            <p className="mt-6 text-[0.9375rem] leading-[1.85] text-brand-gray">{svc.details}</p>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link to="/contact" className="cta-dark px-10 py-3 text-[0.75rem] tracking-widest">
                Get a Quote
              </Link>
              <Link to="/services/" className="cta-link text-[0.8rem]">
                ← All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <section className="w-full border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prev ? (
              <Link
                to="/services/$slug"
                params={{ slug: prev.slug }}
                className="flex flex-col gap-1 px-8 md:px-12 py-8 hover:bg-[#e8e2da] transition-colors border-r border-border group"
              >
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-brand-gray">Previous</span>
                <span className="font-heading text-xl text-brand-black group-hover:text-brand-pink transition-colors">
                  ← {prev.t}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next && (
              <Link
                to="/services/$slug"
                params={{ slug: next.slug }}
                className="flex flex-col gap-1 px-8 md:px-12 py-8 hover:bg-[#e8e2da] transition-colors text-right group"
              >
                <span className="text-[0.72rem] uppercase tracking-[0.18em] text-brand-gray">Next</span>
                <span className="font-heading text-xl text-brand-black group-hover:text-brand-pink transition-colors">
                  {next.t} →
                </span>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* CTA + Lead form */}
      <section className="w-full py-32 bg-brand-light">
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
              <LeadForm source={`service_${svc.slug}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

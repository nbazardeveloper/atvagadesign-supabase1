import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { FadeIn } from "@/components/site/FadeIn";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { buildSeoMeta } from "@/lib/seo";

type TeamMember = Tables<"team_members">;

const VALUES = [
  {
    index: "01",
    title: "Modern Design",
    description:
      "Clean, functional residential design drawings shaped around the way people actually live, remodel, and expand their homes.",
  },
  {
    index: "02",
    title: "Permit-Ready",
    description:
      "Clear drawing sets prepared with practical construction logic so reviewers, consultants, and builders can move efficiently.",
  },
  {
    index: "03",
    title: "Client-First",
    description:
      "Every project is tailored to the client's goals, budget, and timeline, with direct communication from first concept through delivery.",
  },
];

export const Route = createFileRoute("/about")({
  component: About,
  head: () =>
    buildSeoMeta({
      title: "About Us | ATVAGA Design — Residential Design Team",
      description:
        "Meet the ATVAGA Design team. Expert residential designers and drafting professionals serving homeowners, investors and contractors in Washington State.",
      path: "/about",
      keywords: "ATVAGA Design team, residential designers Seattle, design studio Washington State, ADU design experts",
      imageAlt: "About ATVAGA Design residential design studio",
    }),
});

function About() {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ["team_members_active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      return (data ?? []) as TeamMember[];
    },
  });

  return (
    <>
      <section className="w-full bg-[#f6f1ea] pt-28 pb-20 md:pb-24">
        <div className="container-luxe">
          <FadeIn>
            <span className="eyebrow">About</span>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <h1 className="mt-6 text-brand-black lg:col-span-7">Designing spaces. Building futures.</h1>
              <p className="text-[1.05rem] leading-[1.65] text-brand-gray md:text-[1.1rem] lg:col-span-5 lg:pb-3">
                ATVAGA Design combines design aesthetics with practical construction knowledge to deliver
                clear residential design solutions for remodels, additions, ADUs, and exterior improvements.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="w-full bg-[#f0ece6] py-20 md:py-24">
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <FadeIn>
            <div className="aspect-[5/4] overflow-hidden bg-[linear-gradient(135deg,#ede5da_0%,#f8f4ed_52%,#e6ddd1_100%)]">
              <div className="flex h-full flex-col justify-between p-8 md:p-10">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand-gray">
                  Image Placeholder
                </span>
                <p className="text-sm leading-relaxed text-brand-gray md:w-[72%]">
                  Replace this area with a team or studio image that reflects ATVAGA's process and project work.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <span className="eyebrow">Company Story</span>
            <h2 className="section-title">Who we are</h2>
            <p className="mt-8 text-[0.9375rem] leading-[1.7] text-brand-gray md:text-[1rem]">
              ATVAGA Design creates modern, functional, and permit-ready residential designs tailored to
              each client's vision and budget. We work with homeowners, real estate investors, developers,
              and general contractors throughout Washington State and Southern California, with projects
              completed across both regions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FOUNDER ──────────────────────────────────────── */}
      <section className="w-full bg-[#f6f1ea] py-20 md:py-28">
        <div className="container-luxe">
          <FadeIn>
            <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20 lg:items-center">
              {/* Text */}
              <div>
                <span className="eyebrow">Founder</span>
                <h2 className="section-title">Meet the founder</h2>
                <p className="mt-2 text-[1.05rem] font-heading text-brand-pink">Name · Title</p>
                <p className="mt-6 text-[0.9375rem] leading-[1.7] text-brand-gray">
                  Add the founder's story here — her background, what inspired her to start ATVAGA Design,
                  her expertise in residential design and permitting, and what drives her vision for the company.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-[1.7] text-brand-gray">
                  A second paragraph about her approach to design, her connection to Washington State, or
                  what makes her work meaningful to clients.
                </p>
              </div>

              {/* Photo */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/founder/rihanna.webp"
                  alt="ATVAGA Design founder"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="w-full bg-[#fbfaf8] py-20 md:py-24">
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center">
              <span className="eyebrow">Team</span>
              <h2 className="section-title">Meet the team</h2>
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
            {(isLoading ? Array.from({ length: 3 }) : teamMembers).map((member, index) => {
              const isPlaceholder = !member;

              return (
                <FadeIn key={member?.id ?? `placeholder-${index}`} delay={index * 40}>
                  <article className="flex h-full flex-col">
                    <div className="aspect-[3/4] overflow-hidden bg-[#ece6dc]">
                      {member?.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-end bg-[linear-gradient(180deg,#f6f1ea_0%,#e7ddd1_100%)] p-6">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand-gray">
                            {isPlaceholder ? "Loading" : "Photo Placeholder"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-heading text-xl font-medium leading-snug text-brand-black">
                            {member?.name ?? "Loading team member"}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-brand-gray">
                            {member?.role ?? "Please add team members in the admin panel."}
                          </p>
                        </div>
                        {member?.linkedin_url ? (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${member.name} LinkedIn profile`}
                            className="mt-1 text-brand-gray transition-colors hover-text-brand-black"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        ) : null}
                      </div>
                      <p className="mt-4 text-[0.9375rem] leading-[1.7] text-brand-gray">
                        {member?.bio ?? "Team bios will appear here once active profiles are added to the CMS."}
                      </p>
                    </div>
                  </article>
                </FadeIn>
              );
            })}
          </div>

          {!isLoading && teamMembers.length === 0 ? (
            <p className="mt-10 text-center text-sm text-brand-gray">
              No active team members are published yet.
            </p>
          ) : null}
        </div>
      </section>

      <section className="w-full bg-[#f0ece6] py-20 md:py-24">
        <div className="container-luxe">
          <FadeIn>
            <div className="text-center">
              <span className="eyebrow">Values</span>
              <h2 className="section-title">How we approach every project</h2>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {VALUES.map(({ index, title, description }, itemIndex) => (
              <FadeIn key={title} delay={itemIndex * 40}>
                <div>
                  <p className="font-heading text-[3rem] leading-none text-brand-pink">{index}</p>
                  <h3 className="mt-6 font-heading text-[1.3rem] font-medium text-brand-black">{title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.7] text-brand-gray">{description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-brand-charcoal py-24 text-center text-white">
        <div className="container-luxe">
          <FadeIn>
            <h2>Planning a remodel, addition, or ADU?</h2>
            <p className="mt-6 text-white/70">
              Tell us about your project and we will help you move from ideas to a clear, permit-ready set.
            </p>
            <Link
              to="/contact"
              className="cta-brand mt-10 px-10"
            >
              Contact Us
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

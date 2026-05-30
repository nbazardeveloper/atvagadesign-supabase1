import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { submitLead } from "../lib/lead-submission";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  component: Quote,
  head: () =>
    buildSeoMeta({
      title: "Request a Quote — Residential Design & Permit Plans | ATVAGA Design",
      description:
        "Get a tailored estimate for your residential design, ADU/DADU, permit plans, or remodel project. Every quote is prepared individually by ATVAGA Design.",
      path: "/quote",
      imageAlt: "Request a quote from ATVAGA Design",
    }),
});

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  project_details: z.string().trim().max(5000),
});

function Quote() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    serviceType: "",
    sqft: "",
    projectStage: "",
    timeline: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    propertyAddress: "",
    notes: "",
  });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async () => {
    const details = `Service type: ${form.serviceType}\nProject size: ${form.sqft}\nProject stage: ${form.projectStage}\nTimeline: ${form.timeline}\nProperty address: ${form.propertyAddress}\nNotes: ${form.notes}`;
    const parsed = schema.safeParse({
      name: `${form.firstName} ${form.lastName}`.trim(),
      phone: form.phone,
      email: form.email || undefined,
      project_details: details,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please complete the form");
      return;
    }
    setSubmitting(true);
    const { error } = await submitLead({
      first_name: form.firstName,
      last_name: form.lastName,
      phone: form.phone,
      email: form.email || null,
      property_name: null,
      property_address: form.propertyAddress || null,
      project_details: details,
      marketing_consent: false,
      source: "quote_form",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setDone(true);
  };

  const steps = [
    {
      label: "Service type",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "ADU / DADU Design",
            "Home Addition",
            "Full Remodel",
            "Permit Plans Only",
            "3D Rendering",
            "Design Drawings",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => { update("serviceType", opt); setStep(1); }}
              className={`p-6 border text-left text-sm transition-colors ${
                form.serviceType === opt
                  ? "border-brand-black bg-brand-black text-white"
                  : "border-border hover-border-brand-black"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Approximate project size",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Under 500 sq ft",
            "500 – 1,000 sq ft",
            "1,000 – 2,500 sq ft",
            "Over 2,500 sq ft",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => { update("sqft", opt); setStep(2); }}
              className={`p-6 border text-left text-sm transition-colors ${
                form.sqft === opt
                  ? "border-brand-black bg-brand-black text-white"
                  : "border-border hover-border-brand-black"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Project stage",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Early planning — exploring options",
            "Ready to start design",
            "Need permit drawings only",
            "Already have plans — need permit help",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => { update("projectStage", opt); setStep(3); }}
              className={`p-6 border text-left text-sm transition-colors ${
                form.projectStage === opt
                  ? "border-brand-black bg-brand-black text-white"
                  : "border-border hover-border-brand-black"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Timeline",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "ASAP — urgent",
            "Within 1–2 months",
            "3–6 months out",
            "Planning stage — flexible",
          ].map((opt) => (
            <button
              key={opt}
              onClick={() => { update("timeline", opt); setStep(4); }}
              className={`p-6 border text-left text-sm transition-colors ${
                form.timeline === opt
                  ? "border-brand-black bg-brand-black text-white"
                  : "border-border hover-border-brand-black"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ),
    },
    {
      label: "Your details",
      content: (
        <div className="grid md:grid-cols-2 gap-5">
          <Input label="First Name *" value={form.firstName} onChange={(v) => update("firstName", v)} />
          <Input label="Last Name *" value={form.lastName} onChange={(v) => update("lastName", v)} />
          <Input label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} />
          <Input label="Phone *" type="tel" value={form.phone} onChange={(v) => update("phone", v)} />
          <Input label="Property Street Address" value={form.propertyAddress} onChange={(v) => update("propertyAddress", v)} className="md:col-span-2" />
          <div className="md:col-span-2">
            <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.25em] text-brand-gray">
              Additional notes
            </label>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="input-underline resize-none"
              placeholder="Any details about goals, timeline, or constraints"
            />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => setStep(3)}
              className="btn-base border border-border px-8 text-brand-gray transition-colors hover-border-brand-black hover-text-brand-black"
            >
              Back
            </button>
            <button
              onClick={submit}
              disabled={submitting}
              className="cta-dark px-10 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Submit Request"}
            </button>
          </div>
        </div>
      ),
    },
  ];

  if (done) {
    return (
      <section className="section-wrap py-32 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center border border-brand-black">
          <Check className="w-6 h-6" />
        </div>
        <h1 className="mt-8 font-heading text-5xl text-brand-black">Thank You.</h1>
        <p className="mt-4 text-brand-gray">
          Your request has been received. We'll respond within 24 hours to schedule a consultation.
        </p>
      </section>
    );
  }

  return (
    <>
      <section className="section-wrap pt-28 pb-12">
        <span className="eyebrow">Step {step + 1} of {steps.length}</span>
        <h1 className="mt-6 font-heading text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1] text-brand-black">
          Request Your Estimate.
        </h1>
        <div className="mt-8 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-px flex-1 transition-colors ${i <= step ? "bg-brand-black" : "bg-border"}`}
            />
          ))}
        </div>
      </section>

      <section className="section-wrap pb-32">
        <p className="mb-6 text-[0.65rem] uppercase tracking-[0.3em] text-brand-gray">
          {steps[step].label}
        </p>
        {steps[step].content}
      </section>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.25em] text-brand-gray">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className="input-underline"
      />
    </div>
  );
}

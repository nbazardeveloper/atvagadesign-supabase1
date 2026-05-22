import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/site/FadeIn";
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
      title: "Request a Free Estimate | Asti Designs",
      description: "Receive a tailored estimate for your decorative plaster, microcement or Venetian finish project. Every quote is hand-prepared by the studio.",
      path: "/quote",
      imageAlt: "Request a decorative plaster estimate from Asti Designs",
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
    finish: "",
    size: "",
    walls: "",
    timeline: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const update = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async () => {
    const details = `Finish preference: ${form.finish}\nProject size: ${form.size}\nWall condition: ${form.walls}\nTimeline: ${form.timeline}\nNotes: ${form.notes}`;
    const parsed = schema.safeParse({
      name: form.name, phone: form.phone, email: form.email || undefined, project_details: details,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please complete the form");
      return;
    }
    setSubmitting(true);
    const { error } = await submitLead({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      project_details: details,
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
      label: "Finish preference",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {["Venetian plaster", "Microcement / concrete", "Stone or metallic effect", "Bespoke / custom"].map(opt => (
            <button
              key={opt}
              onClick={() => { update("finish", opt); setStep(1); }}
              className={`p-6 border text-left text-sm transition ${form.finish === opt ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >{opt}</button>
          ))}
        </div>
      ),
    },
    {
      label: "Project size",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {["Single wall / feature", "1–2 rooms", "Whole residence", "Commercial / large-scale"].map(opt => (
            <button
              key={opt}
              onClick={() => { update("size", opt); setStep(2); }}
              className={`p-6 border text-left text-sm transition ${form.size === opt ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >{opt}</button>
          ))}
        </div>
      ),
    },
    {
      label: "Wall condition",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {["New construction, primed", "Existing painted walls", "Needs significant prep", "Not sure — please advise"].map(opt => (
            <button
              key={opt}
              onClick={() => { update("walls", opt); setStep(3); }}
              className={`p-6 border text-left text-sm transition ${form.walls === opt ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >{opt}</button>
          ))}
        </div>
      ),
    },
    {
      label: "Timeline",
      content: (
        <div className="grid sm:grid-cols-2 gap-3">
          {["Within 1 month", "1–3 months", "3–6 months", "Planning / flexible"].map(opt => (
            <button
              key={opt}
              onClick={() => { update("timeline", opt); setStep(4); }}
              className={`p-6 border text-left text-sm transition ${form.timeline === opt ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
            >{opt}</button>
          ))}
        </div>
      ),
    },
    {
      label: "Your details",
      content: (
        <div className="grid md:grid-cols-2 gap-5">
          <Input label="Name *" value={form.name} onChange={v => update("name", v)} />
          <Input label="Phone *" type="tel" value={form.phone} onChange={v => update("phone", v)} />
          <Input label="Email" type="email" value={form.email} onChange={v => update("email", v)} className="md:col-span-2" />
          <div className="md:col-span-2">
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Additional notes</label>
            <textarea rows={4} value={form.notes} onChange={e => update("notes", e.target.value)} className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm resize-none" />
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-4 pt-4">
            <button onClick={() => setStep(3)} className="px-8 py-3 border border-border text-[10px] uppercase tracking-[0.3em]">Back</button>
            <button onClick={submit} disabled={submitting} className="px-10 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] disabled:opacity-60">{submitting ? "Sending…" : "Submit Request"}</button>
          </div>
        </div>
      ),
    },
  ];

  if (done) {
    return (
      <section className="container-luxe py-32 text-center">
        <FadeIn>
          <div className="inline-flex w-16 h-16 rounded-full border border-foreground items-center justify-center"><Check /></div>
          <h1 className="mt-8 font-display text-5xl">Thank you.</h1>
          <p className="mt-4 text-muted-foreground">Your request has been received. Our studio will reach out within 24 hours to schedule a consultation.</p>
        </FadeIn>
      </section>
    );
  }

  return (
    <>
      <section className="container-luxe pt-24 pb-12">
        <FadeIn>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">Step {step + 1} of {steps.length}</p>
          <h1 className="mt-6 font-display text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.03em]">Request your estimate.</h1>
          <div className="mt-8 flex gap-2">
            {steps.map((_, i) => (
              <div key={i} className={`h-px flex-1 transition ${i <= step ? "bg-foreground" : "bg-border"}`} />
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="container-luxe pb-32">
        <FadeIn key={step}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6">{steps[step].label}</p>
          {steps[step].content}
        </FadeIn>
      </section>
    </>
  );
}

function Input({ label, value, onChange, type = "text", className = "" }: { label: string; value: string; onChange: (v: string) => void; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} type={type} className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm" />
    </div>
  );
}

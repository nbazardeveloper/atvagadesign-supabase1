import { useState } from "react";
import { z } from "zod";
import { submitLead } from "../../lib/lead-submission";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(120),
  phone: z.string().trim().min(5, "Enter a valid phone").max(40),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  project_details: z.string().trim().max(3000).optional(),
});

export function LeadForm({ source = "home_cta", compact = false }: { source?: string; compact?: boolean }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      email: fd.get("email") || undefined,
      project_details: fd.get("project_details") || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await submitLead({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      project_details: parsed.data.project_details || null,
      source,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send. Please try again.");
      return;
    }
    setDone(true);
    toast.success("Thank you. We will be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
  };

  if (done) {
    return (
      <div className="p-10 border border-border text-center">
        <p className="font-display text-2xl">Thank you.</p>
        <p className="mt-3 text-sm text-muted-foreground">Our studio will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-5 ${compact ? "" : "md:grid-cols-2"}`}>
      <Field name="name" label="Name" required />
      <Field name="phone" label="Phone" required type="tel" />
      <Field name="email" label="Email" type="email" className={compact ? "" : "md:col-span-2"} />
      <div className={compact ? "" : "md:col-span-2"}>
        <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Project details</label>
        <textarea name="project_details" rows={5} className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm resize-none transition" placeholder="Tell us about your space, finishes you love, timeline…" />
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <button disabled={submitting} className="w-full md:w-auto px-10 py-4 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] hover:bg-foreground/85 transition disabled:opacity-60">
          {submitting ? "Sending…" : "Submit Request"}
        </button>
      </div>
    </form>
  );
}

function Field({ name, label, type = "text", required = false, className = "" }: { name: string; label: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="w-full bg-transparent border-b border-border focus:border-foreground py-3 outline-none text-sm transition" />
    </div>
  );
}

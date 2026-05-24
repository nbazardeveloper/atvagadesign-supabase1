import { useState } from "react";
import { z } from "zod";
import { submitLead } from "../../lib/lead-submission";
import { toast } from "sonner";

const schema = z.object({
  first_name: z.string().trim().min(2, "First name is required").max(120),
  last_name: z.string().trim().min(2, "Last name is required").max(120),
  phone: z.string().trim().min(5, "Enter a valid phone number").max(40),
  email: z.string().trim().email("Enter a valid email").max(255),
  property_name: z.string().trim().max(300).optional().or(z.literal("")),
  property_address: z.string().trim().max(500).optional().or(z.literal("")),
  project_details: z.string().trim().max(3000).optional(),
  marketing_consent: z.boolean(),
});

export function LeadForm({ source = "home_cta" }: { source?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const parsed = schema.safeParse({
      first_name: fd.get("first_name"),
      last_name: fd.get("last_name"),
      phone: fd.get("phone"),
      email: fd.get("email"),
      property_name: fd.get("property_name") || undefined,
      property_address: fd.get("property_address") || undefined,
      project_details: fd.get("project_details") || undefined,
      marketing_consent: consent,
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);
    const { error } = await submitLead({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      property_name: parsed.data.property_name || null,
      property_address: parsed.data.property_address || null,
      project_details: parsed.data.project_details || null,
      marketing_consent: parsed.data.marketing_consent,
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
    setConsent(false);
  };

  if (done) {
    return (
      <div className="border border-[#e5e5e5] p-10 text-center">
        <p className="font-italiana text-2xl text-[#0a0a0a]">Thank you.</p>
        <p className="mt-3 text-sm text-[#6b6b6b]">
          Our team will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2">
      {/* Row 1 — name */}
      <Field name="first_name" label="First Name" required />
      <Field name="last_name" label="Last Name" required />

      {/* Row 2 — contact */}
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone Number" type="tel" required />

      {/* Row 3 — property */}
      <Field name="property_name" label="Name of Property" className="md:col-span-2" />
      <Field name="property_address" label="Property Street Address" className="md:col-span-2" />

      {/* Privacy notice */}
      <div className="md:col-span-2 border-t border-[#e5e5e5] pt-6">
        <p className="text-[0.75rem] leading-relaxed text-[#6b6b6b]">
          We process your personal information only to review your request, contact you about your
          project, and provide the services you ask us to provide. We handle your data in accordance
          with applicable privacy requirements and do not use it for unrelated purposes.
        </p>

        {/* Personal data consent checkbox */}
        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border border-[#6b6b6b]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            {consent && (
              <svg viewBox="0 0 12 12" className="h-3 w-3 fill-[#d4547a]" aria-hidden>
                <path d="M1 6l3.5 3.5L11 2" stroke="#d4547a" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span className="text-[0.75rem] leading-relaxed text-[#0a0a0a]">
            I consent to the collection, storage, and processing of my personal data by ATVAGA Designs
            for the purpose of responding to my inquiry and providing requested services.
          </span>
        </label>

        <p className="mt-4 text-[0.7rem] leading-relaxed text-[#6b6b6b]">
          For more information about how we collect, use, and protect your personal data, please
          review our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-[#0a0a0a] transition-colors">
            Privacy Policy
          </a>
          .
        </p>

        <p className="mt-4 text-[0.7rem] leading-relaxed text-[#6b6b6b]">
          By clicking submit, you confirm that you have read and understood this notice and agree to
          the processing of the information you provide for handling your request.
        </p>
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <button
          disabled={submitting}
          className="btn-base w-full border border-[#0a0a0a] bg-[#0a0a0a] px-10 text-white hover:bg-[#d4547a] hover:border-[#d4547a] transition-colors disabled:opacity-60 md:w-auto"
        >
          {submitting ? "Sending…" : "Submit"}
        </button>
      </div>
    </form>
  );
}

/* ── Field helper ── */
function Field({
  name,
  label,
  type = "text",
  required = false,
  className = "",
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-[0.65rem] uppercase tracking-[0.25em] text-[#6b6b6b] mb-2">
        {label}
        {required && " *"}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="input-underline"
      />
    </div>
  );
}

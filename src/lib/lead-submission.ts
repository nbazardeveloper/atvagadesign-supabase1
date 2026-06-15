import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import type { Database } from "@/integrations/supabase/types";

export type LeadSubmission = {
  first_name: string;
  last_name: string;
  phone: string;
  email: string | null;
  property_name: string | null;
  property_address: string | null;
  project_details: string | null;
  marketing_consent: boolean;
  source: string;
};

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as LeadSubmission)
  .handler(async ({ data }) => {
    // ── 1. Insert into Supabase ──────────────────────────────────────────
    const supabase = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { persistSession: false } },
    );

    const { error: dbError } = await supabase.from("leads").insert({
      first_name: data.first_name,
      last_name: data.last_name,
      // `name` is kept in sync by DB trigger (first_name + last_name)
      name: `${data.first_name} ${data.last_name}`.trim(),
      phone: data.phone,
      email: data.email,
      property_name: data.property_name,
      property_address: data.property_address,
      project_details: data.project_details,
      marketing_consent: data.marketing_consent,
      source: data.source,
    });

    if (dbError) return { error: dbError.message };

    // ── 2. Send notification email via Resend ────────────────────────────
    // Once you verify atvaga.com in Resend, change `from` to e.g. noreply@atvaga.com
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "nazgul.developer@gmail.com", // TODO: после верификации домена вернуть на Info@atvaga.com
        subject: `New lead: ${data.first_name} ${data.last_name}`,
        html: `
          <h2 style="font-family:sans-serif;color:#0a0a0a;">New lead from the website</h2>
          <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;">
            <tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;">Name</td><td><strong>${data.first_name} ${data.last_name}</strong></td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;">Email</td><td>${data.email ?? "—"}</td></tr>
            <tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;">Phone</td><td>${data.phone}</td></tr>
            ${data.property_name ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;">Property</td><td>${data.property_name}</td></tr>` : ""}
            ${data.property_address ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;">Address</td><td>${data.property_address}</td></tr>` : ""}
            ${data.project_details ? `<tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;vertical-align:top;">Details</td><td>${data.project_details.replace(/\n/g, "<br>")}</td></tr>` : ""}
            <tr><td style="padding:6px 16px 6px 0;color:#6b6b6b;">Source</td><td>${data.source}</td></tr>
          </table>
        `,
      });
    } catch (emailErr) {
      // Email failure must not block the lead from being saved
      console.error("[Resend] Failed to send lead notification:", emailErr);
    }

    return { error: null };
  });

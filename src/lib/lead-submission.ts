import { supabase } from "@/integrations/supabase/client";

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

export async function submitLead(lead: LeadSubmission) {
  const { error } = await supabase.from("leads").insert({
    first_name: lead.first_name,
    last_name: lead.last_name,
    // `name` is kept in sync by DB trigger (first_name + last_name)
    name: `${lead.first_name} ${lead.last_name}`.trim(),
    phone: lead.phone,
    email: lead.email,
    property_name: lead.property_name,
    property_address: lead.property_address,
    project_details: lead.project_details,
    marketing_consent: lead.marketing_consent,
    source: lead.source,
  });

  return { error };
}

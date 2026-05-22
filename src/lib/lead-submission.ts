import { supabase } from "@/integrations/supabase/client";

type LeadSubmission = {
  name: string;
  phone: string;
  email: string | null;
  project_details: string | null;
  source: string;
};

export async function submitLead(lead: LeadSubmission) {
  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    project_details: lead.project_details,
    source: lead.source,
  });

  return { error };
}
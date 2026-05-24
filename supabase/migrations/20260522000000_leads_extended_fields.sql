-- Extend leads table with property info and marketing consent fields

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS first_name  text,
  ADD COLUMN IF NOT EXISTS last_name   text,
  ADD COLUMN IF NOT EXISTS property_name    text,
  ADD COLUMN IF NOT EXISTS property_address text,
  ADD COLUMN IF NOT EXISTS marketing_consent boolean NOT NULL DEFAULT false;

-- Backfill: keep legacy `name` column intact for existing rows.
-- New submissions will populate first_name + last_name; the trigger
-- below keeps `name` in sync so the admin panel requires no changes.

CREATE OR REPLACE FUNCTION public.tg_leads_sync_name()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.first_name IS NOT NULL OR NEW.last_name IS NOT NULL THEN
    NEW.name := trim(coalesce(NEW.first_name, '') || ' ' || coalesce(NEW.last_name, ''));
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_sync_name ON public.leads;
CREATE TRIGGER leads_sync_name
  BEFORE INSERT OR UPDATE ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.tg_leads_sync_name();

-- Update RLS insert policy to allow the new columns
DROP POLICY IF EXISTS "Anyone can submit lead" ON public.leads;
CREATE POLICY "Anyone can submit lead" ON public.leads FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 200
    AND length(phone) BETWEEN 3 AND 50
    AND (email IS NULL OR length(email) <= 255)
    AND (project_details IS NULL OR length(project_details) <= 5000)
    AND (property_name IS NULL OR length(property_name) <= 300)
    AND (property_address IS NULL OR length(property_address) <= 500)
  );

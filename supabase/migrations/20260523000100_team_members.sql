CREATE TABLE public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  bio text NOT NULL,
  photo_url text,
  linkedin_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active team members" ON public.team_members FOR SELECT TO anon, authenticated
  USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage team members" ON public.team_members FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER team_members_updated_at BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

INSERT INTO storage.buckets (id, name, public)
VALUES ('team-photos', 'team-photos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view team photos" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'team-photos');

CREATE POLICY "Admins upload team photos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'team-photos'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins update team photos" ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'team-photos'
    AND public.has_role(auth.uid(), 'admin')
  )
  WITH CHECK (
    bucket_id = 'team-photos'
    AND public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Admins delete team photos" ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'team-photos'
    AND public.has_role(auth.uid(), 'admin')
  );
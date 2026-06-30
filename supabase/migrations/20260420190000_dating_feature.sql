-- Dating feature: opt-in fields on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS dating_visible boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS looking_for text DEFAULT 'B' CHECK (looking_for IN ('M', 'F', 'B')),
  ADD COLUMN IF NOT EXISTS bio text;

-- Dating config in app_settings
INSERT INTO public.app_settings (setting_key, setting_value)
VALUES ('dating_free_photos_count', '1')
ON CONFLICT (setting_key) DO NOTHING;

-- Dating service keys in feature_schedule
INSERT INTO public.feature_schedule (feature_key, feature_label, unlock_after_days)
VALUES
  ('dating', 'Dating - Partecipa', 0),
  ('dating_photos', 'Dating - Foto extra', 0),
  ('dating_report', 'Dating - Report Compatibilità', 0)
ON CONFLICT (feature_key) DO NOTHING;

-- SECURITY DEFINER: return all dating-visible profiles (bypasses RLS)
DROP FUNCTION IF EXISTS public.get_dating_profiles();
CREATE OR REPLACE FUNCTION public.get_dating_profiles()
RETURNS TABLE (
  user_id uuid,
  nome text,
  cognome text,
  birth_date date,
  sesso text,
  looking_for text,
  bio text,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, nome, cognome, birth_date, sesso, looking_for, bio, created_at
  FROM profiles
  WHERE dating_visible = true
    AND nome IS NOT NULL
    AND birth_date IS NOT NULL;
$$;

GRANT EXECUTE ON FUNCTION public.get_dating_profiles() TO authenticated;

-- SECURITY DEFINER: return photos for a dating profile (only first N visible)
DROP FUNCTION IF EXISTS public.get_dating_user_photos(uuid);
CREATE OR REPLACE FUNCTION public.get_dating_user_photos(target_user_id uuid)
RETURNS TABLE (storage_path text, type text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT storage_path, type
  FROM photos
  WHERE user_id = target_user_id
  ORDER BY created_at ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_dating_user_photos(uuid) TO authenticated;

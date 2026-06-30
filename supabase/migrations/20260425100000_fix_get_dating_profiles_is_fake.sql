-- Restore get_dating_profiles with is_fake field
-- (was lost when older migration was re-run during db push)

DROP FUNCTION IF EXISTS public.get_dating_profiles();

CREATE OR REPLACE FUNCTION public.get_dating_profiles()
RETURNS TABLE (
  user_id     uuid,
  nome        text,
  cognome     text,
  birth_date  date,
  sesso       text,
  looking_for text,
  bio         text,
  is_fake     boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, nome, cognome, birth_date, sesso, COALESCE(looking_for, 'B'), bio, false
  FROM profiles
  WHERE dating_visible = true
  UNION ALL
  SELECT user_id, nome, cognome, birth_date, sesso, COALESCE(looking_for, 'B'), bio, true
  FROM fake_dating_profiles
  WHERE dating_visible = true;
$$;

GRANT EXECUTE ON FUNCTION public.get_dating_profiles() TO authenticated;

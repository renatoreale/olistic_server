-- Function callable by authenticated users but runs with SECURITY DEFINER
-- to bypass RLS and return all profiles (used by admin dashboard)
CREATE OR REPLACE FUNCTION public.admin_get_all_profiles()
RETURNS TABLE (
  user_id uuid,
  nome text,
  cognome text,
  birth_date date,
  sesso text,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, nome, cognome, birth_date, sesso, created_at
  FROM profiles;
$$;

GRANT EXECUTE ON FUNCTION public.admin_get_all_profiles() TO authenticated;

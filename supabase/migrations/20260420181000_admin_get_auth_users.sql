-- Function to read auth.users data bypassing RLS (used by admin dashboard)
CREATE OR REPLACE FUNCTION public.admin_get_auth_users()
RETURNS TABLE (
  id uuid,
  email text,
  last_sign_in_at timestamptz,
  created_at timestamptz
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = auth, public
AS $$
  SELECT id, email::text, last_sign_in_at, created_at
  FROM auth.users;
$$;

GRANT EXECUTE ON FUNCTION public.admin_get_auth_users() TO authenticated;

-- Function to read photos for a specific user bypassing RLS
CREATE OR REPLACE FUNCTION public.admin_get_user_photos(target_user_id uuid)
RETURNS TABLE (
  type text,
  storage_path text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT type, storage_path
  FROM photos
  WHERE user_id = target_user_id;
$$;

GRANT EXECUTE ON FUNCTION public.admin_get_user_photos(uuid) TO authenticated;

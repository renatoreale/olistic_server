-- Imposta superadmin per realerenato@gmail.com (profile già esistente post-registrazione)
DO $$
DECLARE
  v_target_id uuid;
BEGIN
  SELECT id INTO v_target_id
  FROM auth.users
  WHERE email = 'realerenato@gmail.com'
  LIMIT 1;

  IF v_target_id IS NULL THEN
    RAISE EXCEPTION 'Utente realerenato@gmail.com non trovato';
  END IF;

  UPDATE public.profiles
  SET role = 'superadmin'
  WHERE user_id = v_target_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Profilo non trovato per realerenato@gmail.com - completare prima il onboarding';
  END IF;
END;
$$;

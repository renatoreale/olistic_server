DO $$
DECLARE
  v_target_id uuid;
BEGIN
  -- Trova l'utente per email
  SELECT id INTO v_target_id
  FROM auth.users
  WHERE email = 'realerenato@gmail.com'
  LIMIT 1;

  IF v_target_id IS NULL THEN
    RAISE EXCEPTION 'Utente realerenato@gmail.com non trovato';
  END IF;

  -- Imposta superadmin nel profilo
  UPDATE public.profiles
  SET role = 'superadmin'
  WHERE user_id = v_target_id;

  -- Elimina tutti gli altri utenti (cascade su profiles, photos, ecc.)
  DELETE FROM auth.users WHERE id != v_target_id;
END;
$$;

-- RPC per aggiornare soulmates_beta_mode (solo admin/superadmin)
CREATE OR REPLACE FUNCTION set_soulmates_beta_mode(p_enabled boolean)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role text;
BEGIN
  SELECT role INTO v_role FROM profiles WHERE user_id = auth.uid();
  IF v_role NOT IN ('admin', 'superadmin') THEN
    RAISE EXCEPTION 'Accesso negato';
  END IF;
  INSERT INTO app_settings (setting_key, setting_value)
  VALUES ('soulmates_beta_mode', CASE WHEN p_enabled THEN 'true' ELSE 'false' END)
  ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;
END;
$$;

-- Super admin: lista tutti i tenant con statistiche
CREATE OR REPLACE FUNCTION public.superadmin_get_tenants()
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  api_key text,
  is_active boolean,
  created_at timestamptz,
  user_count bigint,
  has_stripe boolean
)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT
    t.id, t.name, t.slug, t.api_key, t.is_active, t.created_at,
    COUNT(p.user_id) AS user_count,
    (t.stripe_secret_key IS NOT NULL) AS has_stripe
  FROM tenants t
  LEFT JOIN profiles p ON p.tenant_id = t.id
  GROUP BY t.id, t.name, t.slug, t.api_key, t.is_active, t.created_at, t.stripe_secret_key
  ORDER BY t.created_at;
$$;
GRANT EXECUTE ON FUNCTION public.superadmin_get_tenants() TO authenticated;

-- Super admin: crea nuovo tenant
CREATE OR REPLACE FUNCTION public.superadmin_create_tenant(
  p_name text,
  p_slug text,
  p_branding jsonb DEFAULT '{}'::jsonb,
  p_default_language text DEFAULT 'it',
  p_enabled_features text[] DEFAULT NULL
)
RETURNS TABLE (id uuid, api_key text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_role text;
  v_id uuid;
  v_api_key text;
  v_default_branding jsonb;
BEGIN
  SELECT role INTO v_role FROM profiles WHERE user_id = auth.uid();
  IF v_role NOT IN ('admin', 'superadmin') THEN
    RAISE EXCEPTION 'Accesso negato';
  END IF;

  SELECT branding INTO v_default_branding FROM tenants WHERE slug = 'numflame' LIMIT 1;
  v_api_key := 'tk_' || replace(gen_random_uuid()::text, '-', '');

  INSERT INTO tenants (name, slug, api_key, branding, default_language, enabled_features)
  VALUES (
    p_name, p_slug, v_api_key,
    CASE WHEN p_branding = '{}'::jsonb THEN COALESCE(v_default_branding, '{}'::jsonb) ELSE p_branding END,
    p_default_language,
    COALESCE(p_enabled_features, ARRAY[
      'daily_analysis','map','outfits','chat','community',
      'brand','house','compatibility','personal_year','pillars',
      'dates','advanced_report'
    ])
  )
  RETURNING id, api_key INTO v_id, v_api_key;

  RETURN QUERY SELECT v_id, v_api_key;
END;
$$;
GRANT EXECUTE ON FUNCTION public.superadmin_create_tenant(text, text, jsonb, text, text[]) TO authenticated;

-- Super admin: aggiorna configurazione tenant
CREATE OR REPLACE FUNCTION public.superadmin_update_tenant(
  p_tenant_id uuid,
  p_name text DEFAULT NULL,
  p_branding jsonb DEFAULT NULL,
  p_stripe_secret_key text DEFAULT NULL,
  p_stripe_webhook_secret text DEFAULT NULL,
  p_stripe_price_id_monthly text DEFAULT NULL,
  p_stripe_price_id_yearly text DEFAULT NULL,
  p_enabled_features text[] DEFAULT NULL,
  p_default_language text DEFAULT NULL,
  p_is_active boolean DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_role text;
BEGIN
  SELECT role INTO v_role FROM profiles WHERE user_id = auth.uid();
  IF v_role NOT IN ('admin', 'superadmin') THEN
    RAISE EXCEPTION 'Accesso negato';
  END IF;

  UPDATE tenants SET
    name                    = COALESCE(p_name, name),
    branding                = COALESCE(p_branding, branding),
    stripe_secret_key       = COALESCE(p_stripe_secret_key, stripe_secret_key),
    stripe_webhook_secret   = COALESCE(p_stripe_webhook_secret, stripe_webhook_secret),
    stripe_price_id_monthly = COALESCE(p_stripe_price_id_monthly, stripe_price_id_monthly),
    stripe_price_id_yearly  = COALESCE(p_stripe_price_id_yearly, stripe_price_id_yearly),
    enabled_features        = COALESCE(p_enabled_features, enabled_features),
    default_language        = COALESCE(p_default_language, default_language),
    is_active               = COALESCE(p_is_active, is_active),
    updated_at              = now()
  WHERE id = p_tenant_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.superadmin_update_tenant(uuid, text, jsonb, text, text, text, text, text[], text, boolean) TO authenticated;

-- Tenant admin: profili del proprio tenant
CREATE OR REPLACE FUNCTION public.tenant_admin_get_profiles()
RETURNS TABLE (
  user_id uuid,
  nome text,
  cognome text,
  birth_date date,
  sesso text,
  created_at timestamptz,
  role text,
  email text,
  last_sign_in_at timestamptz
)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT
    p.user_id, p.nome, p.cognome, p.birth_date, p.sesso, p.created_at, p.role,
    au.email::text, au.last_sign_in_at
  FROM profiles p
  JOIN auth.users au ON au.id = p.user_id
  WHERE p.tenant_id = public.current_user_tenant_id()
    AND EXISTS (
      SELECT 1 FROM profiles me
      WHERE me.user_id = auth.uid()
        AND me.role IN ('admin', 'superadmin')
    )
  ORDER BY p.created_at DESC;
$$;
GRANT EXECUTE ON FUNCTION public.tenant_admin_get_profiles() TO authenticated;

-- Admin: aggiorna branding e feature del proprio tenant
CREATE OR REPLACE FUNCTION public.tenant_admin_update_config(
  p_branding jsonb DEFAULT NULL,
  p_enabled_features text[] DEFAULT NULL,
  p_stripe_secret_key text DEFAULT NULL,
  p_stripe_price_id_monthly text DEFAULT NULL,
  p_stripe_price_id_yearly text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_role text;
  v_tenant_id uuid;
BEGIN
  SELECT role, tenant_id INTO v_role, v_tenant_id FROM profiles WHERE user_id = auth.uid();
  IF v_role NOT IN ('admin', 'superadmin') THEN
    RAISE EXCEPTION 'Accesso negato';
  END IF;

  UPDATE tenants SET
    branding                = COALESCE(p_branding, branding),
    enabled_features        = COALESCE(p_enabled_features, enabled_features),
    stripe_secret_key       = COALESCE(p_stripe_secret_key, stripe_secret_key),
    stripe_price_id_monthly = COALESCE(p_stripe_price_id_monthly, stripe_price_id_monthly),
    stripe_price_id_yearly  = COALESCE(p_stripe_price_id_yearly, stripe_price_id_yearly),
    updated_at              = now()
  WHERE id = v_tenant_id;
END;
$$;
GRANT EXECUTE ON FUNCTION public.tenant_admin_update_config(jsonb, text[], text, text, text) TO authenticated;

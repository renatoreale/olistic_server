-- RPC pubblica: configurazione tenant per il frontend (no dati sensibili)
CREATE OR REPLACE FUNCTION public.get_tenant_config(p_api_key text)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  branding jsonb,
  enabled_features text[],
  default_language text
)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT id, name, slug, branding, enabled_features, default_language
  FROM tenants
  WHERE api_key = p_api_key AND is_active = true;
$$;
GRANT EXECUTE ON FUNCTION public.get_tenant_config(text) TO anon, authenticated;

-- RPC interna: configurazione completa incluse chiavi Stripe (solo service_role)
CREATE OR REPLACE FUNCTION public.get_tenant_full(p_api_key text)
RETURNS TABLE (
  id uuid,
  name text,
  slug text,
  stripe_secret_key text,
  stripe_webhook_secret text,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  enabled_features text[],
  default_language text
)
LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  SELECT id, name, slug, stripe_secret_key, stripe_webhook_secret,
         stripe_price_id_monthly, stripe_price_id_yearly,
         enabled_features, default_language
  FROM tenants
  WHERE api_key = p_api_key AND is_active = true;
$$;
REVOKE ALL ON FUNCTION public.get_tenant_full(text) FROM PUBLIC, authenticated;
GRANT EXECUTE ON FUNCTION public.get_tenant_full(text) TO service_role;

-- Funzione di supporto per ottenere tenant_id dal profilo dell'utente corrente
CREATE OR REPLACE FUNCTION public.current_user_tenant_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT tenant_id FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$;
GRANT EXECUTE ON FUNCTION public.current_user_tenant_id() TO authenticated;

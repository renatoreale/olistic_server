-- Multi-tenant: tabella tenants
CREATE TABLE public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  api_key text NOT NULL UNIQUE DEFAULT 'tk_' || replace(gen_random_uuid()::text, '-', ''),
  branding jsonb NOT NULL DEFAULT '{
    "appName": "Numflame",
    "primaryColor": "#7c3aed",
    "secondaryColor": "#a78bfa",
    "logoUrl": null,
    "faviconUrl": null,
    "tagline": "Scopri il potere dei tuoi numeri"
  }',
  stripe_secret_key text,
  stripe_webhook_secret text,
  stripe_price_id_monthly text,
  stripe_price_id_yearly text,
  enabled_features text[] NOT NULL DEFAULT ARRAY[
    'daily_analysis','map','outfits','chat','community',
    'brand','house','compatibility','personal_year','pillars',
    'dates','advanced_report','dating','dating_photos','dating_report'
  ],
  default_language text NOT NULL DEFAULT 'it',
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access tenants"
  ON public.tenants FOR ALL TO service_role USING (true);

CREATE TRIGGER update_tenants_updated_at
  BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Tenant di default (Numflame esistente)
INSERT INTO public.tenants (name, slug, api_key)
VALUES ('Numflame', 'numflame', 'tk_numflame_default');

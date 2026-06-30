-- Funzione che ritorna l'id del tenant di default (numflame)
-- Usata come DEFAULT della colonna profiles.tenant_id
CREATE OR REPLACE FUNCTION public.default_tenant_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1;
$$;

-- Imposta il DEFAULT sulla colonna tenant_id
-- Così qualsiasi INSERT senza tenant_id esplicito usa automaticamente il tenant numflame
ALTER TABLE public.profiles
  ALTER COLUMN tenant_id SET DEFAULT public.default_tenant_id();

-- Aggiunge tenant_id a tutte le tabelle chiave

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);

-- Assegna gli utenti esistenti al tenant di default
UPDATE public.profiles
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

-- Rende tenant_id obbligatorio per i nuovi utenti
ALTER TABLE public.profiles ALTER COLUMN tenant_id SET NOT NULL;

-- Community
ALTER TABLE public.community_posts
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.community_posts
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

ALTER TABLE public.community_comments
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.community_comments
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

ALTER TABLE public.community_reactions
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.community_reactions
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

ALTER TABLE public.community_notifications
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.community_notifications
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

-- Chat
ALTER TABLE public.chat_sessions
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.chat_sessions
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

-- Dating
ALTER TABLE public.dating_chats
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.dating_chats
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

-- Promotions
ALTER TABLE public.promotions
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.promotions
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

-- Support tickets
ALTER TABLE public.support_tickets
  ADD COLUMN IF NOT EXISTS tenant_id uuid REFERENCES public.tenants(id);
UPDATE public.support_tickets
SET tenant_id = (SELECT id FROM public.tenants WHERE slug = 'numflame' LIMIT 1)
WHERE tenant_id IS NULL;

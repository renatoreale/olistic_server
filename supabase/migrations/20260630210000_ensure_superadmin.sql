-- Garantisce che realerenato@gmail.com abbia ruolo superadmin
-- Idempotente: nessun effetto se già impostato
UPDATE public.profiles
SET role = 'superadmin'
WHERE user_id = (
  SELECT id FROM auth.users WHERE email = 'realerenato@gmail.com' LIMIT 1
);

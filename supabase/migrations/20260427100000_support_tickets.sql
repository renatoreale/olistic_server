CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('support', 'suggestion')),
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'read', 'resolved')),
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own tickets"
  ON public.support_tickets FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own tickets"
  ON public.support_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.admin_get_support_tickets()
RETURNS TABLE (
  id uuid, user_id uuid, type text, subject text, message text,
  status text, admin_notes text, created_at timestamptz, updated_at timestamptz,
  nome text, cognome text, email text
)
LANGUAGE sql SECURITY DEFINER
AS $$
  SELECT
    st.id, st.user_id, st.type, st.subject, st.message,
    st.status, st.admin_notes, st.created_at, st.updated_at,
    p.nome, p.cognome, au.email
  FROM public.support_tickets st
  JOIN public.profiles p ON p.user_id = st.user_id
  JOIN auth.users au ON au.id = st.user_id
  ORDER BY st.created_at DESC;
$$;

CREATE OR REPLACE FUNCTION public.admin_update_support_ticket(
  p_ticket_id uuid,
  p_status text,
  p_admin_notes text
)
RETURNS void
LANGUAGE sql SECURITY DEFINER
AS $$
  UPDATE public.support_tickets
  SET status = p_status,
      admin_notes = p_admin_notes,
      updated_at = now()
  WHERE id = p_ticket_id;
$$;

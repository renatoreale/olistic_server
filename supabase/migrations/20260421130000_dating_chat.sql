-- ── Update get_dating_profiles to expose is_fake flag ────────────────────────

DROP FUNCTION IF EXISTS get_dating_profiles();

CREATE OR REPLACE FUNCTION get_dating_profiles()
RETURNS TABLE (
  user_id     uuid,
  nome        text,
  cognome     text,
  birth_date  date,
  sesso       text,
  looking_for text,
  bio         text,
  is_fake     boolean
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_id, nome, cognome, birth_date, sesso, COALESCE(looking_for,'B'), bio, false
  FROM profiles
  WHERE dating_visible = true
  UNION ALL
  SELECT user_id, nome, cognome, birth_date, sesso, COALESCE(looking_for,'B'), bio, true
  FROM fake_dating_profiles
  WHERE dating_visible = true;
$$;

-- ── dating_chats ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS dating_chats (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  initiator_id uuid NOT NULL,
  partner_id   uuid NOT NULL,
  is_fake_chat boolean NOT NULL DEFAULT false,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE dating_chats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see their own chats" ON dating_chats;
CREATE POLICY "Users see their own chats" ON dating_chats
  FOR SELECT USING (auth.uid() = initiator_id OR auth.uid() = partner_id);

DROP POLICY IF EXISTS "Users create chats" ON dating_chats;
CREATE POLICY "Users create chats" ON dating_chats
  FOR INSERT WITH CHECK (auth.uid() = initiator_id);

-- ── dating_messages ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS dating_messages (
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id   uuid NOT NULL REFERENCES dating_chats(id) ON DELETE CASCADE,
  sender_id uuid,          -- NULL for AI messages
  content   text NOT NULL,
  is_ai     boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE dating_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see messages in their chats" ON dating_messages;
CREATE POLICY "Users see messages in their chats" ON dating_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM dating_chats dc
      WHERE dc.id = chat_id
        AND (dc.initiator_id = auth.uid() OR dc.partner_id = auth.uid())
    )
  );

DROP POLICY IF EXISTS "Users send their own messages" ON dating_messages;
CREATE POLICY "Users send their own messages" ON dating_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM dating_chats dc
      WHERE dc.id = chat_id
        AND (dc.initiator_id = auth.uid() OR dc.partner_id = auth.uid())
    )
  );

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE dating_messages;

-- ── RPC: get or create a chat ─────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION get_or_create_dating_chat(
  p_partner_id uuid,
  p_is_fake    boolean
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_chat_id uuid;
  v_me      uuid := auth.uid();
BEGIN
  -- Look for existing chat in either direction
  SELECT id INTO v_chat_id
  FROM dating_chats
  WHERE (initiator_id = v_me AND partner_id = p_partner_id)
     OR (initiator_id = p_partner_id AND partner_id = v_me)
  LIMIT 1;

  IF v_chat_id IS NULL THEN
    INSERT INTO dating_chats (initiator_id, partner_id, is_fake_chat)
    VALUES (v_me, p_partner_id, p_is_fake)
    RETURNING id INTO v_chat_id;
  END IF;

  RETURN v_chat_id;
END;
$$;

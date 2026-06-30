-- Add initiator display info so both sides see the correct name in the badge
ALTER TABLE dating_chats
  ADD COLUMN IF NOT EXISTS initiator_nome TEXT,
  ADD COLUMN IF NOT EXISTS initiator_foto TEXT;

-- Backfill from profiles (initiators are always real users)
UPDATE dating_chats dc
SET
  initiator_nome = (SELECT nome || ' ' || LEFT(cognome,1) || '.' FROM profiles WHERE user_id = dc.initiator_id),
  initiator_foto = NULL
WHERE initiator_nome IS NULL;

-- Update function to store both sides
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
  v_chat_id      uuid;
  v_me           uuid := auth.uid();
  v_partner_nome TEXT;
  v_partner_foto TEXT;
  v_my_nome      TEXT;
BEGIN
  SELECT id INTO v_chat_id
  FROM dating_chats
  WHERE (initiator_id = v_me AND partner_id = p_partner_id)
     OR (initiator_id = p_partner_id AND partner_id = v_me)
  LIMIT 1;

  IF v_chat_id IS NULL THEN
    IF p_is_fake THEN
      SELECT nome || ' ' || LEFT(cognome,1) || '.', photos[1]
        INTO v_partner_nome, v_partner_foto
        FROM fake_dating_profiles WHERE user_id = p_partner_id;
    ELSE
      SELECT nome || ' ' || LEFT(cognome,1) || '.', NULL
        INTO v_partner_nome, v_partner_foto
        FROM profiles WHERE user_id = p_partner_id;
    END IF;

    SELECT nome || ' ' || LEFT(cognome,1) || '.'
      INTO v_my_nome
      FROM profiles WHERE user_id = v_me;

    INSERT INTO dating_chats
      (initiator_id, partner_id, is_fake_chat, partner_nome, partner_foto, initiator_nome, initiator_foto)
    VALUES
      (v_me, p_partner_id, p_is_fake, v_partner_nome, v_partner_foto, v_my_nome, NULL)
    RETURNING id INTO v_chat_id;
  END IF;

  RETURN v_chat_id;
END;
$$;

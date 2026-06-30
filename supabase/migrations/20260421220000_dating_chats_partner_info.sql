-- Denormalise partner display info into dating_chats so badge doesn't need extra lookups
ALTER TABLE dating_chats
  ADD COLUMN IF NOT EXISTS partner_nome TEXT,
  ADD COLUMN IF NOT EXISTS partner_foto TEXT;

-- Backfill existing chats
UPDATE dating_chats dc
SET
  partner_nome = COALESCE(
    (SELECT nome || ' ' || LEFT(cognome,1) || '.' FROM fake_dating_profiles WHERE user_id = dc.partner_id),
    (SELECT nome || ' ' || LEFT(cognome,1) || '.' FROM profiles            WHERE user_id = dc.partner_id)
  ),
  partner_foto = COALESCE(
    (SELECT photos[1] FROM fake_dating_profiles WHERE user_id = dc.partner_id),
    NULL
  )
WHERE partner_nome IS NULL;

-- Replace function to populate partner info on insert
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
  v_chat_id    uuid;
  v_me         uuid := auth.uid();
  v_nome       TEXT;
  v_foto       TEXT;
BEGIN
  -- Look for existing chat in either direction
  SELECT id INTO v_chat_id
  FROM dating_chats
  WHERE (initiator_id = v_me AND partner_id = p_partner_id)
     OR (initiator_id = p_partner_id AND partner_id = v_me)
  LIMIT 1;

  IF v_chat_id IS NULL THEN
    -- Resolve partner display name + photo
    IF p_is_fake THEN
      SELECT nome || ' ' || LEFT(cognome,1) || '.', photos[1]
        INTO v_nome, v_foto
        FROM fake_dating_profiles WHERE user_id = p_partner_id;
    ELSE
      SELECT nome || ' ' || LEFT(cognome,1) || '.', NULL
        INTO v_nome, v_foto
        FROM profiles WHERE user_id = p_partner_id;
    END IF;

    INSERT INTO dating_chats (initiator_id, partner_id, is_fake_chat, partner_nome, partner_foto)
    VALUES (v_me, p_partner_id, p_is_fake, v_nome, v_foto)
    RETURNING id INTO v_chat_id;
  END IF;

  RETURN v_chat_id;
END;
$$;

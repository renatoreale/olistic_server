-- Track last-read timestamp per user per chat (simpler than per-message is_read)
ALTER TABLE dating_chats
  ADD COLUMN IF NOT EXISTS initiator_last_read_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS partner_last_read_at   TIMESTAMPTZ;

-- RPC: mark chat as read for current user (updates the right column)
CREATE OR REPLACE FUNCTION mark_chat_read(p_chat_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_me uuid := auth.uid();
  v_chat dating_chats;
BEGIN
  SELECT * INTO v_chat FROM dating_chats WHERE id = p_chat_id;
  IF v_chat.initiator_id = v_me THEN
    UPDATE dating_chats SET initiator_last_read_at = now() WHERE id = p_chat_id;
  ELSIF v_chat.partner_id = v_me THEN
    UPDATE dating_chats SET partner_last_read_at = now() WHERE id = p_chat_id;
  END IF;
END;
$$;

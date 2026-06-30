-- Track read status on dating messages
ALTER TABLE dating_messages ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

-- Messages sent by the user are always "read" (they wrote them)
-- Only incoming messages (sender_id != null, is_ai or real partner) need tracking

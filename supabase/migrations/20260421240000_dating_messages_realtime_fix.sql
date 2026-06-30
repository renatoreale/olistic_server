-- Ensure is_read column exists
ALTER TABLE dating_messages ADD COLUMN IF NOT EXISTS is_read boolean NOT NULL DEFAULT false;

-- REPLICA IDENTITY FULL needed so Supabase Realtime publishes UPDATE events
-- (without it, UPDATE payloads are empty and the badge never refreshes)
ALTER TABLE dating_messages REPLICA IDENTITY FULL;

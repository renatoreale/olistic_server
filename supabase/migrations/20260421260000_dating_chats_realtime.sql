-- Enable realtime on dating_chats so badge updates when last_read_at changes
ALTER TABLE dating_chats REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE dating_chats;

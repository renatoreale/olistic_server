import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import { useChatContext } from "@/contexts/ChatContext";

interface UnreadChat {
  chatId: string;
  partnerId: string;
  partnerName: string;
  partnerPhoto: string | null;
  isFake: boolean;
  lastMessage: string;
  unreadCount: number;
}

const ChatNotificationBadge = () => {
  const [count, setCount] = useState(0);
  const [chats, setChats] = useState<UnreadChat[]>([]);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const { openChat } = useChatContext();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) return;
      setUserId(session.user.id);
      fetchUnread(session.user.id);
    });
  }, []);

  // Refetch on route change (e.g. after leaving a chat)
  useEffect(() => {
    if (userId) fetchUnread(userId);
  }, [location.pathname, userId]);

  // Realtime + polling fallback every 30s
  useEffect(() => {
    if (!userId) return;
    const channel = supabase
      .channel("unread-badge")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "dating_messages" },
        () => fetchUnread(userId))
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "dating_chats" },
        () => fetchUnread(userId))
      .subscribe();
    const timer = setInterval(() => fetchUnread(userId), 30_000);
    return () => { supabase.removeChannel(channel); clearInterval(timer); };
  }, [userId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchUnread = async (uid: string) => {
    // Fetch my chats with partner info already stored
    const { data: myChatRows } = await supabase
      .from("dating_chats" as any)
      .select("id, initiator_id, partner_id, is_fake_chat, partner_nome, partner_foto, initiator_nome, initiator_foto, initiator_last_read_at, partner_last_read_at")
      .or(`initiator_id.eq.${uid},partner_id.eq.${uid}`);

    if (!myChatRows || (myChatRows as any[]).length === 0) {
      setCount(0); setChats([]); return;
    }

    const chatIds = (myChatRows as any[]).map((c: any) => c.id);

    // For each chat, count messages newer than last_read_at for current user
    const byChatId: Record<string, any[]> = {};
    let total = 0;

    await Promise.all((myChatRows as any[]).map(async (chatRow: any) => {
      const iAmInitiator = chatRow.initiator_id === uid;
      const lastRead: string | null = iAmInitiator
        ? chatRow.initiator_last_read_at
        : chatRow.partner_last_read_at;

      let query = supabase
        .from("dating_messages" as any)
        .select("id, chat_id, sender_id, content, created_at")
        .eq("chat_id", chatRow.id)
        .neq("sender_id", uid)
        .order("created_at", { ascending: false });

      if (lastRead) query = (query as any).gt("created_at", lastRead);

      const { data: newMsgs } = await query;
      if (newMsgs && (newMsgs as any[]).length > 0) {
        byChatId[chatRow.id] = newMsgs as any[];
        total += (newMsgs as any[]).length;
      }
    }));

    setCount(total);
    if (total === 0) { setChats([]); return; }

    const resolved: UnreadChat[] = Object.entries(byChatId).map(([chatId, messages]) => {
      const chatRow = (myChatRows as any[]).find((c: any) => c.id === chatId);
      const iAmInitiator = chatRow.initiator_id === uid;
      const partnerId: string = iAmInitiator ? chatRow.partner_id : chatRow.initiator_id;
      // Show the OTHER person's name (the one who sent the message)
      const partnerName: string = iAmInitiator
        ? (chatRow.partner_nome || "Anonimo")
        : (chatRow.initiator_nome || "Anonimo");
      const partnerPhoto: string | null = iAmInitiator
        ? (chatRow.partner_foto || null)
        : (chatRow.initiator_foto || null);
      return {
        chatId,
        partnerId,
        partnerName,
        partnerPhoto,
        isFake: chatRow.is_fake_chat ?? false,
        lastMessage: messages[0].content,
        unreadCount: messages.length,
      };
    });

    setChats(resolved);
  };

  const goToChat = (chat: UnreadChat) => {
    setOpen(false);
    const parts = chat.partnerName.split(" ");
    openChat({
      chatId: chat.chatId,
      partnerName: parts[0] ?? chat.partnerName,
      partnerInitial: parts[1] ?? "",
      partnerPhoto: chat.partnerPhoto,
      isFake: chat.isFake,
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-full hover:bg-muted/30 transition-colors"
        title="Messaggi nelle chat"
      >
        <MessageCircle className={`w-5 h-5 ${count > 0 ? "text-primary" : "text-muted-foreground"}`} />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center px-1 leading-none">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-2xl shadow-2xl z-[200] overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border/50">
              <p className="text-sm font-semibold">Messaggi non letti</p>
            </div>

            {chats.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Nessun messaggio nuovo.</p>
            ) : (
              <div className="max-h-80 overflow-y-auto divide-y divide-border/30">
                {chats.map(chat => (
                  <button
                    key={chat.chatId}
                    onClick={() => goToChat(chat)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors text-left"
                  >
                    {chat.partnerPhoto ? (
                      <img src={chat.partnerPhoto} className="w-10 h-10 rounded-full object-cover shrink-0" alt="" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <User className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold truncate">{chat.partnerName}</p>
                        {chat.unreadCount > 1 && (
                          <span className="shrink-0 text-[10px] font-bold bg-primary/15 text-primary rounded-full px-1.5 py-0.5">
                            +{chat.unreadCount}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatNotificationBadge;

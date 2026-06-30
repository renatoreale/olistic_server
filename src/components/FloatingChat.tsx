import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { X, Minus, Send, Loader2, Bot, User, Smile } from "lucide-react";
import { useChatContext, OpenChat } from "@/contexts/ChatContext";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface Message {
  id: string;
  chat_id: string;
  sender_id: string | null;
  content: string;
  is_ai: boolean;
  created_at: string;
}

interface FloatingChatProps {
  chat: OpenChat;
  index: number;
}

const FloatingChat = ({ chat, index }: FloatingChatProps) => {
  const { closeChat, toggleMinimize } = useChatContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myId, setMyId] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [aiTyping, setAiTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const displayName = `${chat.partnerName} ${chat.partnerInitial}`.trim();
  const rightOffset = 16 + index * 344;

  useEffect(() => { init(); }, [chat.chatId]);

  useEffect(() => {
    if (!chat.minimized) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping, chat.minimized]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) setShowEmojiPicker(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markAllRead = async (cid: string) => {
    await supabase.rpc("mark_chat_read" as any, { p_chat_id: cid });
  };

  const init = async () => {
    const { data: { session: s } } = await supabase.auth.getSession();
    if (!s) return;
    setSession(s);
    setMyId(s.user.id);

    const { data: msgs } = await supabase
      .from("dating_messages" as any)
      .select("*")
      .eq("chat_id", chat.chatId)
      .order("created_at", { ascending: true });

    setMessages((msgs as Message[]) || []);
    setLoading(false);
    markAllRead(chat.chatId);

    const channel = supabase
      .channel(`floating-chat-${chat.chatId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "dating_messages",
        filter: `chat_id=eq.${chat.chatId}`,
      }, (payload) => {
        const incoming = payload.new as Message;
        setMessages(prev => prev.find(m => m.id === incoming.id) ? prev : [...prev, incoming]);
        if (incoming.is_ai) setAiTyping(false);
        markAllRead(chat.chatId);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  };

  const sendMessage = async () => {
    if (!input.trim() || sending || !session) return;
    const text = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setSending(true);

    const optimisticMsg: Message = {
      id: `opt-${Date.now()}`,
      chat_id: chat.chatId,
      sender_id: myId!,
      content: text,
      is_ai: false,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);

    if (chat.isFake) {
      setAiTyping(true);
      try {
        const { data, error } = await supabase.functions.invoke("dating-ai-chat", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: { chat_id: chat.chatId, message: text },
        });
        let errMsg: string | null = null;
        if (data?.error) errMsg = data.error;
        else if (error) {
          try { errMsg = (await (error as any).context?.json?.())?.error || error.message; }
          catch { errMsg = error.message; }
        }
        if (errMsg) toast({ title: "Errore chat AI", description: errMsg, variant: "destructive" });
        const { data: msgs } = await supabase.from("dating_messages" as any).select("*").eq("chat_id", chat.chatId).order("created_at", { ascending: true });
        if (msgs) setMessages(msgs as Message[]);
        markAllRead(chat.chatId);
        setAiTyping(false);
      } catch (e: any) {
        toast({ title: "Errore", description: e?.message ?? "Errore di connessione", variant: "destructive" });
        setAiTyping(false);
      }
    } else {
      await supabase.from("dating_messages" as any).insert({ chat_id: chat.chatId, sender_id: myId, content: text, is_ai: false });
      const { data: msgs } = await supabase.from("dating_messages" as any).select("*").eq("chat_id", chat.chatId).order("created_at", { ascending: true });
      if (msgs) setMessages(msgs as Message[]);
    }
    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInput(prev => prev + emojiData.emoji);
    textareaRef.current?.focus();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.2 }}
      style={{ right: rightOffset, bottom: 0, width: 328 }}
      className="fixed z-[300] flex flex-col shadow-2xl rounded-t-2xl overflow-hidden border border-border/60 bg-background"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2.5 bg-primary cursor-pointer select-none"
        onClick={() => toggleMinimize(chat.chatId)}
      >
        {chat.partnerPhoto ? (
          <img src={chat.partnerPhoto} className="w-8 h-8 rounded-full object-cover shrink-0 border-2 border-primary-foreground/30" alt="" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-primary-foreground truncate">{displayName}</p>
          {chat.isFake && (
            <p className="text-[10px] text-primary-foreground/70 flex items-center gap-1">
              <Bot className="w-2.5 h-2.5" /> Risposta automatica
            </p>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); toggleMinimize(chat.chatId); }} className="p-1 rounded-full hover:bg-primary-foreground/20 text-primary-foreground">
          <Minus className="w-3.5 h-3.5" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); closeChat(chat.chatId); }} className="p-1 rounded-full hover:bg-primary-foreground/20 text-primary-foreground">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Body — hidden when minimized */}
      <AnimatePresence initial={false}>
        {!chat.minimized && (
          <motion.div
            key="body"
            initial={{ height: 0 }}
            animate={{ height: 420 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col overflow-hidden"
            style={{ height: 420 }}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-muted/10">
              {loading && (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              )}
              {!loading && messages.length === 0 && !aiTyping && (
                <p className="text-center text-muted-foreground text-xs py-8">
                  Inizia la conversazione con {chat.partnerName}!
                </p>
              )}
              {messages.map(msg => {
                const isMe = msg.sender_id === myId;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "glass-cosmic rounded-bl-sm"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {aiTyping && (
                <div className="flex justify-start">
                  <div className="glass-cosmic px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-2 py-2 border-t border-border/50 bg-background">
              {/* Emoji picker */}
              {showEmojiPicker && (
                <div ref={emojiRef} className="mb-1">
                  <EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.AUTO} width="100%" height={280} lazyLoadEmojis searchPlaceholder="Cerca…" />
                </div>
              )}
              <div className="flex items-end gap-1">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(o => !o)}
                  className={`p-1.5 rounded-lg transition-colors shrink-0 ${showEmojiPicker ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Smile className="w-4 h-4" />
                </button>
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={1}
                  placeholder={`Scrivi a ${chat.partnerName}…`}
                  className="flex-1 resize-none bg-muted/30 border border-border/50 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[34px] max-h-24"
                  onInput={e => {
                    const t = e.target as HTMLTextAreaElement;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 96) + "px";
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || sending}
                  className="p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-40 shrink-0 hover:bg-primary/90 transition-colors"
                >
                  {sending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const FloatingChatContainer = () => {
  const { openChats } = useChatContext();
  return (
    <AnimatePresence>
      {openChats.map((chat, i) => (
        <FloatingChat key={chat.chatId} chat={chat} index={i} />
      ))}
    </AnimatePresence>
  );
};

export default FloatingChat;

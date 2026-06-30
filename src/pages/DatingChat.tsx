import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Send, Loader2, Bot, User, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface Message {
  id: string;
  chat_id: string;
  sender_id: string | null;
  content: string;
  is_ai: boolean;
  created_at: string;
}

interface LocationState {
  partnerName?: string;
  partnerInitial?: string;
  partnerPhoto?: string | null;
  isFake?: boolean;
}

const DatingChat = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state ?? {}) as LocationState;

  const partnerName    = state.partnerName ?? "…";
  const partnerInitial = state.partnerInitial ?? "";
  const partnerPhoto   = state.partnerPhoto ?? null;
  const isFake         = state.isFake ?? false;

  const [messages, setMessages]   = useState<Message[]>([]);
  const [input, setInput]         = useState("");
  const [sending, setSending]     = useState(false);
  const [loading, setLoading]     = useState(true);
  const [myId, setMyId]           = useState<string | null>(null);
  const [session, setSession]     = useState<any>(null);
  const [aiTyping, setAiTyping]         = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { init(); }, [chatId]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setInput(prev => prev + emojiData.emoji);
    textareaRef.current?.focus();
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  const markAllRead = async (cid: string, _uid: string) => {
    await supabase.rpc("mark_chat_read" as any, { p_chat_id: cid });
  };

  const init = async () => {
    const { data: { session: s } } = await supabase.auth.getSession();
    if (!s) { navigate("/auth"); return; }
    setSession(s);
    setMyId(s.user.id);

    // Load existing messages
    const { data: msgs } = await supabase
      .from("dating_messages" as any)
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true });

    setMessages((msgs as Message[]) || []);
    setLoading(false);

    // Mark all incoming messages in this chat as read
    markAllRead(chatId, s.user.id);

    // Realtime subscription — deduplicates by id
    const channel = supabase
      .channel(`chat-${chatId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "dating_messages",
        filter: `chat_id=eq.${chatId}`,
      }, (payload) => {
        const incoming = payload.new as Message;
        setMessages(prev => {
          if (prev.find(m => m.id === incoming.id)) return prev;
          return [...prev, incoming];
        });
        if (incoming.is_ai) setAiTyping(false);
        // Mark as read immediately if it's an incoming message
        if (incoming.sender_id !== s.user.id && !incoming.is_read) {
          supabase.from("dating_messages" as any)
            .update({ is_read: true } as any)
            .eq("id", incoming.id);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  };

  const sendMessage = async () => {
    if (!input.trim() || sending || !session) return;
    const text = input.trim();
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    setSending(true);

    // Optimistic: show message immediately
    const optimisticMsg: Message = {
      id: `opt-${Date.now()}`,
      chat_id: chatId!,
      sender_id: myId!,
      content: text,
      is_ai: false,
      created_at: new Date().toISOString(),
    };
    setMessages(prev => [...prev, optimisticMsg]);

    if (isFake) {
      // Show AI typing indicator; edge function inserts both messages → realtime delivers them
      setAiTyping(true);
      try {
        const { data, error } = await supabase.functions.invoke("dating-ai-chat", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          body: { chat_id: chatId, message: text },
        });
        let errMsg: string | null = null;
        if (data?.error) {
          errMsg = data.error;
        } else if (error) {
          try {
            const body = await (error as any).context?.json?.();
            errMsg = body?.error || error.message;
          } catch {
            errMsg = error.message;
          }
        }
        if (errMsg) {
          console.error("AI chat error:", errMsg);
          toast({ title: "Errore chat AI", description: errMsg, variant: "destructive" });
        }
        // Reload messages from DB — more reliable than waiting for realtime
        const { data: msgs } = await supabase
          .from("dating_messages" as any)
          .select("*")
          .eq("chat_id", chatId)
          .order("created_at", { ascending: true });
        if (msgs) setMessages(msgs as Message[]); // replaces optimistic msg
        if (myId) markAllRead(chatId!, myId);
        setAiTyping(false);
      } catch (e: any) {
        console.error(e);
        toast({ title: "Errore", description: e?.message ?? "Errore di connessione", variant: "destructive" });
        setAiTyping(false);
      }
    } else {
      // Real chat: insert + reload (realtime as bonus, not sole mechanism)
      await supabase.from("dating_messages" as any).insert({
        chat_id: chatId,
        sender_id: myId,
        content: text,
        is_ai: false,
      });
      const { data: msgs } = await supabase
        .from("dating_messages" as any)
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });
      if (msgs) setMessages(msgs as Message[]); // replaces optimistic msg
    }

    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const displayName = `${partnerName} ${partnerInitial}`.trim();

  if (loading) {
    return (
      <DashboardLayout title="Chat">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="">
      <div className="flex flex-col h-[calc(100vh-65px)]">

        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-background/80 backdrop-blur shrink-0">
          <Button variant="ghost" size="icon" onClick={() => navigate("/soulmates")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>

          {partnerPhoto ? (
            <img
              src={partnerPhoto}
              className="w-10 h-10 rounded-full object-cover shrink-0"
              alt={partnerName}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
          )}

          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">{displayName}</p>
            {isFake && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Bot className="w-3 h-3" /> Risposta automatica
              </p>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 && !aiTyping && (
            <p className="text-center text-muted-foreground text-sm py-12">
              Inizia la conversazione con {partnerName}!
            </p>
          )}

          {messages.map((msg) => {
            const isMe = msg.sender_id === myId;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "glass-cosmic rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            );
          })}

          {/* AI typing indicator */}
          {aiTyping && (
            <div className="flex justify-start">
              <div className="glass-cosmic px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-border/50 bg-background/80 backdrop-blur shrink-0">
          <div className="max-w-2xl mx-auto">
            {/* Emoji picker popover */}
            <AnimatePresence>
              {showEmojiPicker && (
                <motion.div
                  ref={emojiPickerRef}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="mb-2"
                >
                  <EmojiPicker
                    onEmojiClick={onEmojiClick}
                    theme={Theme.AUTO}
                    width="100%"
                    height={320}
                    searchPlaceholder="Cerca emoji…"
                    lazyLoadEmojis
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(o => !o)}
                className={`p-2 rounded-xl transition-colors shrink-0 ${showEmojiPicker ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}
                title="Emoji"
              >
                <Smile className="w-5 h-5" />
              </button>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                rows={1}
                placeholder={`Scrivi a ${partnerName}…`}
                className="flex-1 resize-none bg-muted/30 border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 min-h-[44px] max-h-32"
                onInput={(e) => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 128) + "px";
                }}
              />
              <Button
                variant="cosmic"
                size="icon"
                onClick={sendMessage}
                disabled={!input.trim() || sending}
                className="h-[44px] w-[44px] shrink-0"
              >
                {sending
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default DatingChat;

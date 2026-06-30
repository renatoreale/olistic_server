import { createContext, useContext, useState, ReactNode } from "react";

export interface OpenChat {
  chatId: string;
  partnerName: string;
  partnerInitial: string;
  partnerPhoto: string | null;
  isFake: boolean;
  minimized: boolean;
}

interface ChatContextType {
  openChats: OpenChat[];
  openChat: (chat: Omit<OpenChat, "minimized">) => void;
  closeChat: (chatId: string) => void;
  toggleMinimize: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

const MAX_OPEN = 3;

export function ChatProvider({ children }: { children: ReactNode }) {
  const [openChats, setOpenChats] = useState<OpenChat[]>([]);

  const openChat = (chat: Omit<OpenChat, "minimized">) => {
    setOpenChats(prev => {
      const exists = prev.find(c => c.chatId === chat.chatId);
      if (exists) {
        return prev.map(c => c.chatId === chat.chatId ? { ...c, minimized: false } : c);
      }
      const next = [...prev, { ...chat, minimized: false }];
      return next.length > MAX_OPEN ? next.slice(next.length - MAX_OPEN) : next;
    });
  };

  const closeChat = (chatId: string) => {
    setOpenChats(prev => prev.filter(c => c.chatId !== chatId));
  };

  const toggleMinimize = (chatId: string) => {
    setOpenChats(prev => prev.map(c => c.chatId === chatId ? { ...c, minimized: !c.minimized } : c));
  };

  return (
    <ChatContext.Provider value={{ openChats, openChat, closeChat, toggleMinimize }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used within ChatProvider");
  return ctx;
}

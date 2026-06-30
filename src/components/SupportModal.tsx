import { useState } from "react";
import { createPortal } from "react-dom";
import { X, HelpCircle, Lightbulb, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";

export function SupportButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        title="Supporto e suggerimenti"
      >
        <HelpCircle className="w-4 h-4" />
      </button>
      {open && <SupportModal onClose={() => setOpen(false)} />}
    </>
  );
}

function SupportModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [type, setType] = useState<"support" | "suggestion">("support");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!subject.trim() || !message.trim()) return;
    setSending(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      await supabase.from("support_tickets" as any).insert({
        user_id: session.user.id,
        type,
        subject: subject.trim(),
        message: message.trim(),
      });
      setSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-primary/20 bg-background p-6 space-y-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base">Supporto e suggerimenti</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {sent ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <p className="font-semibold">Messaggio inviato!</p>
            <p className="text-sm text-muted-foreground">Grazie per il tuo feedback. Ti risponderemo al più presto.</p>
            <Button variant="cosmic-outline" size="sm" onClick={onClose}>Chiudi</Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setType("support")}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors ${
                  type === "support"
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-border"
                }`}
              >
                <HelpCircle className="w-4 h-4 shrink-0" />
                Problema tecnico
              </button>
              <button
                onClick={() => setType("suggestion")}
                className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-colors ${
                  type === "suggestion"
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/50 text-muted-foreground hover:border-border"
                }`}
              >
                <Lightbulb className="w-4 h-4 shrink-0" />
                Suggerimento
              </button>
            </div>

            <div className="space-y-3">
              <Input
                placeholder={type === "support" ? "Descrivi brevemente il problema" : "Titolo del suggerimento"}
                value={subject}
                onChange={e => setSubject(e.target.value)}
                maxLength={120}
              />
              <Textarea
                placeholder={
                  type === "support"
                    ? "Descrivi cosa è successo, su quale pagina, cosa hai fatto prima..."
                    : "Descrivi la tua idea o miglioramento..."
                }
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground text-right">{message.length}/2000</p>
            </div>

            <Button
              variant="cosmic"
              className="w-full gap-2"
              onClick={handleSubmit}
              disabled={sending || !subject.trim() || !message.trim()}
            >
              {sending ? (
                <span className="animate-pulse">Invio in corso...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Invia
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

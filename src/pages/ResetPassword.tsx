import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Lock, Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    // Supabase processes the URL token automatically on load.
    // We wait for either PASSWORD_RECOVERY event or an existing session.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      } else if (event === "SIGNED_IN" && session) {
        // PKCE flow: token exchanged, session created
        setSessionReady(true);
      }
    });

    // Also check if session already exists (e.g. page refreshed)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    // Timeout — if no session after 5s, the link is invalid/expired
    const timeout = setTimeout(() => {
      setInvalid(prev => {
        if (!prev) {
          supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) setInvalid(true);
          });
        }
        return prev;
      });
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({ variant: "destructive", title: t("common.error"), description: t("auth.passwordMin") });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ variant: "destructive", title: t("common.error"), description: t("auth.passwordMismatch") });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      toast({ title: t("auth.passwordUpdated"), description: t("auth.passwordUpdatedDesc") });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ variant: "destructive", title: t("common.error"), description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 numerology-pattern opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-primary/5" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="glass-cosmic rounded-2xl p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold">{t("common.appName")}</span>
          </div>

          {invalid ? (
            <div className="text-center space-y-4">
              <p className="text-destructive text-sm">{t("auth.resetLinkInvalid")}</p>
              <Button variant="cosmic-outline" onClick={() => navigate("/auth")}>
                {t("auth.backToLogin")}
              </Button>
            </div>
          ) : !sessionReady ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{t("auth.verifyingLink")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <KeyRound className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display text-2xl font-bold">{t("auth.newPasswordTitle")}</h2>
                <p className="text-sm text-muted-foreground mt-1">{t("auth.newPasswordDesc")}</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newpwd">{t("auth.newPassword")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="newpwd"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="pl-10 pr-10 input-cosmic"
                    autoFocus
                  />
                  <button type="button" onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmpwd">{t("auth.confirmPassword")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmpwd"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="pl-10 input-cosmic"
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-destructive">{t("auth.passwordMismatch")}</p>
                )}
              </div>

              <Button type="submit" variant="cosmic" size="lg" className="w-full" disabled={loading}>
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : t("auth.updatePassword")}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

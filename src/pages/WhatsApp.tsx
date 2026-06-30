import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  ArrowLeft,
  Smartphone,
  Clock,
  Bell,
  BellOff,
  Check,
  Loader2,
} from "lucide-react";

interface Profile {
  whatsapp_phone: string | null;
  whatsapp_notifications_enabled: boolean | null;
  whatsapp_notification_time: string | null;
  whatsapp_consent_at: string | null;
}

const WhatsApp = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [phone, setPhone] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationTime, setNotificationTime] = useState("08:00");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("whatsapp_phone, whatsapp_notifications_enabled, whatsapp_notification_time, whatsapp_consent_at")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      console.error("Error loading profile:", error);
    } else if (data) {
      setProfile(data);
      setPhone(data.whatsapp_phone || "");
      setNotificationsEnabled(data.whatsapp_notifications_enabled ?? true);
      setNotificationTime(data.whatsapp_notification_time || "08:00");
    }

    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const updates: {
        whatsapp_phone: string | null;
        whatsapp_notifications_enabled: boolean;
        whatsapp_notification_time: string;
        whatsapp_consent_at?: string;
      } = {
        whatsapp_phone: phone.trim() || null,
        whatsapp_notifications_enabled: notificationsEnabled,
        whatsapp_notification_time: notificationTime,
      };

      if (phone.trim() && !profile?.whatsapp_consent_at) {
        updates.whatsapp_consent_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("user_id", session.user.id);

      if (error) throw error;

      toast({
        title: t("whatsapp.settingsSaved"),
        description: t("whatsapp.settingsSavedDesc"),
      });

      setProfile({ ...profile, ...updates } as Profile);
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: t("common.error"),
        description: t("whatsapp.saveError"),
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 numerology-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-secondary/5 via-transparent to-primary/5 pointer-events-none" />

      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-semibold">{t("whatsapp.title")}</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="glass-cosmic rounded-2xl p-6">
            <h2 className="font-display text-lg font-semibold mb-2">
              {t("whatsapp.dailyGreeting")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("whatsapp.description")}
            </p>
          </div>

          <div className="glass-cosmic rounded-2xl p-6 space-y-6">
            <div>
              <Label htmlFor="phone">{t("whatsapp.phoneNumber")}</Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t("whatsapp.phonePlaceholder")}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {t("whatsapp.phoneHint")}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {notificationsEnabled ? (
                  <Bell className="w-5 h-5 text-primary" />
                ) : (
                  <BellOff className="w-5 h-5 text-muted-foreground" />
                )}
                <div>
                  <Label htmlFor="notifications" className="cursor-pointer">
                    {t("whatsapp.activeNotifications")}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {t("whatsapp.receiveGreeting")}
                  </p>
                </div>
              </div>
              <Switch
                id="notifications"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            <div>
              <Label htmlFor="time" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t("whatsapp.sendTime")}
              </Label>
              <Input
                id="time"
                type="time"
                value={notificationTime}
                onChange={(e) => setNotificationTime(e.target.value)}
                className="mt-2"
                disabled={!notificationsEnabled}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {t("whatsapp.timezone")}
              </p>
            </div>

            <Button
              variant="cosmic"
              className="w-full"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {t("whatsapp.saving")}
                </>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  {t("whatsapp.saveSettings")}
                </>
              )}
            </Button>
          </div>

          {profile?.whatsapp_consent_at && (
            <div className="text-center text-sm text-muted-foreground">
              <p>
                {t("whatsapp.consentDate", {
                  date: new Date(profile.whatsapp_consent_at).toLocaleDateString(i18n.language),
                })}
              </p>
            </div>
          )}

          <div className="glass-cosmic rounded-xl p-4 border border-amber-500/30">
            <p className="text-sm text-amber-200/80">
              {t("whatsapp.integrationNote")}
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default WhatsApp;

import { useState } from "react";
import { Bell, BellOff, X } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function PushNotificationBanner() {
  const { t } = useTranslation();
  const { permission, subscribed, loading, isSupported, subscribe, unsubscribe } = usePushNotifications();
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("push-banner-dismissed") === "1");

  if (!isSupported || dismissed || subscribed || permission === "denied") return null;
  if (permission === "granted") return null;

  const handleDismiss = () => {
    localStorage.setItem("push-banner-dismissed", "1");
    setDismissed(true);
  };

  const handleEnable = async () => {
    const ok = await subscribe();
    if (ok) localStorage.removeItem("push-banner-dismissed");
  };

  return (
    <div className="mx-4 mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
        <Bell className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{t("push.bannerTitle")}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{t("push.bannerDesc")}</p>
        <div className="flex gap-2 mt-3">
          <Button size="sm" variant="cosmic" onClick={handleEnable} disabled={loading} className="text-xs h-8">
            {loading ? t("common.loading") : t("push.enable")}
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-xs h-8 text-muted-foreground">
            {t("push.notNow")}
          </Button>
        </div>
      </div>
      <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

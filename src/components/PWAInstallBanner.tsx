import { useState } from "react";
import { Download, X, Share, Plus, MoreVertical } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function PWAInstallBanner() {
  const { t } = useTranslation();
  const { canInstall, hasNativePrompt, install, isIOS } = usePWAInstall();
  const [dismissed, setDismissed] = useState(() => {
    const ts = localStorage.getItem("pwa-banner-dismissed");
    if (!ts) return false;
    return Date.now() - Number(ts) < 30 * 24 * 60 * 60 * 1000;
  });
  const [showSteps, setShowSteps] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!canInstall || dismissed) return null;

  const handleInstall = async () => {
    if (hasNativePrompt) {
      setLoading(true);
      await install();
      setLoading(false);
    } else {
      setShowSteps(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa-banner-dismissed", String(Date.now()));
    setDismissed(true);
  };

  return (
    <div className="mx-4 mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 mt-0.5">
        <Download className="w-4 h-4 text-accent" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{t("pwa.bannerTitle")}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{t("pwa.bannerDesc")}</p>

        {showSteps ? (
          <ol className="mt-3 space-y-2">
            {isIOS ? (
              <>
                <li className="flex items-center gap-2 text-xs">
                  <Share className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>{t("pwa.iosStep1")} → {t("pwa.iosStep2")}</span>
                </li>
                <li className="text-xs text-muted-foreground">{t("pwa.iosStep3")}</li>
              </>
            ) : (
              <>
                <li className="flex items-center gap-2 text-xs">
                  <MoreVertical className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  <span>{t("pwa.androidStep1")} → {t("pwa.androidStep2")}</span>
                </li>
                <li className="text-xs text-muted-foreground">{t("pwa.androidStep3")}</li>
              </>
            )}
          </ol>
        ) : (
          <div className="flex gap-2 mt-3">
            <Button size="sm" variant="cosmic" onClick={handleInstall} disabled={loading} className="text-xs h-8">
              {loading ? t("common.loading") : t("pwa.install")}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-xs h-8 text-muted-foreground">
              {t("push.notNow")}
            </Button>
          </div>
        )}
      </div>
      <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground shrink-0">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

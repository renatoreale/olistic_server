import { useState } from "react";
import { Smartphone, Share, Plus, X, MoreVertical, HelpCircle, Download } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function PWAInstallButton() {
  const { t } = useTranslation();
  const { installed, install, isIOS, platform, hasNativePrompt } = usePWAInstall();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (installed) return null;

  if (hasNativePrompt) {
    return (
      <Button
        variant="cosmic-outline"
        size="sm"
        onClick={async () => {
          setLoading(true);
          await install();
          setLoading(false);
        }}
        disabled={loading}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        {loading ? t("common.loading") : t("pwa.installButton")}
      </Button>
    );
  }

  // No native prompt (iOS, Android cooldown, desktop) → show help
  return (
    <>
      <Button
        variant="cosmic-outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        {t("pwa.installButton")}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-primary/20 bg-background p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">
                  {isIOS ? t("pwa.iosTitle") : t("pwa.androidTitle")}
                </h2>
              </div>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-sm font-medium">{t("pwa.iosStep1")}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Share className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-muted-foreground">{t("pwa.iosStep1Hint")}</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <div>
                    <p className="text-sm font-medium">{t("pwa.iosStep2")}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Plus className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-muted-foreground">{t("pwa.iosStep2Hint")}</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-sm font-medium">{t("pwa.iosStep3")}</p>
                </li>
              </ol>
            ) : (
              <ol className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <div>
                    <p className="text-sm font-medium">{t("pwa.androidStep1")}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{t("pwa.androidStep1Hint")}</span>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-sm font-medium">{t("pwa.androidStep2")}</p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-sm font-medium">{t("pwa.androidStep3")}</p>
                </li>
              </ol>
            )}

            <p className="text-xs text-center text-muted-foreground pt-1 border-t border-border">
              {t("pwa.iosHint")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Shirt, Loader2, RefreshCw, X, Camera, AlertTriangle, Sparkles, Palette, CloudSun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DescriptionData {
  vibration: number;
  mood: string;
  colors: string;
  weather: string;
  advice: string;
}

const vibeColors: Record<number, string> = {
  1: "#7c2d2d", 2: "#3b82f6", 3: "#d97706", 4: "#4d7c0f",
  5: "#2563eb", 6: "#16a34a", 7: "#1e3a5f", 8: "#1f2937", 9: "#7c2d2d",
};

const DailyOutfits = () => {
  const { t } = useTranslation();
  const [outfitUrl, setOutfitUrl] = useState<string | null>(null);
  const [descData, setDescData] = useState<DescriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoCount, setPhotoCount] = useState(0);
  const navigate = useNavigate();

  const getCacheKey = () => `outfits_cache_${new Date().toISOString().split("T")[0]}`;

  const fetchOutfits = async (force = false) => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { count } = await supabase
        .from("photos")
        .select("id", { count: "exact", head: true })
        .eq("user_id", session.user.id);
      setPhotoCount(count || 0);

      if ((count || 0) === 0) { setLoading(false); return; }

      if (!force) {
        const cached = sessionStorage.getItem(getCacheKey());
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            const url = parsed?.outfitUrl;
            const dd = parsed?.descriptionData;
            if (url) { setOutfitUrl(url); setDescData(dd || null); setLoading(false); return; }
          } catch { /* invalid */ }
        }
      }

      const { data, error: fnError } = await supabase.functions.invoke("generate-outfits", {
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: { force },
      });

      if (fnError) {
        let errMsg = t("outfits.errorGenerate");
        try {
          const ctx = (fnError as any).context;
          if (ctx) {
            const body = typeof ctx.json === "function" ? await ctx.json() : (typeof ctx === "object" ? ctx : null);
            if (body?.error) errMsg = body.error;
          } else if ((fnError as any).message) errMsg = (fnError as any).message;
        } catch { /* ignore */ }
        setError(errMsg); setLoading(false); return;
      }

      if (data?.error) {
        setError(data.error);
      } else if (data?.outfits?.[0]) {
        const url = data.outfits[0];
        const dd = data.descriptionData || null;
        setOutfitUrl(url);
        setDescData(dd);
        sessionStorage.setItem(getCacheKey(), JSON.stringify({ outfitUrl: url, descriptionData: dd }));
      } else {
        setError("La generazione dell'immagine non è riuscita. Controlla di avere foto e regione di residenza nel profilo, poi riprova.");
      }
    } catch (e) {
      setError(t("outfits.errorConnection"));
    }

    setLoading(false);
  };

  useEffect(() => { fetchOutfits(); }, []);

  const accentColor = descData ? (vibeColors[descData.vibration] ?? "#7c3aed") : "#7c3aed";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-12"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shirt className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">{t("outfits.title")}</h2>
            <p className="text-sm text-muted-foreground">{t("outfits.subtitle")}</p>
          </div>
        </div>
        {!loading && (
          <Button variant="ghost" size="icon" onClick={() => { sessionStorage.removeItem(getCacheKey()); fetchOutfits(true); }} title={t("outfits.regenerate")}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* No photos */}
      {!loading && photoCount === 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl glass-cosmic border border-primary/20 text-center">
          <Camera className="w-12 h-12 text-primary mx-auto mb-4 opacity-60" />
          <p className="text-foreground font-semibold mb-2">{t("outfits.noPhotosTitle")}</p>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t("outfits.noPhotosDesc")}</p>
          <Button variant="cosmic" size="sm" onClick={() => navigate("/profile")}>
            <Camera className="w-4 h-4 mr-2" />{t("outfits.goUploadPhotos")}
          </Button>
        </motion.div>
      )}

      {/* Few photos warning */}
      {!loading && photoCount > 0 && photoCount < 5 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{t("outfits.improveWithPhotos")}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("outfits.photoPrompt", { count: photoCount, max: 10 })}</p>
            <Button variant="ghost" size="sm" className="mt-2 text-amber-500 hover:text-amber-400 p-0 h-auto" onClick={() => navigate("/profile")}>
              <Camera className="w-4 h-4 mr-1" />{t("outfits.uploadMore")}
            </Button>
          </div>
        </motion.div>
      )}

      {/* Loading */}
      {photoCount === 0 ? null : loading ? (
        <div className="glass-cosmic rounded-2xl p-12 flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <div className="text-center">
            <p className="text-foreground font-medium">{t("outfits.generating")}</p>
            <p className="text-sm text-muted-foreground mt-1">{t("outfits.generatingDesc")}</p>
          </div>
        </div>

      /* Error */
      ) : error ? (
        <div className="glass-cosmic rounded-2xl p-8 text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button variant="cosmic-outline" size="sm" onClick={() => navigate("/profile")}>
              <Camera className="w-4 h-4 mr-2" />{t("profile.title")}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => fetchOutfits(true)}>
              <RefreshCw className="w-4 h-4 mr-2" />{t("common.retry")}
            </Button>
          </div>
        </div>

      /* Main card */
      ) : outfitUrl ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl overflow-hidden glass-cosmic border border-border/30"
        >
          <div className="flex flex-col md:flex-row">

            {/* Photo */}
            <div
              className="relative w-full md:w-52 flex-shrink-0 cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={outfitUrl}
                alt="Outfit del giorno"
                className="w-full h-64 md:h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <a
                href={outfitUrl}
                download="outfit.png"
                className="absolute bottom-2 left-2 right-2 h-8 rounded-lg bg-black/60 backdrop-blur-sm hidden group-hover:flex items-center justify-center gap-1.5 text-xs font-medium text-white"
                onClick={(e) => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                {t("common.downloadImage")}
              </a>
            </div>

            {/* Description panel */}
            {descData && (
              <div className="flex-1 flex flex-col">

                {/* Top accent band */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />

                <div className="p-5 flex flex-col gap-4 flex-1">

                  {/* Vibration badge + mood */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      {descData.vibration}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Vibrazione del giorno</p>
                      <p className="text-sm font-semibold text-foreground capitalize">{descData.mood}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/30" />

                  {/* Colors + weather */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <Palette className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <span className="text-foreground font-medium">Colori: </span>{descData.colors}
                      </p>
                    </div>
                    {descData.weather && (
                      <div className="flex items-start gap-2">
                        <CloudSun className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground">{descData.weather}</p>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-border/30" />

                  {/* Daily advice */}
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 flex-shrink-0 mt-1" style={{ color: accentColor }} />
                    <p className="text-sm text-foreground leading-relaxed">{descData.advice}</p>
                  </div>

                </div>
              </div>
            )}
          </div>
        </motion.div>
      ) : null}

      {/* Lightbox */}
      {lightboxOpen && outfitUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white" onClick={() => setLightboxOpen(false)}>
            <X className="w-8 h-8" />
          </button>
          <img src={outfitUrl} alt="Outfit" className="max-w-full max-h-[90vh] object-contain rounded-xl" onClick={(e) => e.stopPropagation()} />
          <a href={outfitUrl} download="outfit.png" className="absolute top-4 left-4 z-10 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity" onClick={(e) => e.stopPropagation()}>
            {t("common.downloadImage")}
          </a>
        </div>
      )}
    </motion.section>
  );
};

export default DailyOutfits;

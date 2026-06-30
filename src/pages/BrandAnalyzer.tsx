import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sparkles,
  ArrowLeft,
  Building2,
  Lightbulb,
  Globe,
  Package,
  Target,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import {
  calculateBrandVibration,
  brandVibrationMeanings,
  brandObjectives,
  getLifePathCompatibility,
  getObjectiveCompatibility,
  suggestAlternatives,
} from "@/lib/brandNumerology";
import { useTranslation } from "react-i18next";

const brandTypes = [
  { id: "azienda", labelKey: "brand.company", icon: Building2 },
  { id: "progetto", labelKey: "brand.project", icon: Lightbulb },
  { id: "dominio", labelKey: "brand.domain", icon: Globe },
  { id: "prodotto", labelKey: "brand.product", icon: Package },
];

function AlignmentGauge({ score, t }: { score: number; t: (key: string) => string }) {
  const getColor = () => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-red-400";
  };
  const getIcon = () => {
    if (score >= 80) return CheckCircle2;
    if (score >= 60) return AlertTriangle;
    return XCircle;
  };
  const Icon = getIcon();
  const getLabel = () => {
    if (score >= 80) return t("brand.excellent");
    if (score >= 60) return t("brand.moderate");
    return t("brand.low");
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
          <circle
            cx="32" cy="32" r="28" fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeDasharray={`${(score / 100) * 175.9} 175.9`}
            strokeLinecap="round"
            className={getColor()}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-bold ${getColor()}`}>{score}</span>
        </div>
      </div>
      <div>
        <div className={`flex items-center gap-1.5 font-semibold ${getColor()}`}>
          <Icon className="w-4 h-4" />
          {getLabel()}
        </div>
      </div>
    </div>
  );
}

export default function BrandAnalyzer() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [lifePath, setLifePath] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [brandName, setBrandName] = useState("");
  const [brandType, setBrandType] = useState("azienda");
  const [objective, setObjective] = useState("financial");
  const [result, setResult] = useState<ReturnType<typeof calculateBrandVibration> | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }

      const { data: map } = await supabase
        .from("numerology_maps")
        .select("life_path")
        .eq("user_id", session.user.id)
        .order("computed_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (map) setLifePath(map.life_path);
      setLoading(false);
    };
    load();
  }, [navigate]);

  const analyze = () => {
    if (!brandName.trim()) return;
    setResult(calculateBrandVibration(brandName.trim()));
  };

  const meaning = result ? brandVibrationMeanings[result.vibration] : null;
  const lpCompat = result && lifePath ? getLifePathCompatibility(result.vibration, lifePath) : null;
  const objCompat = result ? getObjectiveCompatibility(result.vibration, objective) : null;

  // Find the best-aligned objective for suggestion
  const bestObjective = result
    ? brandObjectives.reduce((best, obj) => {
        const s = getObjectiveCompatibility(result.vibration, obj.id);
        return s.score > best.score ? { ...obj, score: s.score } : best;
      }, { id: "", label: "", alignedNumbers: [] as readonly number[], score: 0 })
    : null;

  const alternatives = result && objCompat && objCompat.score < 60
    ? (() => {
        const targetObj = brandObjectives.find((o) => o.id === objective);
        if (!targetObj || !targetObj.alignedNumbers[0]) return [];
        return suggestAlternatives(brandName, targetObj.alignedNumbers[0]);
      })()
    : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout title={t("brand.title")}>
      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        {/* Input section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-cosmic rounded-2xl p-6 space-y-6"
        >
          {/* Brand type selector */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">{t("brand.nameType")}</label>
            <div className="grid grid-cols-4 gap-2">
              {brandTypes.map((bt) => (
                <button
                  key={bt.id}
                  onClick={() => setBrandType(bt.id)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all text-xs ${
                    brandType === bt.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <bt.icon className="w-5 h-5" />
                  {t(bt.labelKey)}
                </button>
              ))}
            </div>
          </div>

          {/* Brand name input */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              {t("brand.brandName", { type: t(brandTypes.find((bt) => bt.id === brandType)?.labelKey || "") })}
            </label>
            <div className="flex gap-2">
              <Input
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder={t("brand.placeholder")}
                className="flex-1 bg-input/50"
                onKeyDown={(e) => e.key === "Enter" && analyze()}
              />
              <Button onClick={analyze} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                {t("brand.analyze")}
              </Button>
            </div>
          </div>

          {/* Objective selector */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">{t("brand.strategicObjective")}</label>
            <div className="flex flex-wrap gap-2">
              {brandObjectives.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setObjective(obj.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                    objective === obj.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/50 text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {obj.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {result && meaning && (
            <motion.div
              key={result.vibration + brandName}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Main vibration */}
              <div className="glass-cosmic rounded-2xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-3">{t("brand.vibration")}</p>
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${meaning.color} mb-4`}>
                  <span className="text-3xl font-bold text-white">{result.vibration}</span>
                </div>
                <h2 className="font-display text-2xl font-bold mb-1">{meaning.title}</h2>
                <p className="text-muted-foreground">{meaning.energy}</p>

                {/* Letter breakdown */}
                <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                  {result.letterBreakdown.map((l, i) => (
                    <div key={i} className="flex flex-col items-center bg-muted/50 rounded-lg px-2 py-1 min-w-[32px]">
                      <span className="text-xs text-muted-foreground">{l.letter}</span>
                      <span className="text-sm font-semibold text-primary">{l.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {t("brand.sum", { sum: result.totalSum, vibration: result.vibration })}
                </p>
              </div>

              {/* Strengths and ideal for */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-cosmic rounded-2xl p-5">
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {t("brand.strengths")}
                  </h3>
                  <ul className="space-y-1.5">
                    {meaning.strengths.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-cosmic rounded-2xl p-5">
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-primary" /> {t("brand.idealFor")}
                  </h3>
                  <ul className="space-y-1.5">
                    {meaning.idealFor.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Alignment indicators */}
              <div className="glass-cosmic rounded-2xl p-6 space-y-6">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-primary" /> {t("brand.strategicAlignment")}
                </h3>

                {/* Life Path compatibility */}
                {lpCompat && (
                  <div className="flex items-start gap-4">
                    <AlignmentGauge score={lpCompat.score} t={t} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{t("brand.withDestiny", { num: lifePath })}</p>
                      <p className="text-sm text-muted-foreground">{lpCompat.description}</p>
                    </div>
                  </div>
                )}

                {/* Objective compatibility */}
                {objCompat && (
                  <div className="flex items-start gap-4">
                    <AlignmentGauge score={objCompat.score} t={t} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {t("brand.withObjective", { label: brandObjectives.find((o) => o.id === objective)?.label })}
                      </p>
                      <p className="text-sm text-muted-foreground">{objCompat.description}</p>
                    </div>
                  </div>
                )}

                {bestObjective && bestObjective.score > 0 && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-sm">
                      <Lightbulb className="w-4 h-4 text-primary inline mr-1.5" />
                      <span className="font-medium">{t("brand.suggestion")}</span>{" "}
                      <span className="text-muted-foreground">
                        {t("brand.bestAligned", { label: bestObjective.label, score: bestObjective.score })}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Less ideal for */}
              {meaning.lessIdealFor.length > 0 && (
                <div className="glass-cosmic rounded-2xl p-5">
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> {t("brand.lessIdealFor")}
                  </h3>
                  <ul className="space-y-1.5">
                    {meaning.lessIdealFor.map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Alternative suggestions */}
              {alternatives.length > 0 && (
                <div className="glass-cosmic rounded-2xl p-5">
                  <h3 className="font-display font-semibold mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" /> {t("brand.alternatives")}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {t("brand.alternativesDesc")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {alternatives.map((alt) => {
                      const v = calculateBrandVibration(alt);
                      return (
                        <button
                          key={alt}
                          onClick={() => { setBrandName(alt); setResult(v); }}
                          className="px-3 py-2 rounded-xl border border-accent/30 bg-accent/5 text-sm hover:bg-accent/10 transition-all"
                        >
                          <span className="font-medium">{alt}</span>
                          <span className="ml-2 text-xs text-accent">({v.vibration})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

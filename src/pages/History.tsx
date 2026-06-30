import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Download,
  Calendar,
  Sparkles,
  Eye,
} from "lucide-react";

interface NumerologyMapRecord {
  id: string;
  life_path: number;
  destiny_expression: number;
  soul: number;
  personality: number;
  personal_year: number;
  personal_year_reference: number;
  created_at: string;
  pdf_url: string | null;
}

const History = () => {
  const [maps, setMaps] = useState<NumerologyMapRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    loadMaps();
  }, []);

  const loadMaps = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("numerology_maps")
      .select("id, life_path, destiny_expression, soul, personality, personal_year, personal_year_reference, created_at, pdf_url")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading maps:", error);
      toast({
        title: t("common.error"),
        description: t("history.loadError"),
        variant: "destructive",
      });
    } else {
      setMaps(data || []);
    }

    setLoading(false);
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
    <DashboardLayout title={t("history.title")}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {maps.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FileText className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-4">
              {t("history.noMaps")}
            </h1>
            <p className="text-muted-foreground mb-8">
              {t("history.noMapsDesc")}
            </p>
            <Button variant="cosmic" asChild>
              <Link to="/map">
                <Sparkles className="w-5 h-5 mr-2" />
                {t("history.generateMap")}
              </Link>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground mb-6">
              {t(maps.length === 1 ? "history.mapsCount_one" : "history.mapsCount_other", { count: maps.length })}
            </p>

            {maps.map((map, index) => (
              <motion.div
                key={map.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-cosmic rounded-xl p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(map.created_at).toLocaleString(i18n.language, {
                          year: "numeric", month: "long", day: "numeric",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-sm">
                      <span className="text-muted-foreground">{t("history.dest")}:</span>
                      <span className="font-semibold text-primary">{map.life_path}</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-sm">
                      <span className="text-muted-foreground">{t("history.io")}:</span>
                      <span className="font-semibold text-secondary">{map.destiny_expression}</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-sm">
                      <span className="text-muted-foreground">{t("history.anima")}:</span>
                      <span className="font-semibold text-accent">{map.soul}</span>
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted/30 text-sm">
                      <span className="text-muted-foreground">{t("history.pers")}:</span>
                      <span className="font-semibold">{map.personality}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
                  <span className="text-sm text-muted-foreground">
                    {t("history.personalYear")} {map.personal_year_reference}: <strong className="text-foreground">{map.personal_year}</strong>
                  </span>
                  <div className="flex-1" />
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/map">
                      <Eye className="w-4 h-4 mr-2" />
                      {t("history.view")}
                    </Link>
                  </Button>
                  {map.pdf_url && (
                    <Button variant="cosmic-outline" size="sm" asChild>
                      <a href={map.pdf_url} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;

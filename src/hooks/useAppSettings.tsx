import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type PaymentMode = "subscription" | "free";

interface AppSettingsContextType {
  paymentMode: PaymentMode;
  loading: boolean;
  isFreeMode: boolean;
  isSoulmatesBeta: boolean;
  refresh: () => Promise<void>;
}

const AppSettingsContext = createContext<AppSettingsContextType | null>(null);

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("subscription");
  const [isSoulmatesBeta, setIsSoulmatesBeta] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadSettings = useCallback(async () => {
    try {
      const { data } = await supabase
        .from("app_settings" as any)
        .select("setting_key, setting_value")
        .in("setting_key", ["payment_mode", "soulmates_beta_mode"]);
      if (data) {
        for (const row of data as any[]) {
          if (row.setting_key === "payment_mode") setPaymentMode(row.setting_value as PaymentMode);
          if (row.setting_key === "soulmates_beta_mode") setIsSoulmatesBeta(row.setting_value === "true");
        }
      }
    } catch (e) {
      console.error("Error loading app settings:", e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <AppSettingsContext.Provider value={{
      paymentMode,
      loading,
      isFreeMode: paymentMode === "free",
      isSoulmatesBeta,
      refresh: loadSettings,
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(AppSettingsContext);
  if (!ctx) {
    return { paymentMode: "subscription" as PaymentMode, loading: true, isFreeMode: false, isSoulmatesBeta: false, refresh: async () => {} };
  }
  return ctx;
}

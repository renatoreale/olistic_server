import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface TenantBranding {
  appName: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  tagline: string;
}

export interface TenantConfig {
  id: string;
  name: string;
  slug: string;
  branding: TenantBranding;
  enabledFeatures: string[];
  defaultLanguage: string;
}

const DEFAULT_BRANDING: TenantBranding = {
  appName: "Numflame",
  primaryColor: "#7c3aed",
  secondaryColor: "#a78bfa",
  logoUrl: null,
  faviconUrl: null,
  tagline: "Scopri il potere dei tuoi numeri",
};

const TenantContext = createContext<TenantConfig | null>(null);

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<TenantConfig | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TENANT_API_KEY;
    if (!apiKey) {
      // Nessuna chiave tenant: usa default
      setTenant({
        id: "",
        name: "Numflame",
        slug: "numflame",
        branding: DEFAULT_BRANDING,
        enabledFeatures: [],
        defaultLanguage: "it",
      });
      return;
    }

    supabase
      .rpc("get_tenant_config", { p_api_key: apiKey })
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) {
          console.warn("Tenant non trovato, uso default");
          setTenant({
            id: "",
            name: "Numflame",
            slug: "numflame",
            branding: DEFAULT_BRANDING,
            enabledFeatures: [],
            defaultLanguage: "it",
          });
          return;
        }
        const row = data[0];
        const branding: TenantBranding = {
          ...DEFAULT_BRANDING,
          ...(row.branding as Partial<TenantBranding>),
        };
        setTenant({
          id: row.id,
          name: row.name,
          slug: row.slug,
          branding,
          enabledFeatures: row.enabled_features ?? [],
          defaultLanguage: row.default_language ?? "it",
        });
      });
  }, []);

  // Applica branding dinamico al DOM
  useEffect(() => {
    if (!tenant) return;
    const { branding } = tenant;

    document.title = branding.appName;

    const root = document.documentElement;
    // Converte hex in HSL per le CSS variables di shadcn/tailwind
    root.style.setProperty("--tenant-primary", branding.primaryColor);
    root.style.setProperty("--tenant-secondary", branding.secondaryColor);

    if (branding.faviconUrl) {
      const link =
        document.querySelector<HTMLLinkElement>("link[rel~='icon']") ||
        Object.assign(document.createElement("link"), { rel: "icon" });
      link.href = branding.faviconUrl;
      document.head.appendChild(link);
    }
  }, [tenant]);

  return (
    <TenantContext.Provider value={tenant}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantConfig | null {
  return useContext(TenantContext);
}

export function useTenantFeature(featureKey: string): boolean {
  const tenant = useTenant();
  if (!tenant || tenant.enabledFeatures.length === 0) return true; // default: tutto abilitato
  return tenant.enabledFeatures.includes(featureKey);
}

export function useTenantApiKey(): string {
  return import.meta.env.VITE_TENANT_API_KEY ?? "tk_numflame_default";
}

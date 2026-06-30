import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface TenantConfig {
  id: string;
  name: string;
  slug: string;
  stripe_secret_key: string | null;
  stripe_webhook_secret: string | null;
  stripe_price_id_monthly: string | null;
  stripe_price_id_yearly: string | null;
  enabled_features: string[];
  default_language: string;
}

export async function resolveTenant(req: Request): Promise<TenantConfig | null> {
  const apiKey =
    req.headers.get("x-tenant-key") ??
    req.headers.get("X-Tenant-Key");

  if (!apiKey) return null;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data, error } = await supabase.rpc("get_tenant_full", {
    p_api_key: apiKey,
  });

  if (error || !data || data.length === 0) return null;
  return data[0] as TenantConfig;
}

export function corsHeaders(origin?: string | null) {
  return {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-tenant-key",
  };
}

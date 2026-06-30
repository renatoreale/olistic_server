import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = "mailto:support@numerologicaldestiny.com";

// Minimal Web Push implementation for Deno
async function sendWebPush(subscription: { endpoint: string; p256dh: string; auth: string }, payload: string) {
  const { endpoint, p256dh, auth } = subscription;

  // Import VAPID private key
  const privateKeyBytes = base64UrlDecode(VAPID_PRIVATE_KEY);
  const vapidKey = await crypto.subtle.importKey(
    "raw", privateKeyBytes, { name: "ECDH", namedCurve: "P-256" }, true, ["deriveKey", "deriveBits"]
  ).catch(async () => {
    // Try as pkcs8
    const pkcs8 = new Uint8Array([
      0x30, 0x41, 0x02, 0x01, 0x00, 0x30, 0x13, 0x06, 0x07, 0x2a, 0x86, 0x48,
      0xce, 0x3d, 0x02, 0x01, 0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03,
      0x01, 0x07, 0x04, 0x27, 0x30, 0x25, 0x02, 0x01, 0x01, 0x04, 0x20,
      ...privateKeyBytes
    ]);
    return crypto.subtle.importKey("pkcs8", pkcs8, { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"]);
  });

  // Build VAPID JWT
  const audience = new URL(endpoint).origin;
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ typ: "JWT", alg: "ES256" }));
  const claims = base64UrlEncode(JSON.stringify({ aud: audience, exp: now + 3600, sub: VAPID_SUBJECT }));
  const signingInput = `${header}.${claims}`;

  const ecKey = await crypto.subtle.importKey(
    "pkcs8",
    buildPkcs8(base64UrlDecode(VAPID_PRIVATE_KEY)),
    { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, ecKey, new TextEncoder().encode(signingInput));
  const jwt = `${signingInput}.${base64UrlEncode(sig)}`;

  const vapidHeader = `vapid t=${jwt},k=${VAPID_PUBLIC_KEY}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": vapidHeader,
      "Content-Type": "application/octet-stream",
      "Content-Encoding": "aes128gcm",
      "TTL": "86400",
    },
    body: new TextEncoder().encode(payload),
  });

  return response.status;
}

function buildPkcs8(privateKeyBytes: Uint8Array): ArrayBuffer {
  const prefix = new Uint8Array([
    0x30, 0x41, 0x02, 0x01, 0x00, 0x30, 0x13,
    0x06, 0x07, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x02, 0x01,
    0x06, 0x08, 0x2a, 0x86, 0x48, 0xce, 0x3d, 0x03, 0x01, 0x07,
    0x04, 0x27, 0x30, 0x25, 0x02, 0x01, 0x01, 0x04, 0x20,
  ]);
  const result = new Uint8Array(prefix.length + privateKeyBytes.length);
  result.set(prefix);
  result.set(privateKeyBytes, prefix.length);
  return result.buffer;
}

function base64UrlEncode(data: string | ArrayBuffer): string {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64UrlDecode(str: string): Uint8Array {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type" } });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const { user_id, title, body: msgBody, url, icon } = body;

    // Fetch subscriptions
    const query = supabase.from("push_subscriptions").select("*");
    if (user_id) query.eq("user_id", user_id);
    const { data: subs, error } = await query;
    if (error) throw error;

    const payload = JSON.stringify({ title, body: msgBody, url: url ?? "/dashboard", icon: icon ?? "/pwa-192x192.png" });

    const results = await Promise.allSettled(
      (subs ?? []).map((s: any) => sendWebPush({ endpoint: s.endpoint, p256dh: s.p256dh, auth: s.auth }, payload))
    );

    const failed = results.filter((r) => r.status === "rejected" || (r.status === "fulfilled" && (r.value === 404 || r.value === 410)));

    // Remove stale subscriptions (410 Gone)
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (r.status === "fulfilled" && (r.value === 404 || r.value === 410)) {
        await supabase.from("push_subscriptions").delete().eq("endpoint", subs![i].endpoint);
      }
    }

    return new Response(JSON.stringify({ sent: results.length - failed.length, failed: failed.length }), {
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});

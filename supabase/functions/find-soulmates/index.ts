import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ── Numerology engine (Pythagorean) ──────────────────────────────────────────

const LETTER_MAP: Record<string, number> = {
  A:1,J:1,S:1, B:2,K:2,T:2, C:3,L:3,U:3, D:4,M:4,V:4, E:5,N:5,W:5,
  F:6,O:6,X:6, G:7,P:7,Y:7, H:8,Q:8,Z:8, I:9,R:9,
};
const ACCENT_MAP: Record<string,string> = {
  'À':'A','Á':'A','Â':'A','Ä':'A','Ã':'A',
  'È':'E','É':'E','Ê':'E','Ë':'E',
  'Ì':'I','Í':'I','Î':'I','Ï':'I',
  'Ò':'O','Ó':'O','Ô':'O','Ö':'O','Õ':'O',
  'Ù':'U','Ú':'U','Û':'U','Ü':'U',
};
const MASTERS = [11, 22, 33];
const VOWELS = ['A','E','I','O','U'];

function normalize(text: string): string {
  return text.toUpperCase().split('').map(c => ACCENT_MAP[c] || c).filter(c => /[A-Z]/.test(c)).join('');
}
function reduce(n: number): number {
  while (n > 9 && !MASTERS.includes(n)) n = String(n).split('').reduce((s,d) => s + +d, 0);
  return n;
}
function sumLetters(name: string): number {
  return normalize(name).split('').reduce((s,c) => s + (LETTER_MAP[c] || 0), 0);
}

function lifePath(day: number, month: number, year: number): number {
  return reduce(reduce(day) + reduce(month) + reduce(year));
}
function expression(fullName: string): number { return reduce(sumLetters(fullName)); }
function soul(fullName: string): number {
  return reduce(normalize(fullName).split('').filter(c => VOWELS.includes(c)).reduce((s,c) => s + (LETTER_MAP[c]||0), 0));
}
function personality(fullName: string): number {
  return reduce(normalize(fullName).split('').filter(c => !VOWELS.includes(c)).reduce((s,c) => s + (LETTER_MAP[c]||0), 0));
}
function quintessence(expr: number, lp: number): number { return reduce(expr + lp); }
function personalYear(day: number, month: number, currentYear: number): number {
  return reduce(reduce(day) + reduce(month) + reduce(currentYear));
}

// ── Compatibility score ───────────────────────────────────────────────────────

const TRIADS = [[1,5,7],[2,4,8],[3,6,9]];
const MASTER_PAIRS: [number,number][] = [[11,2],[22,4],[33,6]];

function baseScore(a: number, b: number): number {
  if (a === b) return 100;
  const av = MASTERS.includes(a) ? reduce(a) : a;
  const bv = MASTERS.includes(b) ? reduce(b) : b;
  for (const [m, r] of MASTER_PAIRS) {
    if ((a===m && b===r) || (b===m && a===r)) return 92;
    if ((av===m && bv===r) || (bv===m && av===r)) return 88;
  }
  for (const triad of TRIADS) {
    if (triad.includes(av) && triad.includes(bv)) return 85;
  }
  const diff = Math.abs(av - bv);
  if (diff === 0) return 100;
  if (diff === 1 || diff === 8) return 70;
  if (diff === 2 || diff === 7) return 55;
  if (diff === 3 || diff === 6) return 45;
  return 35;
}

function compatibilityScore(
  a: { lp:number; expr:number; sl:number; pers:number; quint:number; py:number },
  b: { lp:number; expr:number; sl:number; pers:number; quint:number; py:number },
): number {
  return Math.round(
    baseScore(a.lp,   b.lp)   * 0.20 +
    baseScore(a.expr, b.expr) * 0.20 +
    baseScore(a.sl,   b.sl)   * 0.20 +
    baseScore(a.pers, b.pers) * 0.10 +
    baseScore(a.quint,b.quint)* 0.15 +
    baseScore(a.py,   b.py)   * 0.15
  );
}

function scoreLabel(score: number): string {
  if (score >= 88) return "soulmate";
  if (score >= 75) return "high";
  if (score >= 60) return "good";
  if (score >= 45) return "moderate";
  return "low";
}

function calcProfile(nome: string, cognome: string, birthDate: string, currentYear: number) {
  const [y, m, d] = birthDate.split("-").map(Number);
  const fullName = `${nome} ${cognome}`;
  const lp = lifePath(d, m, y);
  const expr = expression(fullName);
  const sl = soul(fullName);
  const pers = personality(fullName);
  const quint = quintessence(expr, lp);
  const py = personalYear(d, m, currentYear);
  return { lp, expr, sl, pers, quint, py };
}

// ── Handler ───────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  console.log("[soulmates] request received method=" + req.method);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const token = req.headers.get("Authorization")?.replace("Bearer ", "") || "";
    console.log("[soulmates] env ok, token=" + (token ? "present" : "missing"));

    if (!token) {
      return new Response(JSON.stringify({ error: "Non autorizzato" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Use anon client to validate the user JWT
    const supabaseAnon = createClient(supabaseUrl, supabaseAnonKey);
    console.log("[soulmates] auth start");
    const { data: { user }, error: authErr } = await supabaseAnon.auth.getUser(token);
    if (authErr || !user) {
      console.log("[soulmates] auth failed:", authErr?.message);
      return new Response(JSON.stringify({ error: "Non autorizzato" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Client with user JWT for DB queries (respects RLS)
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const supabaseStorage = supabaseServiceKey
      ? createClient(supabaseUrl, supabaseServiceKey)
      : supabase;
    console.log(`[soulmates] user=${user.id}`);

    // Current user profile
    const { data: myProfile } = await supabase
      .from("profiles")
      .select("nome, cognome, birth_date, sesso, looking_for")
      .eq("user_id", user.id)
      .maybeSingle();
    console.log(`[soulmates] myProfile=${!!myProfile} birth_date=${myProfile?.birth_date}`);

    if (!myProfile?.birth_date) {
      return new Response(JSON.stringify({ error: "Profilo incompleto" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Fetch config + access in parallel (no external function calls)
    console.log("[soulmates] fetching config+access+candidates in parallel");
    const [settingsRes, overridesRes, ppuRes] = await Promise.all([
      supabase.from("app_settings" as any).select("setting_value").eq("setting_key", "dating_free_photos_count").maybeSingle(),
      supabase.from("user_service_overrides" as any).select("service_key").eq("user_id", user.id),
      supabase.from("pay_per_use_purchases" as any).select("product_id").eq("user_id", user.id),
    ]);
    const freePhotos = parseInt((settingsRes.data as any)?.setting_value || "1", 10);
    const overrides = ((overridesRes.data || []) as any[]).map((o: any) => o.service_key as string);
    const ppuPurchases = ((ppuRes.data || []) as any[]).map((p: any) => p.product_id as string);
    const isSubscribed = overrides.includes("dating_photos") || overrides.includes("subscription") || ppuPurchases.length > 0;
    const photosToShow = isSubscribed ? 99 : freePhotos;

    // All dating-visible profiles via RPC
    console.log("[soulmates] fetching dating profiles");
    const { data: candidates, error: candidatesErr } = await supabase.rpc("get_dating_profiles");
    console.log(`[soulmates] candidates=${(candidates as any[])?.length} err=${candidatesErr?.message}`);
    const others = ((candidates as any[]) || []).filter((p: any) => p.user_id !== user.id);

    // Filter by looking_for
    const myGender = myProfile.sesso; // 'M' or 'F'
    const myLookingFor = myProfile.looking_for || "B";

    const filtered = others.filter((p: any) => {
      // Does the candidate match what I'm looking for?
      const candidateGender = p.sesso;
      const wantThem = myLookingFor === "B" || myLookingFor === candidateGender;
      // Does the candidate look for someone like me?
      const theirLookingFor = p.looking_for || "B";
      const wantsMe = theirLookingFor === "B" || theirLookingFor === myGender;
      return wantThem && wantsMe;
    });

    const currentYear = new Date().getFullYear();
    const myNums = calcProfile(myProfile.nome, myProfile.cognome, myProfile.birth_date, currentYear);

    // Calculate scores
    const scored = filtered.map((p: any) => {
      const nums = calcProfile(p.nome, p.cognome, p.birth_date, currentYear);
      const score = compatibilityScore(myNums, nums);
      const scores = {
        lp:      baseScore(myNums.lp,    nums.lp),
        expr:    baseScore(myNums.expr,  nums.expr),
        sl:      baseScore(myNums.sl,    nums.sl),
        pers:    baseScore(myNums.pers,  nums.pers),
        quint:   baseScore(myNums.quint, nums.quint),
        py:      baseScore(myNums.py,    nums.py),
        passion: Math.round(
          baseScore(myNums.sl,   nums.sl)   * 0.45 +
          baseScore(myNums.lp,   nums.lp)   * 0.25 +
          baseScore(myNums.pers, nums.pers) * 0.20 +
          baseScore(myNums.py,   nums.py)   * 0.10
        ),
      };
      return { ...p, score, label: scoreLabel(score), nums, scores };
    });

    // Real profiles first, then fake — each group sorted by score descending
    const realProfiles = scored.filter((p: any) => !p.is_fake).sort((a: any, b: any) => b.score - a.score);
    const fakeProfiles = scored.filter((p: any) => p.is_fake).sort((a: any, b: any) => b.score - a.score);
    const top10 = [...realProfiles, ...fakeProfiles].slice(0, 30);

    console.log(`[soulmates] top=${top10.length}, fetching photos`);
    // Fetch photo metadata for all matches in parallel (one RPC per user)
    const photosPerUser = await Promise.all(
      top10.map(p => supabase.rpc("get_dating_user_photos", { target_user_id: p.user_id }))
    );

    // Collect all storage paths across all users, skip already-absolute URLs
    const allPathsFlat: { userIdx: number; photoIdx: number; path: string }[] = [];
    const absoluteUrls: Record<string, string> = {};

    photosPerUser.forEach((res, userIdx) => {
      const allPhotos: any[] = (res.data as any[]) || [];
      allPhotos.slice(0, photosToShow).forEach((photo: any, photoIdx: number) => {
        const path: string = photo.storage_path;
        if (path.startsWith("https://") || path.startsWith("http://")) {
          absoluteUrls[`${userIdx}-${photoIdx}`] = path;
        } else {
          allPathsFlat.push({ userIdx, photoIdx, path });
        }
      });
    });

    // ONE batch signed URL call for all paths
    const signedMap: Record<string, string> = {};
    if (allPathsFlat.length > 0) {
      const { data: signedBatch } = await supabaseStorage.storage
        .from("user-photos")
        .createSignedUrls(allPathsFlat.map(e => e.path), 3600);
      (signedBatch || []).forEach((entry: any, idx: number) => {
        const { userIdx, photoIdx } = allPathsFlat[idx];
        if (entry.signedUrl) signedMap[`${userIdx}-${photoIdx}`] = entry.signedUrl;
      });
    }

    const results = top10.map((p: any, i: number) => {
      const allPhotos: any[] = (photosPerUser[i].data as any[]) || [];
      const totalPhotos = allPhotos.length;
      const photoUrls = allPhotos.slice(0, photosToShow).map((_: any, j: number) => {
        return absoluteUrls[`${i}-${j}`] || signedMap[`${i}-${j}`] || null;
      }).filter(Boolean) as string[];

      return {
        user_id: p.user_id,
        nome: p.nome,
        cognome_initial: p.cognome ? p.cognome.charAt(0) + "." : "",
        birth_date: p.birth_date,
        sesso: p.sesso,
        bio: p.bio || null,
        score: p.score,
        label: p.label,
        nums: { lp: p.nums.lp, expr: p.nums.expr, sl: p.nums.sl, pers: p.nums.pers, quint: p.nums.quint, py: p.nums.py },
        scores: { lp: p.scores.lp, expr: p.scores.expr, sl: p.scores.sl, pers: p.scores.pers, quint: p.scores.quint, py: p.scores.py, passion: p.scores.passion },
        photos: photoUrls,
        photos_locked: !isSubscribed && totalPhotos > freePhotos,
        total_photos: totalPhotos,
        is_fake: p.is_fake || false,
      };
    });

    console.log(`[soulmates] done, returning ${results.length} results (max 30)`);
    return new Response(JSON.stringify({ soulmates: results, free_photos: freePhotos, is_subscribed: isSubscribed, my_nums: myNums }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("find-soulmates error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Errore" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

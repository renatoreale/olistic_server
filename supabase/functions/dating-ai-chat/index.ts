import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MASTERS = [11, 22, 33];
const LETTER_MAP: Record<string, number> = {
  A:1,J:1,S:1, B:2,K:2,T:2, C:3,L:3,U:3, D:4,M:4,V:4, E:5,N:5,W:5,
  F:6,O:6,X:6, G:7,P:7,Y:7, H:8,Q:8,Z:8, I:9,R:9,
};
const ACCENT_MAP: Record<string,string> = {
  'À':'A','Á':'A','Â':'A','Ä':'A','È':'E','É':'E','Ì':'I','Í':'I','Ò':'O','Ó':'O','Ù':'U','Ú':'U',
};
const VOWELS = ['A','E','I','O','U'];

function normalize(t: string) {
  return t.toUpperCase().split('').map(c => ACCENT_MAP[c] || c).filter(c => /[A-Z]/.test(c)).join('');
}
function reduce(n: number): number {
  while (n > 9 && !MASTERS.includes(n)) n = String(n).split('').reduce((s,d) => s + +d, 0);
  return n;
}
function lifePath(d: number, m: number, y: number) { return reduce(reduce(d)+reduce(m)+reduce(y)); }
function expression(name: string) {
  return reduce(normalize(name).split('').reduce((s,c) => s+(LETTER_MAP[c]||0), 0));
}
function soul(name: string) {
  return reduce(normalize(name).split('').filter(c=>VOWELS.includes(c)).reduce((s,c)=>s+(LETTER_MAP[c]||0),0));
}
function calcAge(birth: string) {
  const [y,m,d] = birth.split('-').map(Number);
  const today = new Date();
  let a = today.getFullYear()-y;
  if(today.getMonth()+1<m||(today.getMonth()+1===m&&today.getDate()<d)) a--;
  return a;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey    = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const token = req.headers.get("Authorization")?.replace("Bearer ", "") || "";

    const db      = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: `Bearer ${token}` } } });
    const dbAdmin = createClient(supabaseUrl, serviceKey);

    const { data: { user }, error: authErr } = await db.auth.getUser(token);
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Non autorizzato" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { chat_id, message } = await req.json();
    if (!chat_id || !message?.trim()) {
      return new Response(JSON.stringify({ error: "Parametri mancanti" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Verify chat belongs to user
    const { data: chat, error: chatErr } = await db
      .from("dating_chats")
      .select("*")
      .eq("id", chat_id)
      .single();

    if (chatErr || !chat) {
      console.log("[ai-chat] chat not found:", chatErr?.message);
      return new Response(JSON.stringify({ error: "Chat non trovata" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const partnerId = (chat as any).initiator_id === user.id ? (chat as any).partner_id : (chat as any).initiator_id;
    console.log("[ai-chat] chat.initiator_id=" + (chat as any).initiator_id + " chat.partner_id=" + (chat as any).partner_id + " user.id=" + user.id + " -> partnerId=" + partnerId);

    // Fetch fake profile (use user client — RLS policy allows authenticated reads)
    const { data: fake, error: fakeErr } = await db
      .from("fake_dating_profiles")
      .select("nome, cognome, birth_date, sesso, bio")
      .eq("user_id", partnerId)
      .maybeSingle();

    console.log("[ai-chat] fake found=" + !!fake + " fakeErr=" + fakeErr?.message);

    if (fakeErr) {
      return new Response(JSON.stringify({ error: "DB error: " + fakeErr.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!fake) {
      return new Response(JSON.stringify({ error: "Profilo fake non trovato per partnerId=" + partnerId }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Save user message
    await db.from("dating_messages").insert({
      chat_id,
      sender_id: user.id,
      content: message.trim(),
      is_ai: false,
    });

    // Fetch conversation history (last 20 messages)
    const { data: history } = await db
      .from("dating_messages")
      .select("sender_id, content, is_ai")
      .eq("chat_id", chat_id)
      .order("created_at", { ascending: true })
      .limit(20);

    // Build AI persona from numerological profile
    const fullName = `${(fake as any).nome} ${(fake as any).cognome}`;
    const [y, m, d] = (fake as any).birth_date.split('-').map(Number);
    const lp    = lifePath(d, m, y);
    const expr  = expression(fullName);
    const sl    = soul(fullName);
    const eta   = calcAge((fake as any).birth_date);
    const genere = (fake as any).sesso === 'F' ? 'donna' : 'uomo';

    const system = `Sei ${(fake as any).nome}, ${eta} anni, ${genere}, iscritto/a a un'app di incontri basata sulla numerologia.
La tua bio: "${(fake as any).bio || 'Amo la vita e le connessioni autentiche.'}"
I tuoi numeri numerologici: Destino ${lp}, Espressione ${expr}, Anima ${sl}.
Sei appassionato/a di numerologia e credi nel potere dei numeri nelle relazioni.
Stai chattando con qualcuno con cui hai un'alta compatibilità numerologica.
Rispondi in modo naturale, caldo e spontaneo, come in una vera chat di dating.
Scrivi sempre in italiano. Risposte brevi (massimo 2-3 frasi). Fai domande per coinvolgere l'altro.
Non rivelare mai di essere un'intelligenza artificiale.`;

    const anthropicMessages = (history || []).map((msg: any) => ({
      role: (msg.sender_id === user.id ? "user" : "assistant") as "user" | "assistant",
      content: msg.content,
    }));

    if (anthropicMessages.length === 0 || anthropicMessages[anthropicMessages.length - 1].role !== "user") {
      anthropicMessages.push({ role: "user", content: message.trim() });
    }

    const openRouterKey = Deno.env.get("OPENROUTER_API_KEY")!;
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${openRouterKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        max_tokens: 200,
        messages: [{ role: "system", content: system }, ...anthropicMessages],
      }),
    });

    const aiJson = await aiRes.json();
    const reply = (aiJson.choices?.[0]?.message?.content as string) || "...";

    await dbAdmin.from("dating_messages").insert({
      chat_id,
      sender_id: null,
      content: reply,
      is_ai: true,
    });

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (e) {
    console.error("dating-ai-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Errore" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

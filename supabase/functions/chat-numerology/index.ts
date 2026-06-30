import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const numberMeanings: Record<number, { keywords: string[]; talents: string[]; shadows: string[]; evolution: string }> = {
  1: { keywords: ["iniziativa", "autonomia", "leadership"], talents: ["indipendenza", "coraggio", "spirito pionieristico"], shadows: ["egoismo", "impulsività"], evolution: "imparare a guidare senza dominare" },
  2: { keywords: ["collaborazione", "sensibilità", "relazione"], talents: ["empatia", "diplomazia", "ascolto"], shadows: ["dipendenza", "insicurezza"], evolution: "sviluppare fiducia in sé" },
  3: { keywords: ["comunicazione", "creatività", "espressione"], talents: ["entusiasmo", "arte", "socialità"], shadows: ["dispersione", "superficialità"], evolution: "dare forma concreta alle idee" },
  4: { keywords: ["struttura", "stabilità", "metodo"], talents: ["affidabilità", "costanza", "concretezza"], shadows: ["rigidità", "paura del cambiamento"], evolution: "costruire senza irrigidirsi" },
  5: { keywords: ["cambiamento", "libertà", "esperienza"], talents: ["adattabilità", "curiosità"], shadows: ["instabilità", "eccessi"], evolution: "libertà con responsabilità" },
  6: { keywords: ["responsabilità", "amore", "armonia"], talents: ["cura", "senso estetico", "protezione"], shadows: ["controllo", "sacrificio eccessivo"], evolution: "amare senza annullarsi" },
  7: { keywords: ["introspezione", "ricerca", "spiritualità"], talents: ["analisi", "profondità", "intuizione"], shadows: ["isolamento", "diffidenza"], evolution: "fidarsi e condividere" },
  8: { keywords: ["potere", "realizzazione", "materia"], talents: ["leadership", "gestione", "successo"], shadows: ["materialismo", "durezza"], evolution: "usare il potere con etica" },
  9: { keywords: ["umanità", "chiusura", "servizio"], talents: ["compassione", "visione ampia"], shadows: ["vittimismo", "dispersione emotiva"], evolution: "lasciare andare il passato" },
};

const personalYearMeanings: Record<number, string> = {
  1: "Nuovi inizi, decisioni, autonomia. Anno per prendere in mano la propria vita.",
  2: "Collaborazione, pazienza, relazioni. Anno per lavorare con gli altri.",
  3: "Espansione, comunicazione, creatività. Anno per esprimersi e socializzare.",
  4: "Costruzione, impegno, disciplina. Anno per lavorare sulle basi solide.",
  5: "Cambiamento, movimento, libertà. Anno di trasformazioni e novità.",
  6: "Responsabilità, amore, famiglia. Anno per consolidare i rapporti.",
  7: "Introspezione, studio, rallentamento. Anno per riflettere e crescere interiormente.",
  8: "Risultati, carriera, potere personale. Anno di raccolta e concretezza.",
  9: "Chiusura, conclusione, trasformazione. Anno per fare bilanci e lasciar andare.",
  11: "Visione, risveglio, ispirazione. Anno di alta vibrazione spirituale.",
  22: "Realizzazione concreta, costruzione duratura. Anno per grandi progetti.",
  33: "Servizio, amore, responsabilità collettiva. Anno di insegnamento e guarigione.",
};

const dayVibeDescriptions: Record<number, string> = {
  1: "energia dinamica, iniziativa, toni rosso scuro/bordeaux, stile sobrio e deciso",
  2: "armonia, delicatezza, toni grigio chiaro e blu, stile morbido e pulito",
  3: "creatività, gioia, toni giallo senape e beige, stile casual curato",
  4: "ordine, stabilità, toni terra e verde oliva, stile classico quotidiano",
  5: "libertà, avventura, toni blu elettrico e grigio, stile casual moderno",
  6: "bellezza, cura, toni verde salvia e crema, stile raffinato ma semplice",
  7: "introspezione, mistero, toni blu navy e antracite, stile minimalista pulito",
  8: "potere, successo, toni nero e grigio scuro, stile elegante sobrio",
  9: "universalità, compassione, toni bordeaux e bianco panna, stile curato senza eccessi",
};

function reduceNumber(num: number): number {
  const masterNumbers = [11, 22, 33];
  while (num > 9 && !masterNumbers.includes(num)) {
    num = num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

function calculateDayVibration(day: number, month: number, year: number): number {
  const sum = day + month + reduceNumber(year);
  return reduceNumber(sum);
}



Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, profile, numerologyContext, conversationHistory, userId } = await req.json();

    const apiKey = Deno.env.get("OPENROUTER_API_KEY");
    if (!apiKey) throw new Error("OPENROUTER_API_KEY not configured");

    const today = new Date();
    const dayVibration = calculateDayVibration(today.getDate(), today.getMonth() + 1, today.getFullYear());

    // Build numerology context
    const numerologyInfo = numerologyContext
      ? `
I numeri dell'utente:
- Life Path: ${numerologyContext.lifePath} (${numberMeanings[numerologyContext.lifePath > 9 ? (numerologyContext.lifePath === 11 ? 2 : numerologyContext.lifePath === 22 ? 4 : 6) : numerologyContext.lifePath]?.keywords.join(", ")})
- Espressione: ${numerologyContext.expression}
- Anima: ${numerologyContext.soul}
- Personalità: ${numerologyContext.personality}
- Anno Personale: ${numerologyContext.personalYear} (${personalYearMeanings[numerologyContext.personalYear] || ""})
`
      : "L'utente non ha ancora generato la mappa numerologica.";

    const dayVibeDesc = dayVibeDescriptions[dayVibration] || "equilibrio e armonia";

    const systemPrompt = `Sei un consulente di numerologia pitagorica professionale per l'app "Destino Numerologico".

REGOLE FONDAMENTALI:
1. Applichi SOLO le regole della numerologia pitagorica classica
2. Non fai diagnosi mediche, legali o finanziarie
3. Usi linguaggio orientativo: "favorisce", "tende a", "è più probabile"
4. Non fai promesse assolute o predizioni fatalistiche
5. Rispondi in italiano in modo caldo e professionale
6. NON usare mai formati come {"action": ...} o simili nella risposta.
7. DIVIETO ASSOLUTO: Non scrivere MAI consigli su abbigliamento, look, outfit, colori da indossare, capi di vestiario o stile. Questo vale SEMPRE, anche se l'utente lo chiede esplicitamente. Ignora completamente qualsiasi richiesta relativa all'abbigliamento e rispondi solo agli aspetti numerologici della domanda.

CONTESTO UTENTE:
Nome: ${profile?.nome || "Utente"}
Data di nascita: ${profile?.birth_date || "non specificata"}
${numerologyInfo}

VIBRAZIONE DEL GIORNO (${today.toLocaleDateString("it-IT")}): ${dayVibration}
Questa vibrazione influenza le energie della giornata portando qualità di ${numberMeanings[dayVibration]?.keywords.join(", ") || "equilibrio"}.

ISTRUZIONI:
- Rispondi in modo chiaro e utile basandoti sui numeri dell'utente
- Se ti chiedono delle date favorevoli, considera la compatibilità tra i numeri dell'utente e le vibrazioni delle date
- Per consigli sulla giornata, integra la vibrazione del giorno con l'Anno Personale dell'utente
- Se manca la mappa numerologica, suggerisci gentilmente di generarla prima
- Mantieni un tono professionale ma accogliente`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(conversationHistory || []),
      { role: "user", content: message },
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit raggiunto. Riprova tra qualche istante." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Crediti AI esauriti." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "Mi dispiace, non sono riuscito a elaborare la risposta.";

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Error in chat-numerology:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        response: "Mi dispiace, si è verificato un errore. Riprova tra qualche istante.",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

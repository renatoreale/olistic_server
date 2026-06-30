export interface LBContent {
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    titleAccentLine1: string
    titleAccentLine2: string
    subtitle: string
    subtitleMuted: string
    ctaPrimary: string
    ctaSecondary: string
    trust: [string, string, string]
    cardName: string
    cardSubtitle: string
    cardCompatLabel: string
    cardInsight: string
  }
  differenza: {
    eyebrow: string
    titleLine1: string
    titleAccent: string
    subtitle: string
    cards: [
      { emoji: string; chapter: string; title: string; description: string },
      { emoji: string; chapter: string; title: string; description: string },
      { emoji: string; chapter: string; title: string; description: string },
    ]
  }
  come: {
    titleLine1: string
    titleAccent: string
    steps: [
      { title: string; description: string },
      { title: string; description: string },
      { title: string; description: string },
    ]
    cta: string
  }
  services: {
    eyebrow: string
    title: string
    subtitle: string
    items: Array<{ title: string; description: string; hot?: boolean }>
  }
  about: {
    titleLine1: string
    titleAccent: string
    p1: string
    p2: string
    p3: string
    stats: [
      { value: string; label: string },
      { value: string; label: string },
      { value: string; label: string },
    ]
  }
  testimonials: {
    title: string
    items: [
      { name: string; destinyNum: string; destinyLabel: string; quote: string },
      { name: string; destinyNum: string; destinyLabel: string; quote: string },
      { name: string; destinyNum: string; destinyLabel: string; quote: string },
    ]
  }
  faq: {
    title: string
    items: Array<{ q: string; a: string }>
  }
  cta: {
    eyebrow: string
    titleLine1: string
    titleAccent: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    note: string
  }
}

export const defaultContent: LBContent = {
  hero: {
    eyebrow: "Numerologia Pitagorica Applicata all'Amore",
    titleLine1: "La tua anima",
    titleLine2: "gemella esiste.",
    titleAccentLine1: "Trova chi vibra",
    titleAccentLine2: "alla tua frequenza.",
    subtitle:
      "NumerologicalDestiny non è un'app di incontri. È un sistema che usa la Numerologia Pitagorica per calcolare la vera compatibilità tra due persone basato su 6 dimensioni, non un algoritmo di foto.",
    subtitleMuted:
      "E non è solo dating: trovi la tua anima gemella e ottieni una piattaforma completa di autoconoscenza con 10+ servizi inclusi.",
    ctaPrimary: "Inizia ora, è gratis!",
    ctaSecondary: "Scopri la differenza",
    trust: ["Tutti gli strumenti sono gratuiti", "Nessuna carta richiesta", "Profili reali"],
    cardName: "Lucia R.",
    cardSubtitle: "Destino: 7 · Anno Personale: 4",
    cardCompatLabel: "Compatibilità",
    cardInsight: "Entrambi numero 7 — un'armonia rara. La ricerca del significato profondo vi unisce.",
  },
  differenza: {
    eyebrow: "Perché siamo diversi",
    titleLine1: "Nessun algoritmo di swipe.",
    titleAccent: "Qui trovi la tua vibrazione.",
    subtitle:
      "Milioni di persone passano ore a scorrere profili ogni giorno, ma le connessioni reali sono rarissime. Il problema non sei tu, è il sistema. Noi ti mostriamo chi sei davvero e chi è matematicamente compatibile con te — tutto calcolato dalla data di nascita su 6 dimensioni profonde.",
    cards: [
      {
        emoji: "🧭",
        chapter: "",
        title: "Compatibilità reale, non un algoritmo opaco",
        description:
          "Mentre le app più diffuse usano algoritmi segreti basati su foto e posizione, noi usiamo la Numerologia Pitagorica — un sistema millenario, trasparente e personale, calcolato dalla tua data di nascita esatta.",
      },
      {
        emoji: "🌟",
        chapter: "",
        title: "Autoconoscenza che porta all'amore",
        description:
          "Prima di conoscere l'altro, conosci te stesso. La tua Mappa Numerologica completa ti rivela chi sei, cosa cerchi davvero e quali energie guidano il tuo destino.",
      },
      {
        emoji: "✨",
        chapter: "",
        title: "Un ecosistema, non solo dating",
        description:
          "Trovare l'anima gemella è solo l'inizio. Hai accesso a 10+ servizi: date favorevoli, outfit del giorno, analisi della tua casa, consulente AI, anno personale e molto altro.\nDisponibile anche un area di formazione per capire i tuoi punti deboli e come intervenire.",
      },
    ],
  },
  come: {
    titleLine1: "Tre passi verso",
    titleAccent: "la tua anima gemella",
    steps: [
      {
        title: "Crea la tua Mappa Numerologica",
        description:
          "Inserisci la tua data di nascita. In pochi secondi scopri tutti i tuoi numeri fondamentali: Destino, Anima, Personalità, Karma, Espressione e Anno Personale.",
      },
      {
        title: "Scopri le tue Anime Gemelle",
        description:
          "Il sistema analizza tutti gli utenti registrati e ti mostra chi è numerologicamente più compatibile. Vedi il punteggio per ogni dimensione, non un voto generico.",
      },
      {
        title: "Connettiti con autenticità",
        description:
          "Chatta con i tuoi match reali. Nessuno swipe, nessun algoritmo a pagamento — solo compatibilità autentica basata su chi sei davvero.",
      },
    ],
    cta: "Inizia gratis",
  },
  services: {
    eyebrow: "Non una semplice app di incontri.",
    title: "Un ecosistema completo",
    subtitle:
      "Trovare l'amore è solo il punto di partenza. oltre 10 strumenti per conoscere te stesso",
    items: [
      { title: "Mappa Numerologica", description: "Il ritratto completo di chi sei attraverso i numeri pitagorici.", hot: false },
      { title: "Anime Gemelle", description: "Match reali calcolati su 6 dimensioni di compatibilità.", hot: true },
      { title: "Esperto AI", description: "Il tuo consulente numerologico personale disponibile 24/7.", hot: false },
      { title: "Date Favorevoli", description: "I giorni perfetti per ogni decisione importante della tua vita.", hot: false },
      { title: "Pilastri della Crescita", description: "Un percorso in 7 tappe per integrare le energie dei tuoi numeri.", hot: false },
      { title: "Compatibilità", description: "Analizza l'affinità con partner, amici, colleghi o familiari.", hot: false },
      { title: "Outfit del Giorno", description: "I colori giusti in base alle energie numerologiche di oggi.", hot: false },
      { title: "Anno Personale", description: "Tema e opportunità del tuo anno personale secondo i numeri.", hot: false },
      { title: "Analizzatore Brand", description: "La vibrazione numerologica del tuo nome, brand o progetto.", hot: false },
      { title: "Vibrazione Casa", description: "Come il numero del tuo indirizzo influenza la tua vita.", hot: false },
    ],
  },
  about: {
    titleLine1: "Chi",
    titleAccent: "sono",
    p1: "Mi chiamo Renato R. e ho sempre studiato i pattern nascosti che influenzano la realtà, con un forte interesse per la numerologia, la fisica quantistica e l'informatica.",
    p2: "Nel corso degli anni ho sviluppato questo sistema per rendere la numerologia più chiara, accessibile e concreta: non teoria astratta, ma guida pratica che puoi usare ogni giorno — anche per trovare persone davvero compatibili con te.",
    p3: "A differenza degli oroscopi generici, ogni analisi è calcolata dalla tua data di nascita e nome completo, seguendo i principi della tradizione pitagorica. Il risultato è una lettura che non si limita a descriverti, ma ti aiuta a capire come agire, scegliere e — perché no — amare meglio.",
    stats: [
      { value: "Pitagorica", label: "Tradizione" },
      { value: "Personali", label: "Analisi" },
      { value: "Migliaia", label: "Utenti" },
    ],
  },
  testimonials: {
    title: "Storie vere",
    items: [
      {
        name: "Martina C.",
        destinyNum: "7",
        destinyLabel: "Destino 7",
        quote:
          "Avevo passato due anni su Tinder senza una relazione seria. Qui in tre settimane ho trovato qualcuno con cui posso parlare per ore. Il 91% di compatibilità non mente.",
      },
      {
        name: "Andrea P.",
        destinyNum: "3",
        destinyLabel: "Destino 3",
        quote:
          "Non credevo nella numerologia. Poi ho visto la mia mappa e ho capito che descriveva perfettamente quello che cercavo in una relazione. Incredibile.",
      },
      {
        name: "Giulia M.",
        destinyNum: "9",
        destinyLabel: "Destino 9",
        quote:
          "La sezione Anime Gemelle mi ha aperto gli occhi su chi sono e cosa cerco davvero. Non è solo dating — è conoscere se stessi.",
      },
    ],
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        q: "È davvero accurato?",
        a: "La numerologia pitagorica è un sistema millenario di autoconoscenza. I nostri utenti sono costantemente sorpresi dalla precisione delle analisi. Ti invitiamo a provarlo gratis e giudicare tu stesso.",
      },
      {
        q: "Come funziona la compatibilità?",
        a: "Calcoliamo 6 numeri chiave dalla tua data di nascita e li confrontiamo con quelli degli altri utenti. Il risultato è un punteggio reale su 6 dimensioni, non un algoritmo di foto.",
      },
      {
        q: "I profili sono persone reali?",
        a: "Sì. Tutti i profili sono utenti reali. In fase Beta ci sono anche profili dimostrativi, chiaramente indicati.",
      },
      {
        q: "È gratuito?",
        a: "Si, abbiamo iniziato ora e stiamo raccogliendo profili reali perchè non vogliamo fake.",
      },
      {
        q: "Come è diverso dagli oroscopi?",
        a: "Gli oroscopi sono generici. La numerologia pitagorica usa la tua data esatta per calcolare numeri unici. È su misura, non valido per milioni di persone nate nello stesso mese.",
      },
      {
        q: "Posso eliminare il mio account?",
        a: "Certo. Puoi eliminare account e dati in qualsiasi momento, senza vincoli.",
      },
    ],
  },
  cta: {
    eyebrow: "Il tuo viaggio comincia qui",
    titleLine1: "Smetti di cercare",
    titleAccent: "inizia a trovare.",
    subtitle:
      "Registrati gratis, crea la tua mappa numerologica e scopri subito chi vibra alla tua stessa frequenza.",
    ctaPrimary: "Inizia ora, è gratis!",
    ctaSecondary: "Ho già un account",
    note: "Nessuna carta di credito · Risultati immediati · Cancellazione in un click",
  },
}

export const STORAGE_KEY = "numflame-landing-b-content-v1"

export function loadSavedContent(): LBContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LBContent>
      return deepMerge(defaultContent, parsed) as LBContent
    }
  } catch {
    // ignore
  }
  return defaultContent
}

export function saveContent(c: LBContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(c))
}

// Simple deep merge (objects only, arrays replaced wholesale)
function deepMerge(base: unknown, override: unknown): unknown {
  if (
    typeof base !== "object" || base === null ||
    typeof override !== "object" || override === null ||
    Array.isArray(base) || Array.isArray(override)
  ) {
    return override !== undefined ? override : base
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) }
  for (const key of Object.keys(override as Record<string, unknown>)) {
    result[key] = deepMerge(
      (base as Record<string, unknown>)[key],
      (override as Record<string, unknown>)[key],
    )
  }
  return result
}

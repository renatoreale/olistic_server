import {
  calculateLifePath,
  calculateExpression,
  calculateSoul,
  calculatePersonality,
  calculateQuintessenza,
  reduceNumber,
  numberMeanings,
} from "./numerology";

export interface PersonNumbers {
  lifePath: number;
  expression: number;
  soul: number;
  personality: number;
  quintessence: number;
  personalYear: number;
}

export interface CompatibilityResult {
  overall: number;
  passion: number;
  emotional: number;
  communicative: number;
  professional: number;
  challenges: number;
  growth: number;
  passionDescription: string;
  details: {
    lifePath: NumberComparison;
    soul: NumberComparison;
    expression: NumberComparison;
    personality: NumberComparison;
  };
  frictionPoints: string[];
  suggestions: string[];
  dynamicDescription: string;
  challengeDescription: string;
  growthDescription: string;
}

export interface NumberComparison {
  a: number;
  b: number;
  score: number;
  note: string;
}

// ── Same scoring engine as find-soulmates edge function ───────────────────────
const MASTERS = [11, 22, 33];
const TRIADS = [[1,5,7],[2,4,8],[3,6,9]];
const MASTER_PAIRS: [number,number][] = [[11,2],[22,4],[33,6]];

function baseScore(a: number, b: number): number {
  if (a === b) return 100;
  const av = MASTERS.includes(a) ? reduceNumber(a) : a;
  const bv = MASTERS.includes(b) ? reduceNumber(b) : b;
  for (const [m, r] of MASTER_PAIRS) {
    if ((a === m && b === r) || (b === m && a === r)) return 92;
    if ((av === m && bv === r) || (bv === m && av === r)) return 88;
  }
  for (const triad of TRIADS) {
    if (triad.includes(av) && triad.includes(bv)) return 85;
  }
  const diff = Math.abs(av - bv);
  if (diff === 1 || diff === 8) return 70;
  if (diff === 2 || diff === 7) return 55;
  if (diff === 3 || diff === 6) return 45;
  return 35;
}

// ── Sub-dimension scores (0-100) ──────────────────────────────────────────────

function emotionalScore(a: PersonNumbers, b: PersonNumbers): number {
  return Math.round(baseScore(a.soul, b.soul) * 0.50 + baseScore(a.lifePath, b.lifePath) * 0.30 + baseScore(a.personality, b.personality) * 0.20);
}

function communicativeScore(a: PersonNumbers, b: PersonNumbers): number {
  return Math.round(baseScore(a.expression, b.expression) * 0.50 + baseScore(a.personality, b.personality) * 0.30 + baseScore(a.soul, b.soul) * 0.20);
}

function professionalScore(a: PersonNumbers, b: PersonNumbers): number {
  return Math.round(baseScore(a.expression, b.expression) * 0.40 + baseScore(a.lifePath, b.lifePath) * 0.30 + baseScore(a.personality, b.personality) * 0.20 + baseScore(a.soul, b.soul) * 0.10);
}

function challengesScore(a: PersonNumbers, b: PersonNumbers): number {
  const avg = (baseScore(a.lifePath, b.lifePath) + baseScore(a.soul, b.soul) + baseScore(a.expression, b.expression) + baseScore(a.personality, b.personality)) / 4;
  return Math.round(avg);
}

function passionScore(a: PersonNumbers, b: PersonNumbers): number {
  return Math.round(
    baseScore(a.soul,        b.soul)        * 0.45 +
    baseScore(a.lifePath,    b.lifePath)    * 0.25 +
    baseScore(a.personality, b.personality) * 0.20 +
    baseScore(a.personalYear,b.personalYear)* 0.10
  );
}

function generatePassionDescription(score: number, a: PersonNumbers, b: PersonNumbers): string {
  const mA = numberMeanings[MASTERS.includes(a.soul) ? reduceNumber(a.soul) : a.soul];
  const mB = numberMeanings[MASTERS.includes(b.soul) ? reduceNumber(b.soul) : b.soul];
  if (score >= 88) return `Attrazione rara e potente: le vostre anime (${a.soul} e ${b.soul}) si riconoscono istintivamente. ${mA?.keywords[0]} e ${mB?.keywords[0]} creano una chimica difficile da ignorare.`;
  if (score >= 75) return `Forte attrazione reciproca: il desiderio profondo del ${a.soul} incontra quello del ${b.soul}. Una chimica che cresce nel tempo.`;
  if (score >= 60) return `Buona intesa passionale: la vostra energia emotiva si incontra con qualche sfumatura. Il fuoco c'è e si può alimentare.`;
  if (score >= 45) return `Attrazione moderata: mondi emotivi diversi che si attraggono con curiosità. La passione richiede cura e coltivazione.`;
  return `Energie passionali molto diverse: la connessione profonda richiede tempo e comprensione reciproca dei rispettivi desideri.`;
}

function growthScore(a: PersonNumbers, b: PersonNumbers): number {
  const diversityBonus =
    (reduceNumber(a.lifePath) !== reduceNumber(b.lifePath) ? 10 : 0) +
    (reduceNumber(a.soul) !== reduceNumber(b.soul) ? 10 : 0) +
    (reduceNumber(a.expression) !== reduceNumber(b.expression) ? 5 : 0) +
    (reduceNumber(a.personality) !== reduceNumber(b.personality) ? 5 : 0);
  const avg = (baseScore(a.lifePath, b.lifePath) + baseScore(a.soul, b.soul) + baseScore(a.expression, b.expression) + baseScore(a.personality, b.personality)) / 4;
  return Math.min(100, Math.round(avg * 0.80 + diversityBonus));
}

// ── Narrative helpers ─────────────────────────────────────────────────────────

function getComparisonNote(a: number, b: number, dim: "lifePath" | "soul" | "expression" | "personality"): string {
  const score = baseScore(a, b);
  const kwA = numberMeanings[MASTERS.includes(a) ? reduceNumber(a) : a]?.keywords[0] ?? `${a}`;
  const kwB = numberMeanings[MASTERS.includes(b) ? reduceNumber(b) : b]?.keywords[0] ?? `${b}`;

  if (score === 100) {
    const same: Record<string, string> = {
      lifePath:    `Stesso Destino ${a}: una comprensione immediata del percorso di vita dell'altro — raro e potente.`,
      soul:        `Stessa Anima ${a}: i vostri desideri più profondi si specchiano. Un'intimità emotiva difficile da trovare.`,
      expression:  `Stessa Espressione ${a}: vi capite con lo stesso linguaggio, senza sforzo né fraintendimenti.`,
      personality: `Stessa Personalità ${a}: proiettate la stessa energia al mondo. Vi riconoscete a prima vista.`,
    };
    return same[dim] ?? `Numero identico ${a}: risonanza totale su questa dimensione.`;
  }

  if (score >= 88) {
    const master: Record<string, string> = {
      lifePath:    `Il ${a} e il ${b} formano una coppia maestra: il cammino del ${a} (${kwA}) trova nel ${b} (${kwB}) una vibrazione che lo eleva.`,
      soul:        `Il ${a} e il ${b} risuonano come coppia maestra: il desiderio di ${kwA} si fonde profondamente con quello di ${kwB}.`,
      expression:  `Il ${a} e il ${b} formano una coppia maestra nell'espressione: ${kwA} e ${kwB} si amplificano comunicando.`,
      personality: `Il ${a} e il ${b} come coppia maestra: le vostre presenze esterne si completano in modo straordinario.`,
    };
    return master[dim] ?? `Il ${a} e il ${b} formano una coppia numerologica maestra.`;
  }

  if (score >= 85) {
    const triad: Record<string, string> = {
      lifePath:    `Il ${a} (${kwA}) e il ${b} (${kwB}) appartengono alla stessa triade energetica: cammini in profonda risonanza che si sostengono a vicenda.`,
      soul:        `Il ${a} (${kwA}) e il ${b} (${kwB}) vibrano sulla stessa triade dell'anima: i vostri desideri si comprendono in modo naturale.`,
      expression:  `Il ${a} (${kwA}) e il ${b} (${kwB}) condividono la stessa triade espressiva: vi capite con facilità e vi arricchite comunicando.`,
      personality: `Il ${a} (${kwA}) e il ${b} (${kwB}) appartengono alla stessa triade: le vostre energie esterne si attraggono e si completano.`,
    };
    return triad[dim] ?? `Il ${a} (${kwA}) e il ${b} (${kwB}) condividono la stessa triade energetica.`;
  }

  if (score >= 70) {
    const texts: Record<string, string> = {
      lifePath:    `Il ${a} (${kwA}) e il ${b} (${kwB}) sono cammini adiacenti: le differenze si stimolano e si bilanciano, arricchendo entrambi.`,
      soul:        `Il ${a} (${kwA}) e il ${b} (${kwB}) si sfiorano nell'anima: desideri simili con sfumature che si completano naturalmente.`,
      expression:  `Il ${a} (${kwA}) e il ${b} (${kwB}) comunicano in modo simile: l'intesa nasce con naturalezza anche nelle sfumature.`,
      personality: `Il ${a} (${kwA}) e il ${b} (${kwB}) si completano nell'immagine esterna: insieme date un'impressione equilibrata e affascinante.`,
    };
    return texts[dim] ?? `Il ${a} (${kwA}) e il ${b} (${kwB}) si avvicinano con sfumature che arricchiscono.`;
  }

  if (score >= 55) {
    const texts: Record<string, string> = {
      lifePath:    `Il ${a} (${kwA}) e il ${b} (${kwB}) guardano in direzioni diverse: ogni incontro è uno scambio che amplia la visione di entrambi.`,
      soul:        `Il ${a} (${kwA}) e il ${b} (${kwB}) hanno bisogni emotivi diversi: riconoscerli onestamente è la base di ogni vera intimità.`,
      expression:  `Il ${a} (${kwA}) e il ${b} (${kwB}) comunicano con linguaggi diversi: imparare quello dell'altro apre porte inaspettate.`,
      personality: `Il ${a} (${kwA}) e il ${b} (${kwB}) mostrano facce diverse al mondo: questa differenza vi rende complementari agli occhi degli altri.`,
    };
    return texts[dim] ?? `Il ${a} (${kwA}) e il ${b} (${kwB}) si incontrano con prospettive diverse ma integrabili.`;
  }

  if (score >= 45) {
    const texts: Record<string, string> = {
      lifePath:    `Tra il ${a} (${kwA}) e il ${b} (${kwB}) la distanza è reale: serve intenzionalità e dialogo per costruire un terreno comune.`,
      soul:        `Il ${a} (${kwA}) e il ${b} (${kwB}) cercano cose diverse nell'amore: la curiosità reciproca trasforma la differenza in ricchezza.`,
      expression:  `Tra ${a} (${kwA}) e ${b} (${kwB}) lo stile espressivo diverge molto: ogni conversazione importante è un esercizio di ascolto profondo.`,
      personality: `Tra ${a} (${kwA}) e ${b} (${kwB}) le personalità esterne sono molto diverse: serve tempo per scoprire chi c'è davvero dietro la maschera.`,
    };
    return texts[dim] ?? `Il ${a} (${kwA}) e il ${b} (${kwB}) richiedono sforzo consapevole per trovare il terreno comune.`;
  }

  // score < 45
  const texts: Record<string, string> = {
    lifePath:    `Il ${a} (${kwA}) e il ${b} (${kwB}) percorrono vie molto diverse: è proprio questa polarità il motore della crescita reciproca.`,
    soul:        `Tra il ${a} (${kwA}) e il ${b} (${kwB}) i desideri profondi divergono molto: solo un amore consapevole e paziente può costruire il ponte.`,
    expression:  `Il ${a} (${kwA}) e il ${b} (${kwB}) si muovono su frequenze espressive distanti: la pazienza e la volontà di capirsi sono essenziali.`,
    personality: `Il ${a} (${kwA}) e il ${b} (${kwB}) proiettano energie esterne molto distanti: la fascinazione per questa diversità può diventare un punto di forza.`,
  };
  return texts[dim] ?? `Il ${a} (${kwA}) e il ${b} (${kwB}) esprimono una polarità profonda che richiede impegno reciproco.`;
}

function generateFrictionPoints(a: PersonNumbers, b: PersonNumbers): string[] {
  const points: string[] = [];
  const mA = numberMeanings[MASTERS.includes(a.lifePath) ? reduceNumber(a.lifePath) : a.lifePath];
  const mB = numberMeanings[MASTERS.includes(b.lifePath) ? reduceNumber(b.lifePath) : b.lifePath];

  if (baseScore(a.lifePath, b.lifePath) < 60) {
    points.push(`Il tuo Destino ${a.lifePath} (${mA?.keywords[0]}) e il suo ${b.lifePath} (${mB?.keywords[0]}) hanno direzioni diverse. Serve rispetto reciproco per i percorsi individuali.`);
  }
  if (baseScore(a.soul, b.soul) < 60) {
    const sA = numberMeanings[MASTERS.includes(a.soul) ? reduceNumber(a.soul) : a.soul];
    const sB = numberMeanings[MASTERS.includes(b.soul) ? reduceNumber(b.soul) : b.soul];
    points.push(`A livello emotivo, i vostri desideri profondi divergono: tu cerchi ${sA?.keywords[0]}, l'altro cerca ${sB?.keywords[0]}.`);
  }
  if (baseScore(a.expression, b.expression) < 60) {
    const eA = numberMeanings[MASTERS.includes(a.expression) ? reduceNumber(a.expression) : a.expression];
    const eB = numberMeanings[MASTERS.includes(b.expression) ? reduceNumber(b.expression) : b.expression];
    points.push(`Nella comunicazione, il tuo stile (${eA?.keywords[0]}) e il suo (${eB?.keywords[0]}) possono creare incomprensioni.`);
  }
  if (baseScore(a.personality, b.personality) < 60) {
    const pA = numberMeanings[MASTERS.includes(a.personality) ? reduceNumber(a.personality) : a.personality];
    const pB = numberMeanings[MASTERS.includes(b.personality) ? reduceNumber(b.personality) : b.personality];
    points.push(`Le vostre maschere sociali sono molto diverse: ${pA?.keywords[0]} vs ${pB?.keywords[0]}.`);
  }
  if (points.length === 0) {
    points.push("Non emergono particolari punti di attrito significativi. Un buon equilibrio complessivo.");
  }
  return points;
}

function generateSuggestions(a: PersonNumbers, b: PersonNumbers): string[] {
  const suggestions: string[] = [];
  const bBase = MASTERS.includes(b.lifePath) ? reduceNumber(b.lifePath) : b.lifePath;
  const bSoulBase = MASTERS.includes(b.soul) ? reduceNumber(b.soul) : b.soul;
  const mB = numberMeanings[bBase];
  const sB = numberMeanings[bSoulBase];

  if (bBase === 1) suggestions.push(`Il suo ${b.lifePath} vibra con leadership. Evita scontri diretti, meglio un approccio collaborativo.`);
  if (reduceNumber(a.soul) !== reduceNumber(b.soul)) {
    suggestions.push(`L'altro ha bisogno di ${sB?.keywords[0]} a livello profondo. Rispetta questo bisogno per creare armonia.`);
  }
  if (bBase === 7) suggestions.push(`Il suo ${b.expression} cerca introspezione. Rispetta i suoi spazi di solitudine e riflessione.`);
  if (reduceNumber(a.personality) !== reduceNumber(b.personality)) {
    suggestions.push(`Ricorda che la prima impressione può ingannare: il modo in cui vi mostrate al mondo è diverso da ciò che siete dentro.`);
  }
  suggestions.push(`Comunicate apertamente le vostre esigenze: il tuo Destino ${a.lifePath} e il suo ${b.lifePath} (${mB?.keywords[0]}) hanno bisogni diversi che vanno riconosciuti.`);
  return suggestions.slice(0, 4);
}

function generateDynamic(a: PersonNumbers, b: PersonNumbers, overall: number): string {
  const mA = numberMeanings[MASTERS.includes(a.lifePath) ? reduceNumber(a.lifePath) : a.lifePath];
  const mB = numberMeanings[MASTERS.includes(b.lifePath) ? reduceNumber(b.lifePath) : b.lifePath];
  if (overall >= 80) {
    return `La vostra relazione ha un forte potenziale. Il tuo ${a.lifePath} (${mA?.keywords[0]}) e il suo ${b.lifePath} (${mB?.keywords[0]}) creano un'armonia naturale. Questa è una connessione che può portare crescita reciproca e una comprensione profonda. La chiave è mantenere autenticità e rispetto per le differenze sottili.`;
  } else if (overall >= 60) {
    return `La vostra relazione offre opportunità di crescita. Il tuo ${a.lifePath} (${mA?.keywords[0]}) e il suo ${b.lifePath} (${mB?.keywords[0]}) portano prospettive complementari. Alcune differenze richiedono lavoro consapevole, ma questa tensione creativa può rendere la relazione stimolante e evolutiva.`;
  } else {
    return `La vostra relazione richiede impegno e comprensione reciproca. Il tuo ${a.lifePath} (${mA?.keywords[0]}) e il suo ${b.lifePath} (${mB?.keywords[0]}) hanno direzioni diverse. Non è impossibile, ma servono dialogo costante, pazienza e accettazione delle differenze fondamentali.`;
  }
}

function generateChallengeDescription(a: PersonNumbers, b: PersonNumbers, score: number): string {
  const mA = numberMeanings[MASTERS.includes(a.lifePath) ? reduceNumber(a.lifePath) : a.lifePath];
  const mB = numberMeanings[MASTERS.includes(b.lifePath) ? reduceNumber(b.lifePath) : b.lifePath];
  if (score >= 70) {
    return `Le sfide tra voi sono gestibili e costruttive. Le differenze tra il ${a.lifePath} (${mA?.keywords[0]}) e il ${b.lifePath} (${mB?.keywords[0]}) si trasformano facilmente in opportunità di crescita.`;
  } else if (score >= 45) {
    return `Ci sono sfide moderate da affrontare. Le differenze nella visione del mondo (${mA?.keywords[0]} vs ${mB?.keywords[0]}) possono creare tensioni, ma con dialogo si superano.`;
  } else {
    return `Le sfide sono significative e richiedono impegno consapevole. Le energie del ${a.lifePath} e del ${b.lifePath} tendono a scontrarsi. Servono pazienza e comunicazione aperta.`;
  }
}

function generateGrowthDescription(a: PersonNumbers, b: PersonNumbers, score: number): string {
  const mA = numberMeanings[MASTERS.includes(a.lifePath) ? reduceNumber(a.lifePath) : a.lifePath];
  const mB = numberMeanings[MASTERS.includes(b.lifePath) ? reduceNumber(b.lifePath) : b.lifePath];
  if (score >= 70) {
    return `Questa relazione offre un enorme potenziale di crescita reciproca. Il ${a.lifePath} impara ${mB?.keywords[1] || mB?.keywords[0]} dall'altro, mentre il ${b.lifePath} sviluppa ${mA?.keywords[1] || mA?.keywords[0]} grazie a te.`;
  } else if (score >= 45) {
    return `C'è un buon potenziale di crescita, soprattutto nelle aree in cui siete diversi. Il contrasto tra ${mA?.keywords[0]} e ${mB?.keywords[0]} vi spinge fuori dalla zona di comfort.`;
  } else {
    return `La crescita reciproca richiede uno sforzo intenzionale. Cercate attività e interessi nuovi da esplorare insieme per sbloccare il potenziale evolutivo.`;
  }
}

// ── Main calculation — same weights as find-soulmates ────────────────────────

export function calculateCompatibility(a: PersonNumbers, b: PersonNumbers): CompatibilityResult {
  // Overall: identical weights to the soulmates edge function
  const overall = Math.round(
    baseScore(a.lifePath,    b.lifePath)    * 0.20 +
    baseScore(a.expression,  b.expression)  * 0.20 +
    baseScore(a.soul,        b.soul)        * 0.20 +
    baseScore(a.personality, b.personality) * 0.10 +
    baseScore(a.quintessence,b.quintessence)* 0.15 +
    baseScore(a.personalYear,b.personalYear)* 0.15
  );

  const passion      = passionScore(a, b);
  const emotional    = emotionalScore(a, b);
  const communicative = communicativeScore(a, b);
  const professional  = professionalScore(a, b);
  const challenges    = challengesScore(a, b);
  const growth        = growthScore(a, b);

  return {
    overall,
    passion,
    emotional,
    communicative,
    professional,
    challenges,
    growth,
    passionDescription: generatePassionDescription(passion, a, b),
    details: {
      lifePath:    { a: a.lifePath,    b: b.lifePath,    score: baseScore(a.lifePath,    b.lifePath),    note: getComparisonNote(a.lifePath,    b.lifePath,    "lifePath") },
      soul:        { a: a.soul,        b: b.soul,        score: baseScore(a.soul,        b.soul),        note: getComparisonNote(a.soul,        b.soul,        "soul") },
      expression:  { a: a.expression,  b: b.expression,  score: baseScore(a.expression,  b.expression),  note: getComparisonNote(a.expression,  b.expression,  "expression") },
      personality: { a: a.personality, b: b.personality, score: baseScore(a.personality, b.personality), note: getComparisonNote(a.personality, b.personality, "personality") },
    },
    frictionPoints:       generateFrictionPoints(a, b),
    suggestions:          generateSuggestions(a, b),
    dynamicDescription:   generateDynamic(a, b, overall),
    challengeDescription: generateChallengeDescription(a, b, challenges),
    growthDescription:    generateGrowthDescription(a, b, growth),
  };
}

export function calculatePersonBNumbers(
  nome: string,
  cognome: string,
  birthDate: string,
  currentYear = new Date().getFullYear()
): PersonNumbers {
  const [year, month, day] = birthDate.split("-").map(Number);
  const fullName = `${nome} ${cognome}`;
  const lifePath   = calculateLifePath(day, month, year);
  const expression = calculateExpression(fullName);
  const soul       = calculateSoul(fullName);
  const personality = calculatePersonality(fullName);
  const quintessence = calculateQuintessenza(expression, lifePath);
  const personalYear = reduceNumber(reduceNumber(day) + reduceNumber(month) + reduceNumber(currentYear));

  return { lifePath, expression, soul, personality, quintessence, personalYear };
}

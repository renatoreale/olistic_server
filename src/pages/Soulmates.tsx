import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppSettings } from "@/hooks/useAppSettings";
import { useChatContext } from "@/contexts/ChatContext";
import { useTranslation } from "react-i18next";
import {
  Heart, Lock, Crown, Loader2, RefreshCw, User, Star, Sparkles,
  ChevronLeft, ChevronRight, Calendar, X, MessageCircle, ChevronDown, ChevronUp,
  FlaskConical, Eye, EyeOff, Flame,
} from "lucide-react";

interface SoulmateResult {
  user_id: string;
  nome: string;
  cognome_initial: string;
  birth_date: string;
  sesso: string;
  bio: string | null;
  score: number;
  label: string;
  nums: { lp: number; expr: number; sl: number; pers: number; quint: number; py: number };
  scores: { lp: number; expr: number; sl: number; pers: number; quint: number; py: number; passion: number };
  photos: string[];
  photos_locked: boolean;
  total_photos: number;
  is_fake: boolean;
}

type MyNums = { lp: number; expr: number; sl: number; pers: number; quint: number; py: number };

// ── Compatibility description engine (Italian — rich match texts) ─────────────

const SAME_NUM: Record<string, Partial<Record<number, string>>> = {
  lp: {
    1: "Entrambi nati per guidare e innovare. Aprite strade nuove insieme, ma concedetevi spazio per brillare ognuno a modo suo.",
    2: "Due anime pacifiche e collaborative. Create armonia profonda, ma non evitate i conflitti quando sono necessari.",
    3: "Creatività e gioia di vivere vi unisce. Portate positività ovunque insieme, ma ancorate i sogni alla realtà.",
    4: "Cercate entrambi solidità e risultati concreti. Siete una squadra affidabile, ma attenti a non diventare troppo rigidi.",
    5: "Amate la libertà e l'avventura allo stesso modo. Vivrete esperienze indimenticabili, ma costruire una routine richiederà impegno.",
    6: "Il cuore e la famiglia prima di tutto per entrambi. Create un nido caldo e amorevole, ma non sacrificate i vostri sogni personali.",
    7: "Due menti profonde e curiose. Arrivate a intuizioni straordinarie insieme, ma uscite dalla testa per vivere il presente.",
    8: "Successo e ambizione vi accomunano. Costruirete qualcosa di duraturo, ma attenti che la competizione non si insinui tra voi.",
    9: "Due anime con una missione: rendere il mondo migliore. Insieme potete fare la differenza, ma ricordate di prendervi cura anche di voi.",
    11: "Intuitivi e ispirati entrambi. Toccate le corde più profonde delle persone, ma la vostra sensibilità richiede rispetto reciproco.",
    22: "Costruttori nati con una visione ampia. Realizzerete grandi progetti insieme, ma non perdetevi nei dettagli organizzativi.",
    33: "Un legame di pura compassione e servizio. Insieme potete ispirare molti, ma fate spazio anche alla vostra felicità.",
  },
  sl: {
    1: "Nel profondo volete entrambi indipendenza e originalità. Un amore che rispetta la libertà dell'altro funziona meravigliosamente.",
    2: "Il vostro cuore desidera amore e connessione profonda. Vi nutrite a vicenda in modo naturale e dolce.",
    3: "Desiderate entrambi esprimervi e creare. La vita insieme diventa un palcoscenico colorato, ma fate spazio al silenzio.",
    4: "Cercate sicurezza e stabilità con la stessa intensità. Costruite fondamenta solide, ma sfidate a volte i vostri limiti.",
    5: "Le vostre anime bramano avventura e novità. Un amore dinamico e imprevedibile che non annoierà mai.",
    6: "Desiderate prendervi cura e essere amati. Create un ambiente di grande calore, ma evitate la dipendenza reciproca.",
    7: "Le vostre anime cercano verità e profondità. Insieme esplorate le domande più grandi della vita.",
    8: "Volete entrambi lasciare un segno nel mondo. Una coppia ambiziosa e determinata, destinata al successo.",
    9: "Le vostre anime vogliono dare, aiutare, migliorare. Un amore generoso e ispirante per chi vi circonda.",
    11: "Anime ipersensibili e spirituali. Vi capite senza parole, ma proteggete la vostra energia interiore.",
    22: "Desiderate costruire qualcosa che duri nel tempo. Un amore fondato su progetti concreti e condivisi.",
    33: "Il vostro cuore pulsa di compassione. Insieme potete essere una luce per chi soffre.",
  },
  expr: {
    1: "Vi esprimete entrambi con forza e determinazione. Avete un grande impatto, ma imparate ad ascoltare tanto quanto parlate.",
    2: "La vostra comunicazione è gentile e armoniosa. Mediate bene i conflitti, ma dite anche ciò che pensate davvero.",
    3: "Parlate e create con la stessa energia brillante. Insieme siete una coppia travolgente e creativa.",
    4: "Vi esprimete in modo pratico e concreto. Affidabili e precisi, ma ogni tanto lasciatevi andare.",
    5: "Espressione vivace e versatile. Non vi annoierete mai insieme, ma mantenete il filo nei discorsi importanti.",
    6: "Vi esprimete con calore e responsabilità. Siete i punti di riferimento del gruppo, ma non dimenticate i vostri bisogni.",
    7: "Riflessione e profondità guidano la vostra comunicazione. Arrivate al cuore delle questioni, ma attenzione ai silenzi troppo lunghi.",
    8: "Vi esprimete con autorità e chiarezza. Convincenti insieme, ma bilanciate la forza con la delicatezza.",
    9: "Saggezza e visione ampia nella vostra espressione. Ispirate gli altri, ma scendete a terra nei dettagli pratici.",
    11: "Espressione ispirata e intuitiva. Comunicate a un livello quasi spirituale, capendovi con pochissime parole.",
    22: "Visione e strategia guidano le vostre parole. Insieme potete guidare grandi cambiamenti nel mondo.",
    33: "L'amore guida ogni vostra parola. Insieme siete un balsamo per chi soffre.",
  },
  pers: {
    1: "Entrambi date un'impressione di forza e indipendenza. Insieme ispirate rispetto e fiducia in chi vi incontra.",
    2: "Trasmettete pace e disponibilità. Mettete gli altri a loro agio sin dal primo momento.",
    3: "Portate allegria e creatività ovunque. Tutti vogliono avervi intorno.",
    4: "Date un'impressione di affidabilità e concretezza. Gli altri si fidano di voi istintivamente.",
    5: "Trasmettete energia e voglia di vivere. Attirate le persone con la vostra vitalità.",
    6: "Irradiate calore e cura. Siete percepiti come una coppia premurosa e solida.",
    7: "Date un'impressione di profondità e mistero. Incuriosite chiunque vi incontri.",
    8: "Trasmettete successo e determinazione. Una coppia che emana potere e ambizione.",
    9: "Date un'impressione di saggezza e apertura. Sembrate grandi del mondo.",
    11: "Trasmettete qualcosa di speciale difficile da spiegare. Insieme magnetizzate le persone.",
    22: "Date un'impressione di visione e grandezza. Sembrate destinati a grandi cose.",
    33: "Trasmettete amore e guarigione. Siete un rifugio naturale per gli altri.",
  },
  quint: {
    1: "La vostra essenza più profonda è quella del pioniere. Siete destinati ad aprire strade nuove insieme.",
    2: "La vostra quintessenza è l'amore e l'unione. Insieme incarnate il significato più profondo di partnership.",
    3: "Gioia e creatività sono la vostra quintessenza. Portate bellezza nel mondo a ogni passo.",
    4: "La vostra essenza è costruire e durare. Insieme lasciate un'eredità concreta e solida.",
    5: "La libertà è la vostra quintessenza. Una storia dinamica e in continua evoluzione.",
    6: "Amore e famiglia sono la vostra essenza più alta. Insieme create un mondo più caldo.",
    7: "La ricerca della verità è la vostra quintessenza. Siete esploratori dell'anima per natura.",
    8: "Il potere creativo è la vostra essenza. Insieme potete costruire qualcosa di monumentale.",
    9: "Il servizio all'umanità è la vostra quintessenza. Siete qui per lasciare il mondo migliore.",
    11: "La vostra quintessenza è l'illuminazione. Insieme potete toccare qualcosa di profondamente spirituale.",
    22: "La vostra essenza è costruire ponti. Insieme potete cambiare il mondo in modo concreto.",
    33: "La vostra quintessenza è l'amore incondizionato. Siete qui per guarire chi vi circonda.",
  },
};

const TRIAD_DESC: Record<string, Record<string, string>> = {
  lp: {
    "1,5,7": "Destini orientati alla libertà e all'intelletto. Insieme vi stimolate a crescere, ma rispettate i reciproci spazi di indipendenza.",
    "2,4,8": "Cammini radicati nel mondo concreto e pratico. Insieme costruite con solidità, ma non trascurate la dimensione emotiva.",
    "3,6,9": "Destini creativi e umanitari. Insieme potete ispirare e aiutare molti, ma non perdete di vista i vostri bisogni personali.",
  },
  sl: {
    "1,5,7": "Le vostre anime desiderano libertà e scoperta. Un'intesa profonda basata sul rispetto dell'individualità di ciascuno.",
    "2,4,8": "I vostri cuori cercano sicurezza e risultati concreti. Insieme create una base solida su cui costruire l'amore.",
    "3,6,9": "Le vostre anime sono creative e generose. Vi ispirate e vi sostenete in modo naturale e spontaneo.",
  },
  expr: {
    "1,5,7": "Vi esprimete con curiosità e originalità. Conversazioni stimolanti e mai banali tra voi.",
    "2,4,8": "La vostra espressione è concreta e affidabile. Insieme costruite qualcosa di reale e duraturo.",
    "3,6,9": "Vi esprimete con calore e creatività. Insieme portate bellezza e ispirazione nel mondo.",
  },
  pers: {
    "1,5,7": "Personalità dinamiche e indipendenti. Insieme attirate persone curiose e libere.",
    "2,4,8": "Personalità affidabili e concrete. Insieme trasmettete solidità e fiducia profonda.",
    "3,6,9": "Personalità calorose e creative. Insieme siete una coppia magnetica e generosa.",
  },
  quint: {
    "1,5,7": "La vostra essenza combinata è quella dell'esploratore. Insieme scoprite nuovi orizzonti.",
    "2,4,8": "La vostra quintessenza combinata è quella del costruttore. Insieme lasciate un segno duraturo.",
    "3,6,9": "La vostra essenza è quella dell'ispiratore. Insieme toccate il cuore delle persone.",
  },
};

SAME_NUM.py = {
  1: "Entrambi state attraversando un anno di nuovi inizi. Il momento perfetto per costruire qualcosa insieme.",
  2: "Un anno di collaborazione e pazienza per entrambi. Insieme trovate l'equilibrio con naturalezza.",
  3: "Entrambi in un anno creativo ed espressivo. Insieme la vostra energia è contagiosa.",
  4: "Un anno di lavoro e solidità per entrambi. Insieme costruite basi durature.",
  5: "Entrambi in un anno di cambiamento e avventura. Insieme vivete trasformazioni entusiasmanti.",
  6: "Un anno centrato su amore e responsabilità per entrambi. Insieme vi prendete cura di ciò che conta.",
  7: "Entrambi in un anno di riflessione e crescita interiore. Insieme approfondite la connessione spirituale.",
  8: "Un anno di potere e manifestazione per entrambi. Insieme potete raggiungere traguardi importanti.",
  9: "Entrambi in un anno di completamento e trasformazione. Insieme chiudete un ciclo e ne aprite uno nuovo.",
  11: "Un anno di ispirazione elevata per entrambi. Insieme toccate livelli di consapevolezza rari.",
  22: "Un anno di costruzione su grande scala. Insieme potete realizzare qualcosa di straordinario.",
  33: "Un anno di servizio e amore universale. Insieme siete una forza di guarigione.",
};

TRIAD_DESC.py = {
  "1,5,7": "I vostri cicli annuali si muovono su frequenze simili: libertà, crescita e scoperta personale.",
  "2,4,8": "I vostri anni personali vibrano sulla stessa triade pratica: costruzione, stabilità e risultati.",
  "3,6,9": "I vostri cicli annuali sono in armonia creativa e umana: espressione, cura e completamento.",
};

const TRIADS = [[1,5,7],[2,4,8],[3,6,9]];
function reduceForTriad(n: number): number {
  if (n === 11) return 2; if (n === 22) return 4; if (n === 33) return 6; return n;
}

// Core numerological keyword for each number
const NUM_KW: Record<number, string> = {
  1: "spirito pioniere",    2: "anima armoniosa",      3: "forza creativa",
  4: "solidità pratica",   5: "energia libera",        6: "cuore premuroso",
  7: "mente profonda",     8: "forza ambiziosa",       9: "visione universale",
  11: "intuizione elevata", 22: "visione costruttrice", 33: "amore compassionevole",
};

function getDimDescription(dim: string, myNum: number, theirNum: number, score: number): string {
  if (score === 100) return SAME_NUM[dim]?.[myNum] ?? "Un legame numerico identico — raro e potente.";
  if (score >= 85) {
    const mv = reduceForTriad(myNum), tv = reduceForTriad(theirNum);
    const triad = TRIADS.find(t => t.includes(mv) && t.includes(tv));
    if (triad) return TRIAD_DESC[dim]?.[triad.join(",")] ?? "Energie complementari che si attraggono naturalmente.";
  }

  const kA = NUM_KW[myNum] ?? NUM_KW[reduceForTriad(myNum)] ?? `numero ${myNum}`;
  const kB = NUM_KW[theirNum] ?? NUM_KW[reduceForTriad(theirNum)] ?? `numero ${theirNum}`;
  const a = myNum, b = theirNum;

  const texts: Record<string, [string, string, string, string]> = {
    lp: [
      `Il tuo ${a} (${kA}) si avvicina al suo ${b} (${kB}): cammini distinti che si arricchiscono a vicenda.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) guardano in direzioni diverse: ogni incontro è uno scambio che amplia entrambi.`,
      `Tra il ${a} (${kA}) e il ${b} (${kB}) la distanza è reale: serve intenzionalità per costruire un terreno comune.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) percorrono vie molto diverse: la polarità stessa è il motore della vostra crescita.`,
    ],
    sl: [
      `Il tuo ${a} (${kA}) si avvicina al suo ${b} (${kB}) nel profondo: anime che si sfiorano e si completano.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) hanno bisogni emotivi diversi: riconoscerli onestamente è la base dell'intimità vera.`,
      `Il tuo ${a} (${kA}) e il suo ${b} (${kB}) cercano cose diverse nell'amore: la curiosità reciproca trasforma la differenza in ricchezza.`,
      `Tra il ${a} (${kA}) e il ${b} (${kB}) i desideri profondi divergono molto: solo un amore consapevole e paziente può costruire il ponte.`,
    ],
    expr: [
      `Il ${a} (${kA}) e il ${b} (${kB}) si esprimono in modo simile: vi capite con naturalezza anche nelle sfumature.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) comunicano con linguaggi diversi: imparare quello dell'altro apre porte inaspettate.`,
      `Tra ${a} (${kA}) e ${b} (${kB}) lo stile espressivo è molto diverso: ogni conversazione importante è un esercizio di ascolto profondo.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) si muovono su frequenze espressive distanti: la pazienza e la volontà di capirsi sono essenziali.`,
    ],
    pers: [
      `Il ${a} (${kA}) e il ${b} (${kB}) si completano nell'immagine esterna: insieme siete una coppia equilibrata e affascinante.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) mostrano facce diverse al mondo: questa differenza vi rende complementari agli occhi degli altri.`,
      `Tra ${a} (${kA}) e ${b} (${kB}) le maschere sociali sono molto diverse: serve tempo per scoprire chi c'è davvero dietro.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) proiettano energie esterne molto distanti: la fascinazione per questa diversità è il vostro punto di forza.`,
    ],
    quint: [
      `La quintessenza ${a} (${kA}) e la ${b} (${kB}) risuonano con sfumature armoniose: un'essenza comune emerge dal profondo.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) come quintessenza divergono: scoprirsi a questo livello è un viaggio raro e prezioso.`,
      `Tra ${a} (${kA}) e ${b} (${kB}) l'essenza più profonda vibra su frequenze diverse: la trascendenza è nell'accettare il contrasto.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) come essenze ultime sono molto lontani: proprio questa polarità vi spinge verso la crescita più profonda.`,
    ],
    py: [
      `Il tuo anno ${a} (${kA}) e il suo ${b} (${kB}) si avvicinano: i cicli risuonano e vi offrono momenti di grande sintonia.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) come anni personali portano energie diverse: rispettare il ritmo del ciclo dell'altro è un atto d'amore.`,
      `Tra ${a} (${kA}) e ${b} (${kB}) i cicli annuali sono in fasi molto diverse: il sostegno richiede comprensione profonda del momento che ognuno attraversa.`,
      `Il ${a} (${kA}) e il ${b} (${kB}) attraversano anni molto distanti: uno espansivo, l'altro riflessivo — ascoltatevi con pazienza.`,
    ],
  };

  const t = texts[dim];
  if (!t) return "Energie che si incontrano con sfumature diverse.";
  if (score >= 70) return t[0];
  if (score >= 55) return t[1];
  if (score >= 45) return t[2];
  return t[3];
}

const LABEL_COLORS: Record<string, string> = {
  soulmate: "text-amber-400 bg-amber-400/15 border-amber-400/40",
  high:     "text-violet-400 bg-violet-400/15 border-violet-400/40",
  good:     "text-emerald-400 bg-emerald-400/15 border-emerald-400/40",
  moderate: "text-blue-400 bg-blue-400/15 border-blue-400/40",
  low:      "text-muted-foreground bg-muted/10 border-border/30",
};
const BAR_COLOR: Record<string, string> = {
  soulmate: "bg-amber-400",
  high:     "bg-violet-400",
  good:     "bg-emerald-400",
  moderate: "bg-blue-400",
  low:      "bg-muted-foreground",
};

function age(birthDate: string): number {
  const [y, m, d] = birthDate.split("-").map(Number);
  const today = new Date();
  let a = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) a--;
  return a;
}

// ── Profile Panel ─────────────────────────────────────────────────────────────

const ProfilePanel = ({
  match, myNums, onClose, isSubscribed, onChat,
}: {
  match: SoulmateResult | null;
  myNums: MyNums | null;
  onClose: () => void;
  isSubscribed: boolean;
  onChat: (m: SoulmateResult) => void;
}) => {
  const [photoIdx, setPhotoIdx] = useState(0);
  const { t } = useTranslation();
  useEffect(() => {
    setPhotoIdx(0);
    // Preload all photos for this profile into browser cache
    if (match?.photos) {
      match.photos.forEach(url => { const img = new Image(); img.src = url; });
    }
  }, [match?.user_id]);

  const getLabelText = (label: string): string => ({
    soulmate: t("soulmatesPage.labelSoulmate"),
    high:     t("soulmatesPage.labelHigh"),
    good:     t("soulmatesPage.labelGood"),
    moderate: t("soulmatesPage.labelModerate"),
    low:      t("soulmatesPage.labelLow"),
  } as Record<string, string>)[label] ?? label;

  const dimLabels: Record<string, string> = {
    lp:    t("soulmatesPage.dimDestino"),
    sl:    t("soulmatesPage.dimAnima"),
    expr:  t("soulmatesPage.dimEspressione"),
    pers:  t("soulmatesPage.dimPersonalita"),
    quint: t("soulmatesPage.dimQuintessenza"),
    py:    t("soulmatesPage.dimAnnoPersonale"),
  };

  return (
    <AnimatePresence>
      {match && (
        <>
          <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[100]" onClick={onClose} />
          <motion.div key="pn" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-background z-[101] overflow-y-auto shadow-2xl">
            <button onClick={onClose}
              className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[3/4] bg-muted/20 w-full">
              {match.photos.length > 0 ? (
                <img src={match.photos[photoIdx]} alt={match.nome} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-24 h-24 text-muted-foreground/20" />
                </div>
              )}
              {photoIdx > 0 && (
                <button onClick={() => setPhotoIdx(i => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}
              {photoIdx < match.photos.length - 1 && (
                <button onClick={() => setPhotoIdx(i => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 backdrop-blur flex items-center justify-center">
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              {match.photos.length > 1 && (
                <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
                  {match.photos.map((_, i) => (
                    <button key={i} onClick={() => setPhotoIdx(i)}
                      className={`h-1.5 rounded-full transition-all ${i === photoIdx ? "bg-white w-4" : "bg-white/50 w-1.5"}`} />
                  ))}
                </div>
              )}
              <div className="absolute top-4 right-12">
                <span className={`px-3 py-1 rounded-full text-sm font-bold border backdrop-blur ${LABEL_COLORS[match.label]}`}>
                  {getLabelText(match.label)} · {match.score}%
                </span>
              </div>
              {match.label === "soulmate" && (
                <div className="absolute top-4 left-4">
                  <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow" />
                </div>
              )}
              {match.photos_locked && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background/90 to-transparent p-4 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {t("soulmatesPage.lockedPhotos", { count: match.total_photos - match.photos.length })}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h2 className="font-display text-2xl font-bold">{match.nome} {match.cognome_initial}</h2>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {t("soulmatesPage.ageYears", { age: age(match.birth_date) })}
                </p>
              </div>
              {match.bio && <p className="text-sm text-muted-foreground leading-relaxed">{match.bio}</p>}

              {/* Passion indicator */}
              {(() => {
                const p = match.scores.passion ?? 0;
                const desc = p >= 88
                  ? "Attrazione rara e potente: le vostre anime si riconoscono istintivamente."
                  : p >= 75 ? "Forte attrazione reciproca: una chimica che cresce nel tempo."
                  : p >= 60 ? "Buona intesa passionale: il fuoco c'è e si può alimentare."
                  : p >= 45 ? "Attrazione moderata: la passione richiede cura e coltivazione."
                  : "Energie passionali diverse: la connessione profonda richiede tempo.";
                return (
                  <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-rose-500" />
                        <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">Passione</span>
                      </div>
                      <span className="text-sm font-bold text-rose-600 dark:text-rose-400">{p}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-rose-100 dark:bg-rose-950/40 mb-2">
                      <div className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all"
                        style={{ width: `${p}%` }} />
                    </div>
                    <p className="text-[11px] text-muted-foreground italic">{desc}</p>
                  </div>
                );
              })()}

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {t("soulmatesPage.compatByDimension")}
                </p>
                {(["lp", "sl", "expr", "pers", "quint", "py"] as const).map((key) => {
                  const val = match.scores[key];
                  const myN = myNums?.[key] ?? 0;
                  const theirN = match.nums[key];
                  const desc = myN ? getDimDescription(key, myN, theirN, val) : null;
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1 items-center">
                        <span className="text-muted-foreground">{dimLabels[key]}</span>
                        <div className="flex items-center gap-1.5">
                          {val === 100 && (
                            <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-1.5 py-0.5">
                              {t("soulmatesPage.sameNumber")}
                            </span>
                          )}
                          <span className="font-medium">{val}%</span>
                        </div>
                      </div>
                      {desc && (
                        <p className="text-[11px] text-muted-foreground italic mb-1.5 leading-snug">{desc}</p>
                      )}
                      <div className="h-1.5 rounded-full bg-muted/30">
                        <div className={`h-full rounded-full transition-all ${BAR_COLOR[match.label]}`}
                          style={{ width: `${val}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {match.is_fake ? (
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-center">
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                    {t("soulmatesPage.demoProfileTitle")}
                  </p>
                  <p className="text-xs text-muted-foreground">{t("soulmatesPage.demoProfileDesc")}</p>
                </div>
              ) : (
                <Button variant="cosmic" className="w-full" onClick={() => { onChat(match); onClose(); }}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("soulmatesPage.chatWith", { name: match.nome })}
                </Button>
              )}

              {!isSubscribed && match.photos_locked && (
                <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <p className="text-sm font-medium mb-1">{t("soulmatesPage.unlockPhotosTitle")}</p>
                  <p className="text-xs text-muted-foreground mb-3">{t("soulmatesPage.unlockPhotosDesc")}</p>
                  <Button variant="cosmic" size="sm" asChild className="w-full">
                    <Link to="/pricing">
                      <Crown className="w-4 h-4 mr-2" />{t("soulmatesPage.upgradePremium")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── List Card ─────────────────────────────────────────────────────────────────

const SoulmateListCard = ({
  match, myNums, index, onOpen, onChat,
}: {
  match: SoulmateResult;
  myNums: MyNums | null;
  index: number;
  onOpen: () => void;
  onChat: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const hasPhoto = match.photos.length > 0;

  const getLabelText = (label: string): string => ({
    soulmate: t("soulmatesPage.labelSoulmate"),
    high:     t("soulmatesPage.labelHigh"),
    good:     t("soulmatesPage.labelGood"),
    moderate: t("soulmatesPage.labelModerate"),
    low:      t("soulmatesPage.labelLow"),
  } as Record<string, string>)[label] ?? label;

  const dimLabels: Record<string, string> = {
    lp:    t("soulmatesPage.dimDestino"),
    sl:    t("soulmatesPage.dimAnima"),
    expr:  t("soulmatesPage.dimEspressione"),
    pers:  t("soulmatesPage.dimPersonalita"),
    quint: t("soulmatesPage.dimQuintessenza"),
    py:    t("soulmatesPage.dimAnnoPersonale"),
  };

  const dimTooltips: Record<string, string> = {
    lp:   t("soulmatesPage.tooltipDestino"),
    sl:   t("soulmatesPage.tooltipAnima"),
    expr: t("soulmatesPage.tooltipIo"),
  };

  const scoreDims = ["lp", "sl", "expr", "pers", "quint", "py"] as const;

  const keyNums = [
    { key: "lp" as const,   value: match.nums.lp },
    { key: "sl" as const,   value: match.nums.sl },
    { key: "expr" as const, value: match.nums.expr },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-cosmic rounded-2xl overflow-hidden"
    >
      <div className="p-4">
        <div className="flex gap-4">
          <button onClick={onOpen} className="shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted/30 ring-2 ring-border/50">
              {hasPhoto ? (
                <img src={match.photos[0]} alt={match.nome} className="w-full h-full object-cover" loading="eager" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-7 h-7 text-muted-foreground/40" />
                </div>
              )}
            </div>
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <button onClick={onOpen} className="text-left">
                <p className="font-display font-semibold text-foreground leading-tight">
                  {match.nome} {match.cognome_initial}
                </p>
              </button>
              <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold border ${LABEL_COLORS[match.label]}`}>
                {match.label === "soulmate" && <Sparkles className="w-3 h-3 inline mr-0.5" />}
                {getLabelText(match.label)} · {match.score}%
              </span>
            </div>

            <p className="text-xs text-muted-foreground mb-2">
              {t("soulmatesPage.ageYears", { age: age(match.birth_date) })}
            </p>

            {match.bio && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{match.bio}</p>
            )}

            <div className="flex gap-3">
              {keyNums.map(n => (
                <div key={n.key} className="text-center group relative">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-0.5 ${LABEL_COLORS[match.label]}`}>
                    <span className="text-xs font-bold">{n.value}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{dimLabels[n.key]}</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-popover border border-border rounded-lg px-3 py-2 text-xs text-foreground shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-left leading-snug">
                    {dimTooltips[n.key]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? t("soulmatesPage.hideDetails") : t("soulmatesPage.showDetails")}
          </button>
          {match.is_fake ? (
            <span className="text-[10px] text-amber-500/80 font-medium px-2 py-1 rounded-full border border-amber-500/30 bg-amber-500/10">
              {t("soulmatesPage.demoLabel")}
            </span>
          ) : (
            <button onClick={onChat} className="p-1.5 rounded-full hover:bg-muted/30 transition-colors">
              <MessageCircle className="w-4 h-4 text-muted-foreground hover:text-primary" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2.5 border-t border-border/30 pt-3">
              {/* Passion row */}
              {(() => {
                const p = match.scores.passion ?? 0;
                return (
                  <div>
                    <div className="flex justify-between text-xs mb-1 items-center">
                      <span className="flex items-center gap-1 text-rose-500 font-medium">
                        <Flame className="w-3 h-3" />Passione
                      </span>
                      <span className="font-medium text-rose-500">{p}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-rose-100 dark:bg-rose-950/40">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${p}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                      />
                    </div>
                  </div>
                );
              })()}
              {scoreDims.map((key) => {
                const val = match.scores[key];
                const myN = myNums?.[key] ?? 0;
                const theirN = match.nums[key];
                const desc = myN ? getDimDescription(key, myN, theirN, val) : null;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1 items-center">
                      <span className="text-muted-foreground">{dimLabels[key]}</span>
                      <div className="flex items-center gap-1.5">
                        {val === 100 && (
                          <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 rounded-full px-1.5 py-0.5">
                            {t("soulmatesPage.sameNumber")}
                          </span>
                        )}
                        <span className="font-medium text-foreground">{val}%</span>
                      </div>
                    </div>
                    {desc && (
                      <p className="text-[11px] text-muted-foreground italic mb-1.5 leading-snug">{desc}</p>
                    )}
                    <div className="h-1.5 rounded-full bg-muted/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${val}%` }}
                        transition={{ duration: 0.4, delay: 0.05 }}
                        className={`h-full rounded-full ${BAR_COLOR[match.label]}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────

type FilterKey = "all" | "soulmate" | "high" | "good" | "moderate";

const Soulmates = () => {
  const [soulmates, setSoulmates]           = useState<SoulmateResult[]>([]);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState<string | null>(null);
  const [isDatingEnabled, setIsDatingEnabled] = useState<boolean | null>(null);
  const [isSubscribed, setIsSubscribed]     = useState(false);
  const [myNums, setMyNums]                 = useState<MyNums | null>(null);
  const [selected, setSelected]             = useState<SoulmateResult | null>(null);
  const [filter, setFilter]                 = useState<FilterKey>("all");
  const [showDemo, setShowDemo]             = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isSoulmatesBeta } = useAppSettings();
  const { openChat: openFloatingChat } = useChatContext();

  const FILTERS: { key: FilterKey; label: string }[] = [
    { key: "all",      label: t("soulmatesPage.filterAll") },
    { key: "soulmate", label: t("soulmatesPage.filterSoulmate") },
    { key: "high",     label: t("soulmatesPage.filterHigh") },
    { key: "good",     label: t("soulmatesPage.filterGood") },
    { key: "moderate", label: t("soulmatesPage.filterModerate") },
  ];

  useEffect(() => { checkDatingStatus(); }, []);

  const checkDatingStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }
    const { data: profile } = await supabase
      .from("profiles").select("dating_visible").eq("user_id", session.user.id).maybeSingle();
    const enabled = (profile as any)?.dating_visible || false;
    setIsDatingEnabled(enabled);
    if (enabled) await loadSoulmates();
    else setLoading(false);
  };

  const loadSoulmates = async () => {
    setLoading(true); setError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data, error: fnErr } = await supabase.functions.invoke("find-soulmates", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (fnErr || data?.error) {
        setError(data?.error || t("soulmatesPage.loadError"));
      } else {
        setSoulmates(data.soulmates || []);
        setIsSubscribed(data.is_subscribed || false);
        setMyNums(data.my_nums || null);
      }
    } catch { setError(t("soulmatesPage.connectionError")); }
    setLoading(false);
  };

  const enableDating = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    await supabase.from("profiles").update({ dating_visible: true } as any).eq("user_id", session.user.id);
    setIsDatingEnabled(true);
    await loadSoulmates();
    toast({
      title: t("soulmatesPage.enabledToast"),
      description: t("soulmatesPage.enabledToastDesc"),
    });
  };

  const openChat = async (match: SoulmateResult) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data: chatId, error } = await supabase.rpc("get_or_create_dating_chat" as any, {
      p_partner_id: match.user_id,
      p_is_fake: match.is_fake,
    });
    if (error || !chatId) {
      toast({
        title: t("common.error"),
        description: t("soulmatesPage.chatError"),
        variant: "destructive",
      });
      return;
    }
    openFloatingChat({
      chatId,
      partnerName: match.nome,
      partnerInitial: match.cognome_initial,
      partnerPhoto: match.photos[0] ?? null,
      isFake: match.is_fake,
    });
  };

  // ── Opt-in screen ──
  if (isDatingEnabled === false) {
    return (
      <DashboardLayout title={t("soulmatesPage.title")}>
        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">{t("soulmatesPage.optInTitle")}</h1>
            <p className="text-muted-foreground text-lg mb-4">
              {t("soulmatesPage.optInSubtitle")}
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              {t("soulmatesPage.optInNote")}
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="cosmic" size="xl" onClick={enableDating}>
                <Heart className="w-5 h-5 mr-2" />{t("soulmatesPage.joinButton")}
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/profile">{t("soulmatesPage.setupProfile")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </DashboardLayout>
    );
  }

  const visibleSoulmates = (!isSoulmatesBeta || !showDemo)
    ? soulmates.filter(s => !s.is_fake)
    : soulmates;
  const filtered = filter === "all" ? visibleSoulmates : visibleSoulmates.filter(s => s.label === filter);

  const headerActions = !loading ? (
    <Button variant="cosmic-outline" size="sm" onClick={loadSoulmates}>
      <RefreshCw className="w-4 h-4 mr-2" />{t("soulmatesPage.refresh")}
    </Button>
  ) : undefined;

  return (
    <DashboardLayout title="" headerActions={headerActions}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold mb-1">{t("soulmatesPage.pageTitle")}</h1>
          <p className="text-muted-foreground text-sm">
            {t("soulmatesPage.pageSubtitle")}
          </p>
        </div>

        {isSoulmatesBeta && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10"
          >
            <div className="flex items-start gap-3">
              <FlaskConical className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
                  {t("soulmatesPage.betaTitle")}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {t("soulmatesPage.betaDescText")}
                </p>
                <button
                  onClick={() => setShowDemo(v => !v)}
                  className="mt-2 flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline"
                >
                  {showDemo
                    ? <><EyeOff className="w-3.5 h-3.5" /> {t("soulmatesPage.hideDemos")}</>
                    : <><Eye className="w-3.5 h-3.5" /> {t("soulmatesPage.showDemos")}</>}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-muted-foreground">{t("soulmatesPage.calculating")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="cosmic-outline" onClick={loadSoulmates}>
              <RefreshCw className="w-4 h-4 mr-2" />{t("soulmatesPage.retry")}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 flex-wrap mb-6">
              {FILTERS.map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    filter === f.key
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {!isSubscribed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="mb-5 p-3 rounded-xl glass-cosmic border border-primary/20 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground">{t("soulmatesPage.premiumBanner")}</p>
                </div>
                <Button variant="cosmic" size="sm" asChild className="shrink-0">
                  <Link to="/pricing">
                    <Crown className="w-3.5 h-3.5 mr-1" />{t("soulmatesPage.premium")}
                  </Link>
                </Button>
              </motion.div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground text-sm">
                {t("soulmatesPage.noMatches")}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((match, i) => (
                  <SoulmateListCard
                    key={match.user_id}
                    match={match}
                    myNums={myNums}
                    index={i}
                    onOpen={() => setSelected(match)}
                    onChat={() => openChat(match)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <ProfilePanel
        match={selected}
        myNums={myNums}
        onClose={() => setSelected(null)}
        isSubscribed={isSubscribed}
        onChat={openChat}
      />
    </DashboardLayout>
  );
};

export default Soulmates;

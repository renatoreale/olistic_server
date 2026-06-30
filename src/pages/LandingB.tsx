/**
 * Landing B — "Premium Editorial"
 * Palette: Navy profondo #0A0F2E + Rosa antico #C9184A + Bianco caldo
 * Tone: emotivo, poetico, adulto, premium — Cormorant Garamond dominante
 * Route: /landing-b
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, Check, Shield, Star, Heart, Map, MessageCircle,
  Calendar, Users, Compass, Target, Home, ChevronDown, Sparkles,
  LogIn, TrendingUp, X as XIcon, Sun, Shirt, Download, BookOpen, Award,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import founderPhoto from "@/assets/founder-photo.jpg";
import outfit0 from "@/assets/outfits/outfit0.jpg";
import outfit1 from "@/assets/outfits/outfit1.jpg";
import outfit2 from "@/assets/outfits/outfit2.jpg";
import outfit3 from "@/assets/outfits/outfit3.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const NAVY  = "#0A0F2E";
const NAVY2 = "#1E2952";
const ROSE  = "#C9184A";
const ROSE2 = "#A30F38";
const ROSELT = "#FFF1F5";
const ROSEBDR = "#FBCFE8";
const BODY  = "#374151";
const MUTED = "#9CA3AF";
const WARM  = "#FDFCFB"; // warm white bg
const CREAM = "#FDF8F5"; // cream sections

const Btn = ({ to, href, children, large, light }: { to?: string; href?: string; children: React.ReactNode; large?: boolean; light?: boolean }) => {
  const base = `inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all rounded-xl ${large ? "px-9 py-4 text-base" : "px-5 py-3 text-sm"}`;
  const cls = light ? `${base} border-2 bg-transparent hover:bg-white/10 text-white` : `${base} text-white hover:opacity-90 shadow-lg`;
  const style = light
    ? { borderColor: "rgba(255,255,255,0.4)" }
    : { background: `linear-gradient(135deg, ${ROSE}, ${ROSE2})`, boxShadow: `0 4px 20px rgba(201,24,74,0.30)` };
  if (to) return <Link to={to} className={cls} style={style}>{children}</Link>;
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button className={cls} style={style}>{children}</button>;
};

const Divider = () => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-gray-300 font-display text-lg">✦</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const Faq = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={() => setOpen(!open)}>
        <span className="font-display text-base font-semibold leading-snug" style={{ color: NAVY }}>{q}</span>
        <ChevronDown className="w-4 h-4 shrink-0 mt-1 text-gray-400 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: open ? ROSE : undefined }} />
      </button>
      {open && <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{a}</div>}
    </div>
  );
};

// ── Nav ───────────────────────────────────────────────────────────────────────
const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${ROSE}, ${ROSE2})` }}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-display text-lg font-bold tracking-tight" style={{ color: NAVY }}>NumerologicalDestiny</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher size="sm" className="hidden sm:flex" />
        <Link to="/community" className="hidden md:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
          <Users className="w-4 h-4" />Community
        </Link>
        <Link to="/auth" className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
          <LogIn className="w-4 h-4" />Accedi
        </Link>
        <Btn to="/auth?mode=signup">Inizia la tua lettura <ArrowRight className="w-3.5 h-3.5" /></Btn>
      </div>
    </div>
  </nav>
);

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="pt-28 pb-24 relative overflow-hidden" style={{ background: WARM }}>
    {/* Warm gradient orbs */}
    <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${ROSELT} 0%, transparent 70%)`, transform: "translate(-30%, -30%)" }} />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none rounded-full opacity-15" style={{ background: `radial-gradient(circle, #EFF6FF 0%, transparent 70%)`, transform: "translate(30%, 30%)" }} />

    <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
      {/* Left */}
      <div>
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-px h-8 rounded-full" style={{ background: ROSE }} />
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>
            Numerologia Pitagorica Applicata all'Amore
          </p>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.0] mb-8" style={{ color: NAVY }}>
          La tua anima<br />gemella esiste.
          <br />
          <span style={{ backgroundImage: `linear-gradient(135deg, ${ROSE} 0%, #F472B6 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            I numeri sanno<br />dove trovarla.
          </span>
        </h1>

        <p className="text-lg leading-relaxed mb-4" style={{ color: BODY }}>
          <strong>NumerologicalDestiny</strong> non è un'app di incontri. È un sistema millenario di autoconoscenza che rivoluziona il modo in cui trovi l'amore — e te stesso.
        </p>
        <p className="text-base mb-10" style={{ color: MUTED }}>
          6 dimensioni di compatibilità calcolate dalla data di nascita. 10+ servizi per guidarti ogni giorno. Nessun algoritmo di swipe.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Btn to="/auth?mode=signup" large>
            Inizia la tua lettura gratuita <ArrowRight className="w-5 h-5" />
          </Btn>
          <a href="#differenza" className="inline-flex items-center justify-center gap-2 font-semibold text-base px-9 py-4 rounded-xl border-2 bg-white hover:bg-gray-50 transition-all" style={{ borderColor: NAVY, color: NAVY }}>
            Scopri la differenza <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-wrap gap-5 text-sm" style={{ color: MUTED }}>
          {["Gratis per iniziare", "Nessuna carta richiesta", "Privacy GDPR"].map(t => (
            <span key={t} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" />{t}</span>
          ))}
        </div>
      </div>

      {/* Right: editorial number visual */}
      <div className="hidden lg:flex flex-col gap-4">
        {/* Main compatibility card — premium style */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border" style={{ borderColor: ROSEBDR, boxShadow: `0 24px 64px rgba(201,24,74,0.08), 0 4px 16px rgba(0,0,0,0.06)` }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: ROSE }}>Compatibilità Numerologica</p>
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${ROSE}, #F472B6)` }}>S</div>
            <div className="flex-1">
              <p className="font-display font-bold text-lg" style={{ color: NAVY }}>Sofia R.</p>
              <p className="text-xs" style={{ color: MUTED }}>Destino: 7 · Anno Personale: 4</p>
            </div>
            <div className="text-right">
              <p className="font-display text-5xl font-bold" style={{ color: ROSE }}>94<span className="text-2xl">%</span></p>
            </div>
          </div>
          {[["Destino", 100], ["Anima", 100], ["Personalità", 75], ["Karma", 100]].map(([l, v]) => (
            <div key={l as string} className="mb-3">
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: MUTED }}>{l}</span>
                <span className="font-semibold" style={{ color: NAVY }}>{v}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className="h-full rounded-full" style={{ width: `${v}%`, background: `linear-gradient(90deg, ${ROSE}, #F472B6)` }} />
              </div>
            </div>
          ))}
          <p className="mt-5 pt-4 border-t border-gray-100 text-xs italic text-center font-display text-lg" style={{ color: MUTED }}>
            "Entrambi numero 7 — un'armonia rara. La ricerca del significato profondo vi unisce."
          </p>
        </div>

        {/* Small floating badges */}
        <div className="flex gap-3">
          <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: ROSELT }}>
              <Users className="w-4 h-4" style={{ color: ROSE }} />
            </div>
            <div>
              <p className="font-display text-lg font-bold" style={{ color: NAVY }}>10+</p>
              <p className="text-xs" style={{ color: MUTED }}>Servizi inclusi</p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#EFF6FF" }}>
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="font-display text-lg font-bold" style={{ color: NAVY }}>GDPR</p>
              <p className="text-xs" style={{ color: MUTED }}>Privacy garantita</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Differenza ────────────────────────────────────────────────────────────────
const Differenza = () => (
  <section className="py-24 bg-white" id="differenza">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-px h-8" style={{ background: ROSE }} />
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>Perché siamo diversi</p>
          <div className="w-px h-8" style={{ background: ROSE }} />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: NAVY }}>
          Non strisci foto.<br />
          <span style={{ backgroundImage: `linear-gradient(135deg, ${ROSE}, #F472B6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Trovi la tua vibrazione.
          </span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: BODY }}>
          Le app di dating tradizionali ti mostrano una foto. Noi ti mostriamo <em>chi sei davvero</em> e chi è matematicamente compatibile con te — calcolato dalla data di nascita su 6 dimensioni profonde.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            n: "I",
            icon: "🧭",
            t: "Compatibilità reale, non un algoritmo opaco",
            d: "Mentre Tinder e Meetic usano algoritmi segreti basati su foto e posizione, noi usiamo la Numerologia Pitagorica — un sistema millenario, trasparente e personale, calcolato dalla tua data di nascita esatta.",
          },
          {
            n: "II",
            icon: "🌟",
            t: "Autoconoscenza che porta all'amore",
            d: "Prima di trovare l'altro, trovi te stesso. La tua Mappa Numerologica completa ti rivela chi sei, cosa cerchi davvero e quali energie guidano il tuo destino. Questo è il vero punto di partenza.",
          },
          {
            n: "III",
            icon: "✨",
            t: "Un ecosistema, non solo dating",
            d: "Trovare l'anima gemella è solo l'inizio. Hai accesso a 10+ servizi: date favorevoli, outfit del giorno, analisi della tua casa, consulente AI, anno personale e molto altro.",
          },
        ].map(c => (
          <div key={c.n} className="relative">
            <div className="text-5xl mb-4">{c.icon}</div>
            <p className="font-display text-sm font-bold tracking-widest uppercase mb-3" style={{ color: ROSE }}>Capitolo {c.n}</p>
            <h3 className="font-display text-2xl font-bold mb-4" style={{ color: NAVY }}>{c.t}</h3>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>{c.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Come funziona ─────────────────────────────────────────────────────────────
const Come = () => (
  <section className="py-24" style={{ background: CREAM }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: NAVY }}>
          Tre passi verso
          <span style={{ backgroundImage: `linear-gradient(135deg, ${ROSE}, #F472B6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}> la tua anima gemella</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-10">
        {[
          { n: "01", icon: Map, t: "Crea la tua Mappa Numerologica", d: "Inserisci la tua data di nascita. In pochi secondi scopri tutti i tuoi numeri fondamentali: Destino, Anima, Personalità, Karma, Espressione e Anno Personale." },
          { n: "02", icon: Heart, t: "Scopri le Anime Gemelle", d: "Il sistema analizza tutti gli utenti registrati e ti mostra chi è numerologicamente più compatibile. Vedi il punteggio per ogni dimensione, non un voto generico." },
          { n: "03", icon: MessageCircle, t: "Connettiti con autenticità", d: "Chatta con i tuoi match reali. Nessuno swipe, nessun algoritmo a pagamento — solo compatibilità autentica basata su chi sei davvero." },
        ].map(s => (
          <div key={s.n} className="flex flex-col items-start">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md" style={{ background: ROSELT }}>
              <s.icon className="w-7 h-7" style={{ color: ROSE }} />
            </div>
            <p className="font-display text-4xl font-bold mb-3 opacity-20" style={{ color: ROSE }}>{s.n}</p>
            <h3 className="font-display text-xl font-bold mb-3" style={{ color: NAVY }}>{s.t}</h3>
            <p className="text-sm leading-relaxed" style={{ color: BODY }}>{s.d}</p>
          </div>
        ))}
      </div>
      <Divider />
      <div className="text-center">
        <Btn to="/auth?mode=signup" large>Inizia gratis <ArrowRight className="w-5 h-5" /></Btn>
      </div>
    </div>
  </section>
);

// ── Services ──────────────────────────────────────────────────────────────────
const Services = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-14">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-px h-8" style={{ background: ROSE }} />
          <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>Non solo dating</p>
          <div className="w-px h-8" style={{ background: ROSE }} />
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: NAVY }}>
          Un ecosistema completo
        </h2>
        <p className="max-w-xl mx-auto text-lg" style={{ color: BODY }}>
          Trovare l'amore è solo il punto di partenza. Hai accesso a tutto questo, incluso nella registrazione.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[
          { icon: Map, t: "Mappa Numerologica", d: "Il ritratto completo di chi sei attraverso i numeri pitagorici.", hot: false },
          { icon: Heart, t: "Anime Gemelle", d: "Match reali calcolati su 6 dimensioni di compatibilità.", hot: true },
          { icon: MessageCircle, t: "Esperto AI", d: "Il tuo consulente numerologico personale disponibile 24/7.", hot: false },
          { icon: Calendar, t: "Date Favorevoli", d: "I giorni perfetti per ogni decisione importante della tua vita.", hot: false },
          { icon: Compass, t: "Pilastri della Crescita", d: "Un percorso in 7 tappe per integrare le energie dei tuoi numeri.", hot: false },
          { icon: Users, t: "Compatibilità", d: "Analizza l'affinità con partner, amici, colleghi o familiari.", hot: false },
          { icon: Shirt, t: "Outfit del Giorno", d: "I colori giusti in base alle energie numerologiche di oggi.", hot: false },
          { icon: Star, t: "Anno Personale", d: "Tema e opportunità del tuo anno personale secondo i numeri.", hot: false },
          { icon: Target, t: "Analizzatore Brand", d: "La vibrazione numerologica del tuo nome, brand o progetto.", hot: false },
          { icon: Home, t: "Vibrazione Casa", d: "Come il numero del tuo indirizzo influenza la tua vita.", hot: false },
        ].map(s => (
          <div key={s.t} className="relative group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300" style={{ ["--hover-border" as string]: ROSEBDR }}>
            {s.hot && (
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: ROSELT, color: ROSE }}>Nuovo</span>
            )}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: ROSELT }}>
              <s.icon className="w-5 h-5" style={{ color: ROSE }} />
            </div>
            <h3 className="font-display text-base font-bold mb-1.5" style={{ color: NAVY }}>{s.t}</h3>
            <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => (
  <section className="py-24" style={{ background: CREAM }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>
          Chi{" "}
          <span style={{ backgroundImage: `linear-gradient(135deg, ${ROSE}, #F472B6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>sono</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
        <div className="rounded-2xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: ROSEBDR, boxShadow: `0 16px 48px rgba(201,24,74,0.10)` }}>
          <img src={founderPhoto} alt="Fondatore di NumerologicalDestiny" className="w-full h-auto object-cover" loading="lazy" />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
          <p className="text-base leading-relaxed" style={{ color: BODY }}>
            Mi chiamo <strong style={{ color: NAVY }}>Renato R.</strong> e ho sempre studiato i pattern nascosti che influenzano la realtà, con un forte interesse per la numerologia, la fisica quantistica e l'informatica.
          </p>
          <p className="text-base leading-relaxed" style={{ color: BODY }}>
            Nel corso degli anni ho sviluppato questo sistema per rendere la numerologia più chiara, accessibile e concreta: non teoria astratta, ma guida pratica che puoi usare ogni giorno — anche per trovare persone davvero compatibili con te.
          </p>
          <p className="text-base leading-relaxed" style={{ color: BODY }}>
            A differenza degli oroscopi generici, ogni analisi è calcolata dalla tua data di nascita e nome completo, seguendo i principi della tradizione pitagorica. Il risultato è una lettura che non si limita a descriverti, ma ti aiuta a capire come agire, scegliere e — perché no — amare meglio.
          </p>
          <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gray-100">
            {[
              { icon: BookOpen, v: "Pitagorica", l: "Tradizione" },
              { icon: Award, v: "Personali", l: "Analisi" },
              { icon: Users, v: "Migliaia", l: "Utenti" },
            ].map(s => (
              <div key={s.l} className="text-center">
                <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: ROSE }} />
                <p className="text-sm font-bold" style={{ color: NAVY }}>{s.v}</p>
                <p className="text-xs" style={{ color: MUTED }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => (
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>Storie vere</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { n: "Martina C.", num: "7", l: "Destino 7", q: "Avevo passato due anni su Tinder senza una relazione seria. Qui in tre settimane ho trovato qualcuno con cui posso parlare per ore. Il 91% di compatibilità non mente.", s: 5 },
          { n: "Andrea P.", num: "3", l: "Destino 3", q: "Non credevo nella numerologia. Poi ho visto la mia mappa e ho capito che descriveva perfettamente quello che cercavo in una relazione. Incredibile.", s: 5 },
          { n: "Giulia M.", num: "9", l: "Destino 9", q: "La sezione Anime Gemelle mi ha aperto gli occhi su chi sono e cosa cerco davvero. Non è solo dating — è conoscere se stessi.", s: 5 },
        ].map(t => (
          <div key={t.n} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col">
            <div className="flex gap-1 mb-5">{Array.from({ length: t.s }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
            <p className="font-display text-base leading-relaxed flex-1 mb-5 italic" style={{ color: BODY }}>"{t.q}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${ROSE}, #F472B6)` }}>{t.num}</div>
              <div>
                <p className="font-semibold text-sm" style={{ color: NAVY }}>{t.n}</p>
                <p className="text-xs" style={{ color: MUTED }}>{t.l}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = () => (
  <section className="py-24" style={{ background: CREAM }}>
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: NAVY }}>Domande frequenti</h2>
      </div>
      <div className="space-y-3">
        {[
          { q: "È davvero accurato?", a: "La numerologia pitagorica è un sistema millenario di autoconoscenza. I nostri utenti sono costantemente sorpresi dalla precisione. Ti invitiamo a provarlo gratis e giudicare tu stesso." },
          { q: "Come funziona la compatibilità?", a: "Calcoliamo 6 numeri chiave dalla tua data di nascita e li confrontiamo con quelli degli altri utenti. Il risultato è un punteggio reale su 6 dimensioni, non un algoritmo di foto." },
          { q: "I profili sono persone reali?", a: "Sì. Tutti i profili sono utenti reali. In fase Beta ci sono anche profili dimostrativi, chiaramente indicati." },
          { q: "È gratuito?", a: "Puoi iniziare gratis senza carta. La prima analisi e la sezione Anime Gemelle base sono completamente gratuite." },
          { q: "Come è diverso dagli oroscopi?", a: "Gli oroscopi sono generici. La numerologia pitagorica usa la tua data esatta per calcolare numeri unici. È su misura, non valido per milioni di persone nate nello stesso mese." },
          { q: "Posso eliminare il mio account?", a: "Certo. Puoi eliminare account e dati in qualsiasi momento, senza vincoli." },
        ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="py-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 50%, #2D1B4E 100%)` }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,24,74,0.20) 0%, transparent 60%)" }} />
    <span className="absolute top-8 left-[8%] text-white/5 font-display text-[200px] font-bold select-none leading-none" aria-hidden>∞</span>
    <span className="absolute bottom-8 right-[8%] text-white/5 font-display text-[180px] font-bold select-none leading-none" aria-hidden>♥</span>
    <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-px h-8" style={{ background: ROSE }} />
        <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>Il tuo viaggio comincia qui</p>
        <div className="w-px h-8" style={{ background: ROSE }} />
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Smetti di cercare<br />
        <span style={{ backgroundImage: `linear-gradient(135deg, #FDA4AF, #F472B6)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          inizia a trovare.
        </span>
      </h2>
      <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
        Registrati gratis, crea la tua mappa numerologica e scopri subito chi vibra alla tua stessa frequenza.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Btn to="/auth?mode=signup" large>Inizia la tua lettura gratuita <ArrowRight className="w-5 h-5" /></Btn>
        <Btn to="/auth" light large>Ho già un account</Btn>
      </div>
      <p className="mt-6 text-xs" style={{ color: "#64748B" }}>Nessuna carta di credito · Risultati immediati · Cancellazione in un click</p>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-white border-t border-gray-100 py-10">
    <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${ROSE}, ${ROSE2})` }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display text-sm font-bold" style={{ color: NAVY }}>NumerologicalDestiny</span>
      </div>
      <div className="flex gap-6 text-sm text-gray-500">
        <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
        <Link to="/terms" className="hover:text-gray-900 transition-colors">Termini</Link>
        <Link to="/community" className="hover:text-gray-900 transition-colors">Community</Link>
        <Link to="/auth" className="hover:text-gray-900 transition-colors">Accedi</Link>
      </div>
      <p className="text-xs text-gray-400">© 2026 NumerologicalDestiny</p>
    </div>
  </footer>
);

export default function LandingB() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: WARM }}>
      <Helmet><title>NumerologicalDestiny — La tua Anima Gemella è nei Numeri</title></Helmet>
      <Nav /><Hero /><Differenza /><Come /><Services /><About /><Testimonials /><FAQ /><CTA /><Footer />
    </div>
  );
}

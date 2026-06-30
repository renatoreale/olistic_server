/**
 * Landing C — "Bold & Modern"
 * Palette: Viola profondo #5B21B6 + Rosa #EC4899 + Bianco
 * Tone: energico, feature-heavy, orientato al valore — "molto di più"
 * Route: /landing-c
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, Check, Shield, Star, Heart, Map, MessageCircle,
  Calendar, Users, Compass, Target, Home, ChevronDown, Sparkles,
  LogIn, TrendingUp, X as XIcon, Sun, Shirt, Download, BookOpen, Award, Zap,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import founderPhoto from "@/assets/founder-photo.jpg";
import outfit0 from "@/assets/outfits/outfit0.jpg";
import outfit1 from "@/assets/outfits/outfit1.jpg";
import outfit2 from "@/assets/outfits/outfit2.jpg";
import outfit3 from "@/assets/outfits/outfit3.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const V  = "#5B21B6"; // violet-800
const V2 = "#7C3AED"; // violet-600
const V3 = "#A78BFA"; // violet-400 (light)
const PK = "#EC4899"; // pink-500
const VLT = "#F5F3FF"; // violet-50
const VLT2 = "#EDE9FE"; // violet-100
const VB  = "#DDD6FE"; // violet-200
const DARK = "#1A0F2E";
const BODY = "#374151";
const MUTED = "#6B7280";
const GRAD = `linear-gradient(135deg, ${V2} 0%, ${PK} 100%)`;
const GRADBTN = `linear-gradient(135deg, ${V} 0%, ${V2} 60%, ${PK} 100%)`;
const GRADBAR = `linear-gradient(90deg, ${V2}, ${PK})`;

const Btn = ({ to, href, children, large, ghost }: { to?: string; href?: string; children: React.ReactNode; large?: boolean; ghost?: boolean }) => {
  const base = `inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-all rounded-2xl ${large ? "px-8 py-4 text-base" : "px-5 py-3 text-sm"}`;
  const cls = ghost ? `${base} border-2 border-white/30 bg-white/10 text-white hover:bg-white/20` : `${base} text-white shadow-xl`;
  const style = ghost ? {} : { background: GRADBTN, boxShadow: `0 4px 20px rgba(124,58,237,0.4)` };
  if (to) return <Link to={to} className={cls} style={style}>{children}</Link>;
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button className={cls} style={style}>{children}</button>;
};

const Tag = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: color || VLT, color: V }}>
    {children}
  </span>
);

const Faq = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden hover:border-violet-200 transition-colors">
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={() => setOpen(!open)}>
        <span className="font-bold text-gray-800 text-sm leading-snug">{q}</span>
        <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 text-gray-400 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: open ? V2 : undefined }} />
      </button>
      {open && <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{a}</div>}
    </div>
  );
};

// ── Nav ───────────────────────────────────────────────────────────────────────
const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: GRADBTN }}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold" style={{ color: DARK }}>NumerologicalDestiny</span>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher size="sm" className="hidden sm:flex" />
        <Link to="/community" className="hidden md:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
          <Users className="w-4 h-4" />Community
        </Link>
        <Link to="/auth" className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-500 transition-colors">
          <LogIn className="w-4 h-4" />Accedi
        </Link>
        <Btn to="/auth?mode=signup">Inizia gratis <ArrowRight className="w-3.5 h-3.5" /></Btn>
      </div>
    </div>
  </nav>
);

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="pt-28 pb-20 bg-white relative overflow-hidden">
    {/* Gradient orb */}
    <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none" style={{ background: `radial-gradient(ellipse at 80% 30%, ${VLT} 0%, transparent 65%)` }} />
    <span className="absolute top-10 right-8 text-violet-50 font-display text-[200px] font-bold select-none leading-none pointer-events-none" aria-hidden>7</span>
    <span className="absolute bottom-0 left-[25%] text-violet-50 font-display text-[160px] font-bold select-none leading-none pointer-events-none" aria-hidden>∞</span>

    <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[3fr_2fr] gap-14 items-center relative z-10">
      <div>
        {/* Feature pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Tag><Zap className="w-3 h-3" />10+ Servizi inclusi</Tag>
          <Tag><Heart className="w-3 h-3" />Anime Gemelle</Tag>
          <Tag><Star className="w-3 h-3" />Numerologia Pitagorica</Tag>
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.0] mb-6" style={{ color: DARK }}>
          Non è<br />un'app di<br />incontri.
          <br />
          <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            È molto,<br />molto di più.
          </span>
        </h1>

        <p className="text-xl leading-relaxed mb-4 max-w-lg" style={{ color: BODY }}>
          La <strong style={{ color: V }}>Numerologia Pitagorica</strong> per trovare la tua anima gemella <em>e</em> per conoscerti davvero — con 10+ strumenti inclusi nel piano gratuito.
        </p>
        <p className="text-base mb-10" style={{ color: MUTED }}>
          Nessun algoritmo opaco. Nessuno swipe casuale. Solo compatibilità calcolata da 6 dimensioni profonde della tua data di nascita.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <Btn to="/auth?mode=signup" large>
            Scopri la tua compatibilità <ArrowRight className="w-5 h-5" />
          </Btn>
          <a href="#servizi" className="inline-flex items-center justify-center gap-2 font-bold text-base px-8 py-4 rounded-2xl border-2 bg-white hover:bg-violet-50 transition-all" style={{ borderColor: VB, color: V2 }}>
            Vedi i 10 servizi <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: MUTED }}>
          {["Gratis per iniziare", "Nessuna carta richiesta", "Privacy GDPR"].map(t => (
            <span key={t} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" />{t}</span>
          ))}
        </div>
      </div>

      {/* Right: feature stack */}
      <div className="hidden lg:flex flex-col gap-3">
        {[
          { icon: Heart, t: "Anime Gemelle", d: "Match su 6 dimensioni", hot: true, pct: "94%" },
          { icon: Map, t: "Mappa Numerologica", d: "La tua identità in numeri", hot: false, pct: null },
          { icon: Calendar, t: "Date Favorevoli", d: "Giorni perfetti per te", hot: false, pct: null },
          { icon: Shirt, t: "Outfit del Giorno", d: "Colori in base all'energia", hot: false, pct: null },
          { icon: MessageCircle, t: "Esperto AI", d: "Consulente 24/7", hot: false, pct: null },
        ].map((s, i) => (
          <div key={s.t} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${i === 0 ? "shadow-lg" : "bg-white shadow-sm"}`} style={{ borderColor: i === 0 ? VB : "#F1F5F9", background: i === 0 ? VLT : "white" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: i === 0 ? GRADBTN : VLT }}>
              <s.icon className="w-5 h-5" style={{ color: i === 0 ? "white" : V2 }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm" style={{ color: DARK }}>{s.t}</p>
                {s.hot && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: PK, color: "white" }}>Nuovo</span>}
              </div>
              <p className="text-xs" style={{ color: MUTED }}>{s.d}</p>
            </div>
            {s.pct && <p className="font-display text-2xl font-bold shrink-0" style={{ color: V2 }}>{s.pct}</p>}
          </div>
        ))}
        <p className="text-xs text-center font-semibold pt-1" style={{ color: V3 }}>+ 5 altri servizi inclusi →</p>
      </div>
    </div>
  </section>
);

// ── Value props ───────────────────────────────────────────────────────────────
const ValueProps = () => (
  <section className="py-16" style={{ background: DARK }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {[
          { n: "6", label: "Dimensioni di compatibilità calcolate dalla data di nascita" },
          { n: "10+", label: "Servizi inclusi: non solo dating, ma autoconoscenza completa" },
          { n: "∞", label: "Possibilità di scoperta — ogni giorno qualcosa di nuovo su di te" },
        ].map(({ n, label }) => (
          <div key={n}>
            <p className="font-display text-6xl font-bold mb-3" style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{n}</p>
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pain ──────────────────────────────────────────────────────────────────────
const Pain = () => (
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          Anni su Tinder, Meetic, Badoo…
          <br />
          <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            e ancora nessuna connessione vera.
          </span>
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: MUTED }}>Il problema non sei tu. È il sistema.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { e: "😤", t: "Algoritmi senza senso", d: "Ti mostrano chi è vicino o chi ti ha messo like. Non chi è davvero compatibile con te." },
          { e: "🎭", t: "Profili irreali", d: "Foto ritoccate, bio copiate, persone diverse dalla realtà. Il primo appuntamento è sempre una delusione." },
          { e: "💔", t: "Zero autoconoscenza", d: "Nessuna app ti aiuta a capire chi sei davvero e cosa cerchi. Ti trattano come merce da vendere." },
        ].map(p => (
          <div key={p.t} className="bg-white rounded-2xl p-7 border border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{p.e}</div>
            <h3 className="font-bold text-lg mb-2" style={{ color: DARK }}>{p.t}</h3>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.d}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-8 text-center border" style={{ background: VLT, borderColor: VB }}>
        <p className="font-display text-2xl font-bold mb-3" style={{ color: DARK }}>NumerologicalDestiny è la risposta.</p>
        <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: BODY }}>
          Un sistema basato su millenni di saggezza numerologica che calcola la vera compatibilità — e ti dà gli strumenti per conoscerti davvero, non solo per trovare un match.
        </p>
      </div>
    </div>
  </section>
);

// ── Services ──────────────────────────────────────────────────────────────────
const Services = () => (
  <section className="py-24" id="servizi" style={{ background: VLT }}>
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4" style={{ background: "white", color: V, border: `1px solid ${VB}` }}>
          Non solo dating
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          10 strumenti inclusi.
          <br />
          <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Tutti gratis per iniziare.
          </span>
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: MUTED }}>
          Non una semplice app di incontri. Una piattaforma completa di autoconoscenza e connessione autentica.
        </p>
      </div>

      {/* Featured service */}
      <div className="rounded-3xl p-8 mb-6 text-white relative overflow-hidden" style={{ background: GRADBTN }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(255,255,255,0.05)", transform: "translate(30%, -30%)" }} />
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block text-xs font-bold px-3 py-1.5 rounded-full bg-white/20 mb-4">⭐ Il nostro core</span>
            <h3 className="font-display text-3xl font-bold mb-3">Anime Gemelle</h3>
            <p className="text-white/80 leading-relaxed mb-6">
              Il nostro sistema analizza tutti gli utenti registrati e calcola la compatibilità su 6 dimensioni profonde — Destino, Anima, Personalità, Karma, Espressione e Anno Personale.
              Non uno swipe. Non un algoritmo opaco. Numerologia pura.
            </p>
            <Btn to="/auth?mode=signup">Scopri le tue Anime Gemelle <ArrowRight className="w-5 h-5" /></Btn>
          </div>
          <div className="bg-white/10 rounded-2xl p-6">
            {[["Destino", 100], ["Anima", 100], ["Personalità", 75], ["Anno Personale", 100], ["Karma", 100]].map(([l, v]) => (
              <div key={l as string} className="mb-3">
                <div className="flex justify-between text-xs mb-1.5 text-white/70">
                  <span>{l}</span><span className="font-bold text-white">{v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-white/80" style={{ width: `${v}%` }} />
                </div>
              </div>
            ))}
            <p className="text-xs text-white/60 italic text-center mt-4">Sofia R. — 94% di compatibilità</p>
          </div>
        </div>
      </div>

      {/* Other services grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { icon: Map, t: "Mappa Numerologica", d: "Il ritratto completo della tua personalità attraverso i numeri pitagorici." },
          { icon: MessageCircle, t: "Esperto AI", d: "Consulente numerologico AI disponibile 24/7 che conosce la tua mappa." },
          { icon: Calendar, t: "Date Favorevoli", d: "I giorni migliori per ogni decisione: colloqui, firme, nuovi inizi." },
          { icon: Shirt, t: "Outfit del Giorno", d: "I colori da indossare in base alle energie numerologiche di oggi." },
          { icon: Compass, t: "Pilastri della Crescita", d: "Un percorso in 7 tappe per integrare le energie dei tuoi numeri." },
          { icon: Users, t: "Compatibilità Libera", d: "Analizza l'affinità con chiunque: partner, colleghi, amici, familiari." },
          { icon: Star, t: "Anno Personale", d: "Il tema e le opportunità del tuo anno personale secondo la numerologia." },
          { icon: Target, t: "Analizzatore Brand", d: "La vibrazione numerologica del tuo nome, azienda o progetto." },
          { icon: Home, t: "Vibrazione Casa", d: "Come il numero del tuo indirizzo influenza la tua vita quotidiana." },
        ].map(s => (
          <div key={s.t} className="group bg-white rounded-2xl p-5 border border-white shadow-sm hover:shadow-lg hover:border-violet-200 transition-all">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: VLT }}>
              <s.icon className="w-5 h-5" style={{ color: V2 }} />
            </div>
            <h3 className="font-bold text-base mb-1.5" style={{ color: DARK }}>{s.t}</h3>
            <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Comparison ────────────────────────────────────────────────────────────────
const Comparison = () => (
  <section className="py-24 bg-white">
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          La differenza è{" "}
          <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>enorme</span>
        </h2>
      </div>
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
          <div className="p-4 text-sm font-semibold text-gray-500">Funzionalità</div>
          <div className="p-4 text-sm font-semibold text-center text-gray-500 border-x border-gray-200">App tradizionali</div>
          <div className="p-4 text-sm font-bold text-center border-l-2" style={{ borderLeftColor: V2, background: VLT, color: V }}>NumerologicalDestiny</div>
        </div>
        {[
          ["Criterio di matching", "Foto + posizione", "6 dimensioni numerologiche"],
          ["Compatibilità profonda", "Nessuna", "Calcolata dalla data di nascita"],
          ["Profili autentici", "Non verificati", "Dati reali verificati"],
          ["Autoconoscenza", "Zero", "Mappa completa della personalità"],
          ["Algoritmo", "Segreto / a pagamento", "Numerologia Pitagorica visibile"],
          ["Servizi aggiuntivi", "Solo dating", "10+ strumenti inclusi"],
          ["Outfit numerologico", "Assente", "Consigli quotidiani personalizzati"],
          ["Costo per iniziare", "Spesso a pagamento", "Completamente gratis"],
        ].map(([f, bad, good], i) => (
          <div key={f} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
            <div className="p-4 text-sm font-medium" style={{ color: DARK }}>{f}</div>
            <div className="p-4 text-sm text-gray-400 text-center border-x border-gray-100 flex items-center justify-center gap-1.5">
              <XIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />{bad}
            </div>
            <div className="p-4 text-sm text-center flex items-center justify-center gap-1.5 border-l-2" style={{ borderLeftColor: V2, background: i % 2 === 0 ? VLT : VLT2, color: V }}>
              <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />{good}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── How ───────────────────────────────────────────────────────────────────────
const How = () => (
  <section className="py-24" style={{ background: VLT }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          Tre passi verso{" "}
          <span style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>la tua anima gemella</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px border-t-2 border-dashed" style={{ borderColor: VB }} />
        {[
          { n: "01", icon: Map, t: "Crea la tua Mappa Numerologica", d: "Inserisci la tua data di nascita. In pochi secondi hai tutti i tuoi numeri fondamentali: Destino, Anima, Personalità, Karma, Espressione e Anno Personale." },
          { n: "02", icon: Heart, t: "Scopri le tue Anime Gemelle", d: "Il sistema analizza tutti gli utenti e ti mostra chi è più compatibile su 6 dimensioni. Vedi il punteggio per ogni dimensione — non un voto generico." },
          { n: "03", icon: MessageCircle, t: "Connettiti con autenticità", d: "Chatta con i tuoi match reali. Nessuno swipe, nessun algoritmo a pagamento. Solo compatibilità numerologica autentica." },
        ].map(s => (
          <div key={s.n} className="text-center relative z-10">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "white" }}>
                <s.icon className="w-8 h-8" style={{ color: V2 }} />
              </div>
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shadow" style={{ background: GRADBTN }}>
                {s.n}
              </div>
            </div>
            <h3 className="font-display text-xl font-bold mb-3" style={{ color: DARK }}>{s.t}</h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: MUTED }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => (
  <section className="py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: DARK }}>Cosa dicono i nostri utenti</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { n: "Martina C.", num: "7", l: "Destino 7", q: "Avevo passato due anni su Tinder senza una relazione seria. Qui in tre settimane ho trovato qualcuno con cui posso parlare per ore. Il 91% di compatibilità non mente." },
          { n: "Andrea P.", num: "3", l: "Destino 3", q: "Non credevo nella numerologia. Poi ho visto la mia mappa e ho capito che descriveva perfettamente quello che cercavo. Incredibile." },
          { n: "Giulia M.", num: "9", l: "Destino 9", q: "Non è solo dating — è conoscere se stessi. La mia Mappa Numerologica mi ha rivelato cose su di me che non avevo mai capito." },
        ].map(t => (
          <div key={t.n} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col hover:border-violet-200 hover:shadow-md transition-all">
            <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
            <p className="text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: MUTED }}>"{t.q}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: GRADBTN }}>{t.num}</div>
              <div>
                <p className="text-sm font-bold" style={{ color: DARK }}>{t.n}</p>
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
  <section className="py-24" style={{ background: VLT }}>
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 border" style={{ background: "white", color: V, borderColor: VB }}>FAQ</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: DARK }}>Domande frequenti</h2>
      </div>
      <div className="space-y-3">
        {[
          { q: "È davvero accurato?", a: "La numerologia pitagorica è un sistema millenario. I nostri utenti sono costantemente sorpresi dalla precisione. Prova gratis e giudica tu stesso." },
          { q: "Come funziona la compatibilità Anime Gemelle?", a: "Calcoliamo 6 numeri chiave dalla data di nascita (Destino, Anima, Personalità, Karma, Espressione, Anno Personale) e li confrontiamo con quelli degli altri utenti. È un punteggio reale, non un algoritmo di foto." },
          { q: "I profili sono persone reali?", a: "Sì. Tutti i profili sono utenti reali. In fase Beta ci sono anche profili dimostrativi, chiaramente indicati." },
          { q: "I 10 servizi sono davvero gratis?", a: "Puoi iniziare gratis senza carta. La prima analisi, la mappa base e la sezione Anime Gemelle sono completamente gratuite. I contenuti avanzati si sbloccano con abbonamento." },
          { q: "Come è diverso dagli oroscopi?", a: "Gli oroscopi sono generici. La numerologia pitagorica usa la tua data esatta per calcolare numeri unici e personali — non validi per milioni di persone nate nello stesso mese." },
          { q: "Posso eliminare il mio account?", a: "Certo. Nessun vincolo. Puoi eliminare account e dati in qualsiasi momento dalle impostazioni." },
        ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="py-28 relative overflow-hidden text-white" style={{ background: `linear-gradient(135deg, ${DARK} 0%, #2D1B69 50%, #4A1942 100%)` }}>
    <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 60%)` }} />
    <span className="absolute top-8 left-[8%] text-white/5 font-display text-[200px] font-bold select-none leading-none" aria-hidden>7</span>
    <span className="absolute bottom-8 right-[8%] text-white/5 font-display text-[160px] font-bold select-none leading-none" aria-hidden>∞</span>
    <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
      <div className="inline-flex items-center gap-2 border text-sm font-bold px-5 py-2 rounded-full mb-8 bg-white/10 border-white/20">
        <Zap className="w-4 h-4" style={{ color: V3 }} />
        <span style={{ color: V3 }}>10+ servizi · Gratis per iniziare · Nessuna carta</span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        Non l'ennesima app.<br />
        <span style={{ backgroundImage: `linear-gradient(135deg, #C4B5FD, ${PK})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          La tua piattaforma numerologica.
        </span>
      </h2>
      <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
        Unisciti a migliaia di persone che hanno scelto di trovare connessioni autentiche attraverso la scienza dei numeri.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Btn to="/auth?mode=signup" large>Inizia gratis adesso <ArrowRight className="w-5 h-5" /></Btn>
        <Btn to="/auth" ghost large>Ho già un account</Btn>
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
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: GRADBTN }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display text-sm font-bold" style={{ color: DARK }}>NumerologicalDestiny</span>
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

export default function LandingC() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet><title>NumerologicalDestiny — Non è un'App di Incontri. È Molto di Più.</title></Helmet>
      <Nav /><Hero /><ValueProps /><Pain /><Services /><Comparison /><How /><Testimonials /><FAQ /><CTA /><Footer />
    </div>
  );
}

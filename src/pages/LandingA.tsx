/**
 * Landing A — "Meetic-style Professional"
 * Palette: Blu #0057FF + Rosa #FF3D6B + Bianco/Grigio chiaro
 * Tone: accessibile, professionale, social-proof heavy
 * Route: /landing-a
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight, Check, Shield, Star, Heart, Map, MessageCircle,
  Calendar, Users, Compass, Target, Home, ChevronDown, Sparkles,
  LogIn, TrendingUp, X as XIcon, Sun, Shirt, Download, BookOpen,
  Award,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import founderPhoto from "@/assets/founder-photo.jpg";
import outfit0 from "@/assets/outfits/outfit0.jpg";
import outfit1 from "@/assets/outfits/outfit1.jpg";
import outfit2 from "@/assets/outfits/outfit2.jpg";
import outfit3 from "@/assets/outfits/outfit3.jpg";

// ── Tokens ────────────────────────────────────────────────────────────────────
const P = "#0057FF";
const PD = "#0041CC";
const PL = "#EEF3FF";
const PB = "#C7D7FD";
const ROSE = "#FF3D6B";
const DARK = "#1A1D3B";
const MUTED = "#64748B";
const LIGHT = "#F7F9FC";

const Btn = ({ to, href, children, large, outline }: { to?: string; href?: string; children: React.ReactNode; large?: boolean; outline?: boolean }) => {
  const base = `inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all ${large ? "px-8 py-4 text-base" : "px-5 py-3 text-sm"}`;
  const cls = outline
    ? `${base} border-2 bg-white hover:bg-blue-50`
    : `${base} text-white hover:opacity-90 shadow-lg`;
  const style = outline
    ? { borderColor: P, color: P }
    : { background: `linear-gradient(135deg, ${P}, ${PD})`, boxShadow: `0 4px 16px rgba(0,87,255,0.3)` };
  if (to) return <Link to={to} className={cls} style={style}>{children}</Link>;
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button className={cls} style={style}>{children}</button>;
};

const Faq = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={() => setOpen(!open)}>
        <span className="font-semibold text-gray-800 text-sm leading-snug">{q}</span>
        <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 text-gray-400 transition-transform" style={{ transform: open ? "rotate(180deg)" : "none", color: open ? P : undefined }} />
      </button>
      {open && <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-100">{a}</div>}
    </div>
  );
};

// ── Nav ───────────────────────────────────────────────────────────────────────
const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${P}, ${PD})` }}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="font-display text-lg font-bold" style={{ color: DARK }}>NumerologicalDestiny</span>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher size="sm" className="hidden sm:flex" />
        <Link to="/community" className="hidden md:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors" style={{ color: MUTED }}>
          <Users className="w-4 h-4" />Community
        </Link>
        <Link to="/auth" className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors" style={{ color: MUTED }}>
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
    <div className="absolute top-0 right-0 w-[50%] h-full pointer-events-none" style={{ background: `radial-gradient(ellipse at 80% 40%, ${PL} 0%, transparent 65%)` }} />
    <span className="absolute top-16 right-8 text-blue-50 font-display text-[200px] font-bold select-none leading-none pointer-events-none" aria-hidden>7</span>
    <span className="absolute bottom-0 left-[35%] text-blue-50 font-display text-[160px] font-bold select-none leading-none pointer-events-none" aria-hidden>9</span>

    <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-14 items-center relative z-10">
      <div>
        <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-8" style={{ background: PL, color: P }}>
          <Heart className="w-4 h-4" style={{ fill: ROSE, color: ROSE }} />
          Non l'ennesima app di incontri
        </div>

        <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] mb-6" style={{ color: DARK }}>
          Smetti di strisciare foto.
          <br />
          <span style={{ backgroundImage: `linear-gradient(135deg, ${P} 0%, #6366F1 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Trova chi vibra<br />alla tua frequenza.
          </span>
        </h1>

        <p className="text-lg mb-3 leading-relaxed" style={{ color: MUTED }}>
          NumerologicalDestiny usa la <strong style={{ color: DARK }}>Numerologia Pitagorica</strong> per calcolare
          la vera compatibilità dalla tua data di nascita — 6 dimensioni profonde, non un algoritmo di foto.
        </p>
        <p className="text-base mb-10" style={{ color: "#94A3B8" }}>
          E non è solo dating: trovi la tua anima gemella <em>e</em> ottieni una piattaforma completa di autoconoscenza con 10+ servizi inclusi.
        </p>

        {/* Mock search widget */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 p-1 bg-gray-50 border border-gray-200 rounded-2xl">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-200 text-sm" style={{ color: MUTED }}>
            <Calendar className="w-4 h-4 shrink-0" style={{ color: P }} />
            Inserisci la tua data di nascita
          </div>
          <Btn to="/auth?mode=signup">
            Scopri i tuoi match <ArrowRight className="w-4 h-4" />
          </Btn>
        </div>

        <div className="flex flex-wrap gap-4 text-sm" style={{ color: MUTED }}>
          {[
            { icon: Check, text: "Gratis per iniziare" },
            { icon: Check, text: "Nessuna carta richiesta" },
            { icon: Shield, text: "Privacy GDPR" },
            { icon: Check, text: "Profili verificati" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5"><Icon className="w-4 h-4 text-green-500" />{text}</span>
          ))}
        </div>
      </div>

      {/* Compatibility card */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-3xl p-7 border max-w-sm ml-auto shadow-2xl" style={{ borderColor: PB, boxShadow: `0 24px 64px rgba(0,87,255,0.10)` }}>
          <div className="flex items-center justify-between mb-2 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: `linear-gradient(135deg, ${P}, #6366F1)` }}>S</div>
              <div>
                <p className="font-semibold text-gray-900">Sofia R.</p>
                <p className="text-xs" style={{ color: MUTED }}>Numero del Destino: 7</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: P }}>94%</p>
              <p className="text-xs" style={{ color: MUTED }}>Compatibilità</p>
            </div>
          </div>
          {[{ l: "Destino", v: 100 }, { l: "Anima", v: 100 }, { l: "Personalità", v: 75 }, { l: "Anno Personale", v: 100 }, { l: "Karma", v: 100 }].map(b => (
            <div key={b.l} className="mb-2.5">
              <div className="flex justify-between text-xs mb-1">
                <span style={{ color: MUTED }}>{b.l}</span>
                <span className="font-semibold text-gray-700">{b.v}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-100">
                <div className="h-full rounded-full" style={{ width: `${b.v}%`, background: `linear-gradient(90deg, ${P}, #6366F1)` }} />
              </div>
            </div>
          ))}
          <p className="mt-4 pt-3 border-t border-gray-100 text-xs italic text-center" style={{ color: MUTED }}>"Entrambi numero 7 — un'armonia rara."</p>
        </div>
        <div className="mt-3 ml-auto mr-6 max-w-fit bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
          <Check className="w-3.5 h-3.5" />Profili reali, verificati
        </div>
      </div>
    </div>
  </section>
);

// ── Stats ─────────────────────────────────────────────────────────────────────
const Stats = () => (
  <section className="py-12 border-y border-gray-100" style={{ background: LIGHT }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { n: "6", label: "Dimensioni di compatibilità" },
          { n: "10+", label: "Servizi inclusi" },
          { n: "100%", label: "Gratis per iniziare" },
          { n: "1 su 4", label: "Utenti trova una connessione vera" },
        ].map(({ n, label }) => (
          <div key={label}>
            <p className="font-display text-4xl font-bold mb-1" style={{ color: P }}>{n}</p>
            <p className="text-sm" style={{ color: MUTED }}>{label}</p>
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
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 border border-red-100">Il problema con le app di dating</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>Ti suona familiare?</h2>
        <p className="max-w-xl mx-auto" style={{ color: MUTED }}>Milioni di persone passano ore a scorrere profili ogni giorno, ma le connessioni reali sono rarissime.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          { emoji: "😤", t: "Swipe infiniti, zero risultati", d: "Ore spese a scorrere profili, like inviati, attese. La maggior parte dei match non risponde mai." },
          { emoji: "🎭", t: "Profili falsi e aspettative irreali", d: "Foto ritoccate, bio inventate, persone completamente diverse di persona. Il primo appuntamento è sempre una doccia fredda." },
          { emoji: "💔", t: "Compatibilità? Zero.", d: "L'algoritmo ti mostra chi è vicino o chi ti ha messo like. Non chi è davvero compatibile con la tua personalità profonda." },
        ].map(p => (
          <div key={p.t} className="bg-white rounded-2xl p-7 border border-red-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-4xl mb-4">{p.emoji}</div>
            <h3 className="font-display text-lg font-bold mb-2" style={{ color: DARK }}>{p.t}</h3>
            <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.d}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-7 text-center">
        <p className="font-display text-xl font-bold mb-2" style={{ color: DARK }}>Il risultato?</p>
        <p className="text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: MUTED }}>
          Anni persi su app che ti trattano come merce. Le connessioni profonde non si trovano scorrendo foto — si trovano capendo chi sei davvero e chi vibra alla tua stessa frequenza numerologica.
        </p>
      </div>
    </div>
  </section>
);

// ── How ───────────────────────────────────────────────────────────────────────
const How = () => (
  <section className="py-24" id="come-funziona" style={{ background: LIGHT }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border" style={{ background: PL, color: P, borderColor: PB }}>La nostra soluzione</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          La compatibilità vera{" "}
          <span style={{ backgroundImage: `linear-gradient(135deg, ${P}, #6366F1)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>è scritta nei numeri</span>
        </h2>
        <p className="max-w-2xl mx-auto leading-relaxed" style={{ color: MUTED }}>
          La Numerologia Pitagorica rivela la struttura profonda della tua personalità dalla data di nascita. Incrociando i tuoi numeri con quelli degli altri utenti, calcoliamo una compatibilità reale su 6 dimensioni.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px border-t-2 border-dashed" style={{ borderColor: PB }} />
        {[
          { n: "01", icon: Map, t: "Crea la tua Mappa Numerologica", d: "Inserisci la tua data di nascita e scopri tutti i tuoi numeri: Destino, Anima, Personalità, Karma ed Espressione." },
          { n: "02", icon: Heart, t: "Scopri le Anime Gemelle", d: "Il nostro algoritmo numerologico analizza tutti gli utenti e mostra chi è più compatibile con te su 6 dimensioni." },
          { n: "03", icon: MessageCircle, t: "Connettiti con persone reali", d: "Chatta con i tuoi veri match. Nessuno swipe, nessun algoritmo opaco — solo compatibilità autentica." },
        ].map(s => (
          <div key={s.n} className="text-center relative z-10">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg" style={{ background: PL }}>
                <s.icon className="w-8 h-8" style={{ color: P }} />
              </div>
              <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs" style={{ background: P }}>
                {s.n}
              </div>
            </div>
            <h3 className="font-display text-xl font-bold mb-3" style={{ color: DARK }}>{s.t}</h3>
            <p className="text-sm leading-relaxed max-w-xs mx-auto" style={{ color: MUTED }}>{s.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <Btn to="/auth?mode=signup" large>Scopri la tua compatibilità — è gratis <ArrowRight className="w-5 h-5" /></Btn>
      </div>
    </div>
  </section>
);

// ── Services ──────────────────────────────────────────────────────────────────
const Services = () => (
  <section className="py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold mb-4 border border-gray-200">Non solo dating</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          Un ecosistema completo{" "}
          <span style={{ backgroundImage: `linear-gradient(135deg, ${P}, #6366F1)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>per conoscerti davvero</span>
        </h2>
        <p className="max-w-xl mx-auto" style={{ color: MUTED }}>Non una semplice lettura numerologica. Una piattaforma completa che evolve con te.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { icon: Map, t: "Mappa Numerologica", d: "Tutti i numeri che definiscono chi sei, cosa vuoi e dove stai andando.", badge: null },
          { icon: Heart, t: "Anime Gemelle", d: "Match numerologici con utenti reali. Compatibilità su 6 dimensioni.", badge: "Nuovo" },
          { icon: MessageCircle, t: "Chat con l'Esperto AI", d: "Consulente numerologico AI che conosce la tua mappa.", badge: null },
          { icon: Calendar, t: "Date Favorevoli", d: "I giorni migliori per decisioni importanti, nuovi inizi, incontri.", badge: null },
          { icon: Compass, t: "Pilastri della Crescita", d: "Il tuo piano di sviluppo personale basato sui cicli numerologici.", badge: null },
          { icon: Users, t: "Compatibilità", d: "Analizza l'affinità con chiunque: partner, amici, colleghi.", badge: null },
          { icon: Target, t: "Analizzatore Brand", d: "Scopri la vibrazione numerologica del tuo nome o brand.", badge: null },
          { icon: Home, t: "Vibrazione Casa", d: "Il tuo numero civico influenza la tua vita quotidiana. Scopri come.", badge: null },
          { icon: Star, t: "Anno Personale", d: "Tema, opportunità e sfide del tuo anno personale.", badge: null },
          { icon: Shirt, t: "Outfit del Giorno", d: "Consigli di abbigliamento basati sulle energie numerologiche del giorno.", badge: null },
        ].map(s => (
          <div key={s.t} className="group relative bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
            {s.badge && (
              <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: PL, color: P }}>
                {s.badge}
              </span>
            )}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: PL }}>
              <s.icon className="w-5 h-5" style={{ color: P }} />
            </div>
            <h3 className="font-display text-base font-bold mb-1.5" style={{ color: DARK }}>{s.t}</h3>
            <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Comparison ────────────────────────────────────────────────────────────────
const Comparison = () => (
  <section className="py-24" style={{ background: LIGHT }}>
    <div className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>
          La differenza è{" "}
          <span style={{ backgroundImage: `linear-gradient(135deg, ${P}, #6366F1)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>enorme</span>
        </h2>
      </div>
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-white">
        <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
          <div className="p-4 text-sm font-semibold text-gray-500">Funzionalità</div>
          <div className="p-4 text-sm font-semibold text-center text-gray-500 border-x border-gray-200">App di dating</div>
          <div className="p-4 text-sm font-semibold text-center border-l-2" style={{ borderLeftColor: P, background: PL, color: P }}>NumerologicalDestiny</div>
        </div>
        {[
          ["Criterio di matching", "Foto + posizione", "6 dimensioni numerologiche"],
          ["Compatibilità profonda", "Nessuna", "Calcolata dalla data di nascita"],
          ["Profili autentici", "Non verificati", "Dati reali verificati"],
          ["Autoconoscenza", "Zero", "Mappa completa della personalità"],
          ["Algoritmo trasparente", "Segreto / a pagamento", "Numerologia Pitagorica visibile"],
          ["Servizi aggiuntivi", "Solo dating", "10+ strumenti di sviluppo personale"],
          ["Community", "Superficiale", "Appassionati autentici"],
          ["Costo per iniziare", "Spesso a pagamento", "Gratis"],
        ].map(([f, bad, good], i) => (
          <div key={f} className={`grid grid-cols-3 border-b border-gray-100 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
            <div className="p-4 text-sm font-medium" style={{ color: DARK }}>{f}</div>
            <div className="p-4 text-sm text-gray-400 text-center border-x border-gray-100 flex items-center justify-center gap-1.5">
              <XIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />{bad}
            </div>
            <div className="p-4 text-sm text-center flex items-center justify-center gap-1.5 border-l-2" style={{ borderLeftColor: P, background: i % 2 === 0 ? PL : "#E8EDFB", color: "#1E3A8A" }}>
              <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />{good}
            </div>
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
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4" style={{ color: DARK }}>Cosa dicono i nostri utenti</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { n: "Martina C.", num: "7", label: "Numero del Destino 7", stars: 5, q: "Avevo passato due anni su Tinder senza una relazione seria. Qui in tre settimane ho trovato qualcuno con cui posso parlare per ore. Il 91% di compatibilità non mente." },
          { n: "Andrea P.", num: "3", label: "Numero del Destino 3", stars: 5, q: "Non credevo nella numerologia. Poi ho visto la mia mappa e ho capito che descriveva perfettamente quello che cercavo in una relazione. Incredibile." },
          { n: "Giulia M.", num: "9", label: "Numero del Destino 9", stars: 5, q: "La sezione Anime Gemelle mi ha aperto gli occhi su chi sono e cosa cerco davvero. Non è solo dating — è conoscere se stessi." },
        ].map(t => (
          <div key={t.n} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex gap-1 mb-4">{Array.from({ length: t.stars }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
            <p className="text-sm leading-relaxed flex-1 mb-5 italic" style={{ color: MUTED }}>"{t.q}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: `linear-gradient(135deg, ${P}, #6366F1)` }}>{t.num}</div>
              <div>
                <p className="text-sm font-semibold" style={{ color: DARK }}>{t.n}</p>
                <p className="text-xs" style={{ color: MUTED }}>{t.label}</p>
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
  <section className="py-24" style={{ background: LIGHT }}>
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border" style={{ background: PL, color: P, borderColor: PB }}>FAQ</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: DARK }}>Domande frequenti</h2>
      </div>
      <div className="space-y-3">
        {[
          { q: "È davvero accurato?", a: "La numerologia pitagorica è un sistema millenario di autoconoscenza. I nostri utenti sono costantemente sorpresi dalla precisione delle analisi. Ti invitiamo a provarlo gratis e giudicare tu stesso." },
          { q: "Come funziona la compatibilità Anime Gemelle?", a: "Calcoliamo 6 numeri chiave dalla tua data di nascita (Destino, Anima, Personalità, Karma, Espressione, Anno Personale) e li confrontiamo con quelli degli altri utenti. Il risultato è un punteggio di compatibilità reale, non un algoritmo di swipe." },
          { q: "I profili sono persone reali?", a: "Sì. Tutti i profili sono utenti reali registrati sulla piattaforma. Durante la fase Beta ci sono anche alcuni profili dimostrativi, chiaramente indicati, per mostrarti come funziona la compatibilità prima che la community cresca." },
          { q: "È gratuito?", a: "Puoi iniziare gratis senza inserire dati di pagamento. La prima analisi e la sezione base Anime Gemelle sono completamente gratuite. I contenuti premium si sbloccano con un abbonamento." },
          { q: "Come è diverso dagli oroscopi?", a: "Gli oroscopi sono generici e basati solo sul segno zodiacale. La numerologia pitagorica usa la tua data di nascita esatta per calcolare numeri unici e personali. L'analisi è su misura, non valida per milioni di persone nate nello stesso mese." },
          { q: "Posso eliminare il mio account?", a: "Certo. Nessun vincolo. Puoi eliminare il tuo account e tutti i dati in qualsiasi momento dalle impostazioni del profilo." },
        ].map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  </section>
);

// ── CTA ───────────────────────────────────────────────────────────────────────
const CTA = () => (
  <section className="py-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, #0A0F3D 0%, #0057FF 50%, #0A0F3D 100%)` }}>
    <span className="absolute top-8 left-[8%] text-white/5 font-display text-[200px] font-bold select-none leading-none" aria-hidden>∞</span>
    <span className="absolute bottom-8 right-[8%] text-white/5 font-display text-[180px] font-bold select-none leading-none" aria-hidden>♥</span>
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.3) 0%, transparent 60%)" }} />
    <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
      <div className="inline-flex items-center gap-2 border text-sm font-semibold px-5 py-2 rounded-full mb-8" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.2)", color: "#93C5FD" }}>
        <Sparkles className="w-4 h-4" />La tua anima gemella ti sta aspettando
      </div>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        Pronto a smettere di cercare<br />
        <span style={{ backgroundImage: "linear-gradient(135deg, #93C5FD, #C4B5FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          e iniziare a trovare?
        </span>
      </h2>
      <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
        Registrati gratis, crea la tua mappa numerologica e scopri subito chi vibra alla tua stessa frequenza.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Btn to="/auth?mode=signup" large>Inizia gratis adesso <ArrowRight className="w-5 h-5" /></Btn>
        <Link to="/auth" className="inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-xl border text-white" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.08)" }}>
          Ho già un account
        </Link>
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
        <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${P}, ${PD})` }}>
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-display text-sm font-bold" style={{ color: DARK }}>NumerologicalDestiny</span>
      </div>
      <div className="flex gap-6 text-sm" style={{ color: MUTED }}>
        <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy</Link>
        <Link to="/terms" className="hover:text-gray-900 transition-colors">Termini</Link>
        <Link to="/community" className="hover:text-gray-900 transition-colors">Community</Link>
        <Link to="/auth" className="hover:text-gray-900 transition-colors">Accedi</Link>
      </div>
      <p className="text-xs" style={{ color: "#94A3B8" }}>© 2026 NumerologicalDestiny</p>
    </div>
  </footer>
);

export default function LandingA() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Helmet><title>NumerologicalDestiny — Trova la tua Anima Gemella con la Numerologia</title></Helmet>
      <Nav /><Hero /><Stats /><Pain /><How /><Services /><Comparison /><Testimonials /><FAQ /><CTA /><Footer />
    </div>
  );
}

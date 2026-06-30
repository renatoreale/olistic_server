/**
 * LandingBEditable — grafica identica a Landing B, testi da props.
 * Usato dall'editor visuale /edit-landing.
 */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Shield, Star, Heart, Map, MessageCircle,
  Calendar, Users, Compass, Target, Home, ChevronDown, Sparkles,
  LogIn, Shirt, BookOpen, Award, X as XIcon,
} from "lucide-react";
import founderPhoto from "@/assets/founder-photo.jpg";
import outfit0 from "@/assets/outfits/outfit0.jpg";
import outfit1 from "@/assets/outfits/outfit1.jpg";
import outfit2 from "@/assets/outfits/outfit2.jpg";
import outfit3 from "@/assets/outfits/outfit3.jpg";
import type { LBContent } from "./landingBContent";

const NAVY  = "#0A0F2E";
const NAVY2 = "#1E2952";
const ROSE  = "#C9184A";
const ROSE2 = "#A30F38";
const ROSELT = "#FFF1F5";
const ROSEBDR = "#FBCFE8";
const BODY  = "#374151";
const MUTED = "#9CA3AF";
const WARM  = "#FDFCFB";
const CREAM = "#FDF8F5";

const SERVICE_ICONS = [Map, Heart, MessageCircle, Calendar, Compass, Users, Shirt, Star, Target, Home];

// ── helpers ───────────────────────────────────────────────────────────────────
const Btn = ({ to, href, children, large, light }: { to?: string; href?: string; children: React.ReactNode; large?: boolean; light?: boolean }) => {
  const base = `inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all rounded-xl ${large ? "px-9 py-4 text-base" : "px-5 py-3 text-sm"}`;
  const cls = light ? `${base} border-2 bg-transparent hover:bg-white/10 text-white` : `${base} text-white hover:opacity-90`;
  const style = light
    ? { borderColor: "rgba(255,255,255,0.4)" }
    : { background: ROSE };
  if (to) return <Link to={to} className={cls} style={style}>{children}</Link>;
  if (href) return <a href={href} className={cls} style={style}>{children}</a>;
  return <button className={cls} style={style}>{children}</button>;
};

const SectionDivider = () => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-gray-200" />
    <span className="text-gray-300 font-display text-lg">✦</span>
    <div className="flex-1 h-px bg-gray-200" />
  </div>
);

const FaqItem = ({ q, a }: { q: string; a: string }) => {
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

const AccentText = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundImage: `linear-gradient(135deg, ${ROSE} 0%, #F472B6 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

// ── Main component ────────────────────────────────────────────────────────────
interface Props {
  content: LBContent
  /** When true the Nav is not sticky (used inside the editor preview pane) */
  isPreview?: boolean
}

export default function LandingBEditable({ content: c, isPreview }: Props) {
  const { hero, differenza, come, services, about, testimonials, faq, cta } = c;

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: WARM }}>

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <nav
        className="top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ position: isPreview ? "relative" : "fixed" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: ROSE }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight" style={{ color: NAVY }}>NumerologicalDestiny</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/community" className="hidden md:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
              <Users className="w-4 h-4" />Community
            </Link>
            <Link to="/auth" className="hidden sm:flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-500">
              <LogIn className="w-4 h-4" />Accedi
            </Link>
            <Btn to="/auth?mode=signup">{hero.ctaPrimary} <ArrowRight className="w-3.5 h-3.5" /></Btn>
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className={`pb-24 relative overflow-hidden ${isPreview ? "pt-8" : "pt-28"}`} style={{ background: WARM }}>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] pointer-events-none rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${ROSELT} 0%, transparent 70%)`, transform: "translate(-30%, -30%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none rounded-full opacity-15" style={{ background: "radial-gradient(circle, #EFF6FF 0%, transparent 70%)", transform: "translate(30%, 30%)" }} />

        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-px h-8 rounded-full" style={{ background: ROSE }} />
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>{hero.eyebrow}</p>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.0] mb-8" style={{ color: NAVY }}>
              {hero.titleLine1}<br />{hero.titleLine2}<br />
              <AccentText>{hero.titleAccentLine1}<br />{hero.titleAccentLine2}</AccentText>
            </h1>

            <p className="text-lg leading-relaxed mb-4" style={{ color: BODY }}>
              <strong>{hero.subtitle.split(".")[0]}.</strong>{hero.subtitle.slice(hero.subtitle.indexOf(".") + 1)}
            </p>
            <p className="text-base mb-10" style={{ color: MUTED }}>{hero.subtitleMuted}</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Btn to="/auth?mode=signup" large>{hero.ctaPrimary} <ArrowRight className="w-5 h-5" /></Btn>
              <a href="#differenza-b" className="inline-flex items-center justify-center gap-2 font-semibold text-base px-9 py-4 rounded-xl border-2 bg-white hover:bg-gray-50 transition-all" style={{ borderColor: NAVY, color: NAVY }}>
                {hero.ctaSecondary} <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap gap-5 text-sm" style={{ color: MUTED }}>
              {hero.trust.map(t => (
                <span key={t} className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" />{t}</span>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border" style={{ borderColor: ROSEBDR, boxShadow: `0 24px 64px rgba(201,24,74,0.08), 0 4px 16px rgba(0,0,0,0.06)` }}>
              <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: ROSE }}>Compatibilità Numerologica</p>
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-bold text-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${ROSE}, #F472B6)` }}>
                  {hero.cardName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-display font-bold text-lg" style={{ color: NAVY }}>{hero.cardName}</p>
                  <p className="text-xs" style={{ color: MUTED }}>{hero.cardSubtitle}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-5xl font-bold" style={{ color: ROSE }}>94<span className="text-2xl">%</span></p>
                  <p className="text-xs" style={{ color: MUTED }}>{hero.cardCompatLabel}</p>
                </div>
              </div>
              {(["Destino", "Anima", "Personalità", "Karma"] as const).map((l, i) => (
                <div key={l} className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span style={{ color: MUTED }}>{l}</span>
                    <span className="font-semibold" style={{ color: NAVY }}>{[100, 100, 75, 100][i]}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-full rounded-full" style={{ width: `${[100, 100, 75, 100][i]}%`, background: `linear-gradient(90deg, ${ROSE}, #F472B6)` }} />
                  </div>
                </div>
              ))}
              <p className="mt-5 pt-4 border-t border-gray-100 text-xs italic text-center font-display text-sm" style={{ color: MUTED }}>
                "{hero.cardInsight}"
              </p>
            </div>
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
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50">
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

      {/* ── Differenza ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="differenza-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-px h-8" style={{ background: ROSE }} />
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>{differenza.eyebrow}</p>
              <div className="w-px h-8" style={{ background: ROSE }} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6" style={{ color: NAVY }}>
              {differenza.titleLine1}<br />
              <AccentText>{differenza.titleAccent}</AccentText>
            </h2>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: BODY }}>{differenza.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {differenza.cards.map((card) => (
              <div key={card.chapter}>
                <div className="text-5xl mb-4">{card.emoji}</div>
                <p className="font-display text-sm font-bold tracking-widest uppercase mb-3" style={{ color: ROSE }}>{card.chapter}</p>
                <h3 className="font-display text-2xl font-bold mb-4" style={{ color: NAVY }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BODY }}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Come funziona ───────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: NAVY }}>
              {come.titleLine1}
              <AccentText> {come.titleAccent}</AccentText>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {come.steps.map((step, i) => (
              <div key={i} className="flex flex-col items-start">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md" style={{ background: ROSELT }}>
                  {i === 0 ? <Map className="w-7 h-7" style={{ color: ROSE }} /> : i === 1 ? <Heart className="w-7 h-7" style={{ color: ROSE }} /> : <MessageCircle className="w-7 h-7" style={{ color: ROSE }} />}
                </div>
                <p className="font-display text-4xl font-bold mb-3 opacity-20" style={{ color: ROSE }}>0{i + 1}</p>
                <h3 className="font-display text-xl font-bold mb-3" style={{ color: NAVY }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: BODY }}>{step.description}</p>
              </div>
            ))}
          </div>
          <SectionDivider />
          <div className="text-center">
            <Btn to="/auth?mode=signup" large>{come.cta} <ArrowRight className="w-5 h-5" /></Btn>
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>
              La differenza è{" "}
              <AccentText>enorme</AccentText>
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl">
            {/* Header */}
            <div className="grid grid-cols-3" style={{ background: NAVY }}>
              <div className="p-4 text-xs font-semibold uppercase tracking-widest text-white/50">Funzionalità</div>
              <div className="p-4 text-xs font-semibold uppercase tracking-widest text-center text-white/50 border-x border-white/10">App di dating</div>
              <div className="p-4 text-xs font-semibold uppercase tracking-widest text-center" style={{ color: ROSE }}>NumerologicalDestiny</div>
            </div>
            {/* Rows */}
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
                <div className="p-4 text-sm font-medium" style={{ color: NAVY }}>{f}</div>
                <div className="p-4 text-sm text-gray-400 text-center border-x border-gray-100 flex items-center justify-center gap-1.5">
                  <XIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />{bad}
                </div>
                <div className="p-4 text-sm text-center flex items-center justify-center gap-1.5 font-medium" style={{ color: ROSE }}>
                  <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />{good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-px h-8" style={{ background: ROSE }} />
              <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>{services.eyebrow}</p>
              <div className="w-px h-8" style={{ background: ROSE }} />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4" style={{ color: NAVY }}>{services.title}</h2>
            <p className="max-w-xl mx-auto text-lg" style={{ color: BODY }}>{services.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {services.items.map((s, i) => {
              const Icon = SERVICE_ICONS[i] ?? Star;
              return (
                <div key={s.title} className="relative group bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                  {s.hot && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: ROSELT, color: ROSE }}>Nuovo</span>
                  )}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: ROSELT }}>
                    <Icon className="w-5 h-5" style={{ color: ROSE }} />
                  </div>
                  <h3 className="font-display text-base font-bold mb-1.5" style={{ color: NAVY }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: MUTED }}>{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: CREAM }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>
              {about.titleLine1} <AccentText>{about.titleAccent}</AccentText>
            </h2>
          </div>
          <div className="grid md:grid-cols-[2fr_3fr] gap-10 items-start">
            <div className="rounded-2xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: ROSEBDR, boxShadow: `0 16px 48px rgba(201,24,74,0.10)` }}>
              <img src={founderPhoto} alt="Fondatore di NumerologicalDestiny" className="w-full h-auto object-cover" loading="lazy" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
              <p className="text-base leading-relaxed" style={{ color: BODY }}>{about.p1}</p>
              <p className="text-base leading-relaxed" style={{ color: BODY }}>{about.p2}</p>
              <p className="text-base leading-relaxed" style={{ color: BODY }}>{about.p3}</p>
              <div className="grid grid-cols-3 gap-4 pt-5 border-t border-gray-100">
                {about.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <BookOpen className="w-5 h-5 mx-auto mb-2" style={{ color: ROSE }} />
                    <p className="text-sm font-bold" style={{ color: NAVY }}>{s.value}</p>
                    <p className="text-xs" style={{ color: MUTED }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold" style={{ color: NAVY }}>{testimonials.title}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.items.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col">
                <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}</div>
                <p className="font-display text-base leading-relaxed flex-1 mb-5 italic" style={{ color: BODY }}>"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold shrink-0" style={{ background: `linear-gradient(135deg, ${ROSE}, #F472B6)` }}>{t.destinyNum}</div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: NAVY }}>{t.name}</p>
                    <p className="text-xs" style={{ color: MUTED }}>{t.destinyLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: CREAM }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: NAVY }}>{faq.title}</h2>
          </div>
          <div className="space-y-3">
            {faq.items.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* ── CTA finale ──────────────────────────────────────────────────────── */}
      <section className="py-28 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${NAVY2} 50%, #2D1B4E 100%)` }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(201,24,74,0.20) 0%, transparent 60%)" }} />
        <span className="absolute top-8 left-[8%] text-white/5 font-display text-[200px] font-bold select-none leading-none" aria-hidden>∞</span>
        <span className="absolute bottom-8 right-[8%] text-white/5 font-display text-[180px] font-bold select-none leading-none" aria-hidden>♥</span>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-px h-8" style={{ background: ROSE }} />
            <p className="text-sm font-semibold tracking-widest uppercase" style={{ color: ROSE }}>{cta.eyebrow}</p>
            <div className="w-px h-8" style={{ background: ROSE }} />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {cta.titleLine1}<br />
            <span style={{ backgroundImage: "linear-gradient(135deg, #FDA4AF, #F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {cta.titleAccent}
            </span>
          </h2>
          <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>{cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Btn to="/auth?mode=signup" large>{cta.ctaPrimary} <ArrowRight className="w-5 h-5" /></Btn>
            <Btn to="/auth" light large>{cta.ctaSecondary}</Btn>
          </div>
          <p className="mt-6 text-xs" style={{ color: "#64748B" }}>{cta.note}</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: ROSE }}>
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
    </div>
  );
}

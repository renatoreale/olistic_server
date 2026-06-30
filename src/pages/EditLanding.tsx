/**
 * /edit-landing — Pannello di editing visuale per Landing B.
 * Sinistra: form con tutti i testi divisi per sezione.
 * Destra: anteprima live di LandingBEditable.
 * Le modifiche si salvano automaticamente in localStorage.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown, ChevronRight, RotateCcw, Copy, Check, ExternalLink,
  Eye, Edit3, Save,
} from "lucide-react";
import LandingBEditable from "./LandingBEditable";
import { defaultContent, loadSavedContent, saveContent, type LBContent } from "./landingBContent";

// ── Utility: deep set by string path like "hero.titleLine1" ──────────────────
function setPath(obj: unknown, path: string, value: string): unknown {
  const keys = path.split(".");
  if (keys.length === 1) return { ...(obj as object), [keys[0]]: value };
  const key = keys[0];
  return {
    ...(obj as Record<string, unknown>),
    [key]: setPath((obj as Record<string, unknown>)[key], keys.slice(1).join("."), value),
  };
}

// ── Field components ──────────────────────────────────────────────────────────
const Field = ({
  label, value, onChange, multiline, hint,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; hint?: string;
}) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
    {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
    {multiline ? (
      <textarea
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 resize-none focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition-all bg-white"
        rows={3}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      <input
        type="text"
        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-200 transition-all bg-white"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    )}
  </div>
);

// ── Accordion section ─────────────────────────────────────────────────────────
const Section = ({
  id, title, emoji, open, onToggle, children,
}: {
  id: string; title: string; emoji: string; open: boolean; onToggle: () => void; children: React.ReactNode;
}) => (
  <div className="border-b border-gray-100 last:border-0">
    <button
      className="w-full flex items-center gap-3 px-5 py-4 hover:bg-rose-50/50 transition-colors text-left"
      onClick={onToggle}
    >
      <span className="text-lg">{emoji}</span>
      <span className="flex-1 font-semibold text-gray-800 text-sm">{title}</span>
      {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
    </button>
    {open && <div className="px-5 pb-5">{children}</div>}
  </div>
);

// ── Main Editor ───────────────────────────────────────────────────────────────
export default function EditLanding() {
  const [content, setContent] = useState<LBContent>(loadSavedContent);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ hero: true });
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  // Auto-save to localStorage with debounce
  useEffect(() => {
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveContent(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [content]);

  const update = useCallback((path: string, value: string) => {
    setContent(prev => setPath(prev, path, value) as LBContent);
  }, []);

  const updateArrayItem = useCallback(
    (arrayPath: string, index: number, field: string, value: string) => {
      setContent(prev => {
        // Resolve the array by walking the path keys
        const keys = arrayPath.split(".");
        let arr: unknown = prev;
        for (const k of keys) arr = (arr as Record<string, unknown>)[k];
        const newArr = [...(arr as Record<string, string>[])];
        newArr[index] = { ...newArr[index], [field]: value };
        return setPath(prev, arrayPath, newArr as unknown as string) as LBContent;
      });
    },
    [],
  );

  const resetToDefaults = () => {
    if (confirm("Sei sicuro di voler ripristinare tutti i testi predefiniti?")) {
      setContent(defaultContent);
      localStorage.removeItem("numflame-landing-b-content-v1");
    }
  };

  const exportJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(content, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSection = (id: string) => setOpenSections(p => ({ ...p, [id]: !p[id] }));

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #C9184A, #A30F38)" }}>
            <Edit3 className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-sm">Editor Landing Page</span>
          <span className="text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-600 font-semibold border border-rose-100">
            Grafica Landing B
          </span>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1.5 text-xs text-green-600 font-semibold">
              <Check className="w-3.5 h-3.5" />Salvato
            </span>
          )}
          <button
            onClick={exportJSON}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copiato!" : "Esporta JSON"}
          </button>
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-gray-600"
          >
            <RotateCcw className="w-3.5 h-3.5" />Reset
          </button>
          <Link
            to="/landing-b"
            target="_blank"
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <ExternalLink className="w-3.5 h-3.5" />Apri pagina
          </Link>
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Form ────────────────────────────────────────────────────── */}
        <aside className="w-[400px] shrink-0 bg-white border-r border-gray-200 overflow-y-auto">

          {/* Hero */}
          <Section id="hero" title="Hero — Sezione principale" emoji="🏠" open={!!openSections.hero} onToggle={() => toggleSection("hero")}>
            <Field label="Tag eyebrow" value={content.hero.eyebrow} onChange={v => update("hero.eyebrow", v)} hint="La piccola etichetta sopra il titolo" />
            <Field label="Titolo — riga 1" value={content.hero.titleLine1} onChange={v => update("hero.titleLine1", v)} />
            <Field label="Titolo — riga 2" value={content.hero.titleLine2} onChange={v => update("hero.titleLine2", v)} />
            <Field label="Titolo colorato — riga 1" value={content.hero.titleAccentLine1} onChange={v => update("hero.titleAccentLine1", v)} hint="Testo con gradiente rosa" />
            <Field label="Titolo colorato — riga 2" value={content.hero.titleAccentLine2} onChange={v => update("hero.titleAccentLine2", v)} />
            <Field label="Sottotitolo principale" value={content.hero.subtitle} onChange={v => update("hero.subtitle", v)} multiline />
            <Field label="Sottotitolo secondario (più piccolo)" value={content.hero.subtitleMuted} onChange={v => update("hero.subtitleMuted", v)} multiline />
            <Field label="CTA principale (bottone)" value={content.hero.ctaPrimary} onChange={v => update("hero.ctaPrimary", v)} />
            <Field label="CTA secondario" value={content.hero.ctaSecondary} onChange={v => update("hero.ctaSecondary", v)} />
            <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Badge di fiducia</div>
            {content.hero.trust.map((t, i) => (
              <Field key={i} label={`Trust ${i + 1}`} value={t} onChange={v => {
                const arr = [...content.hero.trust] as [string, string, string];
                arr[i] = v;
                setContent(p => ({ ...p, hero: { ...p.hero, trust: arr } }));
              }} />
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Card compatibilità</div>
              <Field label="Nome utente" value={content.hero.cardName} onChange={v => update("hero.cardName", v)} />
              <Field label="Sottotitolo utente" value={content.hero.cardSubtitle} onChange={v => update("hero.cardSubtitle", v)} />
              <Field label="Citazione nella card" value={content.hero.cardInsight} onChange={v => update("hero.cardInsight", v)} multiline />
            </div>
          </Section>

          {/* Differenza */}
          <Section id="differenza" title="Perché siamo diversi" emoji="🧭" open={!!openSections.differenza} onToggle={() => toggleSection("differenza")}>
            <Field label="Tag eyebrow" value={content.differenza.eyebrow} onChange={v => update("differenza.eyebrow", v)} />
            <Field label="Titolo — riga 1" value={content.differenza.titleLine1} onChange={v => update("differenza.titleLine1", v)} />
            <Field label="Titolo colorato" value={content.differenza.titleAccent} onChange={v => update("differenza.titleAccent", v)} />
            <Field label="Sottotitolo" value={content.differenza.subtitle} onChange={v => update("differenza.subtitle", v)} multiline />
            {content.differenza.cards.map((card, i) => (
              <div key={i} className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Carta {i + 1}</div>
                <Field label="Emoji" value={card.emoji} onChange={v => updateArrayItem("differenza.cards", i, "emoji", v)} />
                <Field label="Etichetta capitolo" value={card.chapter} onChange={v => updateArrayItem("differenza.cards", i, "chapter", v)} />
                <Field label="Titolo" value={card.title} onChange={v => updateArrayItem("differenza.cards", i, "title", v)} />
                <Field label="Descrizione" value={card.description} onChange={v => updateArrayItem("differenza.cards", i, "description", v)} multiline />
              </div>
            ))}
          </Section>

          {/* Come funziona */}
          <Section id="come" title="Come funziona (3 passi)" emoji="🗺️" open={!!openSections.come} onToggle={() => toggleSection("come")}>
            <Field label="Titolo — riga 1" value={content.come.titleLine1} onChange={v => update("come.titleLine1", v)} />
            <Field label="Titolo colorato" value={content.come.titleAccent} onChange={v => update("come.titleAccent", v)} />
            <Field label="Testo bottone CTA" value={content.come.cta} onChange={v => update("come.cta", v)} />
            {content.come.steps.map((step, i) => (
              <div key={i} className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Passo {i + 1}</div>
                <Field label="Titolo" value={step.title} onChange={v => updateArrayItem("come.steps", i, "title", v)} />
                <Field label="Descrizione" value={step.description} onChange={v => updateArrayItem("come.steps", i, "description", v)} multiline />
              </div>
            ))}
          </Section>

          {/* Servizi */}
          <Section id="services" title="Servizi (10 schede)" emoji="✨" open={!!openSections.services} onToggle={() => toggleSection("services")}>
            <Field label="Tag eyebrow" value={content.services.eyebrow} onChange={v => update("services.eyebrow", v)} />
            <Field label="Titolo sezione" value={content.services.title} onChange={v => update("services.title", v)} />
            <Field label="Sottotitolo sezione" value={content.services.subtitle} onChange={v => update("services.subtitle", v)} multiline />
            {content.services.items.map((s, i) => (
              <div key={i} className="mt-3 pt-3 border-t border-gray-100">
                <div className="mb-1.5 text-xs font-semibold text-gray-400">Servizio {i + 1}</div>
                <Field label="Titolo" value={s.title} onChange={v => updateArrayItem("services.items", i, "title", v)} />
                <Field label="Descrizione" value={s.description} onChange={v => updateArrayItem("services.items", i, "description", v)} multiline />
              </div>
            ))}
          </Section>

          {/* Chi sono */}
          <Section id="about" title="Chi sono (Fondatore)" emoji="👤" open={!!openSections.about} onToggle={() => toggleSection("about")}>
            <Field label="Titolo — prima parte" value={content.about.titleLine1} onChange={v => update("about.titleLine1", v)} />
            <Field label="Titolo — parte colorata" value={content.about.titleAccent} onChange={v => update("about.titleAccent", v)} />
            <Field label="Paragrafo 1" value={content.about.p1} onChange={v => update("about.p1", v)} multiline />
            <Field label="Paragrafo 2" value={content.about.p2} onChange={v => update("about.p2", v)} multiline />
            <Field label="Paragrafo 3" value={content.about.p3} onChange={v => update("about.p3", v)} multiline />
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Statistiche (3)</div>
              {content.about.stats.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <Field label={`Valore ${i + 1}`} value={s.value} onChange={v => {
                    const arr = [...content.about.stats] as typeof content.about.stats;
                    arr[i] = { ...arr[i], value: v };
                    setContent(p => ({ ...p, about: { ...p.about, stats: arr } }));
                  }} />
                  <Field label="Etichetta" value={s.label} onChange={v => {
                    const arr = [...content.about.stats] as typeof content.about.stats;
                    arr[i] = { ...arr[i], label: v };
                    setContent(p => ({ ...p, about: { ...p.about, stats: arr } }));
                  }} />
                </div>
              ))}
            </div>
          </Section>

          {/* Testimonianze */}
          <Section id="testimonials" title="Testimonianze (3)" emoji="⭐" open={!!openSections.testimonials} onToggle={() => toggleSection("testimonials")}>
            <Field label="Titolo sezione" value={content.testimonials.title} onChange={v => update("testimonials.title", v)} />
            {content.testimonials.items.map((t, i) => (
              <div key={i} className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">Testimonianza {i + 1}</div>
                <Field label="Nome" value={t.name} onChange={v => updateArrayItem("testimonials.items", i, "name", v)} />
                <Field label="Numero del Destino (carattere)" value={t.destinyNum} onChange={v => updateArrayItem("testimonials.items", i, "destinyNum", v)} />
                <Field label="Etichetta del numero" value={t.destinyLabel} onChange={v => updateArrayItem("testimonials.items", i, "destinyLabel", v)} />
                <Field label="Citazione" value={t.quote} onChange={v => updateArrayItem("testimonials.items", i, "quote", v)} multiline />
              </div>
            ))}
          </Section>

          {/* FAQ */}
          <Section id="faq" title="FAQ (6 domande)" emoji="❓" open={!!openSections.faq} onToggle={() => toggleSection("faq")}>
            <Field label="Titolo sezione" value={content.faq.title} onChange={v => update("faq.title", v)} />
            {content.faq.items.map((f, i) => (
              <div key={i} className="mt-4 pt-4 border-t border-gray-100">
                <div className="mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">FAQ {i + 1}</div>
                <Field label="Domanda" value={f.q} onChange={v => updateArrayItem("faq.items", i, "q", v)} />
                <Field label="Risposta" value={f.a} onChange={v => updateArrayItem("faq.items", i, "a", v)} multiline />
              </div>
            ))}
          </Section>

          {/* CTA finale */}
          <Section id="cta" title="CTA finale (chiusura)" emoji="🚀" open={!!openSections.cta} onToggle={() => toggleSection("cta")}>
            <Field label="Tag eyebrow" value={content.cta.eyebrow} onChange={v => update("cta.eyebrow", v)} />
            <Field label="Titolo — riga 1" value={content.cta.titleLine1} onChange={v => update("cta.titleLine1", v)} />
            <Field label="Titolo colorato" value={content.cta.titleAccent} onChange={v => update("cta.titleAccent", v)} />
            <Field label="Sottotitolo" value={content.cta.subtitle} onChange={v => update("cta.subtitle", v)} multiline />
            <Field label="Bottone primario" value={content.cta.ctaPrimary} onChange={v => update("cta.ctaPrimary", v)} />
            <Field label="Bottone secondario" value={content.cta.ctaSecondary} onChange={v => update("cta.ctaSecondary", v)} />
            <Field label="Nota sotto i bottoni" value={content.cta.note} onChange={v => update("cta.note", v)} />
          </Section>

          {/* Padding bottom */}
          <div className="h-8" />
        </aside>

        {/* ── RIGHT: Live Preview ────────────────────────────────────────────── */}
        <main ref={previewRef} className="flex-1 overflow-y-auto bg-gray-100">
          {/* Preview bar */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 px-4 py-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500 font-semibold">Anteprima live — le modifiche si aggiornano in tempo reale</span>
          </div>
          {/* The actual landing rendered */}
          <div className="bg-white">
            <LandingBEditable content={content} isPreview />
          </div>
        </main>
      </div>
    </div>
  );
}

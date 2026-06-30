import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import {
  ArrowRight, Heart, Sparkles, Star, Map, MessageCircle,
  Users, Compass, Target, Home, LogIn, Check, X as XIcon,
  Shield, ChevronDown, Sun, Shirt, TrendingUp, Download,
  BookOpen, Award, Calendar,
} from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import founderPhoto from "@/assets/founder-photo.jpg";
import outfit0 from "@/assets/outfits/outfit0.jpg";
import outfit1 from "@/assets/outfits/outfit1.jpg";
import outfit2 from "@/assets/outfits/outfit2.jpg";
import outfit3 from "@/assets/outfits/outfit3.jpg";

const SITE_URL = "https://numerologicaldestiny.com";
const PAGE_URL = SITE_URL;
const PAGE_TITLE = "Find Your Soulmate with Pythagorean Numerology | NumerologicalDestiny";
const PAGE_DESCRIPTION =
  "Discover who you are truly compatible with through Pythagorean Numerology. 6 compatibility dimensions calculated from your birth date. No swipe algorithm — only authentic connections. Start free.";
const OG_IMAGE = `${SITE_URL}/og-soulmates.png`;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is it really accurate?", acceptedAnswer: { "@type": "Answer", text: "Pythagorean numerology is a millenary system of self-knowledge. Our users are constantly surprised by the precision of the analyses." } },
    { "@type": "Question", name: "How does Soulmate compatibility work?", acceptedAnswer: { "@type": "Answer", text: "We calculate 6 key numbers from your birth date and compare them with those of other users. The result is a real compatibility score, not a swipe algorithm." } },
  ],
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NumerologicalDestiny",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  founder: { "@type": "Person", name: "Renato R." },
  description: "Pythagorean numerology and numerological dating platform.",
};
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NumerologicalDestiny – Find Your Soulmate",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: PAGE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "3", bestRating: "5", worstRating: "1" },
};

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  primary:   "#4F46E5", // indigo-600
  primaryDk: "#4338CA", // indigo-700
  primaryDk2:"#3730A3", // indigo-800
  primaryLt: "#EEF2FF", // indigo-50
  primaryLt2:"#E0E7FF", // indigo-100
  primaryBdr:"#C7D2FE", // indigo-200
  primaryTxt:"#4338CA", // indigo-700 for text on light bg
  gradTxt:   "linear-gradient(135deg, #3B82F6 0%, #6366F1 55%, #8B5CF6 100%)",
  gradBtn:   "linear-gradient(135deg, #4F46E5, #6366F1)",
  gradBar:   "linear-gradient(90deg, #4F46E5, #818CF8)",
  gradAvatar:"linear-gradient(135deg, #6366F1, #4F46E5)",
  gradIcon:  "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
  gradDark:  "linear-gradient(135deg, #1E1B4B, #312E81)", // for final CTA bg
  shadowPri: "0 4px 14px 0 rgba(79,70,229,0.25)",
  shadowHov: "0 8px 20px 0 rgba(79,70,229,0.35)",
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const AccentText = ({ children }: { children: React.ReactNode }) => (
  <span style={{ backgroundImage: C.gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
    {children}
  </span>
);

const PrimaryBtn = ({ to, href, children, large }: { to?: string; href?: string; children: React.ReactNode; large?: boolean }) => {
  const cls = `inline-flex items-center justify-center gap-2 text-white font-semibold transition-all rounded-2xl ${large ? "px-8 py-4 text-base" : "px-4 py-2.5 text-sm"}`;
  const style = { background: C.gradBtn, boxShadow: C.shadowPri };
  const hoverStyle = { boxShadow: C.shadowHov };
  const props = {
    className: cls,
    style,
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => Object.assign((e.currentTarget as HTMLElement).style, hoverStyle),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => Object.assign((e.currentTarget as HTMLElement).style, { boxShadow: C.shadowPri }),
  };
  if (to) return <Link to={to} {...props}>{children}</Link>;
  if (href) return <a href={href} {...props}>{children}</a>;
  return <button {...props}>{children}</button>;
};

const OutlineBtn = ({ to, href, children, large }: { to?: string; href?: string; children: React.ReactNode; large?: boolean }) => {
  const cls = `inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold border border-slate-200 transition-all rounded-2xl ${large ? "px-8 py-4 text-base" : "px-4 py-2.5 text-sm"}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button className={cls}>{children}</button>;
};

// ── SEO ───────────────────────────────────────────────────────────────────────
const SEOHead = () => (
  <Helmet>
    <title>{PAGE_TITLE}</title>
    <meta name="description" content={PAGE_DESCRIPTION} />
    <link rel="canonical" href={PAGE_URL} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={PAGE_URL} />
    <meta property="og:title" content={PAGE_TITLE} />
    <meta property="og:description" content={PAGE_DESCRIPTION} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta name="twitter:card" content="summary_large_image" />
    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
  </Helmet>
);

// ── Nav ───────────────────────────────────────────────────────────────────────
const Nav = () => {
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.gradBtn }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold text-slate-900 tracking-tight hidden sm:block">
            NumerologicalDestiny
          </span>
          <span className="font-display text-base font-bold text-slate-900 sm:hidden">NumDest</span>
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher size="sm" className="hidden sm:flex" />
          <Link to="/community" className="hidden md:flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            <Users className="w-4 h-4" />Community
          </Link>
          <Link to="/auth" className="hidden sm:flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors">
            <LogIn className="w-4 h-4" />{t("soulmates.nav.signIn")}
          </Link>
          <PrimaryBtn to="/auth?mode=signup">
            {t("soulmates.nav.startFree")} <ArrowRight className="w-3.5 h-3.5" />
          </PrimaryBtn>
        </div>
      </div>
    </nav>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useTranslation();
  const bars = [
    { label: "Destiny", val: 100 },
    { label: "Soul", val: 100 },
    { label: "Personality", val: 75 },
    { label: "Personal Year", val: 100 },
  ];
  return (
    <section className="pt-28 pb-20 bg-white relative overflow-hidden">
      <span className="absolute -top-4 left-4 text-slate-100 font-display text-[220px] font-bold select-none leading-none pointer-events-none" aria-hidden>7</span>
      <span className="absolute top-20 right-0 text-slate-100 font-display text-[180px] font-bold select-none leading-none pointer-events-none" aria-hidden>11</span>
      <span className="absolute bottom-0 left-[30%] text-slate-100 font-display text-[160px] font-bold select-none leading-none pointer-events-none" aria-hidden>9</span>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full mb-8 border" style={{ background: C.primaryLt, borderColor: C.primaryBdr, color: C.primaryTxt }}>
              <Heart className="w-4 h-4 fill-current" />
              {t("soulmates.hero.badge")}
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] text-slate-900 mb-6">
              {t("soulmates.hero.title1")}
              <br />
              <AccentText>{t("soulmates.hero.title2")}</AccentText>
            </h1>

            <p className="text-lg text-slate-600 mb-3 leading-relaxed max-w-lg">
              {t("soulmates.hero.subtitle1")}
            </p>
            <p className="text-base text-slate-400 mb-10 max-w-md">
              {t("soulmates.hero.subtitle2")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <PrimaryBtn to="/auth?mode=signup" large>
                {t("soulmates.hero.cta")} <ArrowRight className="w-5 h-5" />
              </PrimaryBtn>
              <OutlineBtn href="#come-funziona" large>
                {t("soulmates.hero.howItWorks")} <ChevronDown className="w-4 h-4" />
              </OutlineBtn>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
              {[
                { icon: Check, text: t("soulmates.hero.trust1") },
                { icon: Check, text: t("soulmates.hero.trust2") },
                { icon: Check, text: t("soulmates.hero.trust3") },
                { icon: Shield, text: t("soulmates.hero.trust4") },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-green-500" />{text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: compatibility card */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl shadow-2xl border p-7 max-w-sm ml-auto" style={{ borderColor: C.primaryBdr, boxShadow: "0 20px 60px rgba(79,70,229,0.12)" }}>
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: C.gradAvatar }}>
                  S
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Sofia R.</p>
                  <p className="text-xs text-slate-500">Destiny Number: 7 · Personal Year: 4</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: C.primary }}>94%</p>
                  <p className="text-xs text-slate-400">{t("soulmates.solution.cardCompat")}</p>
                </div>
              </div>

              {bars.map((b) => (
                <div key={b.label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-500">{b.label}</span>
                    <span className="font-semibold text-slate-700">{b.val}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: `${b.val}%`, background: C.gradBar }} />
                  </div>
                </div>
              ))}

              <p className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400 italic text-center">
                "{t("soulmates.solution.cardInsight")}"
              </p>
            </div>

            <div className="mt-4 ml-auto mr-8 max-w-fit bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2">
              <Check className="w-3.5 h-3.5" /> {t("soulmates.hero.trust3")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Stats bar ─────────────────────────────────────────────────────────────────
const StatsBar = () => (
  <section className="py-12 border-y border-slate-100" style={{ background: C.primaryLt }}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { value: "6", label: "Compatibility dimensions" },
          { value: "100%", label: "Free to start" },
          { value: "3", label: "Steps to find your match" },
          { value: "5★", label: "User satisfaction" },
        ].map(({ value, label }) => (
          <div key={label}>
            <p className="font-display text-4xl font-bold mb-1" style={{ color: C.primary }}>{value}</p>
            <p className="text-sm text-slate-600">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pain Points ───────────────────────────────────────────────────────────────
const PainPoints = () => {
  const { t } = useTranslation();
  const items = [
    { icon: "😤", titleKey: "soulmates.pain.p1Title", descKey: "soulmates.pain.p1Desc" },
    { icon: "🎭", titleKey: "soulmates.pain.p2Title", descKey: "soulmates.pain.p2Desc" },
    { icon: "💔", titleKey: "soulmates.pain.p3Title", descKey: "soulmates.pain.p3Desc" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-semibold mb-4 border border-red-100">
            {t("soulmates.pain.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.pain.title")}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t("soulmates.pain.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {items.map((p) => (
            <div key={p.titleKey} className="bg-white rounded-2xl p-7 border border-red-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-display text-lg font-bold text-slate-800 mb-2">{t(p.titleKey)}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{t(p.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 text-center">
          <p className="font-display text-xl font-bold text-slate-900 mb-2">{t("soulmates.pain.resultLabel")}</p>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">{t("soulmates.pain.resultDesc")}</p>
        </div>
      </div>
    </section>
  );
};

// ── Solution ──────────────────────────────────────────────────────────────────
const Solution = () => {
  const { t } = useTranslation();
  const dimensions = [
    { titleKey: "soulmates.solution.d1Title", descKey: "soulmates.solution.d1Desc" },
    { titleKey: "soulmates.solution.d2Title", descKey: "soulmates.solution.d2Desc" },
    { titleKey: "soulmates.solution.d3Title", descKey: "soulmates.solution.d3Desc" },
    { titleKey: "soulmates.solution.d4Title", descKey: "soulmates.solution.d4Desc" },
    { titleKey: "soulmates.solution.d5Title", descKey: "soulmates.solution.d5Desc" },
    { titleKey: "soulmates.solution.d6Title", descKey: "soulmates.solution.d6Desc" },
  ];
  const bars = [
    { label: "Destiny", val: 100 },
    { label: "Soul", val: 100 },
    { label: "Personality", val: 75 },
    { label: "Personal Year", val: 100 },
    { label: "Karma", val: 100 },
    { label: "Expression", val: 75 },
  ];
  return (
    <section className="py-24" id="come-funziona" style={{ background: C.primaryLt }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border" style={{ background: "white", borderColor: C.primaryBdr, color: C.primaryTxt }}>
            {t("soulmates.solution.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.solution.title")} <AccentText>{t("soulmates.solution.titleGold")}</AccentText>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">{t("soulmates.solution.subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-3">
            {dimensions.map((d, i) => (
              <div key={d.titleKey} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all" style={{ ["--hover-border" as string]: C.primaryBdr }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm" style={{ background: C.gradAvatar }}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{t(d.titleKey)}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{t(d.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-6 shadow-xl" style={{ borderColor: C.primaryBdr, boxShadow: "0 12px 40px rgba(79,70,229,0.10)" }}>
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: C.gradAvatar }}>S</div>
              <div>
                <p className="font-semibold text-slate-900">Sofia R.</p>
                <p className="text-xs text-slate-500">Destiny Number: 7 · Personal Year: 4</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold" style={{ color: C.primary }}>94%</p>
                <p className="text-xs text-slate-400">{t("soulmates.solution.cardCompat")}</p>
              </div>
            </div>
            {bars.map((b) => (
              <div key={b.label} className="mb-2.5">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">{b.label}</span>
                  <span className="font-semibold text-slate-700">{b.val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${b.val}%`, background: C.gradBar }} />
                </div>
              </div>
            ))}
            <p className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-400 italic text-center">
              "{t("soulmates.solution.cardInsight")}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── How it works ──────────────────────────────────────────────────────────────
const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    { step: "01", icon: Map, titleKey: "soulmates.howItWorks.s1Title", descKey: "soulmates.howItWorks.s1Desc" },
    { step: "02", icon: Heart, titleKey: "soulmates.howItWorks.s2Title", descKey: "soulmates.howItWorks.s2Desc" },
    { step: "03", icon: MessageCircle, titleKey: "soulmates.howItWorks.s3Title", descKey: "soulmates.howItWorks.s3Desc" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.howItWorks.title")} <AccentText>{t("soulmates.howItWorks.titleGold")}</AccentText>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px border-t-2 border-dashed" style={{ borderColor: C.primaryBdr }} />
          {steps.map((s) => (
            <div key={s.step} className="text-center relative z-10">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg" style={{ background: C.gradIcon, boxShadow: `0 8px 24px rgba(79,70,229,0.12)` }}>
                  <s.icon className="w-8 h-8" style={{ color: C.primary }} />
                </div>
                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shadow" style={{ background: C.primary }}>
                  {s.step}
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 mb-3">{t(s.titleKey)}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{t(s.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <PrimaryBtn to="/auth?mode=signup" large>
            {t("soulmates.hero.cta")} <ArrowRight className="w-5 h-5" />
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
};

// ── Services ──────────────────────────────────────────────────────────────────
const Services = () => {
  const { t } = useTranslation();
  const services = [
    { icon: Map, titleKey: "soulmates.services.s1", descKey: "soulmates.services.s1Desc", badgeKey: null as string | null },
    { icon: Heart, titleKey: "soulmates.services.s2", descKey: "soulmates.services.s2Desc", badgeKey: "soulmates.services.s2Badge" },
    { icon: MessageCircle, titleKey: "soulmates.services.s3", descKey: "soulmates.services.s3Desc", badgeKey: null },
    { icon: Calendar, titleKey: "soulmates.services.s4", descKey: "soulmates.services.s4Desc", badgeKey: null },
    { icon: Compass, titleKey: "soulmates.services.s5", descKey: "soulmates.services.s5Desc", badgeKey: null },
    { icon: Users, titleKey: "soulmates.services.s6", descKey: "soulmates.services.s6Desc", badgeKey: null },
    { icon: Target, titleKey: "soulmates.services.s7", descKey: "soulmates.services.s7Desc", badgeKey: null },
    { icon: Home, titleKey: "soulmates.services.s8", descKey: "soulmates.services.s8Desc", badgeKey: null },
    { icon: Star, titleKey: "soulmates.services.s9", descKey: "soulmates.services.s9Desc", badgeKey: null },
    { icon: Users, titleKey: "soulmates.services.s10", descKey: "soulmates.services.s10Desc", badgeKey: null },
  ];
  return (
    <section className="py-24" style={{ background: C.primaryLt }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white text-slate-600 text-sm font-semibold mb-4 border border-slate-200 shadow-sm">
            {t("soulmates.services.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.services.title")} <AccentText>{t("soulmates.services.titleGold")}</AccentText>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t("soulmates.services.subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((s) => (
            <div key={s.titleKey} className="group relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default" style={{ ["--hover-border" as string]: C.primaryBdr }}>
              {s.badgeKey && (
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full border" style={{ background: C.primaryLt, color: C.primaryTxt, borderColor: C.primaryBdr }}>
                  {t(s.badgeKey)}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: C.gradIcon }}>
                <s.icon className="w-5 h-5" style={{ color: C.primary }} />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 mb-1.5 group-hover:transition-colors" style={{ ["--hover-color" as string]: C.primaryTxt }}>
                {t(s.titleKey)}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Daily Experience ──────────────────────────────────────────────────────────
const DailyExperience = () => {
  const { t } = useTranslation();
  const features = [
    { icon: Sun, titleKey: "soulmates.daily.f1Title", descKey: "soulmates.daily.f1Desc" },
    { icon: Shirt, titleKey: "soulmates.daily.f2Title", descKey: "soulmates.daily.f2Desc" },
    { icon: TrendingUp, titleKey: "soulmates.daily.f3Title", descKey: "soulmates.daily.f3Desc" },
    { icon: MessageCircle, titleKey: "soulmates.daily.f4Title", descKey: "soulmates.daily.f4Desc" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border" style={{ background: C.primaryLt, borderColor: C.primaryBdr, color: C.primaryTxt }}>
            {t("soulmates.daily.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.daily.title")} <AccentText>{t("soulmates.daily.titleGold")}</AccentText>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t("soulmates.daily.subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.titleKey} className="rounded-2xl p-5 border text-center transition-all" style={{ background: C.primaryLt, borderColor: C.primaryBdr }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: C.primaryLt2 }}>
                    <f.icon className="w-5 h-5" style={{ color: C.primary }} />
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-800 mb-1.5">{t(f.titleKey)}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{t(f.descKey)}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border p-5 flex items-start gap-4" style={{ background: C.primaryLt, borderColor: C.primaryBdr }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: C.gradBtn }}>
                <Download className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-slate-800 mb-1">{t("soulmates.daily.downloadTitle")}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{t("soulmates.daily.downloadDesc")}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            {[outfit3, outfit1, outfit2, outfit0].map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm group hover:shadow-md transition-shadow">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={img} alt={t("soulmates.daily.outfitAlt", { num: i + 1 })} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => {
  const { t } = useTranslation();
  const stats = [
    { icon: BookOpen, labelKey: "soulmates.about.stat1Label", valueKey: "soulmates.about.stat1Val" },
    { icon: Award, labelKey: "soulmates.about.stat2Label", valueKey: "soulmates.about.stat2Val" },
    { icon: Users, labelKey: "soulmates.about.stat3Label", valueKey: "soulmates.about.stat3Val" },
  ];
  return (
    <section className="py-24" style={{ background: C.primaryLt }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.about.title")} <AccentText>{t("soulmates.about.titleGold")}</AccentText>
          </h2>
        </div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-8 items-start">
          <div className="rounded-2xl overflow-hidden border-2 shadow-xl" style={{ borderColor: C.primaryBdr, boxShadow: `0 16px 48px rgba(79,70,229,0.12)` }}>
            <img src={founderPhoto} alt={t("soulmates.about.imgAlt")} className="w-full h-auto object-cover" loading="lazy" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 md:p-9 space-y-5">
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">{t("soulmates.about.p1")}</p>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">{t("soulmates.about.p2")}</p>
            <p className="text-slate-700 leading-relaxed text-sm md:text-base">{t("soulmates.about.p3")}</p>
            <div className="grid grid-cols-3 gap-4 pt-5 border-t border-slate-100">
              {stats.map((s) => (
                <div key={s.labelKey} className="text-center">
                  <s.icon className="w-5 h-5 mx-auto mb-2" style={{ color: C.primary }} />
                  <p className="text-sm font-bold text-slate-900">{t(s.valueKey)}</p>
                  <p className="text-xs text-slate-500">{t(s.labelKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ── Comparison ────────────────────────────────────────────────────────────────
const Comparison = () => {
  const { t } = useTranslation();
  const rows = [
    ["soulmates.comparison.r1", "soulmates.comparison.r1Bad", "soulmates.comparison.r1Good"],
    ["soulmates.comparison.r2", "soulmates.comparison.r2Bad", "soulmates.comparison.r2Good"],
    ["soulmates.comparison.r3", "soulmates.comparison.r3Bad", "soulmates.comparison.r3Good"],
    ["soulmates.comparison.r4", "soulmates.comparison.r4Bad", "soulmates.comparison.r4Good"],
    ["soulmates.comparison.r5", "soulmates.comparison.r5Bad", "soulmates.comparison.r5Good"],
    ["soulmates.comparison.r6", "soulmates.comparison.r6Bad", "soulmates.comparison.r6Good"],
    ["soulmates.comparison.r7", "soulmates.comparison.r7Bad", "soulmates.comparison.r7Good"],
    ["soulmates.comparison.r8", "soulmates.comparison.r8Bad", "soulmates.comparison.r8Good"],
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.comparison.title")} <AccentText>{t("soulmates.comparison.titleGold")}</AccentText>
          </h2>
        </div>

        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
          <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
            <div className="p-4 text-sm font-semibold text-slate-500">{t("soulmates.comparison.colFeature")}</div>
            <div className="p-4 text-sm font-semibold text-center text-slate-500 border-x border-slate-200">{t("soulmates.comparison.colDating")}</div>
            <div className="p-4 text-sm font-semibold text-center border-l-2" style={{ borderLeftColor: C.primary, background: C.primaryLt, color: C.primaryTxt }}>
              {t("soulmates.comparison.colUs")}
            </div>
          </div>
          {rows.map(([featKey, badKey, goodKey], i) => (
            <div key={featKey} className={`grid grid-cols-3 border-b border-slate-100 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}>
              <div className="p-4 text-sm font-medium text-slate-700">{t(featKey)}</div>
              <div className="p-4 text-sm text-slate-400 text-center border-x border-slate-100 flex items-center justify-center gap-1.5">
                <XIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />{t(badKey)}
              </div>
              <div className="p-4 text-sm text-center flex items-center justify-center gap-1.5 border-l-2" style={{ borderLeftColor: C.primary, background: i % 2 === 0 ? C.primaryLt : "#E8EDFB", color: C.primaryDk2 }}>
                <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />{t(goodKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = [
    { nameKey: "soulmates.testimonials.t1Name", textKey: "soulmates.testimonials.t1Text", numLabelKey: "soulmates.testimonials.t1NumLabel", num: "7" },
    { nameKey: "soulmates.testimonials.t2Name", textKey: "soulmates.testimonials.t2Text", numLabelKey: "soulmates.testimonials.t2NumLabel", num: "3" },
    { nameKey: "soulmates.testimonials.t3Name", textKey: "soulmates.testimonials.t3Text", numLabelKey: "soulmates.testimonials.t3NumLabel", num: "9" },
  ];
  return (
    <section className="py-24" style={{ background: C.primaryLt }}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.testimonials.title")}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tm) => (
            <div key={tm.nameKey} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm flex flex-col hover:shadow-md transition-shadow">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-5 italic">"{t(tm.textKey)}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: C.gradAvatar }}>
                  {tm.num}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{t(tm.nameKey)}</p>
                  <p className="text-xs text-slate-400">{t(tm.numLabelKey)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FaqItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-indigo-200">
      <button className="w-full text-left px-6 py-5 flex items-start justify-between gap-4" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="font-display text-sm font-semibold text-slate-800 leading-snug">{question}</span>
        <ChevronDown className="w-4 h-4 shrink-0 mt-0.5 text-slate-400 transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: open ? C.primary : undefined }} />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => {
  const { t } = useTranslation();
  const faqs = [
    { qKey: "soulmates.faq.q1", aKey: "soulmates.faq.a1" },
    { qKey: "soulmates.faq.q2", aKey: "soulmates.faq.a2" },
    { qKey: "soulmates.faq.q3", aKey: "soulmates.faq.a3" },
    { qKey: "soulmates.faq.q4", aKey: "soulmates.faq.a4" },
    { qKey: "soulmates.faq.q5", aKey: "soulmates.faq.a5" },
    { qKey: "soulmates.faq.q6", aKey: "soulmates.faq.a6" },
    { qKey: "soulmates.faq.q7", aKey: "soulmates.faq.a7" },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border" style={{ background: C.primaryLt, borderColor: C.primaryBdr, color: C.primaryTxt }}>
            {t("soulmates.faq.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t("soulmates.faq.title")} <AccentText>{t("soulmates.faq.titleGold")}</AccentText>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} question={t(faq.qKey)} answer={t(faq.aKey)} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="py-28 relative overflow-hidden" style={{ background: C.gradDark }}>
      <span className="absolute top-8 left-[8%] text-white/5 font-display text-[200px] font-bold select-none leading-none pointer-events-none" aria-hidden>∞</span>
      <span className="absolute bottom-8 right-[8%] text-white/5 font-display text-[180px] font-bold select-none leading-none pointer-events-none" aria-hidden>♥</span>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle, #818CF8 0%, transparent 70%)" }} />

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center gap-2 border text-sm font-semibold px-5 py-2 rounded-full mb-8" style={{ background: "rgba(99,102,241,0.2)", borderColor: "rgba(129,140,248,0.4)", color: "#A5B4FC" }}>
          <Sparkles className="w-4 h-4" />
          {t("soulmates.cta.badge")}
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {t("soulmates.cta.title")}
          <br />
          <span style={{ backgroundImage: "linear-gradient(135deg, #93C5FD, #818CF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("soulmates.cta.titleGold")}
          </span>
        </h2>

        <p className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color: "#94A3B8" }}>
          {t("soulmates.cta.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <PrimaryBtn to="/auth?mode=signup" large>
            {t("soulmates.cta.primary")} <ArrowRight className="w-5 h-5" />
          </PrimaryBtn>
          <Link to="/auth" className="inline-flex items-center justify-center gap-2 font-semibold text-base px-8 py-4 rounded-2xl transition-all border min-w-[180px]" style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.15)", color: "white" }}>
            {t("soulmates.cta.secondary")}
          </Link>
        </div>

        <p className="mt-6 text-xs" style={{ color: "#64748B" }}>{t("soulmates.cta.note")}</p>
      </div>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white border-t border-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: C.gradBtn }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-sm font-bold text-slate-900">NumerologicalDestiny</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <Link to="/privacy" className="hover:text-slate-900 transition-colors">{t("soulmates.footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-slate-900 transition-colors">{t("soulmates.footer.terms")}</Link>
            <Link to="/community" className="hover:text-slate-900 transition-colors">{t("soulmates.footer.community")}</Link>
            <Link to="/auth" className="hover:text-slate-900 transition-colors">{t("soulmates.footer.signIn")}</Link>
          </div>
          <p className="text-xs text-slate-400">© 2026 NumerologicalDestiny</p>
        </div>
      </div>
    </footer>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const LandingPageClean = () => (
  <div className="min-h-screen bg-white overflow-x-hidden">
    <SEOHead />
    <Nav />
    <Hero />
    <StatsBar />
    <PainPoints />
    <Solution />
    <HowItWorks />
    <Services />
    <DailyExperience />
    <About />
    <Comparison />
    <Testimonials />
    <FAQ />
    <FinalCTA />
    <Footer />
  </div>
);

export default LandingPageClean;

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowRight, Heart, Sparkles, Star, Map, MessageCircle, Calendar,
  Users, Compass, Target, Home, LogIn, Check, X as XIcon,
  Shield, ChevronDown, Sun, Shirt, TrendingUp, Download, BookOpen, Award,
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
    {
      "@type": "Question",
      name: "Is it really accurate?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pythagorean numerology is a millenary system of self-knowledge. Our users are constantly surprised by the precision of the analyses. We invite you to try it for free and judge for yourself.",
      },
    },
    {
      "@type": "Question",
      name: "How does Soulmate compatibility work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We calculate 6 key numbers from your birth date (Destiny, Soul, Personality, Karma, Expression, Personal Year) and compare them with those of other users. The result is a real compatibility score, not a swipe algorithm.",
      },
    },
    {
      "@type": "Question",
      name: "Are the profiles real people?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All profiles are real users registered on the platform. During the Beta phase there are also some demonstration profiles, clearly indicated, to show you how compatibility works before the community grows.",
      },
    },
    {
      "@type": "Question",
      name: "Is it free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can start for free without entering payment details. The first analysis and the basic Soulmates section are completely free. Premium content is unlocked with a subscription.",
      },
    },
    {
      "@type": "Question",
      name: "Is my data secure?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We use advanced encryption and never share your data with third parties. Data is protected under European GDPR regulations.",
      },
    },
    {
      "@type": "Question",
      name: "How is it different from horoscopes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Horoscopes are generic and based only on the zodiac sign. Pythagorean numerology uses your exact birth date to calculate unique and personal numbers. The analysis is tailored, not valid for millions of people born in the same month.",
      },
    },
    {
      "@type": "Question",
      name: "Can I delete my account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Of course. No strings attached. You can delete your account and all data at any time from your profile settings.",
      },
    },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NumerologicalDestiny",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  founder: {
    "@type": "Person",
    name: "Renato R.",
    description:
      "Scholar of Pythagorean numerology, quantum physics and computer science. Creator of NumerologicalDestiny.",
  },
  description:
    "Pythagorean numerology and numerological dating platform. Compatibility calculated across 6 dimensions from date of birth.",
  sameAs: [],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "NumerologicalDestiny – Find Your Soulmate",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: PAGE_URL,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Free plan available without credit card",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "3",
    bestRating: "5",
    worstRating: "1",
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Martina C." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "I had spent two years on Tinder without a serious relationship. Here in three weeks I found someone I can talk to for hours. The 91% compatibility does not lie.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Andrea P." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "I did not believe in numerology. Then I saw my map and realized it perfectly described what I was looking for in a relationship. Incredible.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Giulia M." },
      reviewRating: { "@type": "Rating", ratingValue: "5" },
      reviewBody:
        "The Soulmates section opened my eyes to who I am and what I am really looking for. It is not just about dating — it is about knowing yourself.",
    },
  ],
};

const SEOHead = () => (
  <Helmet>
    <title>{PAGE_TITLE}</title>
    <meta name="description" content={PAGE_DESCRIPTION} />
    <meta name="keywords" content="soulmate, Pythagorean numerology, numerological compatibility, find love, numerological dating, numerology map, destiny number, couple compatibility" />
    <link rel="canonical" href={PAGE_URL} />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={PAGE_URL} />
    <meta property="og:title" content={PAGE_TITLE} />
    <meta property="og:description" content={PAGE_DESCRIPTION} />
    <meta property="og:image" content={OG_IMAGE} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:site_name" content="NumerologicalDestiny" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={PAGE_TITLE} />
    <meta name="twitter:description" content={PAGE_DESCRIPTION} />
    <meta name="twitter:image" content={OG_IMAGE} />

    <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
    <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
  </Helmet>
);

// ── Nav ─────────────────────────────────────────────────────────────────────
const Nav = () => {
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-base font-semibold">NumerologicalDestiny</span>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher size="sm" className="hidden sm:flex" />
          <Button variant="ghost" size="sm" asChild className="hidden sm:flex gap-2 text-foreground/80 hover:text-primary">
            <Link to="/community"><Users className="w-4 h-4" />Community</Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="gap-2 border-primary/30 hover:bg-primary/10">
            <Link to="/auth"><LogIn className="w-4 h-4" />{t("soulmates.nav.signIn")}</Link>
          </Button>
          <Button variant="cosmic" size="sm" asChild className="gap-1.5">
            <Link to="/auth?mode=signup">{t("soulmates.nav.startFree")} <ArrowRight className="w-3.5 h-3.5" /></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-cosmic" />
      <div className="absolute inset-0 numerology-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="absolute top-24 left-[8%] text-primary/10 font-display text-9xl font-bold select-none">7</div>
      <div className="absolute top-44 right-[12%] text-rose-400/10 font-display text-8xl font-bold select-none">11</div>
      <div className="absolute bottom-28 left-[18%] text-primary/10 font-display text-[120px] font-bold select-none">2</div>
      <div className="absolute bottom-36 right-[22%] text-accent/10 font-display text-7xl font-bold select-none">9</div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 mb-8">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span className="text-sm text-rose-400 font-medium">{t("soulmates.hero.badge")}</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1]">
          <span className="text-foreground">{t("soulmates.hero.title1")}</span>
          <br />
          <span className="block mt-3 text-gradient-gold">{t("soulmates.hero.title2")}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
          {t("soulmates.hero.subtitle1")}
        </p>
        <p className="text-base text-muted-foreground/70 max-w-xl mx-auto mb-10">
          {t("soulmates.hero.subtitle2")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-12">
          <Button variant="cosmic" size="xl" asChild className="group min-w-[220px]">
            <Link to="/auth?mode=signup">
              {t("soulmates.hero.cta")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild className="border-border/50 hover:border-primary/40 min-w-[180px]">
            <a href="#come-funziona">{t("soulmates.hero.howItWorks")} <ChevronDown className="w-4 h-4 ml-1" /></a>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground/70">
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" />{t("soulmates.hero.trust1")}</span>
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" />{t("soulmates.hero.trust2")}</span>
          <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" />{t("soulmates.hero.trust3")}</span>
          <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-green-500" />{t("soulmates.hero.trust4")}</span>
        </div>
      </div>
    </section>
  );
};

// ── Pain points ───────────────────────────────────────────────────────────────
const PainPoints = () => {
  const { t } = useTranslation();
  const items = [
    { icon: "😤", titleKey: "soulmates.pain.p1Title", descKey: "soulmates.pain.p1Desc" },
    { icon: "🎭", titleKey: "soulmates.pain.p2Title", descKey: "soulmates.pain.p2Desc" },
    { icon: "💔", titleKey: "soulmates.pain.p3Title", descKey: "soulmates.pain.p3Desc" },
  ];
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-red-950/5 to-background" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-medium mb-4 border border-red-500/20">
            {t("soulmates.pain.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.pain.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("soulmates.pain.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((p) => (
            <div key={p.titleKey} className="group p-6 rounded-2xl border border-red-500/15 bg-red-950/10 hover:border-red-500/30 transition-all">
              <div className="text-4xl mb-4">{p.icon}</div>
              <h3 className="font-display text-lg font-bold mb-2 text-foreground">{t(p.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(p.descKey)}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl border border-border/50 bg-muted/20 text-center">
          <p className="text-lg font-semibold mb-1">{t("soulmates.pain.resultLabel")}</p>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            {t("soulmates.pain.resultDesc")}
          </p>
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
    <section className="py-24 relative" id="come-funziona">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            {t("soulmates.solution.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.solution.title")} <span className="text-gradient-gold">{t("soulmates.solution.titleGold")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("soulmates.solution.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            {dimensions.map((d, i) => (
              <div key={d.titleKey} className="flex items-start gap-3 p-4 rounded-xl border border-border/40 bg-card/50 hover:border-primary/30 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0 text-primary-foreground font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t(d.titleKey)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(d.descKey)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-cosmic rounded-2xl p-6 border border-primary/20 shadow-cosmic">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-primary flex items-center justify-center text-white font-bold text-lg">S</div>
              <div>
                <p className="font-semibold">Sofia R.</p>
                <p className="text-xs text-muted-foreground">Destiny Number: 7 · Personal Year: 4</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold text-primary">94%</p>
                <p className="text-xs text-muted-foreground">{t("soulmates.solution.cardCompat")}</p>
              </div>
            </div>

            {bars.map((b) => (
              <div key={b.label} className="mb-2">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{b.label}</span>
                  <span className="font-medium">{b.val}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/40">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" style={{ width: `${b.val}%` }} />
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center italic">
                "{t("soulmates.solution.cardInsight")}"
              </p>
            </div>
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
    <section className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.howItWorks.title")} <span className="text-gradient-gold">{t("soulmates.howItWorks.titleGold")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[22%] right-[22%] h-px border-t border-dashed border-primary/30" />
          {steps.map((s) => (
            <div key={s.step} className="text-center relative z-10">
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20 flex items-center justify-center">
                <s.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">{s.step}</div>
              <h3 className="font-display text-lg font-bold mb-2">{t(s.titleKey)}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{t(s.descKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Services ──────────────────────────────────────────────────────────────────
const Services = () => {
  const { t } = useTranslation();
  const services = [
    { icon: Map, titleKey: "soulmates.services.s1", descKey: "soulmates.services.s1Desc", badge: null },
    { icon: Heart, titleKey: "soulmates.services.s2", descKey: "soulmates.services.s2Desc", badgeKey: "soulmates.services.s2Badge" },
    { icon: MessageCircle, titleKey: "soulmates.services.s3", descKey: "soulmates.services.s3Desc", badge: null },
    { icon: Calendar, titleKey: "soulmates.services.s4", descKey: "soulmates.services.s4Desc", badge: null },
    { icon: Compass, titleKey: "soulmates.services.s5", descKey: "soulmates.services.s5Desc", badge: null },
    { icon: Users, titleKey: "soulmates.services.s6", descKey: "soulmates.services.s6Desc", badge: null },
    { icon: Target, titleKey: "soulmates.services.s7", descKey: "soulmates.services.s7Desc", badge: null },
    { icon: Home, titleKey: "soulmates.services.s8", descKey: "soulmates.services.s8Desc", badge: null },
    { icon: Star, titleKey: "soulmates.services.s9", descKey: "soulmates.services.s9Desc", badge: null },
    { icon: Users, titleKey: "soulmates.services.s10", descKey: "soulmates.services.s10Desc", badge: null },
  ];

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary-foreground text-sm font-medium mb-4 border border-border/50">
            {t("soulmates.services.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.services.title")} <span className="text-gradient-gold">{t("soulmates.services.titleGold")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("soulmates.services.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((s) => (
            <div key={s.titleKey} className="group relative p-5 rounded-2xl border border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-cosmic transition-all duration-300">
              {s.badgeKey && (
                <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {t(s.badgeKey)}
                </span>
              )}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-3">
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-bold mb-1.5">{t(s.titleKey)}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{t(s.descKey)}</p>
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            {t("soulmates.daily.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.daily.title")} <span className="text-gradient-gold">{t("soulmates.daily.titleGold")}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("soulmates.daily.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.titleKey} className="p-5 rounded-2xl border border-border/30 bg-card/30 text-center">
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-display text-sm font-bold mb-1.5">{t(f.titleKey)}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Download className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold mb-1">{t("soulmates.daily.downloadTitle")}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("soulmates.daily.downloadDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto lg:mx-0 lg:ml-auto">
            {[outfit3, outfit1, outfit2, outfit0].map((img, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-border/30 bg-card/30 group">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={img}
                    alt={t("soulmates.daily.outfitAlt", { num: i + 1 })}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
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
    <section className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.about.title")} <span className="text-gradient-gold">{t("soulmates.about.titleGold")}</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-8 items-start">
          <div className="rounded-2xl border-2 border-primary/30 overflow-hidden shadow-xl shadow-primary/10">
            <img src={founderPhoto} alt={t("soulmates.about.imgAlt")} className="w-full h-auto object-cover" loading="lazy" />
          </div>

          <div
            className="space-y-5 rounded-2xl bg-card/80 border-2 border-primary/20 p-6 md:p-8 shadow-2xl shadow-primary/5"
            style={{ background: "linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--primary) / 0.08) 50%, hsl(var(--card)) 100%)" }}
          >
            <p className="text-foreground leading-relaxed text-sm md:text-base">{t("soulmates.about.p1")}</p>
            <p className="text-foreground leading-relaxed text-sm md:text-base">{t("soulmates.about.p2")}</p>
            <p className="text-foreground leading-relaxed text-sm md:text-base">{t("soulmates.about.p3")}</p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary/20">
              {stats.map((s) => (
                <div key={s.labelKey} className="text-center">
                  <s.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
                  <p className="text-sm font-bold">{t(s.valueKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(s.labelKey)}</p>
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
    <section className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.comparison.title")} <span className="text-gradient-gold">{t("soulmates.comparison.titleGold")}</span>
          </h2>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-cosmic">
          <div className="grid grid-cols-3 bg-muted/30">
            <div className="p-4 text-sm font-semibold text-muted-foreground">{t("soulmates.comparison.colFeature")}</div>
            <div className="p-4 text-sm font-semibold text-center text-muted-foreground border-x border-border/30">{t("soulmates.comparison.colDating")}</div>
            <div className="p-4 text-sm font-semibold text-center text-primary border border-primary/20 bg-primary/5">{t("soulmates.comparison.colUs")}</div>
          </div>

          {rows.map(([featKey, badKey, goodKey], i) => (
            <div key={featKey} className={`grid grid-cols-3 border-t border-border/30 ${i % 2 === 0 ? "bg-background" : "bg-muted/10"}`}>
              <div className="p-4 text-sm font-medium">{t(featKey)}</div>
              <div className="p-4 text-sm text-muted-foreground text-center border-x border-border/30 flex items-center justify-center gap-1.5">
                <XIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />{t(badKey)}
              </div>
              <div className="p-4 text-sm text-center bg-primary/3 flex items-center justify-center gap-1.5">
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
    { nameKey: "soulmates.testimonials.t1Name", textKey: "soulmates.testimonials.t1Text", numLabelKey: "soulmates.testimonials.t1NumLabel", num: "7", stars: 5 },
    { nameKey: "soulmates.testimonials.t2Name", textKey: "soulmates.testimonials.t2Text", numLabelKey: "soulmates.testimonials.t2NumLabel", num: "3", stars: 5 },
    { nameKey: "soulmates.testimonials.t3Name", textKey: "soulmates.testimonials.t3Text", numLabelKey: "soulmates.testimonials.t3NumLabel", num: "9", stars: 5 },
  ];
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.testimonials.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t2) => (
            <div key={t2.nameKey} className="glass-cosmic rounded-2xl p-6 border border-primary/15 flex flex-col">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t2.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4 italic">"{t(t2.textKey)}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {t2.num}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t(t2.nameKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(t2.numLabelKey)}</p>
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
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
            {t("soulmates.faq.label")}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t("soulmates.faq.title")} <span className="text-gradient-gold">{t("soulmates.faq.titleGold")}</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border/50 bg-card/50 px-6 overflow-hidden">
              <AccordionTrigger className="text-left font-display text-sm font-semibold py-5 hover:no-underline hover:text-primary transition-colors">
                {t(faq.qKey)}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                {t(faq.aKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// ── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCTA = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-cosmic" />
      <div className="absolute inset-0 numerology-pattern opacity-30" />
      <div className="absolute top-8 left-[10%] text-primary/10 font-display text-9xl font-bold select-none">∞</div>
      <div className="absolute bottom-8 right-[10%] text-accent/10 font-display text-8xl font-bold select-none">♥</div>

      <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/20 border border-primary/30 mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">{t("soulmates.cta.badge")}</span>
        </div>

        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {t("soulmates.cta.title")}<br />
          <span className="text-gradient-gold">{t("soulmates.cta.titleGold")}</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          {t("soulmates.cta.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="cosmic" size="xl" asChild className="group min-w-[260px] text-base">
            <Link to="/auth?mode=signup">
              {t("soulmates.cta.primary")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild className="border-border/50 hover:border-primary/40 min-w-[180px]">
            <Link to="/auth">{t("soulmates.cta.secondary")}</Link>
          </Button>
        </div>

        <p className="mt-6 text-xs text-muted-foreground/60">
          {t("soulmates.cta.note")}
        </p>
      </div>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border/30 py-10 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span className="font-display text-sm font-semibold">NumerologicalDestiny</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t("soulmates.footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">{t("soulmates.footer.terms")}</Link>
            <Link to="/community" className="hover:text-foreground transition-colors">{t("soulmates.footer.community")}</Link>
            <Link to="/auth" className="hover:text-foreground transition-colors">{t("soulmates.footer.signIn")}</Link>
          </div>
          <p className="text-xs text-muted-foreground/50">© 2026 NumerologicalDestiny</p>
        </div>
      </div>
    </footer>
  );
};

// ── Page ──────────────────────────────────────────────────────────────────────
const SoulmatesLanding = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <SEOHead />
    <Nav />
    <Hero />
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

export default SoulmatesLanding;

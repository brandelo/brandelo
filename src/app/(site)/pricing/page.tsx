"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";

/* ─────────────────── Types & Data ─────────────────── */
type Rates = Record<string, number>;

const CATEGORIES = [
  { key: "seo",     label: "SEO" },
  { key: "smm",     label: "Social Media" },
  { key: "web",     label: "Web Dev" },
  { key: "ads",     label: "Paid Ads" },
  { key: "content", label: "Content" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

type Tier = {
  name: string;
  price: number;
  badge?: string;
  highlight?: boolean;
  features: string[];
};

type Section = { key: CategoryKey; label: string; desc: string; tiers: Tier[] };

const SECTIONS: Section[] = [
  {
    key: "seo", label: "Search Engine Optimisation",
    desc: "Rank higher, get found faster. Long-term organic growth with full transparency.",
    tiers: [
      { name: "Starter",  price: 7999,  badge: "Local brands",    features: ["1–3 Keywords", "Site Health Audit", "Meta & Alt Optimization", "Google My Business Setup", "Monthly Report"] },
      { name: "Growth",   price: 14999, badge: "Most popular", highlight: true, features: ["5–10 Keywords", "Technical SEO Fixes", "On-page Optimization", "Backlink Outreach (8/mo)", "Bi-weekly Report"] },
      { name: "Scale",    price: 24999, badge: "Competitive",     features: ["15–25 Keywords", "Content Strategy", "Schema + Internal Links", "Backlink Outreach (20/mo)", "Weekly Report"] },
      { name: "Elite",    price: 39999, badge: "Aggressive",      features: ["30+ Keywords", "Full Tech SEO + Speed", "Content + Link Building", "Digital PR", "Dedicated Manager"] },
    ],
  },
  {
    key: "smm", label: "Social Media Marketing",
    desc: "Build a community that converts. Consistent, creative content done for you.",
    tiers: [
      { name: "Starter",  price: 8999,  features: ["8 Posts / mo", "2 Reels / mo", "Hashtag Research", "Calendar & Scheduling", "Monthly Report"] },
      { name: "Growth",   price: 14999, badge: "Most popular", highlight: true, features: ["12 Posts / mo", "4 Reels / mo", "Copies & Captions", "Community Management", "Bi-weekly Report"] },
      { name: "Scale",    price: 22999, features: ["16 Posts / mo", "6 Reels / mo", "Paid Boost Strategy", "UGC Guidance", "Weekly Insights"] },
      { name: "Elite",    price: 32999, features: ["22 Posts / mo", "8 Reels / mo", "Influencer Collabs", "Shoot Direction", "Dedicated Manager"] },
    ],
  },
  {
    key: "web", label: "Web Development",
    desc: "Fast, modern websites that convert. Built with Next.js and delivered on time.",
    tiers: [
      { name: "Landing",    price: 14999, badge: "5–7 day delivery", features: ["1–3 Pages", "Responsive UI", "SEO Ready", "Basic Animations", "Delivery in 5–7 days"] },
      { name: "Business",   price: 34999, badge: "Most popular", highlight: true, features: ["Up to 8 Pages", "CMS (Blog)", "Contact & Lead Forms", "Speed Optimized", "Analytics Setup"] },
      { name: "E-commerce", price: 69999, features: ["Product Catalog", "Payments + Cart", "Coupons & Wishlist", "Order Emails", "Training + Docs"] },
      { name: "Custom App", price: 119999, features: ["Next.js / React", "API Integrations", "Auth & Roles", "Deploy & CI/CD", "3 Months Support"] },
    ],
  },
  {
    key: "ads", label: "Paid Ads",
    desc: "Every rupee tracked. ROI-first campaigns on Google, Meta, and beyond.",
    tiers: [
      { name: "Starter", price: 8999,  features: ["Budget ≤ ₹30k", "Google / Meta", "Pixel & Conversion Setup", "2 Campaigns", "Monthly Report"] },
      { name: "Growth",  price: 14999, badge: "Most popular", highlight: true, features: ["Budget ≤ ₹75k", "Funnel & Audiences", "A/B Creative Testing", "Remarketing", "Bi-weekly Report"] },
      { name: "Scale",   price: 23999, features: ["Budget ≤ ₹150k", "Full-funnel Strategy", "Advanced Bidding", "Custom Dashboards", "Weekly Sync"] },
      { name: "Elite",   price: 34999, features: ["Budget > ₹150k", "Multi-channel", "Creative Studio Support", "Marketing Mix Modeling", "Dedicated Manager"] },
    ],
  },
  {
    key: "content", label: "Content + On-page SEO",
    desc: "Authority-building content that ranks, educates, and converts.",
    tiers: [
      { name: "Starter", price: 6999,  features: ["2 Blogs / mo", "Topic & Outline", "On-page Optimization", "Internal Linking", "Indexing"] },
      { name: "Growth",  price: 11999, badge: "Most popular", highlight: true, features: ["4 Blogs / mo", "Keyword Clusters", "Content Briefs", "Image SEO", "Bi-weekly Report"] },
      { name: "Scale",   price: 18999, features: ["8 Blogs / mo", "Long-form + Guides", "Content Upgrades", "Schema Markup", "Weekly Insights"] },
    ],
  },
];

/* ─────────────────── Currency helpers ─────────────────── */
function localeGuess() { return typeof navigator !== "undefined" ? navigator.language : "en-IN"; }
function currencyFromLocale(loc: string) {
  const map: Record<string, string> = { IN: "INR", US: "USD", GB: "GBP", DE: "EUR", FR: "EUR", AE: "AED", AU: "AUD", CA: "CAD", SG: "SGD" };
  return map[loc.split("-")[1]?.toUpperCase() ?? ""] ?? "INR";
}
async function fetchRates(): Promise<Rates> {
  try { const r = await fetch("/api/rates", { cache: "force-cache" }); return (await r.json())?.rates ?? { INR: 1 }; }
  catch { return { INR: 1 }; }
}
function fmt(amtINR: number, cur: string, loc: string, rates: Rates) {
  const amount = amtINR * (rates[cur] ?? 1);
  try { return new Intl.NumberFormat(loc, { style: "currency", currency: cur, maximumFractionDigits: 0 }).format(amount); }
  catch { return `${cur} ${Math.round(amount).toLocaleString()}`; }
}

/* ─────────────────── Animations ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: EASE, delay },
});

/* ─────────────────── Scrolling Marquee ─────────────────── */
function Marquee() {
  const chunk = "Transparent Pricing  ·  No Hidden Fees  ·  Real Results  ·  ";
  const row = chunk.repeat(8);
  return (
    <div className="overflow-hidden bg-[#0b0b0b] py-5 select-none">
      <motion.div className="flex whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>
        {[row, row].map((r, i) => (
          <span key={i} className="text-[clamp(16px,2.2vw,28px)] font-black uppercase tracking-tight pr-8 text-white/60">{r}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────── Pricing Card ─────────────────── */
function PriceCard({ tier, sectionKey, delay, loaded, locale, currency, rates, reduce }: {
  tier: Tier; sectionKey: string; delay: number;
  loaded: boolean; locale: string; currency: string; rates: Rates; reduce: boolean | null;
}) {
  const displayPrice = useMemo(() => fmt(tier.price, currency, locale, rates), [tier.price, currency, locale, rates]);
  const fallback = useMemo(() => {
    try { return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(tier.price); }
    catch { return `₹${tier.price.toLocaleString("en-IN")}`; }
  }, [tier.price]);

  return (
    <motion.article
      {...fadeUp(reduce ? 0 : delay)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`relative flex flex-col rounded-3xl border p-7 h-full transition-shadow ${
        tier.highlight
          ? "bg-[#0b0b0b] border-transparent text-white shadow-2xl shadow-black/20"
          : "bg-white border-black/8 text-[#0e0e0e] shadow-sm hover:shadow-md"
      }`}
    >
      {/* Badge */}
      {tier.badge && (
        <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap shadow-sm ${
          tier.highlight ? "bg-white text-[#0b0b0b]" : "bg-[#0b0b0b] text-white"
        }`}>
          {tier.highlight && <Sparkles className="h-3 w-3" />}
          {tier.badge}
        </div>
      )}

      {/* Plan name */}
      <p className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-3 ${tier.highlight ? "text-white/40" : "text-black/35"}`}>
        {tier.name}
      </p>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-current/[0.08]">
        <div className="flex items-end gap-1.5 leading-none">
          <span className="text-[clamp(28px,4vw,40px)] font-black tracking-tight">
            {loaded ? displayPrice : fallback}
          </span>
          <span className={`text-xs mb-1 ${tier.highlight ? "text-white/40" : "text-black/35"}`}>/month</span>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <div className={`mt-0.5 flex-shrink-0 h-4.5 w-4.5 rounded-full grid place-items-center ${
              tier.highlight ? "bg-white/15" : "bg-black/6"
            }`}>
              <Check className={`h-2.5 w-2.5 ${tier.highlight ? "text-white" : "text-black/60"}`} />
            </div>
            <span className={tier.highlight ? "text-white/75" : "text-black/65"}>{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/contact?service=${sectionKey}&plan=${tier.name}`}
        className={`group w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold px-5 py-3 transition-all ${
          tier.highlight
            ? "bg-white text-[#0b0b0b] hover:bg-white/90 shadow-lg shadow-white/10"
            : "bg-[#0b0b0b] text-white hover:bg-black/80"
        }`}
      >
        Get started
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>
      <p className={`mt-3 text-center text-[11px] ${tier.highlight ? "text-white/30" : "text-black/30"}`}>
        No hidden fees · Cancel anytime
      </p>
    </motion.article>
  );
}

/* ─────────────────── Page ─────────────────── */
export default function PricingPage() {
  const [active, setActive] = useState<CategoryKey>("seo");
  const reduce = useReducedMotion();

  const [locale, setLocale] = useState("en-IN");
  const [currency, setCurrency] = useState("INR");
  const [rates, setRates] = useState<Rates>({ INR: 1 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loc = localeGuess();
    setLocale(loc);
    setCurrency(currencyFromLocale(loc));
    fetchRates().then((r) => { setRates(r); setLoaded(true); });
  }, []);

  const activeSection = SECTIONS.find((s) => s.key === active)!;

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0e0e0e]">

      {/* ── Dark Hero ── */}
      <section className="relative bg-[#0b0b0b] overflow-hidden">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[350px] rounded-full bg-indigo-600/12 blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[280px] rounded-full bg-emerald-600/12 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur mb-8">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Pricing Plans</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="text-[clamp(40px,7vw,88px)] font-black leading-[0.95] tracking-tight text-white max-w-4xl mx-auto">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent italic">
              pricing.
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-7 text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
            No hidden fees, no locked contracts. Pick a plan that fits your goals — upgrade or cancel anytime.
          </motion.p>
        </div>

        {/* Marquee inside hero */}
        <Marquee />
      </section>

      {/* ── Category Switcher ── */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`relative flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#0b0b0b] text-white shadow-sm"
                      : "text-black/50 hover:text-black/80 hover:bg-black/5"
                  }`}
                >
                  {isActive && (
                    <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-[#0b0b0b]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }} />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Section ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <AnimatedSection section={activeSection} loaded={loaded} locale={locale} currency={currency} rates={rates} reduce={reduce} />
      </section>

      {/* ── Custom plan CTA ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <motion.div {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl bg-[#0b0b0b] text-white p-10 sm:p-14 text-center">
          {/* orbs */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/4 w-80 h-48 rounded-full bg-indigo-600/15 blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-40 rounded-full bg-emerald-600/15 blur-[70px]" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Custom plans
            </div>
            <h2 className="text-[clamp(28px,5vw,52px)] font-black leading-tight tracking-tight mb-4">
              Need something tailored<br />
              <span className="italic text-white/40">just for you?</span>
            </h2>
            <p className="text-white/45 text-base max-w-lg mx-auto leading-relaxed mb-10">
              Tell us your goals and we&apos;ll build a custom package across SEO, content, ads, and web — so you only pay for exactly what you need.
            </p>
            <Link href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white text-[#0b0b0b] text-sm font-bold px-8 py-4 hover:bg-white/90 transition-all shadow-lg shadow-white/10">
              Talk to an expert
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ─── Animated section wrapper (re-mounts on category change) ─── */
function AnimatedSection({ section, loaded, locale, currency, rates, reduce }: {
  section: Section; loaded: boolean; locale: string; currency: string; rates: Rates; reduce: boolean | null;
}) {
  return (
    <motion.div
      key={section.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Section header */}
      <div className="mb-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-3">
          {section.label}
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-3">
          {section.label} Plans
        </h2>
        <p className="text-base text-black/50 max-w-md mx-auto">{section.desc}</p>
      </div>

      {/* Cards */}
      <div className={`grid gap-6 ${section.tiers.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
        {section.tiers.map((tier, i) => (
          <PriceCard
            key={tier.name} tier={tier} sectionKey={section.key}
            delay={i * 0.07} loaded={loaded} locale={locale}
            currency={currency} rates={rates} reduce={reduce}
          />
        ))}
      </div>
    </motion.div>
  );
}

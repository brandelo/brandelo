"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/* ─────────────────── Types & Data ─────────────────── */
type Rates = Record<string, number>;

const CATEGORIES = [
  { key: "seo",       label: "SEO" },
  { key: "ecommerce", label: "Ecommerce SEO" },
  { key: "smm",       label: "Social Media" },
  { key: "web",       label: "Web Dev" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

type Tier = {
  name: string;
  price: number;
  badge?: string;
  highlight?: boolean;
  features: string[];
  details?: Record<string, string | boolean | number>;
};

type Section = { key: CategoryKey; label: string; desc: string; tiers: Tier[] };

const SECTIONS: Section[] = [
  {
    key: "seo", label: "Search Engine Optimisation",
    desc: "Rank higher and get found faster with data-driven organic growth strategies.",
    tiers: [
      { 
        name: "Basic", price: 600, badge: "Startup", 
        features: ["30 Keywords", "120 Backlinks / mo", "Site Analysis", "Google Indexing", "1 Blog Content / mo"],
        details: {
          "Keywords": 30, "Backlinks": 120, "GBP (GMB)": false, "Geotagging": false,
          "Pre-Optimization Analysis": true, "Competitor Analysis": true, "Keyword Research": true, "Google Penalty Check": true,
          "Title Tag Optimization": true, "META Tags Optimization": true, "Content Optimization": true, "Robots.txt Creation": true, "Google XML Sitemap": true,
          "Search Engine Submission": 10, "Article Writing": 1, "Article Posting": 1, "Social Bookmarking": 30, "Monthly Analytics Report": true,
        }
      },
      { 
        name: "Standard", price: 900, badge: "Growing Business", highlight: true, 
        features: ["40 Keywords", "210 Backlinks / mo", "GBP Optimization", "4 Facebook Posts / mo", "2 Blog Contents / mo"],
        details: {
          "Keywords": 40, "Backlinks": 210, "GBP (GMB)": true, "Geotagging": false,
          "Pre-Optimization Analysis": true, "Competitor Analysis": true, "Keyword Research": true, "Google Penalty Check": true,
          "Title Tag Optimization": true, "META Tags Optimization": true, "Content Optimization": true, "Robots.txt Creation": true, "Google XML Sitemap": true,
          "Search Engine Submission": 20, "Article Writing": 2, "Article Posting": 2, "Social Bookmarking": 40, "Monthly Analytics Report": true,
        }
      },
      { 
        name: "Professional", price: 1250, badge: "Enterprise", 
        features: ["50 Keywords", "300 Backlinks / mo", "Geotagging & Schema", "8 Instagram Posts / mo", "3 Blog Contents / mo"],
        details: {
          "Keywords": 50, "Backlinks": 300, "GBP (GMB)": true, "Geotagging": true,
          "Pre-Optimization Analysis": true, "Competitor Analysis": true, "Keyword Research": true, "Google Penalty Check": true,
          "Title Tag Optimization": true, "META Tags Optimization": true, "Content Optimization": true, "Robots.txt Creation": true, "Google XML Sitemap": true,
          "Search Engine Submission": 30, "Article Writing": 3, "Article Posting": 3, "Social Bookmarking": 50, "Monthly Analytics Report": true,
        }
      },
      { 
        name: "Enterprise", price: 2000, badge: "Aggressive", 
        features: ["100 Keywords", "600 Backlinks / mo", "Full Site Architecture", "16 App Posts / mo", "6 Blog Contents / mo"],
        details: {
          "Keywords": 100, "Backlinks": 600, "GBP (GMB)": true, "Geotagging": true,
          "Pre-Optimization Analysis": true, "Competitor Analysis": true, "Keyword Research": true, "Google Penalty Check": true,
          "Title Tag Optimization": true, "META Tags Optimization": true, "Content Optimization": true, "Robots.txt Creation": true, "Google XML Sitemap": true,
          "Search Engine Submission": 40, "Article Writing": 6, "Article Posting": 6, "Social Bookmarking": 80, "Monthly Analytics Report": true,
        }
      },
    ],
  },
  {
    key: "ecommerce", label: "Ecommerce SEO",
    desc: "Drive massive sales through targeted online research and product optimization.",
    tiers: [
      { 
        name: "BASIC", price: 499, badge: "Start Selling", 
        features: ["50 Keywords", "70 Backlinks / mo", "Shopping Cart Analysis", "Product Image SEO", "150 Service Hours"],
        details: {
          "Keywords": 50, "Monthly Hours": 150, "Backlinks": 70, "Website Analysis": true, "Competition Analysis": true, "Keyword Research": true,
          "Product Markup (Schema)": true, "Rich Snippets Optimization": true, "Page Speed Analysis": true, "Heading Tags Optimization": true,
          "Guest Blogging": 2, "Search Engine Submissions": 3, "Social Bookmarking Links": 20, "Facebook Profile Promotion": 10,
        }
      },
      { 
        name: "STANDARD", price: 1099, badge: "Scale Up", highlight: true, 
        features: ["100 Keywords", "120 Backlinks / mo", "Funnel Recommendations", "Remarketing Setup", "170 Service Hours"],
        details: {
          "Keywords": 100, "Monthly Hours": 170, "Backlinks": 120, "Website Analysis": true, "Competition Analysis": true, "Keyword Research": true,
          "Product Markup (Schema)": true, "Rich Snippets Optimization": true, "Page Speed Analysis": true, "Heading Tags Optimization": true,
          "Guest Blogging": 5, "Search Engine Submissions": 5, "Social Bookmarking Links": 40, "Facebook Profile Promotion": 15,
        }
      },
      { 
        name: "PROFESSIONAL", price: 2099, badge: "Market Leader", 
        features: ["200 Keywords", "200 Backlinks / mo", "Product Description Writing", "Email Automation", "200 Service Hours"],
        details: {
          "Keywords": 200, "Monthly Hours": 200, "Backlinks": 200, "Website Analysis": true, "Competition Analysis": true, "Keyword Research": true,
          "Product Markup (Schema)": true, "Rich Snippets Optimization": true, "Page Speed Analysis": true, "Heading Tags Optimization": true,
          "Guest Blogging": 10, "Search Engine Submissions": 10, "Social Bookmarking Links": 100, "Facebook Profile Promotion": 25,
        }
      },
      { 
        name: "ENTERPRISE", price: 3599, badge: "World Class", 
        features: ["500 Keywords", "400 Backlinks / mo", "Amazon/eBay Store Setup", "Google News Listing", "250 Service Hours"],
        details: {
          "Keywords": 500, "Monthly Hours": 250, "Backlinks": 400, "Website Analysis": true, "Competition Analysis": true, "Keyword Research": true,
          "Product Markup (Schema)": true, "Rich Snippets Optimization": true, "Page Speed Analysis": true, "Heading Tags Optimization": true,
          "Guest Blogging": 20, "Search Engine Submissions": 25, "Social Bookmarking Links": 210, "Facebook Profile Promotion": 60,
        }
      },
    ],
  },
  {
    key: "smm", label: "Social Media Marketing",
    desc: "Build a community with creative content and strategic trust-building tactics.",
    tiers: [
      { 
        name: "Basic", price: 99, 
        features: ["5 Unique Designs", "5 Posts across platforms", "Profile Optimization", "15 Service Hours"],
        details: {
          "No. of Hours": 15, "Monthly creative creation": 5, "Monthly postings": 5, "Strategy formation": true, "Hashtag creation": true, "Account Management": true,
          "Paid Promotion Setup": false, "Remarketing / Funnel": false, "Monthly report with insights": true,
        }
      },
      { 
        name: "Standard", price: 199, badge: "Popular", highlight: true, 
        features: ["8 Unique Designs", "8 Posts across platforms", "Community Engagement", "40 Service Hours"],
        details: {
          "No. of Hours": 40, "Monthly creative creation": 8, "Monthly postings": 8, "Strategy formation": true, "Hashtag creation": true, "Account Management": true,
          "Paid Promotion Setup": true, "Remarketing / Funnel": false, "Monthly report with insights": true,
        }
      },
      { 
        name: "Professional", price: 299, 
        features: ["12 Unique Designs", "12 Posts across platforms", "Ad Management Setup", "60 Service Hours"],
        details: {
          "No. of Hours": 60, "Monthly creative creation": 12, "Monthly postings": 12, "Strategy formation": true, "Hashtag creation": true, "Account Management": true,
          "Paid Promotion Setup": true, "Remarketing / Funnel": true, "Monthly report with insights": true,
        }
      },
    ],
  },
  {
    key: "web", label: "Web Development",
    desc: "Fast, modern, and mobile-friendly websites designed for maximum user experience.",
    tiers: [
      { 
        name: "BASIC", price: 850, 
        features: ["1-3 Page Responsive", "Standard UI", "5 Hours Maintenance", "Hosted Emails: 25"],
        details: {
          "Design Iterations": 1, "Layered Sliders": true, "Responsive Site": true, "Web Hosting": true, "Hosted Emails": 25, "Maintenance work": "5 hrs/mo",
          "CMS (WordPress/Joomla)": true, "Search Engine Friendly": true, "Social Logins": false, "Added Site Security": false,
        }
      },
      { 
        name: "STANDARD", price: 1650, badge: "Scale Up", highlight: true, 
        features: ["Up to 8 Page Responsive", "Custom Design", "Shopping Cart", "10 Hours Maintenance"],
        details: {
          "Design Iterations": 2, "Layered Sliders": true, "Responsive Site": true, "Web Hosting": true, "Hosted Emails": 50, "Maintenance work": "10 hrs/mo",
          "CMS (Shopify/Magento)": true, "Search Engine Friendly": true, "Social Logins": true, "Added Site Security": true,
        }
      },
      { 
        name: "Professional", price: 3499, 
        features: ["Up to 15 Page Site", "Full Multi-Iteration Design", "Custom Frameworks", "25 Hours Maintenance"],
        details: {
          "Design Iterations": 4, "Layered Sliders": true, "Responsive Site": true, "Web Hosting": true, "Hosted Emails": 100, "Maintenance work": "25 hrs/mo",
          "CMS (Any Custom/Framework)": true, "Search Engine Friendly": true, "Social Logins": true, "Added Site Security": true,
        }
      },
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
function fmt(amtUSD: number, cur: string, loc: string, rates: Rates) {
  const amount = amtUSD * (rates[cur] ?? 1);
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
    try { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(tier.price); }
    catch { return `$${tier.price.toLocaleString("en-US")}`; }
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
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F7F7] grid place-items-center"><div className="w-10 h-10 border-4 border-black/10 border-t-black rounded-full animate-spin" /></div>}>
      <PricingContent />
    </Suspense>
  );
}

function PricingContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as CategoryKey | null;

  const [active, setActive] = useState<CategoryKey>("seo");
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Update active tab from URL & Scroll to section
  useEffect(() => {
    if (typeParam && CATEGORIES.some(c => c.key === typeParam)) {
      setActive(typeParam);
      // Optional: Smooth scroll to the table if from a direct link
      const table = document.getElementById("pricing-table");
      if (table) {
        window.scrollTo({ top: table.offsetTop - 120, behavior: "smooth" });
      }
    }
  }, [typeParam]);

  const activeSection = SECTIONS.find((s) => s.key === active)!;
  const activeCategory = CATEGORIES.find(c => c.key === active)!;

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
      <div id="pricing-table" className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            {/* Desktop: Pills */}
            <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = active === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActive(cat.key)}
                    className={`relative flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                      isActive
                        ? "text-white"
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

            {/* Mobile / Generic: Dropdown toggle */}
            <div className="relative md:hidden w-full">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-3 rounded-2xl bg-black/5 border border-black/5 text-sm font-extrabold text-[#0b0b0b]"
              >
                <span>{activeCategory.label} Packages</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-white border border-black/8 shadow-2xl z-50 overflow-hidden"
                  >
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.key}
                        onClick={() => { setActive(cat.key); setDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                          active === cat.key ? "bg-[#0b0b0b] text-white" : "hover:bg-black/5 text-black/60"
                        }`}
                      >
                        {cat.label} Packages
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Currency badge (optional visual) */}
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/20">
               Prices in <span className="text-black/40">{currency}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <AnimatedSection section={activeSection} loaded={loaded} locale={locale} currency={currency} rates={rates} reduce={reduce} />
      </section>

      {/* ── Comparison Table ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <ComparisonTable section={activeSection} />
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

/* ─── Comparison Table ─── */
const GROUPS: Record<string, { label: string, features: string[] }[]> = {
  seo: [
    { label: "Search Power", features: ["Keywords", "Backlinks", "GBP (GMB)", "Geotagging"] },
    { label: "Analysis", features: ["Pre-Optimization Analysis", "Competitor Analysis", "Keyword Research", "Google Penalty Check"] },
    { label: "On-Page", features: ["Title Tag Optimization", "META Tags Optimization", "Content Optimization", "Robots.txt Creation", "Google XML Sitemap"] },
    { label: "Off-Page", features: ["Search Engine Submission", "Article Writing", "Article Posting", "Social Bookmarking"] },
    { label: "Reports", features: ["Monthly Analytics Report"] },
  ],
  ecommerce: [
    { label: "Market Reach", features: ["Keywords", "Monthly Hours", "Backlinks"] },
    { label: "Analysis & SEO", features: ["Website Analysis", "Competition Analysis", "Keyword Research", "Product Markup (Schema)", "Rich Snippets Optimization", "Page Speed Analysis", "Heading Tags Optimization"] },
    { label: "Content & Links", features: ["Guest Blogging", "Search Engine Submissions", "Social Bookmarking Links", "Facebook Profile Promotion"] },
  ],
  smm: [
    { label: "Engagement", features: ["No. of Hours", "Monthly creative creation", "Monthly postings", "Strategy formation", "Hashtag creation", "Account Management"] },
    { label: "Ads & Promotion", features: ["Paid Promotion Setup", "Remarketing / Funnel"] },
    { label: "Insights", features: ["Monthly report with insights"] },
  ],
  web: [
    { label: "Design & UX", features: ["Design Iterations", "Layered Sliders", "Responsive Site"] },
    { label: "Hosting & Maintenance", features: ["Web Hosting", "Hosted Emails", "Maintenance work"] },
    { label: "Technology", features: ["CMS (WordPress/Joomla)", "CMS (Shopify/Magento)", "CMS (Any Custom/Framework)", "Search Engine Friendly", "Social Logins", "Added Site Security"] },
  ],
};

function ComparisonTable({ section }: { section: Section }) {
  const [isOpen, setIsOpen] = useState(false);
  const groups = GROUPS[section.key] || [];

  return (
    <div className="mt-12">
      <div className="text-center mb-8">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2.5 rounded-full border border-black/8 bg-white px-10 py-5 text-sm font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] group"
        >
          {isOpen ? "Close Detailed Breakdown" : "View Detailed Comparison Breakdown"}
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ArrowRight className="h-4 w-4 rotate-90 group-hover:translate-x-0.5 transition-transform" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-[2.5rem] border border-black/8 bg-white shadow-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-black/5 bg-[#fbfbfb]">
                    <th className="p-8 text-[11px] font-black uppercase tracking-[0.25em] text-black/30 w-1/3">Full Feature Audit</th>
                    {section.tiers.map((t) => (
                      <th key={t.name} className="p-8 text-center min-w-[150px]">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0b0b0b]">{t.name}</span>
                        <div className="mt-1 text-[10px] font-bold text-black/25">Plan</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  {groups.map((group) => (
                    <React.Fragment key={group.label}>
                      <tr className="bg-black/[0.02]">
                        <td colSpan={section.tiers.length + 1} className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 border-y border-black/5">
                          {group.label}
                        </td>
                      </tr>
                      {group.features.map((f) => (
                        <tr key={f} className="hover:bg-black/[0.01] transition-colors border-b border-black/[0.03] last:border-0 font-medium">
                          <td className="px-8 py-5 text-sm text-black/60">{f}</td>
                          {section.tiers.map((t) => {
                            const val = t.details?.[f];
                            return (
                              <td key={t.name} className="px-8 py-5 text-center">
                                {typeof val === "boolean" ? (
                                  <div className="flex justify-center">
                                    {val ? (
                                      <div className="h-6 w-6 rounded-full bg-emerald-500/10 grid place-items-center">
                                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                                      </div>
                                    ) : (
                                      <div className="h-6 w-6 rounded-full bg-red-500/5 grid place-items-center opacity-20">
                                        <span className="text-[10px] font-bold text-red-600">✘</span>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-sm font-black text-[#0b0b0b]">{val ?? "-"}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-10 p-10 rounded-3xl bg-[#0b0b0b] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-0 right-0 w-64 h-32 bg-indigo-500/10 blur-[60px]" />
              </div>
              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-2xl font-black tracking-tight mb-2 italic">Not sure which plan is right for you?</h4>
                <p className="text-white/40 text-sm max-w-md">Our experts will perform a FREE audit of your existing presence and recommend the most effective strategy for your budget.</p>
              </div>
              <Link href="/contact" className="relative z-10 group inline-flex items-center gap-3 rounded-full bg-white text-[#0b0b0b] text-sm font-black px-8 py-4 hover:bg-white/90 transition-all hover:scale-[1.02]">
                Get a Free Audit
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React from "react";

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

import { AnimatePresence } from "framer-motion";

"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

/* ─────────────────── Types & Data ─────────────────── */
const CATEGORIES = [
  { key: "seo", label: "SEO" },
  { key: "smm", label: "Social Media" },
  { key: "web", label: "Website Development" },
  { key: "addons", label: "Add-ons" },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

type Tier = {
  name: string;
  price: number;
  badge?: string;
  highlight?: boolean;
  isOneTime?: boolean;
  features: string[];
  details?: Record<string, string | boolean | number>;
};

type Section = {
  key: CategoryKey;
  label: string;
  desc: string;
  tiers: Tier[];
};

const SECTIONS: Section[] = [
  {
    key: "seo",
    label: "Search Engine Optimisation",
    desc: "Grow organic visibility with structured SEO campaigns, backlinks, reporting, and on-page improvements.",
    tiers: [
      {
        name: "Basic",
        price: 199,
        badge: "Starter",
        features: [
          "5 - 8 Keywords",
          "80 - 100 Backlinks",
          "Weekly Reports",
          "Off-page SEO",
        ],
        details: {
          Price: "$199.00",
          Keywords: "5 - 8 Keywords",
          Platform: "80 - 100 Backlinks (Search Engine)",
          Graphics: "Weekly Reports",
          Service: "Only Off Page No On page optimisation",
          Delivery: "List of Work will be shared etc. (Strategy decide)",
          "Freebies Provided if asked":
            "7 days - Keyword provided, Keyword Research 10 links",
          "Budget extra": "NA",
          Taxes: "NA",
        },
      },
      {
        name: "Business",
        price: 299,
        badge: "Popular",
        highlight: true,
        features: [
          "15 - 18 Keywords",
          "150 - 170 Backlinks",
          "Weekly Reports",
          "Off-page + Basic On-page",
        ],
        details: {
          Price: "$299.00",
          Keywords: "15 - 18 Keywords",
          Platform: "150 - 170 Backlinks (Search Engine)",
          Graphics: "Weekly Reports",
          Service: "Off Page + Basic On Page SEO",
          Delivery: "List of Work will be shared etc. (Strategy decide)",
          "Freebies Provided if asked":
            "7 days - Keyword provided, Keyword Research 10 links",
          "Budget extra": "NA",
          Taxes: "NA",
        },
      },
      {
        name: "Corporate",
        price: 499,
        badge: "Best Value",
        features: [
          "20 - 30 Keywords",
          "200 Backlinks",
          "Weekly Reports",
          "Off-page + Advance On-page",
        ],
        details: {
          Price: "$499.00",
          Keywords: "20 - 30 Keywords",
          Platform: "200 Backlinks (Search Engine)",
          Graphics: "Weekly Reports",
          Service: "Off Page + Advance On Page SEO",
          Delivery: "List of Work will be shared etc. (Strategy decide)",
          "Freebies Provided if asked":
            "7 days - Keyword provided, Keyword Research 10 links",
          "Budget extra": "NA",
          Taxes: "NA",
        },
      },
    ],
  },
  {
    key: "smm",
    label: "Social Media Marketing",
    desc: "Consistent posting, reels, hashtag planning, competitor analysis, and performance reporting.",
    tiers: [
      {
        name: "Basic",
        price: 150,
        badge: "Starter",
        features: [
          "5 Graphic Posts",
          "Weekly Reports",
          "Hashtag Research",
          "Content Marketing",
        ],
        details: {
          Price: "$150.00",
          "Graphics For SMM": "5 Graphic Post",
          Reports: "Weekly Reports",
          Service: "Hashtags Research + Content Marketing",
          Delivery: "List of Work will be shared etc. (Strategy decide)",
          Freebies: "7 days - 1 graphic Posting",
          "Budget extra": "NA",
          Taxes: "NA",
        },
      },
      {
        name: "Business",
        price: 199,
        badge: "Popular",
        highlight: true,
        features: [
          "8 Graphic Posts + 1 Reel",
          "Weekly Reports",
          "Competitors Analysis",
          "Optimizations",
        ],
        details: {
          Price: "$199.00",
          "Graphics For SMM": "8 Graphic Post + 1 Reel",
          Reports: "Weekly Reports",
          Service:
            "Hashtags Research + Content Marketing + Competitors Analysis + Optimizations",
          Delivery: "List of Work will be shared etc. (Strategy decide)",
          Freebies: "7 days - 1 graphic Posting",
          "Budget extra": "NA",
          Taxes: "NA",
        },
      },
      {
        name: "Corporate",
        price: 299,
        badge: "Advanced",
        features: [
          "16 Graphic Posts + 2 Reels",
          "Weekly Reports",
          "Advanced Optimization",
          "Ad Specific Posts",
        ],
        details: {
          Price: "$299.00",
          "Graphics For SMM": "16 Graphic Post + 2 Reels",
          Reports: "Weekly Reports",
          Service:
            "Hashtags Research + Content Marketing + Competitors Analysis + Optimizations + Ad Specific Posts",
          Delivery: "List of Work will be shared etc. (Strategy decide)",
          Freebies: "7 days - 1 graphic Posting",
          "Budget extra": "NA",
          Taxes: "NA",
        },
      },
    ],
  },
  {
    key: "web",
    label: "Website Development",
    desc: "Business websites, ecommerce stores, and modern frontend builds with fixed USD pricing.",
    tiers: [
      {
        name: "WordPress / Shopify",
        price: 650,
        badge: "Most Chosen",
        features: [
          "WordPress",
          "15 Days Estimated Time",
          "5 Pages + Basic SEO",
          "Domain & Hosting Extra",
        ],
        details: {
          Price: "$650",
          Platform: "Wordpress",
          Timeline: "15 Days Estimated Time",
          Scope: "Wordpress Website +5 Pages + Basic SEO On Page",
          Requirement: "Domain + Hosting additional required",
          Hosting: "Extra For Domain and Hosting",
          Extra: "Extra Applicable",
        },
      },
      {
        name: "HTML / PHP / Magento",
        price: 1000,
        badge: "Business",
        highlight: true,
        features: [
          "HTML / PHP",
          "15 Days Estimated Time",
          "5 Pages + Basic SEO",
          "Hosting Worth $5K Included",
        ],
        details: {
          Price: "$1000",
          Platform: "HTML/PHP",
          Timeline: "15 Days Estimated Time",
          Scope: "5 Pages + Basic SEO On Page",
          Requirement: "Domain + Hosting additional required",
          Hosting: "Domain and Hosting Included Worth 5 thousand",
          Extra: "Extra Applicable",
        },
      },
      {
        name: "React.js",
        price: 1750,
        badge: "Premium",
        features: [
          "WordPress / Shopify / Wix",
          "15 Days Estimated Time",
          "10 Products + 5 Pages + Admin",
          "Hosting Worth $5K Included",
        ],
        details: {
          Price: "$1750",
          Platform: "Wordpress OR Shopify Or Wix",
          Timeline: "15 Days Estimated Time",
          Scope: "10 Product Included +5 Pages+ Admin Panel",
          Requirement: "Domain + Hosting additional required",
          Hosting: "Domain and Hosting Included Worth 5 thousand",
          Extra: "Extra Applicable",
        },
      },
    ],
  },
  {
    key: "addons",
    label: "Add-ons",
    desc: "One-time setup and research services priced in USD only.",
    tiers: [
      {
        name: "Set Up SMM Fees",
        price: 99,
        badge: "One-Time",
        highlight: true,
        isOneTime: true,
        features: [
          "Initial SMM Setup",
          "One-time Service",
          "USD Fixed Price",
          "No Auto Currency Change",
        ],
        details: {
          Price: "$99.00",
          Type: "Set Up SMM Fees",
          Billing: "One-time",
        },
      },
      {
        name: "Keyword Research",
        price: 99,
        badge: "One-Time",
        isOneTime: true,
        features: [
          "Keyword Research",
          "Planning Support",
          "Search Targeting",
          "One-time Service",
        ],
        details: {
          Price: "$99.00",
          Type: "Keyword Research",
          Billing: "One-time",
        },
      },
    ],
  },
];

/* ─────────────────── Helpers ─────────────────── */
function formatUSD(amount: number) {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `$${amount}`;
  }
}

/* ─────────────────── Animations ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: EASE, delay },
});

/* ─────────────────── Marquee ─────────────────── */
function Marquee() {
  const chunk = "USD Pricing  ·  Fixed Currency  ·  No Auto Conversion  ·  ";
  const row = chunk.repeat(8);

  return (
    <div className="overflow-hidden bg-[#0b0b0b] py-5 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {[row, row].map((r, i) => (
          <span
            key={i}
            className="text-[clamp(16px,2.2vw,28px)] font-black uppercase tracking-tight pr-8 text-white/60"
          >
            {r}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────────── Pricing Card ─────────────────── */
function PriceCard({
  tier,
  sectionKey,
  delay,
  reduce,
}: {
  tier: Tier;
  sectionKey: string;
  delay: number;
  reduce: boolean | null;
}) {
  const displayPrice = formatUSD(tier.price);

  return (
    <motion.article
      {...fadeUp(reduce ? 0 : delay)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className={`relative flex flex-col rounded-3xl border p-7 h-full transition-shadow ${tier.highlight
          ? "bg-[#0b0b0b] border-transparent text-white shadow-2xl shadow-black/20"
          : "bg-white border-black/8 text-[#0e0e0e] shadow-sm hover:shadow-md"
        }`}
    >
      {tier.badge && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] whitespace-nowrap shadow-sm ${tier.highlight ? "bg-white text-[#0b0b0b]" : "bg-[#0b0b0b] text-white"
            }`}
        >
          {tier.highlight && <Sparkles className="h-3 w-3" />}
          {tier.badge}
        </div>
      )}

      <p
        className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-3 ${tier.highlight ? "text-white/40" : "text-black/35"
          }`}
      >
        {tier.name}
      </p>

      <div className="mb-6 pb-6 border-b border-current/[0.08]">
        <div className="flex items-end gap-1.5 leading-none">
          <span className="text-[clamp(28px,4vw,40px)] font-black tracking-tight">
            {displayPrice}
          </span>
          <span
            className={`text-xs mb-1 ${tier.highlight ? "text-white/40" : "text-black/35"
              }`}
          >
            {tier.isOneTime ? "/one-time" : "/month"}
          </span>
        </div>
      </div>

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <div
              className={`mt-0.5 flex-shrink-0 h-4.5 w-4.5 rounded-full grid place-items-center ${tier.highlight ? "bg-white/15" : "bg-black/6"
                }`}
            >
              <Check
                className={`h-2.5 w-2.5 ${tier.highlight ? "text-white" : "text-black/60"
                  }`}
              />
            </div>
            <span className={tier.highlight ? "text-white/75" : "text-black/65"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={`/contact?service=${sectionKey}&plan=${encodeURIComponent(tier.name)}`}
        className={`group w-full inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold px-5 py-3 transition-all ${tier.highlight
            ? "bg-white text-[#0b0b0b] hover:bg-white/90 shadow-lg shadow-white/10"
            : "bg-[#0b0b0b] text-white hover:bg-black/80"
          }`}
      >
        Get started
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      <p
        className={`mt-3 text-center text-[11px] ${tier.highlight ? "text-white/30" : "text-black/30"
          }`}
      >
        USD pricing only · No hidden conversion
      </p>
    </motion.article>
  );
}

/* ─────────────────── Main Page ─────────────────── */
export default function PricingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F7F7F7] grid place-items-center">
          <div className="w-10 h-10 border-4 border-black/10 border-t-black rounded-full animate-spin" />
        </div>
      }
    >
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

  useEffect(() => {
    if (typeParam && CATEGORIES.some((c) => c.key === typeParam)) {
      setActive(typeParam);
      const table = document.getElementById("pricing-table");
      if (table) {
        window.scrollTo({ top: table.offsetTop - 120, behavior: "smooth" });
      }
    }
  }, [typeParam]);

  const activeSection = SECTIONS.find((s) => s.key === active)!;
  const activeCategory = CATEGORIES.find((c) => c.key === active)!;

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-[#0e0e0e]">
      <section className="relative bg-[#0b0b0b] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[500px] h-[350px] rounded-full bg-indigo-600/12 blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-[400px] h-[280px] rounded-full bg-emerald-600/12 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur mb-8"
          >
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Pricing Plans
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="text-[clamp(40px,7vw,88px)] font-black leading-[0.95] tracking-tight text-white max-w-4xl mx-auto"
          >
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent italic">
              USD pricing.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-7 text-lg text-white/40 max-w-xl mx-auto leading-relaxed"
          >
            All pricing is fixed in US Dollars only. No automatic currency switching and no region-based price changes.
          </motion.p>
        </div>

        <Marquee />
      </section>

      <div
        id="pricing-table"
        className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/8 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px]">
            <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = active === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActive(cat.key)}
                    className={`relative flex-shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-all ${isActive
                        ? "text-white"
                        : "text-black/50 hover:text-black/80 hover:bg-black/5"
                      }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="pill"
                        className="absolute inset-0 rounded-full bg-[#0b0b0b]"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative md:hidden w-full">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-3 rounded-2xl bg-black/5 border border-black/5 text-sm font-extrabold text-[#0b0b0b]"
              >
                <span>{activeCategory.label} Packages</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""
                    }`}
                />
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
                        onClick={() => {
                          setActive(cat.key);
                          setDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${active === cat.key
                            ? "bg-[#0b0b0b] text-white"
                            : "hover:bg-black/5 text-black/60"
                          }`}
                      >
                        {cat.label} Packages
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/20">
              Prices in <span className="text-black/50">USD ($)</span>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <AnimatedSection section={activeSection} reduce={reduce} />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <ComparisonTable section={activeSection} />
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl bg-[#0b0b0b] text-white p-10 sm:p-14 text-center"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-1/4 w-80 h-48 rounded-full bg-indigo-600/15 blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-40 rounded-full bg-emerald-600/15 blur-[70px]" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/40 mb-6">
              <Sparkles className="h-3.5 w-3.5" /> Custom plans
            </div>

            <h2 className="text-[clamp(28px,5vw,52px)] font-black leading-tight tracking-tight mb-4">
              Need something tailored
              <br />
              <span className="italic text-white/40">for your business?</span>
            </h2>

            <p className="text-white/45 text-base max-w-lg mx-auto leading-relaxed mb-10">
              Tell us your goals and we&apos;ll create a custom plan in USD with no auto currency conversion.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white text-[#0b0b0b] text-sm font-bold px-8 py-4 hover:bg-white/90 transition-all shadow-lg shadow-white/10"
            >
              Talk to an expert
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ─────────────────── Comparison Table ─────────────────── */
const GROUPS: Record<string, { label: string; features: string[] }[]> = {
  seo: [
    { label: "Pricing", features: ["Price"] },
    { label: "Campaign", features: ["Keywords", "Platform", "Graphics", "Service"] },
    {
      label: "Execution",
      features: ["Delivery", "Freebies Provided if asked", "Budget extra", "Taxes"],
    },
  ],
  smm: [
    { label: "Pricing", features: ["Price"] },
    { label: "Creative", features: ["Graphics For SMM", "Reports", "Service"] },
    { label: "Execution", features: ["Delivery", "Freebies", "Budget extra", "Taxes"] },
  ],
  web: [
    { label: "Pricing", features: ["Price"] },
    { label: "Build", features: ["Platform", "Timeline", "Scope"] },
    { label: "Hosting", features: ["Requirement", "Hosting", "Extra"] },
  ],
  addons: [{ label: "Add-ons", features: ["Price", "Type", "Billing"] }],
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
                    <th className="p-8 text-[11px] font-black uppercase tracking-[0.25em] text-black/30 w-1/3">
                      Full Feature Audit
                    </th>
                    {section.tiers.map((t) => (
                      <th key={t.name} className="p-8 text-center min-w-[150px]">
                        <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#0b0b0b]">
                          {t.name}
                        </span>
                        <div className="mt-1 text-[10px] font-bold text-black/25">Plan</div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {groups.map((group) => (
                    <React.Fragment key={group.label}>
                      <tr className="bg-black/[0.02]">
                        <td
                          colSpan={section.tiers.length + 1}
                          className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 border-y border-black/5"
                        >
                          {group.label}
                        </td>
                      </tr>

                      {group.features.map((f) => (
                        <tr
                          key={f}
                          className="hover:bg-black/[0.01] transition-colors border-b border-black/[0.03] last:border-0 font-medium"
                        >
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
                                  <span className="text-sm font-black text-[#0b0b0b]">
                                    {val ?? "-"}
                                  </span>
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-10 rounded-3xl bg-[#0b0b0b] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-32 bg-indigo-500/10 blur-[60px]" />
              </div>

              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-2xl font-black tracking-tight mb-2 italic">
                  Not sure which plan is right for you?
                </h4>
                <p className="text-white/40 text-sm max-w-md">
                  Our team can suggest the right package based on your business type, budget, and goals.
                </p>
              </div>

              <Link
                href="/contact"
                className="relative z-10 group inline-flex items-center gap-3 rounded-full bg-white text-[#0b0b0b] text-sm font-black px-8 py-4 hover:bg-white/90 transition-all hover:scale-[1.02]"
              >
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

function AnimatedSection({
  section,
  reduce,
}: {
  section: Section;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      key={section.key}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-12 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-3">
          {section.label}
        </p>
        <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-3">
          {section.label} Plans
        </h2>
        <p className="text-base text-black/50 max-w-md mx-auto">{section.desc}</p>
      </div>

      <div
        className={`grid gap-6 ${section.tiers.length === 2
            ? "sm:grid-cols-2 max-w-3xl mx-auto"
            : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
      >
        {section.tiers.map((tier, i) => (
          <PriceCard
            key={tier.name}
            tier={tier}
            sectionKey={section.key}
            delay={i * 0.07}
            reduce={reduce}
          />
        ))}
      </div>
    </motion.div>
  );
}
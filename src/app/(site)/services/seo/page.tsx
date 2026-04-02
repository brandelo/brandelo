"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp, Search, Globe, Link as LinkIcon, BadgeCheck,
  Sparkles, ArrowRight, ChevronRight, Plus, Minus,
  MousePointerClick, BarChart3, LineChart,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: d, ease: EASE },
});

const SERVICES = [
  {
    icon: Search,
    title: "Local SEO Mastery",
    desc: "Dominating local search results to drive foot traffic and high-intent leads specifically for your geographic locations.",
    bullets: ["Google Business Profile", "Local map rankings", "Location-specific content"],
    accent: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
  {
    icon: Globe,
    title: "Technical SEO Audits",
    desc: "In-depth infrastructure analysis to ensure search engines can crawl, index, and rank your content without technical friction.",
    bullets: ["Site speed optimization", "Core Web Vitals check", "Schema markup"],
    accent: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-400",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: LinkIcon,
    title: "On-Page & Off-Page",
    desc: "Strategic keyword mapping and authority building through high-quality backlinks and content optimization.",
    bullets: ["Keyword research", "Quality backlink building", "Meta tag structure"],
    accent: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-400",
    border: "hover:border-blue-500/40",
  },
  {
    icon: BarChart3,
    title: "ROI-Focused Tracking",
    desc: "Continuous monitoring of ranking data and conversion metrics to ensure your SEO investment translates to measurable growth.",
    bullets: ["Weekly performance reports", "Conversion tracking", "Keyword ROI analysis"],
    accent: "from-indigo-500/20 to-indigo-500/0",
    iconColor: "text-indigo-400",
    border: "hover:border-indigo-500/40",
  },
];

const PROCESS = [
  { num: "01", icon: Search, title: "Audit", desc: "A comprehensive deep-dive into your current SEO health, identifying technical bottlenecks and opportunities." },
  { num: "02", icon: MousePointerClick, title: "Strategy", desc: "Developing a tailored roadmap focusing on the most impactful keywords and content gaps." },
  { num: "03", icon: TrendingUp, title: "Execute", desc: "Technical fixes, content creation, and on-page optimizations deployed with precision." },
  { num: "04", icon: LinkIcon, title: "Authority", desc: "Outreach and link-building campaigns to establish your brand as a leader in your niche." },
  { num: "05", icon: LineChart, title: "Monitor", desc: "Weekly tracking and refinement based on real-world ranking data and traffic metrics." },
];

const RESULTS = [
  { tag: "E-commerce", metric: "+180%", label: "Organic revenue growth", color: "text-emerald-400" },
  { tag: "SaaS", metric: "Top 3", label: "Rankings for core industry terms", color: "text-cyan-400" },
  { tag: "Enterprise", metric: "−45%", label: "Cost per acquisition (SEO vs Ads)", color: "text-blue-400" },
];

const FAQS = [
  { q: "How long until I see results from SEO?", a: "SEO is a long-term strategy. While technical fixes can show impact in weeks, significant ranking moves typically take 3–6 months depending on competition." },
  { q: "Do you guarantee #1 rankings?", a: "No ethical agency guarantees #1 rankings as search algorithms change constantly. However, we guarantee best-in-class strategies that consistently deliver results." },
  { q: "What is your link building approach?", a: "We focus on high-quality, relevant placements through manual outreach and PR. We never use PBNs or 'black-hat' techniques that could risk your site." },
  { q: "Do you provide monthly reports?", a: "Yes. Every client gets a data-rich dashboard tracking rankings, traffic, conversions, and a detailed summary of our monthly impact." },
];

export default function SEOPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-emerald-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-cyan-600/8 blur-[100px]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">SEO</span>
        </motion.div>

        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-2 backdrop-blur mb-8">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">Search Engine Optimization</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl"
        >
          Dominate search results and{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
            own the market.
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          We combine technical precision, high-impact content, and authority building to rank your brand where your customers are looking. No shortcuts, just compound growth.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Audit my website <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore strategy
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "300%", label: "Avg. Traffic Lift" },
            { val: "Top 3", label: "Ranking Goal" },
            { val: "100%", label: "White-Hat Only" },
            { val: "24/7", label: "Active Monitoring" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 text-center backdrop-blur">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">{s.val}</div>
              <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">SEO Specialties</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Comprehensive <span className="text-emerald-400">SEO services.</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              {...fadeUp(i * 0.07)}
              className={`relative group rounded-3xl border border-white/8 bg-white/[0.04] p-7 sm:p-8 backdrop-blur transition-all duration-300 hover:bg-white/[0.07] ${s.border} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-5">
                  <div className={`p-3 rounded-2xl bg-white/8 border border-white/10 ${s.iconColor}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-white/70">
                      <BadgeCheck className={`h-4 w-4 flex-shrink-0 ${s.iconColor}`} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/40 group-hover:text-white/80 transition-colors">
                  Analyze my site <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Our Method</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            The road to <span className="text-cyan-400">Position 1.</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-xl">A rigorous, data-first approach that ensures your rankings compound over time.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="relative rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-cyan-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Impact</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Proof in <span className="text-blue-400">performance.</span>
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-4">
          {RESULTS.map((r, i) => (
            <motion.div key={r.tag} {...fadeUp(i * 0.07)} className="rounded-3xl border border-white/8 bg-white/[0.04] p-8 backdrop-blur">
              <div className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4">{r.tag}</div>
              <div className={`text-5xl font-black tracking-tight mb-2 ${r.color}`}>{r.metric}</div>
              <p className="text-sm text-white/55 leading-relaxed">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">SEO <span className="text-emerald-400">Q&A.</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">Transparency is key to a successful partnership. Here are the facts about SEO.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-semibold hover:bg-emerald-500/15 transition">
              Talk to an expert <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/8 bg-white/[0.04] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-white/90">{faq.q}</span>
                  {openFaq === i ? <Minus className="h-4 w-4 text-emerald-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/10 via-cyan-600/8 to-blue-600/10 p-10 sm:p-14 text-center backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(16,185,129,0.12),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Stop guessing. Start ranking.
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Get a free technical and content audit of your website. See exactly what&apos;s holding you back from Position 1.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_55px_rgba(16,185,129,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get my Free Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

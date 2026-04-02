"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Users, MessageSquare, Share2, Target, BadgeCheck,
  Sparkles, ArrowRight, ChevronRight, Plus, Minus,
  MousePointerClick, Heart, BarChart,
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
    icon: Share2,
    title: "Brand Awareness",
    desc: "Strategic social positioning to ensure your brand remains top-of-mind across major platforms like Facebook, Instagram, and LinkedIn.",
    bullets: ["Platform optimization", "Targeted reach", "Consistent brand voice"],
    accent: "from-pink-500/20 to-pink-500/0",
    iconColor: "text-pink-400",
    border: "hover:border-pink-500/40",
  },
  {
    icon: Heart,
    title: "Engagement Growth",
    desc: "Driving meaningful interactions and building a loyal community through high-impact content and trend-aligned strategies.",
    bullets: ["Organic growth", "Interactive content", "Engagement monitoring"],
    accent: "from-purple-500/20 to-purple-500/0",
    iconColor: "text-purple-400",
    border: "hover:border-purple-500/40",
  },
  {
    icon: Target,
    title: "Community Management",
    desc: "Active handling of social interactions, comments, and DMs to build trust and transform followers into brand advocates.",
    bullets: ["Comment moderation", "Direct interaction", "Audience sentiment analysis"],
    accent: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-400",
    border: "hover:border-blue-500/40",
  },
  {
    icon: MessageSquare,
    title: "Performance Reporting",
    desc: "Detailed analytics and insights into reach, engagement, and conversion metrics to refine your social strategy continuously.",
    bullets: ["Monthly growth reports", "ROI analysis", "Competitor benchmarking"],
    accent: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-400",
    border: "hover:border-orange-500/40",
  },
];

const PROCESS = [
  { num: "01", icon: Share2, title: "Listen", desc: "Understanding your current social footprint and what your audience is actually talking about." },
  { num: "02", icon: MousePointerClick, title: "Strategy", desc: "Crafting a content calendar and ad strategy that bridges the gap between brand and buyer." },
  { num: "03", icon: Sparkles, title: "Create", desc: "Production of high-quality assets that reflect your brand's unique identity and values." },
  { num: "04", icon: Target, title: "Deploy", desc: "Launching organic and paid campaigns with hyper-targeted delivery for maximum impact." },
  { num: "05", icon: BarChart, title: "Analyze", desc: "Deep-dives into engagement, reach, and conversion data to refine the next cycle." },
];

const RESULTS = [
  { tag: "Fashion Brand", metric: "+4.2×", label: "Increase in social ROI", color: "text-pink-400" },
  { tag: "B2B SaaS", metric: "15k+", label: "Targeted monthly leads via LinkedIn", color: "text-purple-400" },
  { tag: "D2C Brand", metric: "+250%", label: "Growth in organic community size", color: "text-blue-400" },
];

const FAQS = [
  { q: "Which platforms should my brand be on?", a: "It depends on where your audience hangs out. We analyze your buyer persona to recommend platforms where you'll get the highest ROI — whether that's LinkedIn for B2B or Instagram/TikTok for D2C." },
  { q: "How much ad spend should I start with?", a: "We recommend starting with a budget that allows for meaningful testing. Usually, $1k – $3k/month is a healthy starting point for Meta or LinkedIn performance campaigns." },
  { q: "Do you handle influencer marketing?", a: "Yes. We identify, vet, and manage influencer partnerships that align with your brand values and audience demographics." },
  { q: "Does SMM help with SEO?", a: "While not a direct ranking factor, social signals increase brand searches and domain visibility, which indirectly boosts your long-term SEO health." },
];

export default function SMMPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(236,72,153,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-pink-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-purple-600/8 blur-[100px]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">SMM</span>
        </motion.div>

        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-pink-500/25 bg-pink-500/10 px-4 py-2 backdrop-blur mb-8">
          <Users className="h-3.5 w-3.5 text-pink-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/80">Social Media Marketing</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl"
        >
          Build a community that{" "}
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent italic">
            lives and breathes
          </span>{" "}
          your brand.
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          Social media is the new storefront. We turn followers into fans and engagement into revenue through creative storytelling and performance-driven ad strategies.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Scale my social presence <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200"
          >
            Our strategy
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "5M+", label: "Total Reach" },
            { val: "4.5%", label: "Avg. Engagement" },
            { val: "10k+", label: "Leads Generated" },
            { val: "+300%", label: "Ad ROI" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">What We Manage</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Our social <span className="text-pink-400">services.</span>
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
                  Get a strategy consult <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Our Process</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            How we <span className="text-purple-400">engage.</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-xl">From initial listening to deep analytics — a social cadence that gets results.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="relative rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-purple-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Results</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Social <span className="text-indigo-400">metrics.</span>
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
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Social <span className="text-pink-400">Questions.</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">What it takes to build a thriving social presence in today&apos;s digital age.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-semibold hover:bg-pink-500/15 transition">
              Book a call <ArrowRight className="h-4 w-4" />
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
                  {openFaq === i ? <Minus className="h-4 w-4 text-pink-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
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
          className="relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-600/10 via-purple-600/8 to-indigo-600/10 p-10 sm:p-14 text-center backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(236,72,153,0.12),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Ready to go viral?
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Book a free social audit. We&apos;ll analyze your current content and propose a focused engagement strategy.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_55px_rgba(236,72,153,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Growing <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

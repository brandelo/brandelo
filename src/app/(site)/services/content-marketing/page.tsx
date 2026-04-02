"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FileText, PenTool, BookOpen, Video, BadgeCheck,
  Sparkles, ArrowRight, ChevronRight, Plus, Minus,
  MousePointerClick, Quote, BarChart2,
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
    icon: BookOpen,
    title: "SEO-Friendly Articles",
    desc: "Expertly crafted articles designed to rank high on search engines while providing immense value to your target audience.",
    bullets: ["Keyword-optimized copy", "Readability focus", "Internal linking strategy"],
    accent: "from-orange-500/20 to-orange-500/0",
    iconColor: "text-orange-400",
    border: "hover:border-orange-500/40",
  },
  {
    icon: PenTool,
    title: "Strategic Storytelling",
    desc: "Building a compelling brand narrative through high-quality blog posts and thought-leadership content that establishes authority.",
    bullets: ["Brand voice alignment", "Engaging narratives", "Industry authority"],
    accent: "from-amber-500/20 to-amber-500/0",
    iconColor: "text-amber-400",
    border: "hover:border-amber-500/40",
  },
  {
    icon: FileText,
    title: "Content Distribution",
    desc: "Ensuring your high-quality content reaches the right eyes through multi-channel promotion and strategic posting.",
    bullets: ["Social promotion", "Email marketing syndication", "Guest posting outreach"],
    accent: "from-rose-500/20 to-rose-500/0",
    iconColor: "text-rose-400",
    border: "hover:border-rose-500/40",
  },
  {
    icon: Video,
    title: "Conversion-Focused",
    desc: "Every piece of content is crafted with a clear call-to-action to transform readers into leads and customers.",
    bullets: ["Lead magnet creation", "CTA optimization", "Analytics-driven topics"],
    accent: "from-red-500/20 to-red-500/0",
    iconColor: "text-red-400",
    border: "hover:border-red-500/40",
  },
];

const PROCESS = [
  { num: "01", icon: MousePointerClick, title: "Research", desc: "Understanding your industry, your competitors&apos; content, and exactly what your audience is searching for." },
  { num: "02", icon: Sparkles, title: "Ideate", desc: "Brainstorming creative angles and content hooks that set your brand apart from the noise." },
  { num: "03", icon: PenTool, title: "Produce", desc: "Crafting high-quality assets with a focus on value, readability, and brand alignment." },
  { num: "04", icon: Share2, title: "Promote", desc: "Distributing content across social, email, and search to ensure it reaches its maximum potential audience." },
  { num: "05", icon: BarChart2, title: "Measure", desc: "Tracking engagement, time-on-page, and conversion metrics to refine future content cycles." },
];

const RESULTS = [
  { tag: "SaaS Blog", metric: "+320%", label: "Increase in organic traffic", color: "text-orange-400" },
  { tag: "Financial Services", metric: "500+", label: "Monthly qualified leads from Ebooks", color: "text-amber-400" },
  { tag: "B2B Tech", metric: "Top 1%", label: "Industry authority score", color: "text-rose-400" },
];

const FAQS = [
  { q: "How often should we publish content?", a: "Consistency matters more than frequency. We usually recommend starting with 1–2 high-quality pieces per week and scaling as we see results." },
  { q: "Do you handle content distribution?", a: "Yes. We don&apos;t just write; we help you get your content in front of people through social media, email newsletters, and SEO." },
  { q: "Can you match our brand voice?", a: "Absolutely. Part of our initial strategy phase is defining a clear tone-of-voice guide to ensure all content feels like it came from you." },
  { q: "How do you measure content success?", a: "We look at a mix of leading indicators (traffic, shares) and lagging indicators (leads, sales, conversion rate) to calculate true ROI." },
];

// Re-import Share2 as it was used in PROCESS but not in head imports
import { Share2 } from "lucide-react";

export default function ContentMarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(249,115,22,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-orange-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-amber-600/8 blur-[100px]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">Content</span>
        </motion.div>

        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-2 backdrop-blur mb-8">
          <FileText className="h-3.5 w-3.5 text-orange-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300/80">Content Marketing</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl"
        >
          Become the authority in your niche with{" "}
          <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-rose-500 bg-clip-text text-transparent italic">
            strategic storytelling.
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          We combine data-driven research with exceptional storytelling to create content that doesn&apos;t just get views, but builds trust and drives measurable commercial impact.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.55)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Start my content engine <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200"
          >
            Our expertise
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "Value", label: "First Content" },
            { val: "SEO", label: "Optimized Copy" },
            { val: "High", label: "Intent Strategy" },
            { val: "Global", label: "Reach & Impact" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">What We Create</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Our content <span className="text-orange-400">services.</span>
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
                  Plan my content <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
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
            How we <span className="text-amber-400">narrate.</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-xl">A rigorous, value-first approach to content production and promotion.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="relative rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-amber-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Authority</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Proven <span className="text-rose-400">impact.</span>
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
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Content <span className="text-orange-400">Questions.</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">Everything you need to know about building a content engine that works.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm font-semibold hover:bg-orange-500/15 transition">
              Let&apos;s strategize <ArrowRight className="h-4 w-4" />
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
                  {openFaq === i ? <Minus className="h-4 w-4 text-orange-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
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
          className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-600/10 via-amber-600/8 to-rose-600/10 p-10 sm:p-14 text-center backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(249,115,22,0.12),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Stop publishing. Start narrating.
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Ready to turn your brand into a thought leader? Book a content consult today.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(249,115,22,0.4)] hover:shadow-[0_0_55px_rgba(249,115,22,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Start My Content Strategy <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

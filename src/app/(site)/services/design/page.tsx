"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PenTool, Palette, Layout, Layers, BadgeCheck,
  Sparkles, ArrowRight, ChevronRight, Plus, Minus,
  MousePointerClick, Eye, Figma,
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
    icon: PenTool,
    title: "Brand Identity",
    desc: "Strategy-led logos, typography, and visual language that make your brand unmistakable — from first impression to lasting recall.",
    bullets: ["Logo + mark system", "Color & typography", "Brand guidelines doc"],
    accent: "from-pink-500/20 to-pink-500/0",
    iconColor: "text-pink-400",
    border: "hover:border-pink-500/40",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    desc: "Human-centered interfaces that are simple, accessible, and conversion-focused across web & mobile platforms.",
    bullets: ["User flows & wireframes", "Hi-fi Figma prototypes", "Usability testing"],
    accent: "from-violet-500/20 to-violet-500/0",
    iconColor: "text-violet-400",
    border: "hover:border-violet-500/40",
  },
  {
    icon: Eye,
    title: "Web Design",
    desc: "Marketing sites and landing pages with crisp art direction, purposeful motion, and on-brand components that convert.",
    bullets: ["Hero art direction", "Micro-interactions", "Responsive layouts"],
    accent: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-400",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: Layers,
    title: "Design Systems",
    desc: "Token-driven systems, component libraries, and documentation that keep teams moving fast and perfectly on-brand.",
    bullets: ["Design tokens", "Component library", "Usage guidelines"],
    accent: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
];

const PROCESS = [
  { num: "01", icon: Sparkles, title: "Discover", desc: "Deep dive into your audience, goals, competitors, and brand positioning to build a clear north star." },
  { num: "02", icon: PenTool, title: "Define", desc: "Establish brand pillars, information architecture, and UX principles that guide every decision." },
  { num: "03", icon: MousePointerClick, title: "Wireframe", desc: "Rapid low-fidelity flows and layout exploration to lock structure before visual design begins." },
  { num: "04", icon: Palette, title: "Design", desc: "Hi-fidelity visuals, motion specs, and interactive prototypes in Figma — pixel-perfect and on-brand." },
  { num: "05", icon: Figma, title: "Handoff", desc: "Clean specs, tokens, assets, and component documentation ready for engineering to build fast." },
];

const RESULTS = [
  { tag: "Branding", metric: "+2.4×", label: "Brand recall after rebrand", color: "text-pink-400" },
  { tag: "SaaS UI", metric: "−37%", label: "Task completion time after IA overhaul", color: "text-violet-400" },
  { tag: "E-com UX", metric: "+18%", label: "Checkout conversion rate improvement", color: "text-cyan-400" },
];

const FAQS = [
  { q: "How long does a brand identity project take?", a: "A full brand identity — logo, guidelines, and assets — typically takes 3–5 weeks. We move fast but take quality seriously. Complex systems or multi-brand projects can take longer." },
  { q: "Do you do Figma or Adobe work?", a: "All our UI/UX work is done in Figma with structured components, auto-layout, and design tokens. We can also deliver Adobe XD or Sketch if required." },
  { q: "Can you redesign an existing brand?", a: "Yes. Rebrands are one of our specialties. We do a brand audit first, then evolve or fully reinvent depending on your goals and existing equity." },
  { q: "What do you need from us to start?", a: "Brand brief or discovery questionnaire, existing assets (if any), examples of brands you admire, and access to a key decision-maker for quick feedback cycles." },
];

export default function DesignPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      {/* ── Background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(216,80,236,0.18),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-pink-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      {/* ── Hero ── */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        {/* Breadcrumb */}
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">Design</span>
        </motion.div>

        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-pink-500/25 bg-pink-500/10 px-4 py-2 backdrop-blur mb-8">
          <Palette className="h-3.5 w-3.5 text-pink-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300/80">Design Services</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl"
        >
          Brands & interfaces that{" "}
          <span className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-violet-500 bg-clip-text text-transparent italic">
            feel beautiful
          </span>{" "}
          and perform.
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          We blend brand strategy, UX thinking, and visual craft to create design systems, interfaces, and identities that delight users and drive real business results.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.55)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Start a design sprint <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore services
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "150+", label: "Brands Designed" },
            { val: "3.2×", label: "Design Velocity" },
            { val: "−37%", label: "Task Time" },
            { val: "95%", label: "Consistency Score" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 text-center backdrop-blur">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">{s.val}</div>
              <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Services Grid ── */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">What We Design</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Our design <span className="text-pink-400">services.</span>
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
                  Get started <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Our Process</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            How we <span className="text-fuchsia-400">craft.</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-xl">From discovery to pixel-perfect handoff — a calm, repeatable design cadence.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="relative rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-fuchsia-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Results ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Outcomes</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Real <span className="text-emerald-400">results.</span>
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

      {/* ── FAQ ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Got <span className="text-pink-400">questions?</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">We've answered the most common ones below. Still curious? Just ask.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-300 text-sm font-semibold hover:bg-pink-500/15 transition">
              Talk to us <ArrowRight className="h-4 w-4" />
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

      {/* ── CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        <motion.div
          {...fadeUp(0)}
          className="relative overflow-hidden rounded-3xl border border-pink-500/20 bg-gradient-to-br from-pink-600/10 via-fuchsia-600/8 to-violet-600/10 p-10 sm:p-14 text-center backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(236,72,153,0.12),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Ready to elevate your brand?
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Book a free 30-min design consult. We'll audit your current UI and propose a focused sprint plan.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:shadow-[0_0_55px_rgba(236,72,153,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Book a session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

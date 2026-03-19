"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Megaphone, LineChart, Users, MousePointerClick,
  BarChart3, Target, Lightbulb, ShieldCheck, Zap,
  ArrowRight, ChevronRight, Plus, Minus, BadgeCheck, Rocket,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: d, ease: EASE },
});

const SERVICES = [
  { icon: Megaphone, title: "Paid Ads", desc: "Full-funnel media buying across Google, Meta, and YouTube. We optimize creatives, bids, and audiences to scale profitably.", bullets: ["Performance creatives", "ROAS-first structure", "Realtime dashboards"], accent: "from-pink-500/20 to-pink-500/0", iconColor: "text-pink-400", border: "hover:border-pink-500/40" },
  { icon: LineChart, title: "SEO", desc: "Technical, on-page, and authority building for durable organic growth — built on content systems, not guesswork.", bullets: ["Topic clusters", "Technical audits", "Link strategy"], accent: "from-emerald-500/20 to-emerald-500/0", iconColor: "text-emerald-400", border: "hover:border-emerald-500/40" },
  { icon: Users, title: "Social Growth", desc: "Narrative-driven content calendars, UGC pipelines, and community playbooks that turn followers into fans.", bullets: ["UGC + hooks", "Channel operations", "Analytics"], accent: "from-yellow-500/20 to-yellow-500/0", iconColor: "text-yellow-400", border: "hover:border-yellow-500/40" },
  { icon: MousePointerClick, title: "CRO", desc: "Hypothesis-driven experiments across landing pages and funnels to lift CVR without adding ad spend.", bullets: ["A/B program", "Heuristic audits", "Session insights"], accent: "from-orange-500/20 to-orange-500/0", iconColor: "text-orange-400", border: "hover:border-orange-500/40" },
];

const PROCESS = [
  { num: "01", icon: Lightbulb, title: "Discover", desc: "Goals, audience, unit economics, and success metrics alignment." },
  { num: "02", icon: Target, title: "Strategy", desc: "Channel mix, creative angles, and a clear measurement plan." },
  { num: "03", icon: Rocket, title: "Launch", desc: "Ship fast: trackers, pixels, ads live, content calendar ready." },
  { num: "04", icon: BarChart3, title: "Optimize", desc: "Weekly cycles: test, learn, scale winners, cut waste." },
  { num: "05", icon: ShieldCheck, title: "Scale", desc: "Automation and guardrails for efficient, compounding growth." },
];

const RESULTS = [
  { tag: "D2C", metric: "4.3×", label: "ROAS in 60 days for e-commerce brand", color: "text-yellow-400" },
  { tag: "SaaS", metric: "−41%", label: "CAC reduction in just 2 sprint cycles", color: "text-emerald-400" },
  { tag: "EdTech", metric: "3.1×", label: "Qualified demo bookings from paid social", color: "text-pink-400" },
];

const FAQS = [
  { q: "How soon can we start?", a: "Typically within 7–10 business days after kickoff. We use 30-day sprint cadences with weekly check-ins." },
  { q: "What do you need from us?", a: "Access to ad accounts and analytics, brand assets, product context, and a decision-maker for fast iteration." },
  { q: "Do you work on performance pricing?", a: "Yes. Hybrid retainers with performance incentives are available for qualified products." },
  { q: "What's included in reporting?", a: "A live dashboard plus weekly snapshots, experiment logs, and strategic recommendations — no vanity metrics." },
];

export default function MarketingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(234,179,8,0.12),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-yellow-600/6 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-emerald-600/6 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">Marketing</span>
        </motion.div>
        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-4 py-2 backdrop-blur mb-8">
          <Megaphone className="h-3.5 w-3.5 text-yellow-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300/80">Marketing Services</span>
        </motion.div>
        <motion.h1 {...fadeUp(0.08)} className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl">
          Growth systems that turn{" "}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent italic">
            attention into revenue.
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          We blend Paid, SEO, Social, and CRO into one compounding loop — so every experiment, creative, and click makes the next one smarter.
        </motion.p>
        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_40px_rgba(234,179,8,0.55)] hover:-translate-y-0.5 transition-all duration-200">
            Start a growth sprint <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200">
            Explore services
          </Link>
        </motion.div>
        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ val: "2.7×", label: "Avg. ROAS Lift" }, { val: "−34%", label: "CAC Reduction" }, { val: "1.9×", label: "Lead Quality" }, { val: "3.5×", label: "Content Velocity" }].map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.04] p-5 text-center backdrop-blur">
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-white">{s.val}</div>
              <div className="text-xs text-white/40 font-medium mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">What We Do</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">Our marketing <span className="text-yellow-400">services.</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {SERVICES.map((s, i) => (
            <motion.article key={s.title} {...fadeUp(i * 0.07)} className={`relative group rounded-3xl border border-white/8 bg-white/[0.04] p-7 sm:p-8 backdrop-blur transition-all duration-300 hover:bg-white/[0.07] ${s.border} overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-2xl bg-white/8 border border-white/10 mb-5 ${s.iconColor}`}><s.icon className="h-6 w-6" /></div>
                <h3 className="text-xl font-bold tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2 mb-6">{s.bullets.map((b) => (<li key={b} className="flex items-center gap-2.5 text-sm text-white/70"><BadgeCheck className={`h-4 w-4 flex-shrink-0 ${s.iconColor}`} />{b}</li>))}</ul>
                <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/40 group-hover:text-white/80 transition-colors">Get started <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Our Process</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">How we <span className="text-orange-400">work.</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-yellow-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Outcomes</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">Real <span className="text-emerald-400">results.</span></h2>
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

      {/* Testimonial */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="rounded-3xl border border-yellow-500/15 bg-yellow-500/5 p-10 sm:p-14 relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_0%_50%,rgba(234,179,8,0.08),transparent)]" />
          <div className="relative z-10 max-w-3xl">
            <div className="text-5xl text-yellow-400/30 font-black leading-none mb-6">"</div>
            <p className="text-xl sm:text-2xl font-medium text-white/80 leading-relaxed italic mb-8">
              They run growth like engineers — tight loops, clean dashboards, and creative that actually sells. Our CAC fell 38% while revenue climbed 3×.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center"><Zap className="h-5 w-5 text-yellow-400" /></div>
              <div>
                <div className="text-sm font-bold text-white">VP Growth</div>
                <div className="text-xs text-white/40">B2C Subscription Brand</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Got <span className="text-yellow-400">questions?</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">Common questions about how we work and what to expect.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-300 text-sm font-semibold hover:bg-yellow-500/15 transition">Talk to us <ArrowRight className="h-4 w-4" /></Link>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/8 bg-white/[0.04] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-sm font-semibold text-white/90">{faq.q}</span>
                  {openFaq === i ? <Minus className="h-4 w-4 text-yellow-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <div className="px-6 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">
        <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-600/8 via-orange-600/6 to-pink-600/8 p-10 sm:p-14 text-center backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(234,179,8,0.1),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">Ready to build your growth engine?</h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">Book a free 30-min strategy session. We'll review your numbers and map a sprint plan.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black text-sm font-bold shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:shadow-[0_0_55px_rgba(234,179,8,0.55)] hover:-translate-y-0.5 transition-all duration-200">
              Book a session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

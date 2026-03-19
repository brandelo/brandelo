"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2, Globe, Boxes, ShoppingCart, Gauge, Wrench,
  Database, ShieldCheck, ArrowRight, ChevronRight, Plus, Minus, BadgeCheck,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay: d, ease: EASE },
});

const SERVICES = [
  { icon: Code2, title: "Next.js / React", desc: "Fast, SEO-friendly marketing sites and apps with modern DX, image optimization, and analytics baked in.", bullets: ["App Router & ISR/SSR", "A11y + Lighthouse 90+", "Edge-ready deployment"], accent: "from-cyan-500/20 to-cyan-500/0", iconColor: "text-cyan-400", border: "hover:border-cyan-500/40" },
  { icon: Globe, title: "WordPress (Custom)", desc: "Block-first themes, ACF blocks, and clean admin — no bloated page builders. Secure, cache-friendly stacks.", bullets: ["ACF/Block editor", "Headless WP", "Hardening + cache"], accent: "from-blue-500/20 to-blue-500/0", iconColor: "text-blue-400", border: "hover:border-blue-500/40" },
  { icon: Boxes, title: "PHP / Laravel", desc: "Robust backends, REST/GraphQL APIs, and admin panels powering your site features and integrations.", bullets: ["REST + GraphQL APIs", "Queues + Jobs", "Auth & Policies"], accent: "from-violet-500/20 to-violet-500/0", iconColor: "text-violet-400", border: "hover:border-violet-500/40" },
  { icon: ShoppingCart, title: "E-commerce", desc: "WooCommerce, Shopify, or headless storefronts focused on speed, UX, and conversion.", bullets: ["Checkout UX", "Payments + GST", "Headless carts"], accent: "from-emerald-500/20 to-emerald-500/0", iconColor: "text-emerald-400", border: "hover:border-emerald-500/40" },
  { icon: Gauge, title: "Performance & SEO", desc: "Web vitals, code-split, image/CDN strategy, schema, and analytics for measurable growth.", bullets: ["Core Web Vitals", "CDN/Image pipeline", "Schema + tracking"], accent: "from-indigo-500/20 to-indigo-500/0", iconColor: "text-indigo-400", border: "hover:border-indigo-500/40" },
  { icon: Wrench, title: "Care & Maintenance", desc: "Monthly updates, uptime monitoring, backups, and SLA support to keep your site healthy 24/7.", bullets: ["SLA support plans", "Backups + monitoring", "Patch & security"], accent: "from-teal-500/20 to-teal-500/0", iconColor: "text-teal-400", border: "hover:border-teal-500/40" },
];

const PROCESS = [
  { num: "01", icon: Globe, title: "Scope", desc: "Goals, sitemap, integrations, tech stack, and KPIs aligned before a line is written." },
  { num: "02", icon: Database, title: "Architecture", desc: "Content model, component structure, data flows, and API contracts designed to scale." },
  { num: "03", icon: Code2, title: "Build", desc: "Iterative sprints with staging previews, code reviews, and QA at every milestone." },
  { num: "04", icon: Gauge, title: "Optimize", desc: "Core Web Vitals, SEO, accessibility polish — Lighthouse 90+ before launch." },
  { num: "05", icon: ShieldCheck, title: "Launch + Care", desc: "Hardening, observability, zero-downtime deploy, and ongoing maintenance plans." },
];

const RESULTS = [
  { tag: "Next.js", metric: "+92", label: "Lighthouse Performance score after headless rebuild", color: "text-cyan-400" },
  { tag: "WooCommerce", metric: "+14%", label: "Checkout conversion rate after UX revamp", color: "text-emerald-400" },
  { tag: "WordPress", metric: "−58%", label: "Admin time after ACF block theme migration", color: "text-indigo-400" },
];

const FAQS = [
  { q: "Which platform should I pick?", a: "Marketing sites/blogs → WordPress or Next.js; complex UX/apps → Next.js/React; stores → WooCommerce/Shopify or headless. We'll recommend the right fit after scoping." },
  { q: "Do you migrate existing sites?", a: "Yes. We do zero-downtime DNS cutovers with redirect mapping, content migration, and SEO preservation so you don't lose rankings." },
  { q: "What about hosting and CDN?", a: "We set up modern hosts (Vercel, Netlify, Cloudflare, or managed WP) with image pipelines, CDN, and monitoring tailored to your stack." },
  { q: "Do you offer maintenance plans?", a: "Yes — monthly care plans with updates, backups, uptime monitoring, and priority bug fixes. Ask about SLA tiers on the contact form." },
];

export default function TechnologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(6,182,212,0.12),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-cyan-600/6 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/6 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">Technology</span>
        </motion.div>
        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 backdrop-blur mb-8">
          <Code2 className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Technology Services</span>
        </motion.div>
        <motion.h1 {...fadeUp(0.08)} className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl">
          Websites that{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent italic">
            load fast, sell better.
          </span>
        </motion.h1>
        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          WordPress, React/Next.js, PHP/Laravel, and e-commerce — built right. We prioritize speed, stability, SEO, and ROI at every layer of the stack.
        </motion.p>
        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 transition-all duration-200">
            Start a build sprint <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200">
            Explore services
          </Link>
        </motion.div>
        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ val: "+48%", label: "LCP Improvement" }, { val: "+22%", label: "Conversion Uplift" }, { val: "−63%", label: "Bug Regression" }, { val: "−35%", label: "Time-to-Ship" }].map((s) => (
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">What We Build</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">Our technology <span className="text-cyan-400">services.</span></h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <motion.article key={s.title} {...fadeUp(i * 0.07)} className={`relative group rounded-3xl border border-white/8 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:bg-white/[0.07] ${s.border} overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${s.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative z-10">
                <div className={`inline-flex p-3 rounded-2xl bg-white/8 border border-white/10 mb-5 ${s.iconColor}`}><s.icon className="h-6 w-6" /></div>
                <h3 className="text-lg font-bold tracking-tight mb-2">{s.title}</h3>
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">How we <span className="text-blue-400">ship.</span></h2>
          <p className="mt-3 text-white/50 max-w-xl">From scope to launch and care — calm, repeatable, and transparent.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-cyan-400 mb-3" />
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

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">FAQ</div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Got <span className="text-cyan-400">questions?</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">The most common questions about our tech stack, process, and care plans.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/15 transition">
              Talk to us <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="rounded-2xl border border-white/8 bg-white/[0.04] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                  <span className="text-sm font-semibold text-white/90">{faq.q}</span>
                  {openFaq === i ? <Minus className="h-4 w-4 text-cyan-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
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
        <motion.div {...fadeUp(0)} className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-600/8 via-blue-600/6 to-indigo-600/10 p-10 sm:p-14 text-center backdrop-blur">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(6,182,212,0.1),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">Need a high-performing website?</h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">Book a free 30-min consult. We'll audit your current stack and map a practical upgrade path.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_55px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 transition-all duration-200">
              Book a session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

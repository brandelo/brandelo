"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Code2, Laptop, Globe, Database, BadgeCheck,
  Sparkles, ArrowRight, ChevronRight, Plus, Minus,
  MousePointerClick, Zap, Layout,
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
    icon: Laptop,
    title: "Custom Responsive Design",
    desc: "Bespoke web layouts that adapt perfectly to any screen size, ensuring a premium user experience on mobile, tablet, and desktop.",
    bullets: ["Mobile-first approach", "Fluid layouts", "Retina-ready visuals"],
    accent: "from-cyan-500/20 to-cyan-500/0",
    iconColor: "text-cyan-400",
    border: "hover:border-cyan-500/40",
  },
  {
    icon: Database,
    title: "E-commerce Solutions",
    desc: "Robust online storefronts designed for high conversion, secure transactions, and seamless inventory management.",
    bullets: ["Custom checkout flows", "Payment gateway integration", "High-performance catalogs"],
    accent: "from-emerald-500/20 to-emerald-500/0",
    iconColor: "text-emerald-400",
    border: "hover:border-emerald-500/40",
  },
  {
    icon: Globe,
    title: "UI/UX Optimization",
    desc: "User-centric interface design and experience mapping to reduce friction and increase visitor engagement.",
    bullets: ["User journey mapping", "A/B testing", "Accessibility compliance"],
    accent: "from-indigo-500/20 to-indigo-500/0",
    iconColor: "text-indigo-400",
    border: "hover:border-indigo-500/40",
  },
  {
    icon: Zap,
    title: "Business-Tailored Dev",
    desc: "Strategic development focused on your specific business goals, whether it's lead generation, brand authority, or sales.",
    bullets: ["Custom API integrations", "Scalable architecture", "Focus on ROI"],
    accent: "from-yellow-500/20 to-yellow-500/0",
    iconColor: "text-yellow-400",
    border: "hover:border-yellow-500/40",
  },
];

const PROCESS = [
  { num: "01", icon: Layout, title: "Architect", desc: "Defining the tech stack, data structure, and user flow before a single line of code is written." },
  { num: "02", icon: Code2, title: "Build", desc: "Clean, modular, and accessible code development following modern best practices (React/Next.js)." },
  { num: "03", icon: Database, title: "Integrate", desc: "Connecting your frontend to CMS, APIs, and third-party tools for a seamless ecosystem." },
  { num: "04", icon: MousePointerClick, title: "Test", desc: "Rigorous QA across devices and browsers to ensure 100% functionality and performance." },
  { num: "05", icon: Sparkles, title: "Ship", desc: "Deployment to edge networks (Vercel/Netlify) with CI/CD pipelines for ongoing updates." },
];

const RESULTS = [
  { tag: "SaaS Platform", metric: "99/100", label: "Lighthouse Performance Score", color: "text-cyan-400" },
  { tag: "E-com Store", metric: "−40%", label: "Reduction in average page load time", color: "text-emerald-400" },
  { tag: "Fintech App", metric: "+65%", label: "Increase in mobile conversion rate", color: "text-indigo-400" },
];

const FAQS = [
  { q: "Why do you use Next.js?", a: "Next.js offers the best of both worlds: extreme speed through static generation and dynamic power through server-side rendering. It's the gold standard for SEO and performance today." },
  { q: "Can you migrate my current site?", a: "Yes. We specialize in migrating legacy WordPress or PHP sites to modern headless stacks without losing SEO ranking or data." },
  { q: "Do you offer ongoing maintenance?", a: "We offer several support tiers, from security patches and performance monitoring to ongoing feature development." },
  { q: "Is my site going to be mobile-friendly?", a: "Every site we build is mobile-first. We ensure perfect performance and UI across all screen sizes and devices." },
];

export default function WebDevPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(34,211,238,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-cyan-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-emerald-600/8 blur-[100px]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">Web Dev</span>
        </motion.div>

        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-4 py-2 backdrop-blur mb-8">
          <Code2 className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300/80">Web Development</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl"
        >
          High-performance web apps built for{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500 bg-clip-text text-transparent italic">
            maximum impact.
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          We don&apos;t just build websites; we build digital growth engines. Fast, secure, and perfectly optimized for search engines and users alike.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.55)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200"
          >
            Explore tech stack
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "< 1s", label: "Page Load Time" },
            { val: "100%", label: "Mobile Responsive" },
            { val: "99.9%", label: "Uptime SLA" },
            { val: "Modern", label: "Next.js Stack" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Engineering</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Our dev <span className="text-cyan-400">services.</span>
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
                  Discuss my stack <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Development Lifecycle</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            How we <span className="text-emerald-400">build.</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-xl">A transparent, agile process that keeps your project on track and under budget.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="relative rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-emerald-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Stability</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Built for <span className="text-indigo-400">performance.</span>
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
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">Tech <span className="text-cyan-400">Questions.</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">What makes Brandelo websites different from any other agency.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/15 transition">
              Let&apos;s talk tech <ArrowRight className="h-4 w-4" />
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
                  {openFaq === i ? <Minus className="h-4 w-4 text-cyan-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
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
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-600/10 via-emerald-600/8 to-indigo-600/10 p-10 sm:p-14 text-center backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(34,211,238,0.12),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Code that drives commerce.
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Ready to build a digital experience that actually works? We&apos;re here to architect and build your vision.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(34,211,238,0.4)] hover:shadow-[0_0_55px_rgba(34,211,238,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

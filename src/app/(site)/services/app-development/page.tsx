"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Smartphone, AppWindow, Cpu, Rocket, BadgeCheck,
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
    icon: Smartphone,
    title: "iOS & Android Development",
    desc: "Custom-built native mobile applications for Apple and Android devices, focusing on platform-specific optimization and performance.",
    bullets: ["Swift/Kotlin proficiency", "Native hardware integration", "App Store/Play Store launch"],
    accent: "from-indigo-500/20 to-indigo-500/0",
    iconColor: "text-indigo-400",
    border: "hover:border-indigo-500/40",
  },
  {
    icon: Layout,
    title: "Hybrid App Solutions",
    desc: "Cross-platform mobile apps (React Native/Flutter) that provide a near-native experience with a single codebase for faster time-to-market.",
    bullets: ["Single codebase dev", "Cost-effective scaling", "Seamless platform parity"],
    accent: "from-blue-500/20 to-blue-500/0",
    iconColor: "text-blue-400",
    border: "hover:border-blue-500/40",
  },
  {
    icon: Cpu,
    title: "Enterprise Mobile Apps",
    desc: "Scalable and secure mobile applications designed specifically for large-scale business operations and internal workflow automation.",
    bullets: ["High-security protocols", "Scalable backend core", "Complex data management"],
    accent: "from-violet-500/20 to-violet-500/0",
    iconColor: "text-violet-400",
    border: "hover:border-violet-500/40",
  },
  {
    icon: Rocket,
    title: "Intuitive UX/UI",
    desc: "Application designs that focus on the modern user, with simple navigation and high-performance visual elements.",
    bullets: ["User-centric prototyping", "Accessibility focus", "Interactive mobile flows"],
    accent: "from-pink-500/20 to-pink-500/0",
    iconColor: "text-pink-400",
    border: "hover:border-pink-500/40",
  },
];

const PROCESS = [
  { num: "01", icon: AppWindow, title: "Discover", desc: "Defining the problem space, target audience, and core feature set for your mobile MVP." },
  { num: "02", icon: MousePointerClick, title: "Prototype", desc: "Building interactive low and high-fidelity prototypes to validate the user experience early." },
  { num: "03", icon: Cpu, title: "Develop", desc: "Agile engineering cycles with constant feedback and integration to build a robust codebase." },
  { num: "04", icon: Zap, title: "Test", desc: "Extensive device testing and beta phases to squash bugs before the public sees it." },
  { num: "05", icon: Rocket, title: "Deploy", desc: "Seamless submission to the App Store and Play Store, followed by continuous monitoring." },
];

const RESULTS = [
  { tag: "HealthTech", metric: "4.8/5", label: "Average App Store Rating", color: "text-indigo-400" },
  { tag: "E-com App", metric: "35%", label: "Increase in mobile user retention", color: "text-blue-400" },
  { tag: "Social App", metric: "1M+", label: "Successful background sync tasks/day", color: "text-violet-400" },
];

const FAQS = [
  { q: "Native or Cross-Platform?", a: "It depends on your requirements. Native (Swift/Kotlin) offers maximum performance, while Cross-Platform (React Native) allows for faster development across both iOS and Android with a single codebase." },
  { q: "How long does it take to build an app?", a: "A standard MVP typically takes 3–5 months. More complex applications with extensive backend integrations can take 6 months or more." },
  { q: "Do you help with App Store submission?", a: "Yes. We handle the entire process, from setting up developer accounts to optimizing your listing for search visibility (ASO)." },
  { q: "Can you update an existing app?", a: "Yes. We can perform audits, fix bugs, and add new features to your existing codebase, or help you migrate to a more modern tech stack." },
];

export default function AppDevPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080c18] text-white">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080c18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.15),transparent)]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px]" />
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-20">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 text-xs text-white/35 font-medium mb-8">
          <Link href="/services" className="hover:text-white/60 transition-colors">Services</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/60">App Dev</span>
        </motion.div>

        <motion.div {...fadeUp(0.04)} className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-2 backdrop-blur mb-8">
          <Smartphone className="h-3.5 w-3.5 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300/80">App Development</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.08)}
          className="text-[clamp(38px,6.5vw,84px)] font-black leading-[0.92] tracking-tight max-w-5xl"
        >
          World-class mobile apps that{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-500 bg-clip-text text-transparent italic">
            drive engagement.
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.14)} className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
          From brainstorming to deployment, we build intuitive, scalable mobile experiences that keep your brand in your customers&apos; pockets, 24/7.
        </motion.p>

        <motion.div {...fadeUp(0.2)} className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-sm font-bold shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.55)] hover:-translate-y-0.5 transition-all duration-200"
          >
            Build my app <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white/80 text-sm font-semibold hover:bg-white/8 hover:-translate-y-0.5 transition-all duration-200"
          >
            See our process
          </Link>
        </motion.div>

        <motion.div {...fadeUp(0.26)} className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { val: "iOS", label: "Native Power" },
            { val: "Android", label: "Global Reach" },
            { val: "React", label: "Cross Platform" },
            { val: "Safe", label: "Encrypted Core" },
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Core Competencies</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Comprehensive <span className="text-indigo-400">app services.</span>
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
                  Consult with our team <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
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
            How we <span className="text-blue-400">ideate.</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-xl">A transparent, stage-by-stage methodology to bring your app vision to life.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PROCESS.map((step, i) => (
            <motion.div key={step.num} {...fadeUp(i * 0.06)} className="relative rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur">
              <div className="text-4xl font-black text-white/8 mb-3 leading-none">{step.num}</div>
              <step.icon className="h-5 w-5 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{step.title}</h3>
              <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-t border-white/[0.06]">
        <motion.div {...fadeUp(0)} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-semibold uppercase tracking-widest mb-4">Expertise</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Proven <span className="text-violet-400">outcomes.</span>
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
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">App <span className="text-indigo-400">Questions.</span></h2>
            <p className="text-white/45 text-sm leading-relaxed mb-8">What it takes to build and launch a successful mobile experience.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-semibold hover:bg-indigo-500/15 transition">
              Book a consult <ArrowRight className="h-4 w-4" />
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
                  {openFaq === i ? <Minus className="h-4 w-4 text-indigo-400 flex-shrink-0" /> : <Plus className="h-4 w-4 text-white/40 flex-shrink-0" />}
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
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 via-blue-600/8 to-violet-600/10 p-10 sm:p-14 text-center backdrop-blur"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(99,102,241,0.12),transparent)]" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Your vision, at their fingertips.
            </h2>
            <p className="text-white/50 text-base mb-8 max-w-lg mx-auto">
              Ready to take your product mobile? Let&apos;s build an experience that keeps users coming back.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-sm font-bold shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_55px_rgba(99,102,241,0.55)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Start App Project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

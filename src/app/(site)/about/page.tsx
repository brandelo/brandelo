"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Zap, Target, TrendingUp, Sparkles } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fx = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE, delay },
  viewport: { once: true, amount: 0.15 },
});

/* ── Infinite Marquee ── */
function Marquee({ text, speed = 28, dark = false, italic = false }: {
  text: string; speed?: number; dark?: boolean; italic?: boolean;
}) {
  const chunk = text + "  ·  ";
  const row = chunk.repeat(14);
  return (
    <div className={`overflow-hidden py-5 select-none ${dark ? "bg-[#0e0e0e]" : "bg-white border-y border-black/[0.07]"}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[row, row].map((r, i) => (
          <span key={i} className={`text-[clamp(20px,3vw,36px)] font-black uppercase tracking-tight pr-8 ${italic ? "italic" : ""} ${dark ? "text-white/80" : "text-[#111]"}`}>
            {r}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Section label ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.04] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/45 mb-5">
      {children}
    </div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const SERVICES = [
    { num: "01", title: "Search Engine Optimisation", desc: "Ranking your brand at the top with on-page, off-page, and technical SEO that compounds over time.", icon: TrendingUp },
    { num: "02", title: "Social Media Marketing", desc: "Amplifying your voice across every platform with targeted, high-engagement content that builds community.", icon: Sparkles },
    { num: "03", title: "PPC & Performance Ads", desc: "ROI-driven campaigns on Google, Meta & beyond — every rupee tracked, every conversion counted.", icon: Zap },
    { num: "04", title: "Content Marketing", desc: "Stories that build trust, drive traffic, and position you as the authority your audience wants to follow.", icon: Target },
    { num: "05", title: "Website Development", desc: "Fast, responsive, user-centric websites built with modern tech that converts visitors into clients.", icon: ArrowUpRight },
    { num: "06", title: "App Development", desc: "Intuitive mobile & web apps that bring your product vision to life with clean code and modern UX.", icon: Sparkles },
  ];

  const TEAM = [
    { name: "Nikhil Sharma", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800&auto=format&fit=crop" },
    { name: "Priya Gupta", role: "Head of Marketing", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop" },
    { name: "Rahul Verma", role: "Creative Director", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
  ];

  const STATS = [
    { value: "150+", label: "Projects Delivered" },
    { value: "80+", label: "Happy Clients" },
    { value: "6+", label: "Years Active" },
    { value: "12+", label: "Industries Served" },
  ];

  const VALUES = [
    { emoji: "🎯", title: "Clarity First", desc: "Simple roadmaps, zero guesswork, weekly momentum." },
    { emoji: "🚀", title: "Always Moving", desc: "Ship → learn → refine. Stagnation isn't in our vocab." },
    { emoji: "✨", title: "Obsessive Craft", desc: "Every pixel, every word, every metric — polished to perfection." },
    { emoji: "📈", title: "Real Results", desc: "Revenue and retention over vanity metrics — always." },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0e0e0e] font-sans">

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end bg-[#0b0b0b] overflow-hidden">
        {/* Parallax BG watermark */}
        <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="text-[clamp(120px,22vw,280px)] font-black uppercase leading-none tracking-tighter text-white/[0.03] select-none">
            BRANDELO
          </span>
        </motion.div>

        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[100px]" />
        </div>

        <motion.div style={{ opacity }} className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-20 pt-32">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur mb-10"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Agency Beings · Since 2018</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="text-[clamp(42px,8vw,100px)] font-black leading-[0.95] tracking-tight text-white max-w-5xl"
          >
            We make your<br />
            brand{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent italic">
              impossible
            </span>
            <br />
            to ignore.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            className="mt-8 text-lg text-white/45 max-w-xl leading-relaxed"
          >
            We craft experiences that captivate, inspire, and leave lasting impressions.
            Data-driven strategies meet bold creative — ready to shake things up?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.38 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-white text-[#0e0e0e] text-sm font-bold px-7 py-3.5 hover:bg-white/90 transition-all shadow-lg shadow-white/10">
              Start a project <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 text-white text-sm font-semibold px-7 py-3.5 hover:bg-white/8 transition-all backdrop-blur">
              Our services
            </Link>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-20 flex items-center gap-3 text-white/25 text-xs uppercase tracking-widest"
          >
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            Scroll to explore
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ MARQUEE 1 ═══════════════ */}
      <Marquee text="Bold Ideas · Big Impact" speed={22} italic />

      {/* ═══════════════ ABOUT SPLIT ═══════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28">
            <motion.div {...fx(0)}>
              <SectionLabel>About Brandelo</SectionLabel>
            </motion.div>
            <motion.h2 {...fx(0.06)} className="text-[clamp(36px,5vw,60px)] font-black leading-[1.0] tracking-tight">
              We build brands<br />that lead the<br />
              <span className="italic text-black/35">market.</span>
            </motion.h2>

            {/* Stats */}
            <motion.div {...fx(0.14)} className="mt-12 grid grid-cols-2 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="border-t-2 border-black/8 pt-4">
                  <p className="text-[clamp(32px,4vw,48px)] font-black leading-none text-[#0e0e0e]">{s.value}</p>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-widest text-black/35">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — copy */}
          <div className="flex flex-col gap-7 pt-2 lg:pt-16">
            <motion.p {...fx(0.1)} className="text-xl text-black/70 leading-[1.75]">
              Brandelo is a performance-focused digital marketing and creative growth studio. We specialise in SEO, Google &amp; Meta Ads, social media marketing, branding, and modern web development — helping businesses grow <span className="font-bold text-[#0e0e0e]">revenue, traffic, and conversions</span> with data-driven strategies.
            </motion.p>
            <motion.p {...fx(0.15)} className="text-lg text-black/55 leading-relaxed">
              We work closely with visionary leaders and forward-thinking companies, helping them navigate the complexities of the digital world. From crafting compelling brand identities to executing cutting-edge marketing strategies, our team is dedicated to your success.
            </motion.p>
            <motion.div {...fx(0.2)} className="pt-2">
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#0e0e0e] text-white text-sm font-bold px-7 py-3.5 hover:bg-black/80 transition-all">
                Chat with an expert <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LEADERSHIP ═══════════════ */}
      <section className="bg-[#F7F7F7] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.div {...fx(0)}><SectionLabel>Leadership</SectionLabel></motion.div>
              <motion.h2 {...fx(0.06)} className="text-[clamp(32px,5vw,56px)] font-black leading-tight tracking-tight max-w-lg">
                Meet the masterminds crafting the future.
              </motion.h2>
            </div>
            <motion.p {...fx(0.1)} className="text-base text-black/50 max-w-xs leading-relaxed">
              A team of strategists, creators, and engineers obsessed with making brands grow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                {...fx(i * 0.08)}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="group"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-[#e8e8e8] mb-5 shadow-sm">
                  <Image src={m.img} alt={m.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" unoptimized />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="font-bold text-white text-lg leading-tight">{m.name}</p>
                    <p className="text-white/65 text-sm">{m.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE 2 ═══════════════ */}
      <Marquee text="The Overachievers" speed={18} dark />

      {/* ═══════════════ CULTURE ═══════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <motion.div {...fx(0)}><SectionLabel>Our Culture</SectionLabel></motion.div>
            <motion.h2 {...fx(0.06)} className="text-[clamp(32px,5vw,56px)] font-black leading-[1.05] tracking-tight mb-6">
              We don&apos;t settle for &ldquo;good&rdquo;, and neither should you.
            </motion.h2>
            <motion.p {...fx(0.12)} className="text-lg text-black/55 leading-relaxed mb-8 max-w-md">
              We&apos;re a little bit rebellious and a whole lot ambitious. We take on challenges like we&apos;ve got something to prove — because we do. We don&apos;t stop until your brand is the talk of the town, and maybe even the internet.
            </motion.p>
            <motion.div {...fx(0.16)}>
              <Link href="/contact" className="group inline-flex items-center gap-2 rounded-full bg-[#0e0e0e] text-white text-sm font-bold px-7 py-3.5 hover:bg-black/80 transition-all">
                Join the journey <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                {...fx(i * 0.07)}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className={`rounded-2xl p-6 flex flex-col gap-3 ${i === 0 ? "bg-[#0e0e0e] text-white" : "bg-[#F4F4F5]"}`}
              >
                <span className="text-3xl">{v.emoji}</span>
                <p className={`font-black text-base ${i === 0 ? "text-white" : "text-[#0e0e0e]"}`}>{v.title}</p>
                <p className={`text-sm leading-relaxed ${i === 0 ? "text-white/55" : "text-black/50"}`}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE 3 ═══════════════ */}
      <Marquee text="Marketing is our Jam" speed={20} italic />

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <motion.div {...fx(0)}><SectionLabel>What we do</SectionLabel></motion.div>
            <motion.h2 {...fx(0.06)} className="text-[clamp(32px,5vw,56px)] font-black leading-tight tracking-tight max-w-lg">
              Full-stack growth services for ambitious brands.
            </motion.h2>
          </div>
          <motion.div {...fx(0.1)}>
            <Link href="/services" className="group inline-flex items-center gap-2 rounded-full border border-black/15 text-[#0e0e0e] text-sm font-semibold px-6 py-3 hover:bg-black/5 transition-all">
              View all services <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/8 rounded-2xl overflow-hidden">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                {...fx(i * 0.05)}
                whileHover={{ backgroundColor: "#f7f7f7" }}
                className="group bg-white p-8 flex flex-col gap-5 cursor-default transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-black/25 tracking-widest">{s.num}</span>
                  <Icon className="h-4 w-4 text-black/20 group-hover:text-black/50 transition-colors" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-[#0e0e0e] mb-2 leading-tight group-hover:underline underline-offset-2 decoration-black/20">{s.title}</h3>
                  <p className="text-sm text-black/50 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section className="relative bg-[#0b0b0b] overflow-hidden">
        {/* orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full bg-indigo-600/12 blur-[130px]" />
          <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] rounded-full bg-emerald-600/12 blur-[110px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 lg:px-12 py-28 lg:py-36">
          <motion.div {...fx(0)} className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Currently accepting new clients</span>
            </div>
          </motion.div>

          <motion.h2 {...fx(0.08)} className="text-[clamp(38px,7vw,80px)] font-black text-white leading-[0.98] tracking-tight mb-8">
            Join Brandelo and let&apos;s<br />
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent italic">
              break all the rules.
            </span>
          </motion.h2>

          <motion.p {...fx(0.14)} className="text-lg text-white/40 max-w-md mx-auto leading-relaxed mb-12">
            Ready to build something extraordinary? We&apos;re here, caffeinated, and waiting for your brief.
          </motion.p>

          <motion.div {...fx(0.18)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-white text-[#0e0e0e] text-sm font-bold px-8 py-4 hover:bg-white/90 transition-all shadow-lg shadow-white/10">
              Start a project <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/15 text-white text-sm font-semibold px-8 py-4 hover:bg-white/8 transition-all">
              Explore services
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

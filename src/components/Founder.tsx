"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Quote,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Sparkles,
  Award,
  Rocket,
  Users,
  CalendarDays,
} from "lucide-react";

/**
 * FounderShowcaseNeo.tsx
 * - Always-dark neon + glass aesthetic (no `dark:` needed)
 * - Hero left: angled glass card with portrait + animated ring
 * - Hero right: bold name stack, animated role line, chunky CTAs
 * - Achievements strip, credibility quote, mini timeline & stats
 * - Social row (glassy) + availability card
 */

type Social = { href: string; type: "instagram" | "facebook" | "linkedin" };
type Props = {
  name?: string;
  title?: string;
  company?: string;
  imageSrc?: string;
  socials?: Social[];
  quote?: string;
};

export default function FounderShowcaseNeo({
  name = "Brandelo",
  title = "Founder · Marketing & Growth",
  company = "Brandelo",
  imageSrc = "/images/founder/founder.png",
  socials = [
    { type: "instagram", href: "https://www.instagram.com/brandelo_digital/" },
    { type: "facebook", href: "https://www.facebook.com/profile.php?id=61574286205890" },
    { type: "linkedin", href: "https://linkedin.com/" },
  ],
  quote = "We build compounding growth systems—creative, performance, and engineering in one loop.",
}: Props) {
  return (
    <section className="relative isolation-isolate overflow-hidden bg-[#0b1020] text-white">
      {/* Background: aurora + grid + slow conic glow */}
      <NeoBackdrop />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-14">
        {/* Top: Hero Split */}
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,520px),1fr]">
          {/* Left: Angled portrait card */}
          <PortraitCard imageSrc={imageSrc} />

          {/* Right: Name, role, CTAs, socials */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur"
            >
              <Sparkles className="h-4 w-4" /> Meet the founder
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-4 text-[clamp(40px,8vw,72px)] font-extrabold leading-[0.95]"
            >
              {name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-2 text-lg text-white/80"
            >
              {title} at <span className="font-semibold text-white">{company}</span>
            </motion.p>

            {/* Animated role ticker */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              {["Performance", "Design Systems", "Web Engineering", "Analytics"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85 backdrop-blur"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(56,189,248,.35)] hover:opacity-95"
              >
                Start a project <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/15"
              >
                About the studio
              </Link>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 flex items-center gap-3"
            >
              {socials.map((s) => (
                <SocialIcon key={s.type} {...s} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Achievements strip */}
        <AchievementsStrip />

        {/* Quote + availability */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr,.9fr]">
          <QuoteCard quote={quote} />
          <AvailabilityCard />
        </div>

        {/* Mini Timeline + Stats */}
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <MiniTimeline />
          <MiniStats />
        </div>
      </div>
    </section>
  );
}

/* ---------------- UI pieces ---------------- */

function NeoBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.22),transparent_50%),radial-gradient(70%_50%_at_82%_22%,rgba(34,197,94,0.18),transparent_50%),#0b1020]" />
      <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-founder-neo" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke="white" strokeOpacity="0.06" />
            </pattern>
          </defs>
        </svg>
      </div>
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
          animation: "spin 50s linear infinite",
        }}
      />
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

function PortraitCard({ imageSrc }: { imageSrc: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, rotate: -0.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.6 }}
      className="relative mx-auto w-full max-w-[520px]"
    >
      {/* Outer glow */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-500/30 via-emerald-400/25 to-fuchsia-500/30 blur-2xl" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl [transform:skewY(-1.2deg)]">
        {/* conic border sheen */}
        <div className="absolute inset-0 rounded-[1.7rem] opacity-40 bg-[conic-gradient(from_0deg,rgba(16,185,129,.35),rgba(59,130,246,.35),rgba(168,85,247,.35),rgba(16,185,129,.35))]" />
        {/* animated ring */}
        <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full border border-white/10 blur-xl" />
        <div className="relative">
          <Image
            src={imageSrc}
            alt="Founder portrait"
            width={520}
            height={520}
            priority
            className="h-auto w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent" />
        </div>
      </div>
    </motion.div>
  );
}

function SocialIcon({ href, type }: Social) {
  const Icon = type === "instagram" ? Instagram : type === "facebook" ? Facebook : Linkedin;
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className="group relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <Icon className="h-[18px] w-[18px]" />
    </Link>
  );
}

function AchievementsStrip() {
  const items = [
    { icon: Award, label: "Clio shortlist", sub: "Brand Craft" },
    { icon: Rocket, label: "3.4x avg ROAS", sub: "Performance" },
    { icon: Users, label: "40+ brands", sub: "B2C · B2B" },
  ];
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
          className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <it.icon className="h-5 w-5 text-emerald-300" />
            <div className="text-sm font-semibold">{it.label}</div>
          </div>
          <div className="mt-1 text-xs text-white/70">{it.sub}</div>
        </motion.div>
      ))}
    </div>
  );
}

function QuoteCard({ quote }: { quote: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 pr-7 shadow-2xl backdrop-blur-xl"
    >
      <Quote className="absolute -right-2 -top-2 h-14 w-14 text-white/10" />
      <p className="text-lg text-white/85">“{quote}”</p>
      <footer className="mt-4 text-sm text-white/70">— {new Date().getFullYear()} · Founder’s note</footer>
    </motion.blockquote>
  );
}

function AvailabilityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        <CalendarDays className="h-4 w-4 text-emerald-300" /> Availability
      </div>
      <div className="text-white/80">
        Taking 2 new growth initiatives this quarter (strategy + build + run).
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {["Discovery Call", "Scope Review", "Kickoff < 7 days"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/80"
            dangerouslySetInnerHTML={{ __html: t }}
          />
        ))}
      </div>
      <Link
        href="#contact"
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(56,189,248,.35)] hover:opacity-95"
      >
        Book a slot <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}

function MiniTimeline() {
  const rows = [
    { year: "2025", what: "Built attribution warehouse + server-side events" },
    { year: "2024", what: "Launched high-velocity SEO & UGC ad engine" },
    { year: "2023", what: "Scaled content + design systems across brands" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
    >
      <div className="text-sm font-semibold text-white/85">Trajectory</div>
      <div className="mt-3 space-y-3">
        {rows.map((r) => (
          <div key={r.year} className="flex items-start gap-4">
            <div className="mt-[6px] h-2 w-2 shrink-0 rounded-full bg-emerald-300" />
            <div>
              <div className="text-xs text-white/60">{r.year}</div>
              <div className="text-sm text-white/85">{r.what}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MiniStats() {
  const kpis = [
    { k: "Avg ROAS", v: "3.4x" },
    { k: "LTV uplift", v: "+28%" },
    { k: "Sites launched", v: "70+" },
    { k: "Team & partners", v: "15+" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xl"
    >
      <div className="text-sm font-semibold text-white/85">Signals</div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {kpis.map((m) => (
          <div
            key={m.k}
            className="rounded-xl border border-white/15 bg-white/10 p-4 text-center text-white/85"
          >
            <div className="text-xs text-white/60">{m.k}</div>
            <div className="mt-1 text-lg font-semibold">{m.v}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

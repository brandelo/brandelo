"use client";

import { useCallback, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Rocket, Sparkles, ArrowRight, Shield, TrendingUp } from "lucide-react";

type Action = {
  label: string;
  onClick?: () => void;
  href?: string;
};

type HeroProps = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  primary?: Action;
  secondary?: Action;
  bullets?: string[];
};

/** Parallax tilt hook */
function useParallaxTilt(intensity = 14) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rx = useTransform(my, [0, 1], [intensity, -intensity]);
  const ry = useTransform(mx, [0, 1], [-intensity, intensity]);

  const rxSpring = useSpring(rx, { stiffness: 160, damping: 14, mass: 0.4 });
  const rySpring = useSpring(ry, { stiffness: 160, damping: 14, mass: 0.4 });

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mx.set(x);
      my.set(y);
      // also update CSS var for the shine
      document.documentElement.style.setProperty("--mx", `${Math.max(0, Math.min(1, x)) * 100}%`);
    },
    [mx, my]
  );

  const onLeave = useCallback(() => {
    mx.set(0.5);
    my.set(0.5);
  }, [mx, my]);

  return { ref, rx: rxSpring, ry: rySpring, onMouseMove, onLeave };
}

/**
 * HERO — Always-dark look (self-scoped)
 * - The outer <section> has `dark` class so all `dark:` styles apply inside here,
 *   even when the page is in light mode.
 * - Background, grid and glass are set to the dark palette unconditionally.
 */
export default function Hero3DGlassy({
  kicker = "Brandelo • Digital Marketing",
  title = "Qualifying Your Brand with Digital Growth",
  subtitle = "Within Brandelo, we help businesses grow through smart digital marketing, creative design, and modern website development. Our team builds strategies that bring results, whether you’re looking to increase visibility, boost engagement, or build a strong online presence.",
  primary = { label: "Get Free Audit", href: "/contact" },
  secondary = { label: "See Pricing", href: "/pricing" },
  bullets = ["Digital Marketing Services", "Graphics Design & Branding", "Website Design & Development"],
}: HeroProps) {
  const prefersReduced = useReducedMotion();
  const { ref, rx, ry, onMouseMove, onLeave } = useParallaxTilt(14);

  const cardStyle = useMemo(
    () => ({
      rotateX: prefersReduced ? 0 : rx,
      rotateY: prefersReduced ? 0 : ry,
    }),
    [rx, ry, prefersReduced]
  );

  const renderAction = (a?: Action, variant: "primary" | "ghost" = "primary") => {
    if (!a) return null;
    const className =
      variant === "primary"
        ? "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium shadow-lg shadow-black/30 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black dark:text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-emerald-300/40"
        : "inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-medium border border-white/15 bg-white/10 text-white hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20";
    const content = (
      <span className="inline-flex items-center gap-2">
        {variant === "primary" ? <Rocket className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
        {a.label}
      </span>
    );
    if (a.href) {
      return (
        <a href={a.href} className={className} aria-label={a.label}>
          {content}
        </a>
      );
    }
    return (
      <button onClick={a.onClick} className={className} aria-label={a.label}>
        {content}
      </button>
    );
  };

  return (
    /** NOTE: `dark` here self-scopes the dark styles to this section only */
    <section className="relative overflow-hidden dark bg-[#0b1020] text-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Aurora + base (dark palette, always on) */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeOpacity="0.06" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        {/* Slow rotating conic glow */}
        <motion.div
          aria-hidden
          className="absolute -top-24 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
          }}
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={prefersReduced ? undefined : { duration: 40, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left: Copy */}
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{kicker}</span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-xl text-base text-white/80 sm:text-lg">
              {subtitle}
            </p>

            {/* Bullets */}
            <ul className="mt-6 flex flex-wrap gap-3 text-sm text-white/85">
              {bullets.map((b, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur"
                >
                  <Shield className="h-4 w-4" /> {b}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {renderAction(primary, "primary")}
              {renderAction(secondary, "ghost")}
            </div>

            {/* Trust row */}
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-white/70">
              <div className="inline-flex items-center gap-2">
                <TrendingUp className="h-4 w-4" /> Avg. ROAS 3.4x
              </div>
              <div className="inline-flex items-center gap-2">
                <Shield className="h-4 w-4" /> GDPR + SOC2 Ready
              </div>
            </div>
          </div>

          {/* Right: 3D Card */}
          <motion.div
            className="relative mx-auto w-full max-w-xl [perspective:1400px]"
            onMouseMove={onMouseMove}
            onMouseLeave={onLeave}
          >
            {/* Glow halo */}
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-500/30 via-emerald-400/25 to-fuchsia-500/30 blur-2xl" />

            <motion.div
              ref={ref}
              style={cardStyle}
              className="group relative rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-2xl shadow-black/40 backdrop-blur-xl [transform-style:preserve-3d]"
            >
              {/* Shine layer */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem] [transform:translateZ(40px)]">
                <div className="absolute -inset-1 bg-[radial-gradient(40rem_20rem_at_var(--mx,50%)_-20%,rgba(255,255,255,0.25),transparent_60%)] transition-[--mx] duration-200" />
              </div>

              {/* Top chips */}
              <div className="flex flex-wrap items-center gap-2 [transform:translateZ(50px)]">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                  Real-time Insights
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                  A/B Testing
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur">
                  Attribution
                </span>
              </div>

              {/* Core panel */}
              <div className="mt-6 grid grid-cols-3 gap-4 [transform:translateZ(30px)]">
                {[
                  { label: "SEO", value: "+128%", note: "Organic" },
                  { label: "Paid Ads", value: "-34%", note: "CPC" },
                  { label: "Revenue", value: "+3.4x", note: "ROAS" },
                ].map((kpi, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/15 bg-white/10 p-4 text-white/90 backdrop-blur"
                  >
                    <div className="text-xs uppercase tracking-wide text-white/60">{kpi.label}</div>
                    <div className="mt-1 text-2xl font-semibold text-white">{kpi.value}</div>
                    <div className="text-[11px] text-white/60">{kpi.note}</div>
                  </div>
                ))}
              </div>

              {/* Floating badges */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-6 top-10 hidden sm:block"
                initial={{ y: 10, opacity: 0 }}
                animate={prefersReduced ? { opacity: 1 } : { y: [10, -10, 10], opacity: 1 }}
                transition={prefersReduced ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white/90 backdrop-blur [transform:translateZ(60px)]">
                  <Rocket className="h-4 w-4" /> Launch Strategy
                </div>
              </motion.div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-6 bottom-10 hidden sm:block"
                initial={{ y: -10, opacity: 0 }}
                animate={prefersReduced ? { opacity: 1 } : { y: [-10, 10, -10], opacity: 1 }}
                transition={prefersReduced ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-white/90 backdrop-blur [transform:translateZ(60px)]">
                  <TrendingUp className="h-4 w-4" /> Growth Playbook
                </div>
              </motion.div>

              {/* Bottom ribbon */}
              <div className="mt-6 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 text-white/90 backdrop-blur [transform:translateZ(20px)]">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-white/70">Campaign Health</div>
                    <div className="text-lg font-medium text-white">93/100</div>
                  </div>

                  <motion.div className="h-2 w-40 rounded-full bg-white/10" initial={false}>
                    <motion.div
                      className="h-2 rounded-full bg-white"
                      initial={{ width: 0 }}
                      whileInView={{ width: "86%" }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

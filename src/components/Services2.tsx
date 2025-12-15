"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Star,
  StarHalf,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

/**
 * TestimonialSection.tsx — Always-dark neon + glass (SEO friendly)
 * - Brandelo-focused testimonials
 * - Self-scoped `dark` on the section
 * - Aurora + grid background (matches hero/services)
 * - Auto-play carousel with drag/swipe
 * - 3D tilt on hover + cursor sheen
 * - Accessible controls/dots
 */

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating?: number; // 0..5, can be .5
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Mehta",
    role: "Head of Growth",
    company: "Zentro Apparel",
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop",
    quote:
      "Working with Brandelo has been a turning point for our e-commerce growth. Their performance marketing team rebuilt our complete acquisition funnel — from paid search and social ads to conversion-focused landing pages — and plugged everything into a clean analytics stack. Within a few weeks we saw consistent improvement in ROAS, higher average order value, and far more qualified traffic hitting our site. They behave like an in-house digital growth partner, not a typical agency.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sara Kapoor",
    role: "Founder & CEO",
    company: "PlumePay",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    quote:
      "We relied on Brandelo to design our fintech brand, marketing website, and product UI. They created a complete design system, UX flows, and component library that our product and engineering teams actually enjoy using. The new experience feels premium, fast, and trustworthy — exactly what we wanted for a financial product. Their mix of branding, UI/UX design, and front-end mindset makes them an ideal long-term design partner.",
    rating: 4.5,
  },
  {
    id: "t3",
    name: "Kabir Anand",
    role: "CTO",
    company: "Nordic Gear",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    quote:
      "Our previous analytics setup was unreliable and made it hard to make confident decisions on ad spend and product roadmap. Brandelo rebuilt our tracking strategy from the ground up with server-side events, a modern data pipeline, and clear dashboards for the leadership team. Now we can see exactly which campaigns and channels drive revenue, not just clicks. Their engineering team speaks both business and technical language, which made implementation smooth and low-stress.",
    rating: 5,
  },
];

function useTilt(intensity = 10) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useTransform(my, [0, 1], [intensity, -intensity]);
  const ry = useTransform(mx, [0, 1], [-intensity, intensity]);
  const rxS = useSpring(rx, { stiffness: 180, damping: 16 });
  const ryS = useSpring(ry, { stiffness: 180, damping: 16 });
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }
  return { mx, rx: rxS, ry: ryS, onMove, onLeave };
}

function Stars({ value = 5 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div
      className="inline-flex items-center gap-1 text-amber-300"
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: full }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" />
      ))}
      {half && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 opacity-30" />
      ))}
    </div>
  );
}

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4000);
    return () => clearInterval(id);
  }, [count, isPaused]);

  const go = (dir: -1 | 1) =>
    setIndex((i) => (i + dir + count) % count);

  // Drag / swipe via pointer events
  const startX = useRef<number | null>(null);
  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (startX.current == null) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx > 0 ? -1 : 1);
    startX.current = null;
  }

  const active = useMemo(() => TESTIMONIALS[index], [index]);

  return (
    <section
      className="relative overflow-hidden dark bg-[#0b1020] text-white py-24"
      aria-label="Client testimonials and reviews for Brandelo digital marketing, branding, and technology services"
    >
      {/* Background (aurora + grid) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid-testimonials"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="white"
                  strokeOpacity="0.06"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#grid-testimonials)"
            />
          </svg>
        </div>
        <motion.div
          aria-hidden
          className="absolute -top-40 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, rgba(59,130,246,0.35), rgba(168,85,247,0.35), rgba(34,197,94,0.35), rgba(59,130,246,0.35))",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Client Testimonials & Reviews
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold">
            Trusted by Growth, Product & Tech Teams
          </h2>
          <p className="mt-2 text-white/70">
            Hear from founders, marketing leaders, and technology teams
            who partner with Brandelo for performance marketing, brand design,
            UX, and modern web development.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative mx-auto w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <Slide key={active.id} t={active} />
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              aria-label="Previous testimonial"
              onClick={() => go(-1)}
              className="rounded-xl border border-white/20 bg-white/10 p-2 text-white shadow-sm backdrop-blur transition hover:bg-white/15"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Dots
              count={count}
              index={index}
              onSelect={setIndex}
            />
            <button
              aria-label="Next testimonial"
              onClick={() => go(1)}
              className="rounded-xl border border-white/20 bg-white/10 p-2 text-white shadow-sm backdrop-blur transition hover:bg-white/15"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ t }: { t: Testimonial }) {
  const { mx, rx, ry, onMove, onLeave } = useTilt(10);
  const mxPct = useTransform(mx, (v) => `${v * 100}%`);
  const sheen = useMotionTemplate`radial-gradient(40rem 20rem at ${mxPct} -20%, rgba(255,255,255,0.25), transparent 60%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ duration: 0.45 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry }}
      className="relative rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl [transform-style:preserve-3d]"
      role="group"
      aria-label={`Testimonial from ${t.name}, ${t.role} at ${t.company}`}
    >
      {/* border glow */}
      <div className="absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_0deg,rgba(16,185,129,.35),rgba(59,130,246,.35),rgba(168,85,247,.35),rgba(16,185,129,.35))] opacity-40" />

      {/* sheen */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[2rem]"
        style={{ background: sheen }}
      />

      <div className="relative z-10 grid gap-6 sm:grid-cols-[auto,1fr] sm:gap-8">
        {/* Avatar */}
        <div className="flex items-start gap-4 sm:flex-col">
          <img
            src={t.avatar}
            alt={`${t.name}, ${t.role} at ${t.company}`}
            className="h-16 w-16 shrink-0 rounded-2xl object-cover sm:h-24 sm:w-24 border border-white/30"
          />
          <div className="hidden sm:block">
            <Stars value={t.rating ?? 5} />
          </div>
        </div>

        {/* Content */}
        <div>
          <Quote className="mb-2 h-6 w-6 text-emerald-300" />
          <p className="text-lg text-white/80">“{t.quote}”</p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="font-semibold text-white">
              {t.name}
            </span>
            <span className="text-white/60">
              • {t.role}, {t.company}
            </span>
          </div>
          <div className="mt-3 sm:hidden">
            <Stars value={t.rating ?? 5} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Dots({
  count,
  index,
  onSelect,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to testimonial ${i + 1}`}
          aria-pressed={index === i}
          className={`h-2.5 w-2.5 rounded-full transition ${
            i === index
              ? "bg-white"
              : "bg-white/30 hover:bg-white/50"
          }`}
        />
      ))}
    </div>
  );
}

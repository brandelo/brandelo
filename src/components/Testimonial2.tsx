"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, StarHalf, Quote, ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating?: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Aarav Mehta",
    role: "Head of Growth",
    company: "Zentro Apparel",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop",
    quote: "Working with Brandelo has been a turning point for our e-commerce growth. Their performance marketing team rebuilt our complete acquisition funnel and within weeks we saw consistent improvement in ROAS, higher AOV, and far more qualified traffic.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Sara Kapoor",
    role: "Founder & CEO",
    company: "PlumePay",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
    quote: "We relied on Brandelo to design our fintech brand, marketing website, and product UI. They created a complete design system that our product and engineering teams actually enjoy using. The new experience feels premium, fast, and trustworthy.",
    rating: 4.5,
  },
  {
    id: "t3",
    name: "Kabir Anand",
    role: "CTO",
    company: "Nordic Gear",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    quote: "Brandelo rebuilt our tracking strategy from the ground up with server-side events, a modern data pipeline, and clear dashboards for the leadership team. Now we can see exactly which campaigns drive revenue, not just clicks.",
    rating: 5,
  },
];

function Stars({ value = 5 }: { value?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
      {half && <StarHalf className="h-4 w-4 fill-current" />}
      {Array.from({ length: 5 - full - (half ? 1 : 0) }).map((_, i) => <Star key={`e${i}`} className="h-4 w-4 opacity-20" />)}
    </div>
  );
}

export default function TestimonialSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 4500);
    return () => clearInterval(id);
  }, [count, isPaused]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count);
  const active = TESTIMONIALS[index];

  return (
    <section
      className="relative py-16 sm:py-24 bg-[#F4F4F5] text-[#0e0e0e] overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Subtle watermark */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden flex items-center justify-center">
        <span className="text-[20vw] font-black text-black/[0.03] uppercase tracking-tighter whitespace-nowrap leading-none">
          TRUST
        </span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 text-black/50 text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5">
              Reviews
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#0e0e0e]">
              What Clients<br />Say<span className="text-amber-400">.</span>
            </h2>
          </div>
          {/* Nav arrows */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous"
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full border border-black/15 hover:bg-black/5 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-black/60" />
            </button>
            <button
              aria-label="Next"
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full border border-black/15 hover:bg-black/5 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-black/60" />
            </button>
          </div>
        </div>

        {/* Card */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-[1fr_2fr] gap-6 sm:gap-10 p-6 sm:p-10 lg:p-12 rounded-3xl border border-black/8 bg-[#f8f8f8] shadow-sm"
            >
              {/* Avatar + info */}
              <div className="flex flex-col gap-4">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-black/10 shadow-sm"
                />
                <div>
                  <div className="font-bold text-lg text-[#0e0e0e]">{active.name}</div>
                  <div className="text-black/50 text-sm">{active.role}, {active.company}</div>
                </div>
                <Stars value={active.rating ?? 5} />
              </div>

              {/* Quote */}
              <div className="flex flex-col justify-center">
                <Quote className="w-8 h-8 text-amber-400 mb-4" />
                <p className="text-xl sm:text-2xl font-medium leading-snug text-[#1a1a1a]/85">
                  &ldquo;{active.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-amber-400"
                    : "w-2 bg-black/20 hover:bg-black/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

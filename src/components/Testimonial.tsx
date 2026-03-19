"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  // optional image url if you want to place a real photo inside the left shape
  image?: string;
};

type Props = {
  title?: string;
  items?: Testimonial[];
  autoPlay?: boolean;
  intervalMs?: number;
  className?: string;
};

const DEFAULT_ITEMS: Testimonial[] = [
  {
    name: "Pooja Mehta",
    role: "Marketing Head",
    quote:
      "Web Digital Bazaar is a leading Social Media Marketing Agency in Delhi NCR offering Paid Social Media Marketing Services & SMM Services in India.",
  },
  {
    name: "Aman Verma",
    role: "Founder, Craftly",
    quote:
      "They elevated our presence across SEO and SMM with clear reporting and measurable growth month over month.",
  },
  {
    name: "Neha Kapoor",
    role: "Product Lead",
    quote:
      "Clean execution, smart creatives, and solid performance marketing. Highly recommended for fast-moving teams.",
  },
];

export default function Testimonials({
  title = "What Clients Say’s",
  items = DEFAULT_ITEMS,
  autoPlay = true,
  intervalMs = 5000,
  className = "",
}: Props) {
  const [idx, setIdx] = useState(0);

  const go = (dir: -1 | 1) =>
    setIdx((p) => (p + dir + items.length) % items.length);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const t = setInterval(() => go(1), intervalMs);
    return () => clearInterval(t);
  }, [autoPlay, intervalMs, items.length]);

  return (
    <section
      className={[
        "relative mx-auto max-w-7xl px-4 py-12 sm:py-16",
        "bg-[#F4F4F5] text-[#0e0e0e] dark:bg-[#0b0f0e] dark:text-white",
        "overflow-hidden rounded-xl",
        className,
      ].join(" ")}
    >
      {/* Watermark title */}
      <div className="relative mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {title}
        </h2>
        <div
          aria-hidden
          className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 text-[clamp(40px,6vw,72px)] font-extrabold leading-none tracking-tight text-black/5 dark:text-white/5 select-none"
        >
          {title}
        </div>
      </div>

      {/* Slider viewport */}
      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {items.map((t, i) => (
            <Slide key={i} t={t} />
          ))}
        </div>

        {/* Arrows */}
        {items.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="absolute left-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/70 text-black shadow hover:bg-white/90 active:scale-95 transition dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/70 text-black shadow hover:bg-white/90 active:scale-95 transition dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {items.length > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={[
                "h-2.5 w-2.5 rounded-full transition-all",
                i === idx
                  ? "bg-[#2e5b3f] w-6"
                  : "bg-black/20 hover:bg-black/40 dark:bg-white/20 dark:hover:bg-white/40",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Slide({ t }: { t: Testimonial }) {
  return (
    <article className="min-w-full px-2">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.1fr_1fr]">
        {/* Left: big rounded media block */}
        <div className="relative h-48 sm:h-56 md:h-64">
          <div className="absolute inset-0 rounded-[28px] bg-black/10 dark:bg-white/10" />
          {/* Optional real image inside the shape */}
          {t.image && (
            <img
              src={t.image}
              alt={t.name}
              className="absolute inset-0 h-full w-full rounded-[28px] object-cover mix-blend-normal"
            />
          )}
        </div>

        {/* Right: text + small square accent */}
        <div className="relative">
          {/* small square accent */}
          <div className="absolute -top-6 left-0 h-12 w-12 rounded-sm bg-black/10 dark:bg-white/10" />

          <div className="pl-0 md:pl-6">
            <h3 className="text-[20px] font-extrabold text-[#2e5b3f]">
              {t.name}
            </h3>
            <p className="mt-1 text-lg font-extrabold text-black dark:text-white">
              {t.role}
            </p>
            <p className="mt-4 text-[13px] leading-5 text-black/80 dark:text-white/80">
              {t.quote}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

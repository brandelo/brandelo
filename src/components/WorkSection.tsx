"use client";

import React, { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles, ArrowUpRight, X, Tag } from "lucide-react";

/**
 * WorkSection.tsx — Dark neon + glass (SEO-friendly)
 * - SEO-focused titles, blurbs & alt text
 * - Semantic copy for digital marketing, branding, UI/UX & web development
 * - Same visual design & animations
 */

type Category = "Marketing" | "Design" | "Technology";

type WorkItem = {
  id: string;
  title: string;
  client: string;
  category: Category;
  cover: string; // image url
  video?: string; // optional video preview
  tags?: string[];
  blurb?: string;
};

const WORKS: WorkItem[] = [
  {
    id: "w1",
    title: "E-commerce ROAS Growth Campaign",
    client: "Zentro Apparel",
    category: "Marketing",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Sa10qDPmIASt0ClDjEkVKTewMJnwKMSnPw&s",
    tags: ["Paid Ads", "Performance Marketing", "Conversion Landing Pages"],
    blurb:
      "Full-funnel e-commerce performance marketing for a D2C fashion brand—paid search, paid social, and conversion-focused landing pages to increase ROAS and profitable revenue.",
  },
  {
    id: "w2",
    title: "Fintech Brand UI Kit & Design System",
    client: "PlumePay",
    category: "Design",
    cover:
      "https://uxpin.com/studio/wp-content/themes/uxpin-juggernaut/img/cta-banner-merge.png",
    tags: ["Design System", "UI/UX Design", "Accessible Components"],
    blurb:
      "A scalable fintech design system with reusable UI components, design tokens, and Figma libraries to keep product, marketing, and brand visuals consistent across platforms.",
  },
  {
    id: "w3",
    title: "Headless Commerce Website Development",
    client: "Nordic Gear",
    category: "Technology",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFyASNfpKVxke0zpSnJKfmeYKV25N_nKiApA&s",
    tags: ["Next.js Development", "Headless CMS", "Edge Performance"],
    blurb:
      "High-performance headless commerce implementation with Next.js, edge caching, and modular content blocks to improve SEO, page speed, and merchandising flexibility.",
  },
  {
    id: "w4",
    title: "Product Launch Video Funnel Strategy",
    client: "Loop Fitness",
    category: "Marketing",
    cover:
      "https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/images/methode/2018/12/18/66adc5e4-01aa-11e9-b0d2-cf4a0f50367e_image_hires_181450.JPG?itok=4xIlRpYq&v=1545128094",
    video: "",
    tags: ["Video Marketing", "UGC Ads", "YouTube Campaigns"],
    blurb:
      "Conversion-driven video funnel with UGC-style creatives, YouTube ads, and mid-funnel education to increase sign-ups and reduce cost per acquisition.",
  },
  {
    id: "w5",
    title: "Brand Identity & Visual Refresh",
    client: "Alto Studio",
    category: "Design",
    cover:
      "https://tsugi-studio.com/web/web/images/altostudio/video-thumbnaill.png",
    tags: ["Brand Strategy", "Visual Identity", "Illustration System"],
    blurb:
      "Complete brand refresh including logo system, typography, color palette, illustration style, and motion guidelines for a cohesive high-end creative studio presence.",
  },
  {
    id: "w6",
    title: "Analytics & Marketing Data Pipeline",
    client: "GrainFoods Co.",
    category: "Technology",
    cover:
      "https://www.grainyfoods.in/wp-content/uploads/2022/09/Grainy-Foods-Logo-With-TM.png",
    tags: ["Analytics Setup", "Server-Side Tracking", "Marketing Dashboards"],
    blurb:
      "End-to-end analytics stack with server-side tagging, ETL models, and reporting dashboards to give marketing and growth teams accurate campaign performance data.",
  },
];

const CATEGORIES: ("All" | Category)[] = ["All", "Marketing", "Design", "Technology"];

function useTilt(intensity = 12) {
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

function WorkCard({
  w,
  i,
  onOpen,
}: {
  w: WorkItem;
  i: number;
  onOpen: (id: string) => void;
}) {
  const { mx, rx, ry, onMove, onLeave } = useTilt(12);
  const parallaxX = useTransform(mx, [0, 1], [-8, 8]);

  return (
    <motion.article
      layout
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: 0.05 * i, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 text-white shadow-2xl backdrop-blur-xl [transform-style:preserve-3d]"
    >
      {/* Gradient ring border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl p-[1px]">
        <div className="absolute inset-0 -z-10 rounded-3xl opacity-40 bg-[conic-gradient(from_0deg,rgba(16,185,129,.5),rgba(59,130,246,.5),rgba(168,85,247,.5),rgba(16,185,129,.5))]" />
      </div>

      {/* Media */}
      <motion.div
        className="relative aspect-[16/10] overflow-hidden"
        style={{ x: parallaxX, transform: "translateZ(30px)" }}
      >
        {w.video ? (
          <video
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            src={w.video}
            muted
            playsInline
            autoPlay
            loop
          />
        ) : (
          <img
            alt={`${w.title} case study for ${w.client}`}
            src={w.cover}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        )}
        <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[11px] text-white shadow-md backdrop-blur-sm">
          <Tag className="h-3 w-3" /> {w.category}
        </div>
      </motion.div>

      {/* Body */}
      <div className="p-5" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">{w.title}</h3>
            <p className="text-sm text-white/70">
              {w.client} • {w.category}
            </p>
          </div>
          <button
            onClick={() => onOpen(w.id)}
            className="inline-flex items-center gap-1 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15"
            aria-label={`View case study: ${w.title} for ${w.client}`}
          >
            View <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {w.blurb && (
          <p className="mt-2 text-sm text-white/75 line-clamp-2">{w.blurb}</p>
        )}

        {w.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {w.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/75 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

export default function WorkSection() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? WORKS : WORKS.filter((w) => w.category === active)),
    [active]
  );
  const openItem = useMemo(
    () => WORKS.find((w) => w.id === openId) || null,
    [openId]
  );

  return (
    <section
      className="relative overflow-hidden dark bg-[#0b1020] text-white py-24"
      aria-label="Client work, digital marketing case studies, branding design and web development projects"
    >
      {/* Background (aurora + grid) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_10%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(70%_50%_at_80%_20%,rgba(34,197,94,0.20),transparent_50%),#0b1020]" />
        <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]">
          <svg
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            role="presentation"
          >
            <defs>
              <pattern
                id="grid-work"
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
            <rect width="100%" height="100%" fill="url(#grid-work)" />
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

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Our Client Work & Case Studies
            </div>
            <h2 className="text-4xl sm:text-5xl font-semibold">
              Digital Case Studies & Projects
            </h2>
            <p className="mt-3 max-w-xl text-white/70">
              Explore real client projects in performance marketing, brand
              design, UI/UX, and modern web technology—built to improve
              visibility, user experience, and revenue growth.
            </p>
          </div>

          {/* Filters with animated underline */}
          <div className="relative inline-flex flex-wrap items-center gap-2 rounded-xl border border-white/20 bg-white/10 p-1 backdrop-blur">
            <span className="sr-only">Filter by project category</span>
            <div className="relative flex gap-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative rounded-lg px-3 py-1.5 text-sm transition ${
                    active === c ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                  aria-pressed={active === c}
                >
                  {active === c && (
                    <motion.span
                      layoutId="active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    />
                  )}
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((w, i) => (
              <WorkCard key={w.id} w={w} i={i} onOpen={setOpenId} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <button
              aria-label="Close case study"
              onClick={() => setOpenId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${openItem.title} case study for ${openItem.client}`}
              className="relative w-full max-w-[min(92vw,900px)] sm:max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 bg-zinc-900/90 text-white shadow-2xl backdrop-blur-xl"
              initial={{ y: 30, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              {/* Media */}
              <div className="relative h-[40vh] w-full sm:h-[48vh]">
                {openItem.video ? (
                  <video
                    className="h-full w-full object-cover"
                    src={openItem.video}
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover"
                    src={openItem.cover}
                    alt={`${openItem.title} project preview for ${openItem.client}`}
                  />
                )}

                <button
                  onClick={() => setOpenId(null)}
                  className="absolute right-3 top-3 inline-flex items-center justify-center rounded-xl bg-black/70 p-2 text-white shadow-md backdrop-blur hover:bg-black/80"
                  aria-label="Close case study modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="max-h-[calc(90vh-40vh)] overflow-y-auto p-5 sm:max-h-[calc(90vh-48vh)] sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{openItem.title}</h3>
                    <p className="text-sm text-white/70">
                      {openItem.client} • {openItem.category} Project
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(56,189,248,.35)] hover:opacity-90"
                  >
                    Start a Project <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>

                {openItem.blurb && (
                  <p className="mt-3 text-white/80">
                    {openItem.blurb}
                  </p>
                )}

                {openItem.tags && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {openItem.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                    <div className="mb-2 text-sm font-medium">Approach</div>
                    <p className="text-sm text-white/75">
                      Strategy first: discovery, audience research, and clear
                      success metrics—followed by design, development, and
                      iterative optimization to drive measurable business
                      outcomes.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                    <div className="mb-2 text-sm font-medium">Tools & Stack</div>
                    <p className="text-sm text-white/75">
                      GA4, server-side tracking, Next.js, Tailwind, Figma, ad
                      platforms, and BI dashboards—selected and integrated to
                      match the client&apos;s growth and reporting needs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Tag, SlidersHorizontal } from "lucide-react";

type Category = "Marketing" | "Design" | "Technology";

type WorkItem = {
  id: string;
  title: string;
  client: string;
  category: Category;
  cover: string;
  tags?: string[];
  blurb?: string;
};

const WORKS: WorkItem[] = [
  {
    id: "w1",
    title: "E-commerce ROAS Growth Campaign",
    client: "Zentro Apparel",
    category: "Marketing",
    cover: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
    tags: ["Paid Ads", "Performance Marketing", "Landing Pages"],
    blurb: "Full-funnel e-commerce performance marketing for a D2C fashion brand — paid search, paid social, and conversion-focused landing pages to increase ROAS.",
  },
  {
    id: "w2",
    title: "Fintech Brand UI Kit & Design System",
    client: "PlumePay",
    category: "Design",
    cover: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
    tags: ["Design System", "UI/UX", "Components"],
    blurb: "A scalable fintech design system with reusable UI components, design tokens, and Figma libraries to keep product and marketing visuals consistent.",
  },
  {
    id: "w3",
    title: "Headless Commerce Website",
    client: "Nordic Gear",
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tags: ["Next.js", "Headless CMS", "Edge Performance"],
    blurb: "High-performance headless commerce with Next.js, edge caching, and modular content blocks to improve SEO, page speed, and merchandising.",
  },
  {
    id: "w4",
    title: "Product Launch Video Funnel",
    client: "Loop Fitness",
    category: "Marketing",
    cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop",
    tags: ["Video Marketing", "UGC Ads", "YouTube"],
    blurb: "Conversion-driven video funnel with UGC-style creatives, YouTube ads, and mid-funnel education to increase sign-ups and reduce CPA.",
  },
  {
    id: "w5",
    title: "Brand Identity & Visual Refresh",
    client: "Alto Studio",
    category: "Design",
    cover: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    tags: ["Branding", "Visual Identity", "Illustration"],
    blurb: "Complete brand refresh including logo system, typography, color palette, and illustration style for a cohesive high-end creative studio.",
  },
  {
    id: "w6",
    title: "Analytics & Marketing Data Pipeline",
    client: "GrainFoods Co.",
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tags: ["Analytics", "Server-Side Tracking", "Dashboards"],
    blurb: "End-to-end analytics stack with server-side tagging, ETL models, and reporting dashboards for accurate campaign performance data.",
  },
];

const CATEGORIES: ("All" | Category)[] = ["All", "Marketing", "Design", "Technology"];
const ACCENT: Record<string, string> = {
  Marketing: "bg-pink-500",
  Design: "bg-teal-500",
  Technology: "bg-indigo-500",
};

export default function WorkSection() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? WORKS : WORKS.filter((w) => w.category === active)),
    [active]
  );
  const openItem = useMemo(() => WORKS.find((w) => w.id === openId) || null, [openId]);

  return (
    <section
      className="relative py-16 sm:py-24 bg-[#F4F4F5] text-[#111] overflow-hidden"
      id="work"
      aria-label="Our work"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-black/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5">
              Case Studies
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              Our Work<span className="text-teal-500">.</span>
            </h2>
          </div>

          {/* Filter Tabs — scrollable on mobile */}
          <div className="w-full lg:w-auto overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5 p-1.5 bg-white rounded-2xl border border-black/8 w-max min-w-full lg:min-w-0">
              <SlidersHorizontal className="w-4 h-4 text-black/30 ml-1 flex-shrink-0" />
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                    active === c ? "bg-black text-white shadow-sm" : "text-black/50 hover:text-black"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((w, i) => (
              <motion.article
                key={w.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="group bg-white rounded-3xl overflow-hidden border border-black/8 hover:border-black/20 transition-all duration-300 cursor-pointer"
                onClick={() => setOpenId(w.id)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={w.cover}
                    alt={w.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-white text-[11px] font-bold uppercase tracking-wide ${ACCENT[w.category]}`}>
                    {w.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-base tracking-tight">{w.title}</h3>
                      <p className="text-sm text-black/40 mt-0.5">{w.client}</p>
                    </div>
                    <div className="p-2 rounded-xl bg-black/5 group-hover:bg-black group-hover:text-white transition-colors flex-shrink-0">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                  {w.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {w.tags.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-[11px] font-semibold bg-black/5 rounded-full text-black/50">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {openItem && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close"
              onClick={() => setOpenId(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl bg-white text-[#111] shadow-2xl"
              initial={{ y: 30, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.97, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <div className="relative h-[40vh]">
                <img src={openItem.cover} alt={openItem.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setOpenId(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 shadow hover:bg-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-white text-xs font-bold uppercase ${ACCENT[openItem.category]}`}>
                  {openItem.category}
                </div>
              </div>
              <div className="p-6 sm:p-8 overflow-y-auto max-h-[50vh]">
                <h3 className="text-2xl font-black tracking-tight">{openItem.title}</h3>
                <p className="text-sm text-black/40 mt-1 mb-4">{openItem.client}</p>
                {openItem.blurb && <p className="text-black/70 leading-relaxed">{openItem.blurb}</p>}
                {openItem.tags && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {openItem.tags.map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full bg-black/5 text-xs font-semibold text-black/50">{t}</span>
                    ))}
                  </div>
                )}
                <a
                  href="#contact"
                  onClick={() => setOpenId(null)}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-black/80 transition-colors"
                >
                  Start a Project <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FAQ = { q: string; a: string };

const FAQS: FAQ[] = [
  {
    q: "What is Brandelo and what do you specialize in?",
    a: "Brandelo is a performance-focused digital marketing and creative growth studio. We specialize in SEO, Google & Meta Ads, social media marketing, branding, and modern web development. We help businesses grow revenue, traffic, and conversions with data-driven strategies.",
  },
  {
    q: "How does your onboarding process work and how soon can we start?",
    a: "We begin with a short discovery call to understand your goals, audience, and current marketing structure. After that we share a strategic roadmap and kickoff plan. Most new clients can start within 5–7 business days.",
  },
  {
    q: "What services does Brandelo offer?",
    a: "Brandelo offers complete growth services: SEO, PPC ads, social media marketing, branding, funnel design, content strategy, landing pages, CRO, and website development using Next.js and WordPress.",
  },
  {
    q: "Can you work alongside my in-house marketing or tech team?",
    a: "Yes. Brandelo works as your extended growth and creative partner. We collaborate with in-house teams on strategy, execution, and reporting using your tools, processes, and workflows.",
  },
  {
    q: "What results can I expect and how do you measure performance?",
    a: "We align KPIs from day one—traffic, CAC, ROAS, conversions, and revenue. We set up proper tracking, dashboards, and weekly/monthly reporting. Expect transparent communication, clear insights, and strategies that move results.",
  },
];

export default function FAQSectionWDB() {
  const [open, setOpen] = useState<number | null>(0);
  const [askText, setAskText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!askText.trim()) return;
    setAskText("");
  };

  return (
    <section
      className="relative py-16 sm:py-24 bg-[#F4F4F5] text-[#0e0e0e] overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* bg decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden flex items-center justify-center">
        <span className="text-[20vw] font-black text-black/[0.04] uppercase tracking-tighter whitespace-nowrap leading-none">FAQ</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/15 text-black/50 text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5">
            Questions
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
            Got Questions<span className="text-orange-500">?</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">
          {/* FAQs */}
          <div className="space-y-3">
            {FAQS.map((item, i) => (
              <motion.div
                key={i}
                layout
                className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="text-sm font-bold text-black/25 w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-semibold">{item.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.2 }}>
                    <Plus className="w-5 h-5 text-black/40" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-5 pl-[4.5rem] text-sm leading-relaxed text-black/55">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-8 p-6 sm:p-8 rounded-3xl bg-white text-[#111] border border-black/8 shadow-sm flex flex-col gap-6"
          >
            <div>
              <h3 className="text-2xl font-black tracking-tight leading-tight">
                Still have a question?
              </h3>
              <p className="text-black/50 text-sm mt-2">
                Ask us anything — we'll reply soon!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <textarea
                rows={4}
                value={askText}
                onChange={(e) => setAskText(e.target.value)}
                placeholder="Type your question about Brandelo..."
                className="w-full resize-none rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3 text-sm placeholder:text-black/30 outline-none focus:border-black/30 transition-colors"
              />
              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full font-semibold text-sm hover:bg-black/80 transition-colors"
              >
                Send Question →
              </button>
            </form>

            <p className="text-xs text-black/30 text-center">
              We usually respond within 1 business day.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

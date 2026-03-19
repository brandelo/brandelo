"use client";

import { motion } from "framer-motion";
import { LineChart, Layout, Smartphone, Search, Zap, Megaphone, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: <LineChart className="w-7 h-7" />,
    title: "Performance Marketing",
    description: "Data-driven ad campaigns across Google, Meta, and TikTok to maximize your ROAS and drive scalable growth.",
    tag: "Ads",
    accent: "bg-pink-500",
  },
  {
    icon: <Layout className="w-7 h-7" />,
    title: "UI/UX Design",
    description: "Stunning, user-centric interfaces that engage visitors and convert them into loyal customers.",
    tag: "Design",
    accent: "bg-yellow-400",
  },
  {
    icon: <Smartphone className="w-7 h-7" />,
    title: "Web Development",
    description: "Lightning-fast, SEO-optimized web applications built with modern frameworks like Next.js and React.",
    tag: "Dev",
    accent: "bg-teal-500",
  },
  {
    icon: <Search className="w-7 h-7" />,
    title: "SEO Optimization",
    description: "Comprehensive technical and on-page SEO strategies to dominate search engine rankings.",
    tag: "SEO",
    accent: "bg-orange-500",
  },
  {
    icon: <Megaphone className="w-7 h-7" />,
    title: "Brand Strategy",
    description: "Cohesive brand identities and positioning that resonate perfectly with your target audience.",
    tag: "Brand",
    accent: "bg-indigo-500",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Conversion Optimization",
    description: "A/B testing and funnel optimization to ensure every click has the highest chance of converting.",
    tag: "CRO",
    accent: "bg-emerald-500",
  }
];

export default function ServicesModern() {
  return (
    <section id="services" className="relative py-16 sm:py-24 bg-[#F4F4F5] text-[#111] overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-black/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5"
            >
              What We Do
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]"
            >
              Services<span className="text-pink-500">.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-sm text-base text-black/60 lg:text-right"
          >
            We don't just execute tasks. We act as an extension of your team, providing strategic direction and technical execution.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="group relative p-8 bg-white rounded-3xl border border-black/8 hover:border-black/20 transition-all duration-300 flex flex-col gap-5 cursor-pointer overflow-hidden"
            >
              {/* Hover fill effect */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 rounded-3xl" />

              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-2xl ${service.accent} text-white`}>
                  {service.icon}
                </div>
                <span className="px-3 py-1 text-xs font-bold tracking-widest uppercase bg-black/5 rounded-full">
                  {service.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">{service.title}</h3>
                <p className="text-black/55 text-sm leading-relaxed">{service.description}</p>
              </div>

              <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-black/30 group-hover:text-black/70 transition-colors">
                Learn more <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

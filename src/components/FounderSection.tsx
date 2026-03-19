"use client";

import { motion } from "framer-motion";
import { Linkedin, Instagram, Twitter, Quote } from "lucide-react";

export default function FounderSection() {
  return (
    <section
      className="relative py-16 sm:py-24 bg-[#F4F4F5] text-[#111] overflow-hidden"
      aria-labelledby="founder-heading"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-black/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black text-white text-xs font-semibold tracking-widest uppercase mb-4 sm:mb-5">
            Meet the Founder
          </div>
          <h2 id="founder-heading" className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
            The Person<span className="text-orange-500">.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start"
        >
          {/* Image */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative rounded-3xl overflow-hidden aspect-[3/4] bg-zinc-200"
            >
              <img
                src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop"
                alt="Shaurya Sarin, Founder & CEO of Brandelo"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Name tag overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-white font-black text-2xl tracking-tight">Shaurya Sarin</div>
                <div className="text-white/70 text-sm font-medium">Founder & CEO, Brandelo</div>
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com", Icon: Instagram, label: "Instagram" },
                { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white border border-black/10 hover:bg-black hover:text-white transition-all duration-200 flex items-center justify-center"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <span className="text-xs text-black/40 ml-2">Follow Shaurya</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8 pt-4">
            <div className="space-y-4 text-black/65 leading-relaxed text-lg">
              <p>
                Shaurya Sarin is the Founder & CEO of Brandelo, a performance-driven digital marketing and branding studio that helps brands grow with <strong className="text-black font-semibold">clarity, creativity, and measurable strategy.</strong>
              </p>
              <p>
                With years of experience across growth marketing, brand positioning, and campaign execution, Shaurya has led successful transformations for startups, creators, and established brands.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { value: "10+", label: "Years Exp" },
                { value: "500+", label: "Brands Helped" },
                { value: "3x", label: "Avg Growth" },
              ].map((stat) => (
                <div key={stat.label} className="p-3 sm:p-4 bg-white rounded-2xl border border-black/8 text-center">
                  <div className="text-2xl sm:text-3xl font-black tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-black/45 font-semibold mt-1 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative p-6 bg-black text-white rounded-3xl"
            >
              <Quote className="absolute -top-3 left-6 w-6 h-6 text-yellow-400" />
              <p className="italic text-white/80 leading-relaxed">
                "Marketing isn't about shouting the loudest — it's about telling a story that your audience instantly connects with. When done with intention and data, growth becomes a repeatable system, not a gamble."
              </p>
            </motion.blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

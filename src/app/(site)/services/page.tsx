"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SERVICES = [
  {
    title: "SEO",
    img: "https://images.unsplash.com/photo-1571444846843-ea7c89a05b22?q=80&w=800&auto=format&fit=crop",
    href: "/services/seo",
  },
  {
    title: "SMM",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop",
    href: "/services/smm",
  },
  {
    title: "WEB DEV",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    href: "/services/web-development",
  },
  {
    title: "APP DEV",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    href: "/services/app-development",
  },
  {
    title: "CONTENT",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
    href: "/services/content-marketing",
  },
];

export default function ServicesLanding() {
  return (
    <div className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-black text-white md:flex-row">
      {SERVICES.map((service, i) => (
        <motion.div
          key={service.title}
          // Mobile: stacked sections
          // Desktop: expanding panels on hover
          className={[
            "group relative cursor-pointer overflow-hidden",
            "flex-1 transition-[flex] duration-700 ease-in-out",
            "md:[&:hover]:flex-[1.4]",
            // heights
            "min-h-[55vh] sm:min-h-[60vh] md:min-h-0",
            // borders/separators
            i < SERVICES.length - 1 ? "border-b border-white/10 md:border-b-0 md:border-r" : "",
            "md:border-white/10",
          ].join(" ")}
        >
          {/* Background Image */}
          <Image
            src={service.img}
            alt={service.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 md:group-hover:scale-110"
            unoptimized
            priority={i === 0}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 md:bg-black/40 md:group-hover:bg-black/20 transition-colors duration-700" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-widest drop-shadow"
            >
              {service.title}
            </motion.h2>

            <Link href={service.href} className="mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-2 text-xs sm:text-sm uppercase font-semibold rounded-none bg-white text-black shadow hover:bg-neutral-200 transition-all duration-300"
              >
                Enter
              </motion.button>
            </Link>
          </div>

          {/* Side gradient divider (desktop) */}
          {i < SERVICES.length - 1 && (
            <div className="hidden md:block absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-transparent via-white/15 to-transparent pointer-events-none" />
          )}
        </motion.div>
      ))}

      {/* Soft background wash to blend panel edges */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
    </div>
  );
}

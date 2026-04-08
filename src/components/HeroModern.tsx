"use client";

import { motion } from "framer-motion";

export default function HeroModern() {
  return (
    <section className="relative min-h-screen bg-[#F4F4F5] text-[#111] overflow-hidden flex flex-col pt-24 sm:pt-32">

      {/* Top Main Typography Area */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex-1 flex flex-col justify-center gap-6 sm:gap-2 relative z-10 w-full">

        {/* ROW 1: * DEFINE. DESIGN. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start sm:items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full"
        >
          <span className="translate-y-1 sm:translate-y-3 flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="text-6xl sm:text-8xl md:text-[10vw] lg:text-[120px] leading-none font-black inline-block origin-center"
            >
              *
            </motion.span>
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-[9vw] lg:text-[110px] xl:text-[130px] font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.8]">
            Define<span className="text-pink-500">.</span> Design<span className="text-yellow-400">.</span>
          </h1>
        </motion.div>

        {/* ROW 2: Subtext + BUILD. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col-reverse lg:flex-row items-center lg:items-end justify-between w-full lg:pl-4 xl:pl-16 lg:pr-12 xl:pr-24 mt-4 sm:mt-0"
        >
          <p className="max-w-[280px] sm:max-w-xs text-sm sm:text-base lg:text-lg font-semibold leading-snug mt-8 lg:mt-0 text-center lg:text-left text-black/80">
            Brandelo® is the best digital marketing agency in India that excels in launching, growing, and reinventing brands and startups.
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-[9vw] lg:text-[110px] xl:text-[130px] font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.8]">
            Build<span className="text-teal-500">.</span>
          </h1>
        </motion.div>

        {/* ROW 3: Arrow + MARKET. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center w-full relative mt-8 sm:mt-4 lg:mt-0"
        >
          {/* Yellow Down Arrow */}
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute left-4 sm:left-16 lg:left-32 -top-4 sm:top-2 text-yellow-400"
          >
            <svg width="40" height="60" className="sm:w-[60px] sm:h-[100px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16M19 13l-7 7-7-7" />
            </svg>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-[9vw] lg:text-[110px] xl:text-[130px] font-black tracking-tighter uppercase leading-[0.9] sm:leading-[0.8] ml-12 sm:ml-0">
            Market<span className="text-orange-500">.</span>
          </h1>
        </motion.div>

      </div>

      {/* Bottom Floating Bar & Banner Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-16 sm:mt-20 flex flex-col items-center"
      >
        {/* Texts above image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex justify-between items-end w-full mb-4 sm:mb-6">
          <div className="font-bold text-[10px] sm:text-sm lg:text-xl border-b-2 border-black pb-1 uppercase tracking-tight max-w-[55%] sm:max-w-none leading-tight">
            Turning Big Ideas Into Bold Brands
          </div>

          <a href="/contact" className="relative group cursor-pointer inline-flex items-center justify-center px-1 sm:px-2">
            {/* Highlighter underline bg */}
            <div className="absolute inset-0 bg-yellow-400 -rotate-2 scale-110 group-hover:rotate-0 group-hover:scale-105 transition-all duration-300 origin-bottom-left"></div>
            <span className="relative z-10 font-bold text-xs sm:text-base lg:text-xl whitespace-nowrap pt-1">Let's Talk →</span>
          </a>
        </div>

        {/* Massive Image Container */}
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="w-full h-[25vh] sm:h-[35vh] lg:h-[45vh] bg-zinc-300 rounded-t-[2rem] sm:rounded-t-[3rem] overflow-hidden relative group shadow-2xl">
            {/* Placeholder - easy to swap out below */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2850&auto=format&fit=crop"
              alt="Team collaborating"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}

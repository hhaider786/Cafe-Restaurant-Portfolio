"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, -180]);
  const textY = useTransform(scrollY, [0, 500], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-[-10%] hero-zoom bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=90')",
          backgroundColor: "#1a1208",
          y: bgY,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#12100a]/80 via-[#12100a]/40 to-[#12100a]/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#12100a]/50 via-transparent to-[#12100a]/50" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: textY, opacity: heroOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <span className="section-eyebrow">Est. 2019 · Paris-Inspired</span>
          <span className="amber-line mt-3 mx-auto w-20 block" />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-5 text-[#f5ead8]"
          style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
        >
          Where Every Bite
          <br />
          <em className="text-[#d4a853]">Tells a Story.</em>
        </motion.h1>

        <motion.p
          className="text-[#a09070] text-lg max-w-xl mx-auto mb-9 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          An intimate dining experience crafted with passion, seasonal ingredients,
          and a touch of French elegance.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
        >
          <a href="#reservations" className="shimmer-amber px-8 py-4 text-[#12100a] text-xs tracking-[0.25em] uppercase font-bold hover:opacity-90 transition-opacity">
            Reserve a Table
          </a>
          <a href="#menu" className="px-8 py-4 text-xs tracking-[0.25em] uppercase border border-[#f5ead8]/30 text-[#f5ead8] hover:border-[#d4a853] hover:text-[#d4a853] transition-all duration-300">
            View the Menu
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[#6a5a45] text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} className="text-[#d4a853]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { WebGLHero } from "@/lib/motion/WebGLHero";
import { MaskedText } from "@/lib/motion/MaskedText";
import { MagneticButton } from "@/lib/motion/MagneticButton";

const HERO_IMG = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=85";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, -180]);
  const textY = useTransform(scrollY, [0, 500], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-[-10%]" style={{ y: bgY, willChange: "transform" }}>
        <div className="absolute inset-0 hero-zoom">
          <ImageWithBlur
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </motion.div>

      <WebGLHero
        palette="warm"
        speed={0.4}
        intensity={1.0}
        className="absolute inset-0 mix-blend-soft-light opacity-50"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#12100a]/85 via-[#12100a]/45 to-[#12100a]/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#12100a]/50 via-transparent to-[#12100a]/50" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: textY, opacity: heroOpacity, willChange: "transform" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <span className="section-eyebrow">Est. 2019 · Paris-Inspired</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
        </motion.div>

        <h1
          className="text-5xl md:text-7xl font-bold leading-tight mb-5 text-[#f5ead8]"
          style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
        >
          <MaskedText delay={0.2} stagger={0.07} duration={1}>Where Every Bite</MaskedText>
          <br />
          <em className="text-[#e8be63]">
            <MaskedText delay={0.45} stagger={0.07} duration={1}>Tells a Story.</MaskedText>
          </em>
        </h1>

        <motion.p
          className="text-[#b8a380] text-lg max-w-xl mx-auto mb-9 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          An intimate dining experience crafted with passion, seasonal ingredients,
          and a touch of French elegance.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <MagneticButton
            as="a"
            href="#reservations"
            className="shimmer-amber px-8 py-4 text-[#12100a] text-xs tracking-[0.25em] uppercase font-bold hover:opacity-95 transition-opacity inline-block"
          >
            Reserve a table
          </MagneticButton>
          <a
            href="#menu"
            className="px-8 py-4 text-xs tracking-[0.25em] uppercase border border-[#f5ead8]/30 text-[#f5ead8] hover:border-[#e8be63] hover:text-[#e8be63] transition-all duration-300"
          >
            View the menu
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden
      >
        <span className="text-[#7a6850] text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={18} className="text-[#e8be63]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

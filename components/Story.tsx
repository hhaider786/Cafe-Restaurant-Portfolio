"use client";

import { motion } from "framer-motion";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";

const STORY_IMG = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85";

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 section-cv" style={{ background: "#12100a" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-full h-[480px] overflow-hidden">
            <ImageWithBlur
              src={STORY_IMG}
              alt="Chef Élise Moreau plating a course in the Lumière kitchen"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -right-5 w-36 h-36 border border-[#e8be63]/30 hidden md:block" aria-hidden />
          <div className="absolute -top-5 -left-5 w-36 h-36 border border-[#e8be63]/15 hidden md:block" aria-hidden />
          <div className="absolute bottom-8 left-8 bg-[#12100a]/90 border border-[#e8be63]/25 px-5 py-4">
            <p className="text-[#e8be63] text-[0.6rem] tracking-[0.3em] uppercase mb-1">Established</p>
            <p className="text-[#f5ead8] text-3xl font-bold" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>2019</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="section-eyebrow">Our story</span>
          <span className="amber-line mt-3 mb-6 w-20 block" aria-hidden />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Born from passion,<br />
            <em>crafted with purpose.</em>
          </h2>
          <p className="text-[#b8a380] leading-relaxed mb-5">
            Lumière was born from a single obsession: to bring the warmth and artistry of Parisian dining
            to a city that deserved it. Founded by chef Élise Moreau, every dish on our menu is a love
            letter to the seasons, the producers, and the stories behind each ingredient.
          </p>
          <p className="text-[#b8a380] leading-relaxed mb-8">
            We believe dining is more than sustenance — it is theatre, conversation, and memory.
            From our hand-laid floors to our single-origin wine cellar, every detail at Lumière
            has been chosen to make your evening truly unforgettable.
          </p>
          <dl className="grid grid-cols-3 gap-6 pt-6 border-t border-[#e8be63]/15">
            {[
              { value: "6", label: "Years open" },
              { value: "12", label: "Awards won" },
              { value: "2", label: "Michelin stars" },
            ].map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <p className="text-[#e8be63] text-3xl font-bold" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>{s.value}</p>
                  <p className="text-[#a09070] text-xs tracking-wider uppercase mt-1">{s.label}</p>
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

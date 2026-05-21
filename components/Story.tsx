"use client";

import { motion } from "framer-motion";

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-32 px-6" style={{ background: "#12100a" }}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div
            className="w-full h-[480px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=90')",
              backgroundColor: "#1a1208",
            }}
          />
          <div className="absolute -bottom-5 -right-5 w-36 h-36 border border-[#d4a853]/25 hidden md:block" />
          <div className="absolute -top-5 -left-5 w-36 h-36 border border-[#d4a853]/10 hidden md:block" />
          {/* Est. badge */}
          <div className="absolute bottom-8 left-8 bg-[#12100a]/90 border border-[#d4a853]/20 px-5 py-4">
            <p className="text-[#d4a853] text-[0.6rem] tracking-[0.3em] uppercase mb-1">Established</p>
            <p className="text-[#f5ead8] text-3xl font-bold" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>2019</p>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="section-eyebrow">Our Story</span>
          <span className="amber-line mt-3 mb-6 w-20 block" />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mb-6 leading-tight"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Born from Passion,<br />
            <em>Crafted with Purpose.</em>
          </h2>
          <p className="text-[#8a7a65] leading-relaxed mb-5">
            Lumière was born from a single obsession: to bring the warmth and artistry of Parisian dining
            to a city that deserved it. Founded by chef Élise Moreau, every dish on our menu is a love
            letter to the seasons, the producers, and the stories behind each ingredient.
          </p>
          <p className="text-[#8a7a65] leading-relaxed mb-8">
            We believe dining is more than sustenance — it is theatre, conversation, and memory.
            From our hand-laid floors to our single-origin wine cellar, every detail at Lumière
            has been chosen to make your evening truly unforgettable.
          </p>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#d4a853]/10">
            {[
              { value: "6", label: "Years Open" },
              { value: "12", label: "Awards Won" },
              { value: "2", label: "Michelin Stars" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[#d4a853] text-3xl font-bold" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>{s.value}</p>
                <p className="text-[#6a5a45] text-xs tracking-wider uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData, type MenuItem } from "@/data/menu";

type Tab = "breakfast" | "lunch" | "dinner" | "drinks";
const tabs: { key: Tab; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "drinks", label: "Drinks" },
];

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-5 border-b border-[#d4a853]/10 group hover:border-[#d4a853]/30 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4
            className="text-[#f5ead8] text-lg font-medium group-hover:text-[#d4a853] transition-colors"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            {item.name}
          </h4>
          {item.badges?.map((b) => (
            <span
              key={b}
              className="text-[0.55rem] tracking-wider border border-[#d4a853]/30 text-[#d4a853] px-1.5 py-0.5 rounded-sm"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="text-[#6a5a45] text-sm leading-relaxed">{item.description}</p>
      </div>
      <span
        className="text-[#d4a853] text-lg font-semibold flex-shrink-0"
        style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
      >
        £{item.price}
      </span>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState<Tab>("dinner");

  return (
    <section id="menu" className="py-24 md:py-32 px-6" style={{ background: "#0e0c08" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Curated with Care</span>
          <span className="amber-line mt-3 mx-auto w-20 block" />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Our Menu
          </h2>
          <p className="text-[#6a5a45] mt-3 text-sm">
            V — Vegetarian &nbsp;·&nbsp; GF — Gluten Free &nbsp;·&nbsp; 🌶 — Spicy
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex items-center justify-center gap-1 mb-10 border border-[#d4a853]/15 p-1">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="relative flex-1 py-2.5 text-xs tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: active === key ? "#12100a" : "#6a5a45" }}
            >
              {active === key && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-[#d4a853]"
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {menuData[active].map((item) => (
              <MenuCard key={item.name} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className="text-[#4a3a2a] text-xs text-center mt-10 tracking-wide italic">
          All dishes are freshly prepared. Please inform your server of any allergies.
          A discretionary 12.5% service charge will be added to your bill.
        </p>
      </div>
    </section>
  );
}

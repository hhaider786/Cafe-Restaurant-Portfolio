"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuData, type MenuItem } from "@/data/menu";
import PizzaMenu from "@/components/PizzaMenu";

type Tab = "breakfast" | "lunch" | "dinner" | "drinks" | "pizza";
const tabs: { key: Tab; label: string }[] = [
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
  { key: "drinks", label: "Drinks" },
  { key: "pizza", label: "🍕 Pizza" },
];

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-start justify-between gap-4 py-5 border-b border-[#e8be63]/15 group hover:border-[#e8be63]/40 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3
            className="text-[#f5ead8] text-lg font-medium group-hover:text-[#e8be63] transition-colors"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            {item.name}
          </h3>
          {item.badges?.map((b) => (
            <span
              key={b}
              className="text-[0.55rem] tracking-wider border border-[#e8be63]/40 text-[#e8be63] px-1.5 py-0.5 rounded-sm"
              aria-label={b === "V" ? "Vegetarian" : b === "GF" ? "Gluten free" : "Spicy"}
            >
              {b}
            </span>
          ))}
        </div>
        <p className="text-[#a09070] text-sm leading-relaxed">{item.description}</p>
      </div>
      <span
        className="text-[#e8be63] text-lg font-semibold flex-shrink-0"
        style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
        aria-label={`Price ${item.price} pounds`}
      >
        £{item.price}
      </span>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState<Tab>("dinner");
  const [pizzaBg, setPizzaBg] = useState<string | null>(null);

  return (
    <section id="menu" className="relative py-24 md:py-32 px-6 overflow-hidden" style={{ background: "#0e0c08" }}>
      {/* Pizza flavour background */}
      <AnimatePresence>
        {active === "pizza" && pizzaBg && (
          <motion.div
            key={pizzaBg}
            className="absolute inset-0 bg-cover bg-center scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${pizzaBg})`, filter: "blur(24px) brightness(0.14)", zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        )}
      </AnimatePresence>
      <div className={`relative z-10 mx-auto transition-all duration-500 ${active === "pizza" ? "max-w-5xl" : "max-w-4xl"}`}>
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-eyebrow">Curated with care</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Our menu
          </h2>
          <p className="text-[#a09070] mt-3 text-sm">
            V — Vegetarian &nbsp;·&nbsp; GF — Gluten Free &nbsp;·&nbsp; 🌶 — Spicy
          </p>
        </motion.div>

        {/* Tab bar — scrollable on mobile */}
        <div className="flex items-center gap-1 mb-10 border border-[#e8be63]/20 p-1 overflow-x-auto scrollbar-none" role="tablist">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active === key}
              onClick={() => setActive(key)}
              className="relative flex-shrink-0 flex-1 min-w-[72px] py-2.5 text-[0.6rem] sm:text-xs tracking-[0.1em] sm:tracking-[0.18em] uppercase transition-colors duration-300"
              style={{ color: active === key ? "#12100a" : "#a09070" }}
            >
              {active === key && (
                <motion.div
                  layoutId="tab-bg"
                  className="absolute inset-0 bg-[#e8be63]"
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
            {active === "pizza" ? (
              <PizzaMenu onBgChange={setPizzaBg} />
            ) : (
              menuData[active].map((item) => (
                <MenuCard key={item.name} item={item} />
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Note */}
        <p className="text-[#7a6850] text-xs text-center mt-10 tracking-wide italic">
          All dishes are freshly prepared. Please inform your server of any allergies.
          A discretionary 12.5% service charge will be added to your bill.
        </p>
      </div>
    </section>
  );
}



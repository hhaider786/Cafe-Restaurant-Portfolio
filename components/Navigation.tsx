"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "Our Story" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reservations", label: "Reservations" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#12100a]/95 backdrop-blur-md border-b border-[#d4a853]/10 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex flex-col leading-none">
            <span
              className="text-2xl font-bold tracking-[0.18em] text-[#f5ead8]"
              style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
            >
              LUMIÈRE
            </span>
            <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[#d4a853]">
              Fine Dining & Bar
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-[#a09070] hover:text-[#d4a853] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#d4a853] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <a
              href="#reservations"
              className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase border border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853] hover:text-[#12100a] transition-all duration-300 font-medium"
            >
              Reserve a Table
            </a>
          </div>

          <button className="md:hidden text-[#f5ead8]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#12100a] flex flex-col pt-28 px-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="py-5 text-3xl text-[#f5ead8] border-b border-[#d4a853]/10 hover:text-[#d4a853] transition-colors"
                style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#reservations"
              className="mt-8 text-center py-4 border border-[#d4a853] text-[#d4a853] text-sm tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMenuOpen(false)}
            >
              Reserve a Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

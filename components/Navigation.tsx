"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { FocusTrap } from "@/lib/a11y/FocusTrap";
import { useScrollLock } from "@/lib/a11y/useScrollLock";
import { useEscapeKey } from "@/lib/a11y/useEscapeKey";

const navLinks = [
  { href: "/menu", label: "Menu" },
  { href: "/#story", label: "Our story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reservations", label: "Reservations" },
  { href: "/private-events", label: "Private events" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useScrollLock(menuOpen);
  useEscapeKey(() => setMenuOpen(false), menuOpen);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#12100a]/95 backdrop-blur-md border-b border-[#e8be63]/15 py-4"
            : "bg-transparent py-6"
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none" aria-label="Lumière — home">
            <span
              className="text-2xl font-bold tracking-[0.18em] text-[#f5ead8]"
              style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
            >
              LUMIÈRE
            </span>
            <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[#e8be63]">
              Fine Dining & Bar
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.15em] uppercase text-[#b8a380] hover:text-[#e8be63] transition-colors duration-300 relative group"
              >
                {link.label}
                <span aria-hidden className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#e8be63] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href="/reservations"
              className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase border border-[#e8be63] text-[#e8be63] hover:bg-[#e8be63] hover:text-[#12100a] transition-all duration-300 font-medium"
            >
              Reserve a table
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden text-[#f5ead8]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="fixed inset-0 z-40 bg-[#12100a] flex flex-col pt-28 px-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.28 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <FocusTrap active className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block py-5 text-3xl text-[#f5ead8] border-b border-[#e8be63]/15 hover:text-[#e8be63] transition-colors"
                    style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/reservations"
                className="mt-8 text-center py-4 border border-[#e8be63] text-[#e8be63] text-sm tracking-[0.2em] uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Reserve a table
              </Link>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

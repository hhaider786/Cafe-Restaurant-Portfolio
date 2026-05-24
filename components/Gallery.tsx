"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { FocusTrap } from "@/lib/a11y/FocusTrap";
import { useScrollLock } from "@/lib/a11y/useScrollLock";
import { useEscapeKey } from "@/lib/a11y/useEscapeKey";
import { MorphSVG } from "@/lib/motion/MorphSVG";

const images = [
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99eb4b951?w=1200&q=85", alt: "Lemon tart with raspberry coulis" },
  { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1200&q=85", alt: "Candlelit dining room interior" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=85", alt: "Marble bar with whisky selection" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=85", alt: "Beef tenderloin with seasonal vegetables" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=85", alt: "Plated dish with herb garnish" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=85", alt: "Espresso with chocolate truffles" },
  { src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&q=85", alt: "Hand-rolled pasta with truffle" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=85", alt: "Linen table setting with silverware" },
];

const heights = ["h-64", "h-80", "h-56", "h-72", "h-80", "h-60", "h-76", "h-64"];

const DIVIDERS = [
  "M0 30 Q 25 8 50 30 T 100 30",
  "M0 30 Q 25 52 50 30 T 100 30",
  "M0 30 Q 25 14 50 30 T 100 30",
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const isOpen = openIndex !== null;

  const close = useCallback(() => {
    setOpenIndex((i) => {
      if (i !== null) {
        const btn = buttonsRef.current[i];
        requestAnimationFrame(() => btn?.focus());
      }
      return null;
    });
  }, []);

  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  useScrollLock(isOpen);
  useEscapeKey(close, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next]);

  return (
    <section id="gallery" className="py-24 px-6 section-cv" style={{ background: "#12100a" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">A visual journey</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Our gallery
          </h2>
        </motion.div>

        <MorphSVG
          paths={DIVIDERS}
          viewBox="0 0 100 60"
          stroke="#e8be63"
          strokeWidth={0.6}
          className="w-32 h-10 mx-auto mb-10 opacity-60"
          duration={5}
        />

        <ul className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3 list-none">
          {images.map((img, i) => (
            <motion.li
              key={img.src}
              className="break-inside-avoid"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <button
                ref={(el) => { buttonsRef.current[i] = el; }}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={`group relative overflow-hidden block w-full ${heights[i]} focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e8be63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12100a]`}
                aria-label={`Open ${img.alt} in lightbox`}
              >
                <ImageWithBlur
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#12100a]/0 group-hover:bg-[#12100a]/40 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {isOpen && openIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-caption"
          >
            <FocusTrap active className="w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); close(); }}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2"
              >
                <X size={28} aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
              >
                <ChevronLeft size={36} aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3"
              >
                <ChevronRight size={36} aria-hidden />
              </button>

              <motion.div
                key={openIndex}
                className="relative max-w-5xl w-full max-h-[85vh] aspect-[3/2]"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ImageWithBlur
                  src={images[openIndex].src}
                  alt={images[openIndex].alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-contain"
                />
              </motion.div>

              <p
                id="lightbox-caption"
                className="absolute bottom-6 left-0 right-0 text-center text-white/70 text-sm"
              >
                {images[openIndex].alt} — {openIndex + 1} of {images.length}
              </p>
            </FocusTrap>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

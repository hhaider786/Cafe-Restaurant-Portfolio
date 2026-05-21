"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99eb4b951?w=700&q=90", alt: "Signature dish" },
  { src: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=700&q=90", alt: "Restaurant interior" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=90", alt: "Bar ambiance" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=90", alt: "Chef's creation" },
  { src: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=700&q=90", alt: "Plated dish" },
  { src: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=700&q=90", alt: "Coffee ritual" },
  { src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=700&q=90", alt: "Pasta special" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=700&q=90", alt: "Table setting" },
];

const heights = ["h-64", "h-80", "h-56", "h-72", "h-80", "h-60", "h-76", "h-64"];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="py-24 px-6" style={{ background: "#12100a" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">A Visual Journey</span>
          <span className="amber-line mt-3 mx-auto w-20 block" />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Our Gallery
          </h2>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {images.map((img, i) => (
            <motion.div
              key={img.src}
              className={`group relative overflow-hidden cursor-pointer break-inside-avoid ${heights[i]}`}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              onClick={() => setLightbox(img.src)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${img.src}')`, backgroundColor: "#1a1208" }}
              />
              <div className="absolute inset-0 bg-[#12100a]/0 group-hover:bg-[#12100a]/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white">
              <X size={28} />
            </button>
            <motion.img
              src={lightbox}
              alt="Gallery"
              className="max-w-full max-h-[85vh] object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

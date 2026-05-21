"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reservations" className="py-24 md:py-32 px-6" style={{ background: "#0e0c08" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Join Us</span>
          <span className="amber-line mt-3 mx-auto w-20 block" />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Reserve Your Table
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-0 border border-[#d4a853]/15">
          {/* Left info panel */}
          <motion.div
            className="md:col-span-2 bg-[#d4a853]/5 border-b md:border-b-0 md:border-r border-[#d4a853]/10 p-10 flex flex-col justify-between"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="w-px h-20 bg-[#d4a853] mb-8" />
              <h3
                className="text-2xl font-bold text-[#f5ead8] mb-2"
                style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
              >
                Plan Your Evening
              </h3>
              <p className="text-[#6a5a45] text-sm leading-relaxed mb-8">
                We accept reservations up to 60 days in advance. For same-day bookings or parties
                over 8, please call us directly.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Clock, title: "Opening Hours", lines: ["Mon–Thu: 12:00 – 22:30", "Fri–Sat: 12:00 – 23:30", "Sunday: 11:00 – 21:00"] },
                  { icon: MapPin, title: "Location", lines: ["14 Rue de la Lumière", "London, W1K 3AA"] },
                  { icon: Phone, title: "Phone", lines: ["+44 (0)20 7890 1234"] },
                ].map(({ icon: Icon, title, lines }) => (
                  <div key={title} className="flex gap-3">
                    <Icon size={15} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#f5ead8] text-xs tracking-[0.15em] uppercase mb-1 font-medium">{title}</p>
                      {lines.map((l) => <p key={l} className="text-[#6a5a45] text-sm">{l}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="md:col-span-3 bg-[#0f0d09] p-10"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                <div className="w-16 h-16 rounded-full border border-[#d4a853] flex items-center justify-center text-[#d4a853] text-2xl">✓</div>
                <h3 className="text-2xl text-[#f5ead8]" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                  Reservation Confirmed
                </h3>
                <p className="text-[#6a5a45] text-sm max-w-xs">
                  We look forward to welcoming you. A confirmation has been sent to your email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Full Name", type: "text", placeholder: "Jean Dupont", span: 1 },
                  { label: "Phone Number", type: "tel", placeholder: "+44 7700 900000", span: 1 },
                  { label: "Email Address", type: "email", placeholder: "jean@example.com", span: 2 },
                ].map(({ label, type, placeholder, span }) => (
                  <div key={label} className={span === 2 ? "md:col-span-2" : ""}>
                    <label className="block text-[#6a5a45] text-[0.65rem] tracking-[0.2em] uppercase mb-2">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      required
                      className="w-full bg-[#12100a] border border-[#d4a853]/15 text-[#f5ead8] placeholder-[#3a3020] px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853]/50 transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[#6a5a45] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Date</label>
                  <input type="date" required className="w-full bg-[#12100a] border border-[#d4a853]/15 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853]/50 transition-colors [color-scheme:dark]" />
                </div>
                <div>
                  <label className="block text-[#6a5a45] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Time</label>
                  <select defaultValue="" required className="w-full bg-[#12100a] border border-[#d4a853]/15 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853]/50 transition-colors appearance-none">
                    <option value="" disabled>Select time</option>
                    {["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#6a5a45] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Party Size</label>
                  <select required className="w-full bg-[#12100a] border border-[#d4a853]/15 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853]/50 transition-colors appearance-none">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[#6a5a45] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Occasion</label>
                  <select defaultValue="" className="w-full bg-[#12100a] border border-[#d4a853]/15 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853]/50 transition-colors appearance-none">
                    <option value="">None</option>
                    {["Birthday", "Anniversary", "Business Dinner", "Proposal", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#6a5a45] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Special Requests</label>
                  <textarea placeholder="Dietary requirements, allergies, seating preferences…" rows={3} className="w-full bg-[#12100a] border border-[#d4a853]/15 text-[#f5ead8] placeholder-[#3a3020] px-4 py-3 text-sm focus:outline-none focus:border-[#d4a853]/50 transition-colors resize-none" />
                </div>

                <div className="md:col-span-2 mt-1">
                  <button type="submit" className="shimmer-amber w-full py-4 text-[#12100a] font-bold text-sm tracking-[0.25em] uppercase hover:opacity-90 transition-opacity cursor-pointer">
                    Confirm Reservation
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

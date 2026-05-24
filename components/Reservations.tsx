"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Phone } from "lucide-react";
import { makeReservation } from "@/app/actions/reservation";
import type { ActionResult, FieldError } from "@/lib/actions/validation";

const initial: ActionResult = { status: "idle" };

function fieldError(state: ActionResult, field: string): string | undefined {
  if (state.status !== "error") return;
  return state.errors?.find((e: FieldError) => e.field === field)?.message;
}

const TIMES = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const OCCASIONS = ["Birthday", "Anniversary", "Business Dinner", "Proposal", "Other"];

const INFO = [
  { icon: Clock, title: "Opening Hours", lines: ["Mon–Thu: 12:00 – 22:30", "Fri–Sat: 12:00 – 23:30", "Sunday: 11:00 – 21:00"] },
  { icon: MapPin, title: "Location", lines: ["14 Rue de la Lumière", "London, W1K 3AA"] },
  { icon: Phone, title: "Phone", lines: ["+44 (0)20 7890 1234"] },
];

export default function Reservations() {
  const [state, formAction, pending] = useActionState(makeReservation, initial);
  const isSuccess = state.status === "success";

  return (
    <section id="reservations" className="py-24 md:py-32 px-6 section-cv" style={{ background: "#0e0c08" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-eyebrow">Join us</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h2
            className="text-4xl md:text-5xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Reserve your table
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-0 border border-[#e8be63]/20">
          <motion.div
            className="md:col-span-2 bg-[#e8be63]/5 border-b md:border-b-0 md:border-r border-[#e8be63]/15 p-6 md:p-10 flex flex-col justify-between"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="w-px h-20 bg-[#e8be63] mb-8" aria-hidden />
              <h3
                className="text-2xl font-bold text-[#f5ead8] mb-2"
                style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
              >
                Plan your evening
              </h3>
              <p className="text-[#b8a380] text-sm leading-relaxed mb-8">
                We accept reservations up to 60 days in advance. For same-day bookings or parties
                over 8, please call us directly.
              </p>
              <ul className="space-y-5">
                {INFO.map(({ icon: Icon, title, lines }) => (
                  <li key={title} className="flex gap-3">
                    <Icon size={15} className="text-[#e8be63] mt-0.5 flex-shrink-0" aria-hidden />
                    <div>
                      <p className="text-[#f5ead8] text-xs tracking-[0.15em] uppercase mb-1 font-medium">{title}</p>
                      {lines.map((l) => <p key={l} className="text-[#b8a380] text-sm">{l}</p>)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-3 bg-[#0f0d09] p-6 md:p-10"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16" role="status" aria-live="polite">
                <div className="w-16 h-16 rounded-full border border-[#e8be63] flex items-center justify-center text-[#e8be63] text-2xl" aria-hidden>✓</div>
                <h3 className="text-2xl text-[#f5ead8]" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                  Reservation confirmed
                </h3>
                <p className="text-[#b8a380] text-sm max-w-xs">{state.message}</p>
              </div>
            ) : (
              <form action={formAction} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { id: "name", label: "Full name", type: "text", placeholder: "Jean Dupont", autoComplete: "name", span: 1 },
                  { id: "phone", label: "Phone number", type: "tel", placeholder: "+44 7700 900000", autoComplete: "tel", span: 1 },
                  { id: "email", label: "Email address", type: "email", placeholder: "jean@example.com", autoComplete: "email", span: 2 },
                ].map(({ id, label, type, placeholder, autoComplete, span }) => {
                  const err = fieldError(state, id);
                  return (
                    <div key={id} className={span === 2 ? "md:col-span-2" : ""}>
                      <label htmlFor={id} className="block text-[#b8a380] text-[0.65rem] tracking-[0.2em] uppercase mb-2">
                        {label}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        aria-invalid={!!err}
                        aria-describedby={err ? `${id}-err` : undefined}
                        className="w-full bg-[#12100a] border border-[#e8be63]/20 text-[#f5ead8] placeholder-[#4a3f2a] px-4 py-3 text-sm focus:outline-none focus:border-[#e8be63]/60 transition-colors"
                      />
                      {err && <p id={`${id}-err`} role="alert" className="text-red-400 text-xs mt-1">{err}</p>}
                    </div>
                  );
                })}

                <div>
                  <label htmlFor="date" className="block text-[#b8a380] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    aria-invalid={!!fieldError(state, "date")}
                    aria-describedby={fieldError(state, "date") ? "date-err" : undefined}
                    className="w-full bg-[#12100a] border border-[#e8be63]/20 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#e8be63]/60 transition-colors [color-scheme:dark]"
                  />
                  {fieldError(state, "date") && <p id="date-err" role="alert" className="text-red-400 text-xs mt-1">{fieldError(state, "date")}</p>}
                </div>
                <div>
                  <label htmlFor="time" className="block text-[#b8a380] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Time</label>
                  <select id="time" name="time" defaultValue="19:00" className="w-full bg-[#12100a] border border-[#e8be63]/20 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#e8be63]/60 transition-colors appearance-none">
                    {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="partySize" className="block text-[#b8a380] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Party size</label>
                  <select id="partySize" name="partySize" defaultValue="2" className="w-full bg-[#12100a] border border-[#e8be63]/20 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#e8be63]/60 transition-colors appearance-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="occasion" className="block text-[#b8a380] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Occasion</label>
                  <select id="occasion" name="occasion" defaultValue="" className="w-full bg-[#12100a] border border-[#e8be63]/20 text-[#f5ead8] px-4 py-3 text-sm focus:outline-none focus:border-[#e8be63]/60 transition-colors appearance-none">
                    <option value="">None</option>
                    {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="requests" className="block text-[#b8a380] text-[0.65rem] tracking-[0.2em] uppercase mb-2">Special requests</label>
                  <textarea
                    id="requests"
                    name="requests"
                    placeholder="Dietary requirements, allergies, seating preferences…"
                    rows={3}
                    className="w-full bg-[#12100a] border border-[#e8be63]/20 text-[#f5ead8] placeholder-[#4a3f2a] px-4 py-3 text-sm focus:outline-none focus:border-[#e8be63]/60 transition-colors resize-none"
                  />
                </div>

                {state.status === "error" && state.message && (
                  <p role="alert" className="md:col-span-2 text-red-400 text-sm">{state.message}</p>
                )}

                <div className="md:col-span-2 mt-1">
                  <button
                    type="submit"
                    disabled={pending}
                    className="shimmer-amber w-full py-4 text-[#12100a] font-bold text-sm tracking-[0.25em] uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {pending ? "Confirming…" : "Confirm reservation"}
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

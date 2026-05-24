import type { Metadata } from "next";
import Link from "next/link";
import { Users, Wine, Calendar, ChefHat } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ImageWithBlur } from "@/lib/motion/ImageWithBlur";
import { buildMetadata } from "@/lib/seo/buildMetadata";

const SITE_URL = "https://lumiere.example.com";

export const metadata: Metadata = buildMetadata({
  title: "Private events",
  description: "Host your private dining experience at Lumière — private rooms, bespoke menus, and dedicated staff for parties of 12 to 80.",
  siteName: "Lumière",
  url: `${SITE_URL}/private-events`,
});

const SPACES = [
  {
    name: "The Atelier",
    capacity: "Up to 16 seated",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=1200&q=85",
    body: "An intimate private dining room behind glass doors. Bespoke tasting menu and dedicated sommelier.",
  },
  {
    name: "The Cellar",
    capacity: "Up to 28 seated",
    image: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=1200&q=85",
    body: "Vaulted stone walls and 1,200 bottles of wine. Perfect for a wedding rehearsal or milestone birthday.",
  },
  {
    name: "Whole venue",
    capacity: "Up to 80 standing",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85",
    body: "Take over the entire restaurant for a corporate launch, a wedding, or a press dinner.",
  },
];

const INCLUDES = [
  { icon: ChefHat, label: "Bespoke menu by Chef Élise" },
  { icon: Wine, label: "Curated wine pairings or open bar" },
  { icon: Users, label: "Dedicated event manager" },
  { icon: Calendar, label: "Full venue setup & breakdown" },
];

export default function PrivateEventsPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-24">
        <header className="text-center px-6 py-16">
          <span className="section-eyebrow">For your private occasion</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h1
            className="text-5xl md:text-6xl font-bold text-[#f5ead8] mt-5 mb-4"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Private dining & events
          </h1>
          <p className="text-[#b8a380] max-w-2xl mx-auto">
            From eight-seat tasting menus to eighty-person celebrations — Lumière hosts the evenings worth remembering.
          </p>
        </header>

        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <ul className="grid md:grid-cols-3 gap-5">
            {SPACES.map((s) => (
              <li key={s.name} className="border border-[#e8be63]/20 overflow-hidden bg-[#0e0c08]">
                <div className="relative aspect-[4/3]">
                  <ImageWithBlur src={s.image} alt={`${s.name} private room`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-[#e8be63] text-[0.6rem] tracking-[0.3em] uppercase mb-2">{s.capacity}</p>
                  <h2 className="text-2xl text-[#f5ead8] mb-2" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>{s.name}</h2>
                  <p className="text-[#a09070] text-sm leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-6 pb-24 bg-[#0e0c08] py-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-eyebrow">Every event includes</span>
            <span className="amber-line mt-3 mx-auto w-20 block mb-10" aria-hidden />
            <ul className="grid sm:grid-cols-2 gap-4">
              {INCLUDES.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 border border-[#e8be63]/15 p-5 bg-[#12100a]/40">
                  <Icon size={18} className="text-[#e8be63]" aria-hidden />
                  <span className="text-[#f5ead8] text-sm">{label}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/reservations"
              className="inline-block mt-10 shimmer-amber px-10 py-4 text-[#12100a] text-xs tracking-[0.25em] uppercase font-bold"
            >
              Enquire now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

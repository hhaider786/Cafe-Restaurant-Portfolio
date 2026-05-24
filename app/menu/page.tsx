import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/buildMetadata";

const SITE_URL = "https://lumiere.example.com";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description: "Browse the full Lumière menu — breakfast, lunch, dinner, drinks, and pizza. Seasonal Paris-inspired cooking.",
  siteName: "Lumière",
  url: `${SITE_URL}/menu`,
});

export default function MenuPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-24">
        <header className="text-center px-6 pt-12 pb-2">
          <span className="section-eyebrow">Our offerings</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h1
            className="text-5xl md:text-6xl font-bold text-[#f5ead8] mt-5 mb-4"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            The full menu
          </h1>
          <p className="text-[#b8a380] max-w-xl mx-auto">
            Every dish is built from seasonal British produce, dry-aged proteins, and a touch of French tradition.
          </p>
        </header>
        <Menu />
      </main>
      <Footer />
    </>
  );
}

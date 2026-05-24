import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/buildMetadata";

const SITE_URL = "https://lumiere.example.com";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Inside Lumière — the dining room, the kitchen, the cellar, and the plates that have made us a destination.",
  siteName: "Lumière",
  url: `${SITE_URL}/gallery`,
});

export default function GalleryPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-24">
        <header className="text-center px-6 py-12">
          <span className="section-eyebrow">A visual journey</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h1
            className="text-5xl md:text-6xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Step inside
          </h1>
        </header>
        <Gallery />
      </main>
      <Footer />
    </>
  );
}

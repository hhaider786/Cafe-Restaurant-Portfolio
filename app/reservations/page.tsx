import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/buildMetadata";

const SITE_URL = "https://lumiere.example.com";

export const metadata: Metadata = buildMetadata({
  title: "Reservations",
  description: "Reserve your table at Lumière. Up to 60 days in advance. Same-day bookings by phone.",
  siteName: "Lumière",
  url: `${SITE_URL}/reservations`,
});

export default function ReservationsPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-24">
        <header className="text-center px-6 py-12">
          <span className="section-eyebrow">A seat at the table</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h1
            className="text-5xl md:text-6xl font-bold text-[#f5ead8] mt-5"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Reserve your evening
          </h1>
        </header>
        <Reservations />
      </main>
      <Footer />
    </>
  );
}

import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/lib/a11y/SkipLink";
import { LiveRegionProvider } from "@/lib/a11y/LiveRegion";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { restaurantSchema } from "@/lib/seo/schemas";

const SITE_URL = "https://lumiere.example.com";

const playfair = Playfair_Display({
  variable: "--font-playfair-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato-var",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = buildMetadata({
  title: "Lumière — Fine Dining & Bar",
  description: "An intimate Paris-inspired dining experience in London. Seasonal tasting menus, an extensive wine list, and a 2-star setting on Rue de la Lumière.",
  siteName: "Lumière",
  url: SITE_URL,
  ogImage: `${SITE_URL}/opengraph-image`,
  titleTemplate: "%s — Lumière",
  keywords: ["fine dining", "restaurant", "London", "Paris-inspired", "tasting menu", "Michelin", "reservation"],
  themeColor: "#12100a",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body
        className="bg-[#12100a] text-[#f5ead8] antialiased overflow-x-clip"
        style={{ fontFamily: "var(--font-lato-var), sans-serif" }}
      >
        <SkipLink />
        <LiveRegionProvider>{children}</LiveRegionProvider>
        <JsonLd
          data={restaurantSchema({
            name: "Lumière — Fine Dining & Bar",
            description: "An intimate Paris-inspired dining experience in London.",
            url: SITE_URL,
            telephone: "+44 20 7890 1234",
            email: "reservations@lumiere.example.com",
            priceRange: "£££",
            image: `${SITE_URL}/opengraph-image`,
            servesCuisine: ["French", "European", "Modern"],
            acceptsReservations: true,
            menu: `${SITE_URL}/menu`,
            address: {
              streetAddress: "14 Rue de la Lumière",
              addressLocality: "London",
              postalCode: "W1K 3AA",
              addressCountry: "GB",
            },
            geo: { latitude: 51.5114, longitude: -0.1497 },
            openingHours: [
              { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "12:00", closes: "22:30" },
              { dayOfWeek: ["Friday", "Saturday"], opens: "12:00", closes: "23:30" },
              { dayOfWeek: "Sunday", opens: "11:00", closes: "21:00" },
            ],
            aggregateRating: { ratingValue: 4.9, reviewCount: 482 },
          })}
        />
      </body>
    </html>
  );
}

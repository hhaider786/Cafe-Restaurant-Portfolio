import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-var",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const lato = Lato({
  variable: "--font-lato-var",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Lumière — Fine Dining & Bar",
  description: "An intimate dining experience crafted with passion. Reserve your table at Lumière.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body
        className="bg-[#12100a] text-[#f5ead8] antialiased overflow-x-hidden"
        style={{ fontFamily: "var(--font-lato-var), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

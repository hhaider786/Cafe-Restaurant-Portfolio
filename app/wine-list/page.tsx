import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo/buildMetadata";

const SITE_URL = "https://lumiere.example.com";

export const metadata: Metadata = buildMetadata({
  title: "Wine list",
  description: "Lumière's curated wine cellar — 1,200+ bottles across France, Italy, and the New World, hand-selected by our sommelier Antoine Bellard.",
  siteName: "Lumière",
  url: `${SITE_URL}/wine-list`,
});

type Bottle = { name: string; region: string; vintage: string; price: number };

const SECTIONS: { title: string; desc: string; bottles: Bottle[] }[] = [
  {
    title: "Champagne & sparkling",
    desc: "Grower champagnes and a small selection of English sparkling.",
    bottles: [
      { name: "Pol Roger, Brut Réserve", region: "Épernay, France", vintage: "NV", price: 95 },
      { name: "Larmandier-Bernier, Latitude", region: "Vertus, France", vintage: "NV", price: 110 },
      { name: "Nyetimber, Classic Cuvée", region: "West Sussex, UK", vintage: "2018", price: 78 },
      { name: "Krug, Grande Cuvée", region: "Reims, France", vintage: "171st Édition", price: 410 },
    ],
  },
  {
    title: "Burgundy",
    desc: "From village-level Bourgogne to allocated grand crus.",
    bottles: [
      { name: "Domaine Leflaive, Mâcon-Verzé", region: "Mâconnais", vintage: "2021", price: 92 },
      { name: "Joseph Drouhin, Beaune Clos des Mouches", region: "Côte de Beaune", vintage: "2019", price: 165 },
      { name: "Domaine Dujac, Morey-Saint-Denis 1er Cru", region: "Côte de Nuits", vintage: "2018", price: 285 },
      { name: "Domaine de la Romanée-Conti, Échezeaux", region: "Côte de Nuits", vintage: "2017", price: 1850 },
    ],
  },
  {
    title: "Bordeaux",
    desc: "Left and right bank classics, selected for drinking now.",
    bottles: [
      { name: "Château Talbot, 4ème Cru Classé", region: "Saint-Julien", vintage: "2015", price: 145 },
      { name: "Château Pichon-Lalande", region: "Pauillac", vintage: "2014", price: 410 },
      { name: "Château Cheval Blanc", region: "Saint-Émilion 1er", vintage: "2010", price: 1450 },
    ],
  },
  {
    title: "By the glass",
    desc: "A rotating selection, poured fresh from Coravin.",
    bottles: [
      { name: "Sancerre, Domaine Vacheron", region: "Loire", vintage: "2022", price: 18 },
      { name: "Barolo, Vietti Castiglione", region: "Piedmont", vintage: "2019", price: 22 },
      { name: "Châteauneuf-du-Pape, Domaine du Pégau", region: "Rhône", vintage: "2019", price: 24 },
    ],
  },
];

export default function WineListPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="pt-24 pb-20 px-6">
        <header className="text-center py-12 max-w-3xl mx-auto">
          <span className="section-eyebrow">From the cellar</span>
          <span className="amber-line mt-3 mx-auto w-20 block" aria-hidden />
          <h1
            className="text-5xl md:text-6xl font-bold text-[#f5ead8] mt-5 mb-4"
            style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}
          >
            Wine list
          </h1>
          <p className="text-[#b8a380] text-sm leading-relaxed">
            Our cellar carries 1,200+ bottles — curated by sommelier Antoine Bellard, with deep verticals in Burgundy,
            growers in Champagne, and an ever-evolving New World selection. Below is a short excerpt; the full list is on the table.
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-14">
          {SECTIONS.map((sec) => (
            <section key={sec.title}>
              <div className="flex items-end justify-between mb-6 pb-3 border-b border-[#e8be63]/30">
                <div>
                  <h2 className="text-2xl text-[#f5ead8]" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                    {sec.title}
                  </h2>
                  <p className="text-[#a09070] text-sm mt-1">{sec.desc}</p>
                </div>
              </div>
              <ul className="divide-y divide-[#e8be63]/15">
                {sec.bottles.map((b) => (
                  <li key={b.name} className="grid grid-cols-[1fr_auto] gap-4 py-4">
                    <div>
                      <p className="text-[#f5ead8] text-base font-medium" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                        {b.name}
                      </p>
                      <p className="text-[#a09070] text-xs tracking-wide">{b.region} · {b.vintage}</p>
                    </div>
                    <span className="text-[#e8be63] text-base font-semibold self-start" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
                      £{b.price}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

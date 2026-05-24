import { Phone, Mail, MapPin, Globe, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Our menu", href: "/menu" },
  { label: "Our story", href: "/#story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Reserve a table", href: "/reservations" },
  { label: "Private dining", href: "/private-events" },
  { label: "Wine list", href: "/wine-list" },
];

const socials = [
  { Icon: Globe, label: "Website", href: "#" },
  { Icon: MessageCircle, label: "Instagram", href: "#" },
  { Icon: Share2, label: "Facebook", href: "#" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0800] border-t border-[#e8be63]/15">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <p className="text-2xl font-bold tracking-[0.18em] text-[#f5ead8] mb-1" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
            LUMIÈRE
          </p>
          <p className="text-[0.55rem] tracking-[0.4em] uppercase text-[#e8be63] mb-5">Fine Dining & Bar</p>
          <p className="text-[#a09070] text-sm leading-relaxed mb-6">
            An intimate dining experience in the heart of London. Open daily from 12:00.
          </p>
          <ul className="flex gap-3">
            {socials.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-[#e8be63]/25 flex items-center justify-center text-[#a09070] hover:text-[#e8be63] hover:border-[#e8be63]/60 transition-all duration-300"
                >
                  <Icon size={14} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[#f5ead8] text-xs tracking-[0.2em] uppercase font-medium mb-5">Opening hours</h2>
          <ul className="space-y-2.5">
            {[
              ["Mon – Thu", "12:00 – 22:30"],
              ["Fri – Sat", "12:00 – 23:30"],
              ["Sunday", "11:00 – 21:00"],
            ].map(([day, hours]) => (
              <li key={day} className="flex justify-between text-sm">
                <span className="text-[#a09070]">{day}</span>
                <span className="text-[#b8a380]">{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer navigation">
          <h2 className="text-[#f5ead8] text-xs tracking-[0.2em] uppercase font-medium mb-5">Navigate</h2>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-[#a09070] text-sm hover:text-[#e8be63] transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-[#f5ead8] text-xs tracking-[0.2em] uppercase font-medium mb-5">Find us</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={13} className="text-[#e8be63] mt-0.5 flex-shrink-0" aria-hidden />
              <p className="text-[#a09070] text-sm">14 Rue de la Lumière<br />London, W1K 3AA</p>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={13} className="text-[#e8be63] mt-0.5 flex-shrink-0" aria-hidden />
              <a href="tel:+442078901234" className="text-[#a09070] text-sm hover:text-[#e8be63] transition-colors">
                +44 (0)20 7890 1234
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={13} className="text-[#e8be63] mt-0.5 flex-shrink-0" aria-hidden />
              <a href="mailto:hello@lumiere-dining.com" className="text-[#a09070] text-sm hover:text-[#e8be63] transition-colors">
                hello@lumiere-dining.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#e8be63]/15">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[#5a4a35] text-xs tracking-wider">© {new Date().getFullYear()} Lumière Restaurant. All rights reserved.</p>
          <ul className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <li key={item}>
                <Link href="/#" className="text-[#5a4a35] text-xs hover:text-[#e8be63] transition-colors">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

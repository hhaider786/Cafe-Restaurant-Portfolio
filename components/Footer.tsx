import { Phone, Mail, MapPin, Globe, MessageCircle, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0800] border-t border-[#d4a853]/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <p className="text-2xl font-bold tracking-[0.18em] text-[#f5ead8] mb-1" style={{ fontFamily: "var(--font-playfair-var), Georgia, serif" }}>
            LUMIÈRE
          </p>
          <p className="text-[0.55rem] tracking-[0.4em] uppercase text-[#d4a853] mb-5">Fine Dining & Bar</p>
          <p className="text-[#4a3a2a] text-sm leading-relaxed mb-6">
            An intimate dining experience in the heart of London. Open daily from 12:00.
          </p>
          <div className="flex gap-3">
            {[Globe, MessageCircle, Share2].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 border border-[#d4a853]/20 flex items-center justify-center text-[#6a5a45] hover:text-[#d4a853] hover:border-[#d4a853]/50 transition-all duration-300">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[#f5ead8] text-xs tracking-[0.2em] uppercase font-medium mb-5">Opening Hours</h4>
          <ul className="space-y-2.5">
            {[
              ["Mon – Thu", "12:00 – 22:30"],
              ["Fri – Sat", "12:00 – 23:30"],
              ["Sunday", "11:00 – 21:00"],
            ].map(([day, hours]) => (
              <li key={day} className="flex justify-between text-sm">
                <span className="text-[#4a3a2a]">{day}</span>
                <span className="text-[#6a5a45]">{hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#f5ead8] text-xs tracking-[0.2em] uppercase font-medium mb-5">Navigate</h4>
          <ul className="space-y-2.5">
            {["Our Menu", "Our Story", "Gallery", "Reserve a Table", "Private Dining"].map((link) => (
              <li key={link}>
                <a href="#" className="text-[#4a3a2a] text-sm hover:text-[#d4a853] transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#f5ead8] text-xs tracking-[0.2em] uppercase font-medium mb-5">Find Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={13} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
              <p className="text-[#4a3a2a] text-sm">14 Rue de la Lumière<br />London, W1K 3AA</p>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={13} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
              <p className="text-[#4a3a2a] text-sm">+44 (0)20 7890 1234</p>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={13} className="text-[#d4a853] mt-0.5 flex-shrink-0" />
              <p className="text-[#4a3a2a] text-sm">hello@lumiere-dining.com</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#d4a853]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[#2a2010] text-xs tracking-wider">© 2025 Lumière Restaurant. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-[#2a2010] text-xs hover:text-[#d4a853] transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

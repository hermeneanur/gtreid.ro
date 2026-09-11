"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, Instagram, Facebook, Sparkles, Check, Phone, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import Mascot from "../mascot/Mascot";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerLinks = {
    Companie: [
      { name: "Acasă", path: "/" },
      { name: "Portofoliu & Galerie", path: "/galerie" },
      { name: "Servicii", path: "/servicii" }
    ],
    Resurse: [
      { name: "Întrebări frecvente (FAQ)", path: "/faq" },
      { name: "Contact rapid", path: "/contact" },
      { name: "Politica de Retur", path: "/retur" }
    ]
  };

  return (
    <footer className="w-full bg-[#111111] text-white border-t border-white/10 dark:bg-[#111111] light:bg-zinc-50 light:text-[#111111] light:border-black/10 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
          
          {/* Column 1: Logo & Mascot Branding */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <div className="flex items-center justify-center rounded-xl bg-white border border-zinc-200/80 px-3 py-1.5 shadow-sm transition-all group-hover:border-[#FF8C2A]/40">
                <img
                  src="/logo.png"
                  alt="gt3D Logo"
                  className="h-12 object-contain"
                />
              </div>
            </Link>
            
            <p className="text-lg font-black tracking-widest text-[#FF8C2A] font-poppins italic">
              PRINT. PLAY. REPEAT.
            </p>
            <p className="text-xs text-zinc-400 font-inter leading-relaxed max-w-xs">
              Transformăm viziunile digitale în produse tangibile, combinând precizia tehnologică cu designul premium.
            </p>

            {/* Mascot footer badge */}
            <div className="pt-2 flex items-center gap-3 bg-white/5 border border-white/5 rounded-2xl p-2.5 max-w-xs">
              <Mascot pose="footer" size={50} className="flex-shrink-0" />
              <div className="text-[11px] font-mono text-zinc-400 leading-snug">
                Mascota <span className="text-[#FF8C2A] font-bold">3D</span> îți urează o zi plină de creativitate!
              </div>
            </div>
          </div>

          {/* Columns 2 & 3: Navigation Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#FF8C2A] font-poppins">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-sm text-zinc-400 hover:text-[#FF8C2A] transition-colors font-inter block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Column 4: Newsletter & Social Networks */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FF8C2A] font-poppins flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Newsletter
            </h4>
            <p className="text-xs text-zinc-400 font-inter leading-relaxed">
              Fii primul care află despre noile tehnologii de printare, reduceri și noutăți.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email-ul tău..."
                  className="h-10 flex-1 rounded-xl border border-white/10 bg-[#1C1C1C] px-3.5 text-xs text-white placeholder-zinc-500 focus:border-[#FF8C2A] focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF8C2A] text-black hover:bg-[#e05b00] transition-colors flex-shrink-0 cursor-pointer"
                  title="Abonați-vă"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-green-500/10 border border-green-500/20 p-3 text-xs text-green-400 font-inter"
              >
                <Check className="h-4 w-4 flex-shrink-0" />
                Abonare reușită! Vă mulțumim.
              </motion.div>
            )}

            {/* Social Media icons aligned grid */}
            <div className="pt-2">
              <span className="block text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2">
                Urmărește-ne
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href="https://www.instagram.com/atelier_3d.ro?igsh=MXRkdDExbnF4ZG9kdQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#FF8C2A]/10 hover:text-[#FF8C2A] hover:border-[#FF8C2A]/20 transition-all"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/1GQRSaMy5G/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#FF8C2A]/10 hover:text-[#FF8C2A] hover:border-[#FF8C2A]/20 transition-all"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@atelier_3d.ro?_r=1&_t=ZN-97awWclbORH"
                  target="_blank"
                  rel="noreferrer"
                  title="TikTok"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#FF8C2A]/10 hover:text-[#FF8C2A] hover:border-[#FF8C2A]/20 transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/>
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@gtreid?si=ccw76uGG1dqw5s7y"
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#FF8C2A]/10 hover:text-[#FF8C2A] hover:border-[#FF8C2A]/20 transition-all"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/40771397634"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:bg-[#FF8C2A]/10 hover:text-[#FF8C2A] hover:border-[#FF8C2A]/20 transition-all"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright area */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 text-xs text-zinc-500 font-inter gap-4">
          <p>© {new Date().getFullYear()} gtreiD. Toate drepturile rezervate.</p>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <Link href="/termeni" className="hover:text-white transition-colors">Termeni și Condiții</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Politică de Confidențialitate</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Locație Showroom</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

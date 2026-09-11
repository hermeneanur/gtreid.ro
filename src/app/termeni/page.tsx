"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Scale, FileText, AlertCircle, ExternalLink } from "lucide-react";
import Mascot from "@/components/mascot/Mascot";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 w-full text-white">
      {/* Breadcrumbs */}
      <div className="mb-6 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">Termeni și Condiții</span>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#FF8C2A] transition-colors mb-6 font-poppins"
      >
        <ArrowLeft className="h-4 w-4" />
        Înapoi la magazin
      </Link>

      {/* Header */}
      <div className="space-y-4 mb-10 border-b border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8C2A]/10 border border-[#FF8C2A]/20 text-xs font-mono font-bold text-[#FF8C2A]">
          <Scale className="h-3.5 w-3.5" /> Conform Legislației din România (OUG 34/2014 & Legea 365/2002)
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins text-white">
          Termeni și Condiții de Utilizare
        </h1>
        <p className="text-xs text-zinc-400 font-mono">
          Ultima actualizare: 11 August 2026
        </p>
      </div>

      {/* Content Body */}
      <div className="space-y-8 text-sm font-inter text-zinc-300 leading-relaxed">
        
        {/* Section 1: Identificare */}
        <section className="space-y-3 p-6 rounded-2xl bg-[#1C1C1C] border border-white/10">
          <h2 className="text-lg font-bold font-poppins text-white flex items-center gap-2 text-[#FF8C2A]">
            1. Date de Identificare ale Vânzătorului
          </h2>
          <p>
            Site-ul web <strong>gtreid.ro</strong> și serviciile conexe sunt operate de atelierul de printare și proiectare 3D <strong>gtreiD</strong>.
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono pt-2">
            <li><strong>Adresă Showroom & Atelier:</strong> Str. Mare, nr. 170, Zărnești, Jud. Brașov, România</li>
            <li><strong>E-mail contact:</strong> hermeneanur@gmail.com</li>
            <li><strong>Telefon / WhatsApp:</strong> +40 771 397 634</li>
          </ul>
        </section>

        {/* Section 2: Definiții */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-poppins text-white">
            2. Definiții și Aplicabilitate
          </h2>
          <p>
            Prezentul document stabilește termenii și condițiile de utilizare a site-ului web și condițiile de achiziționare a produselor și serviciilor comercializate.
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong>Cumpărător / Consumator:</strong> Orice persoană fizică sau juridică ce plasează o comandă sau solicită o cotație de preț.</li>
            <li><strong>Produse Standard:</strong> Obiecte 3D din catalogul predefinit (brelocuri, ornamente, pușculițe, figurine).</li>
            <li><strong>Produse Personalizate / Pe Comandă:</strong> Obiecte realizate la cerere după schițele, fișierele 3D (.stl, .obj, .3mf) sau specificațiile unice furnizate de Cumpărător.</li>
          </ul>
        </section>

        {/* Section 3: Comenzi & Preturi */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-poppins text-white">
            3. Plasarea Comenzilor și Prețurile
          </h2>
          <p>
            Prețurile produselor standard afișate pe site sunt exprimate în <strong>RON (Lei)</strong>. Pentru proiectele speciale și produsele personalizate, prețul final este stabilit în urma analizei geometriei 3D, a materialului selectat (PLA, PETG, ABS, TPU, Rășină) și a timpului de printare.
          </p>
          <p>
            Comanda este considerată fermă după confirmarea detaliilor pe e-mail sau WhatsApp de către echipa gtreiD.
          </p>
        </section>

        {/* Section 4: Politica de Retur conform OUG 34/2014 */}
        <section className="space-y-4 p-6 rounded-2xl bg-gradient-to-b from-[#1C1C1C] to-[#141414] border border-[#FF8C2A]/30">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-[#FF8C2A] flex-shrink-0" />
            <h2 className="text-lg font-bold font-poppins text-white">
              4. Dreptul de Retragere și Politica de Retur (OUG 34/2014)
            </h2>
          </div>
          
          <p>
            Conform <strong>OUG nr. 34/2014</strong> privind drepturile consumatorilor, aveți dreptul de a vă retrage din contractul de cumpărare, fără a preciza motivele, în termen de <strong>14 zile calendaristice</strong> de la data la care intrați în posesia fizică a produselor.
          </p>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
            <div className="font-bold text-[#FF8C2A] uppercase font-mono tracking-wider flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4" /> Excepție Legală Importantă (Art. 16 lit. c din OUG 34/2014)
            </div>
            <p className="text-zinc-300 leading-relaxed">
              Sunt exceptate de la dreptul de retragere de 14 zile <strong>produsele confecționate după specificațiile prezentate de consumator sau personalizate în mod clar</strong> (de exemplu: lămpi litofanie cu fotografiile proprii, logo-uri de firmă personalizate, piese de schimb unicat printate după fișierul 3D trimis de Cumpărător).
            </p>
          </div>

          <p className="text-xs text-zinc-400">
            Pentru a exercita dreptul de retur pentru produsele standard aplicabile, puteți completa formularul nostru online din pagina <Link href="/retur" className="text-[#FF8C2A] underline font-bold">Politica de Retur</Link>. Rambursarea banilor se efectuează în maximum 14 zile prin transfer bancar în contul IBAN furnizat.
          </p>
        </section>

        {/* Section 5: Garantie */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold font-poppins text-white">
            5. Garanția Legală de Conformitate
          </h2>
          <p>
            Produsele comercializate beneficiază de garanția legală de conformitate prevăzută de OUG 140/2021. În cazul în care un produs prezintă defecte de fabricație sau neconformități la livrare, Cumpărătorul are dreptul de a solicita înlocuirea gratuită sau remedierea piesei.
          </p>
        </section>

        {/* Section 6: GDPR */}
        <section id="confidentialitate" className="space-y-3 scroll-mt-24">
          <h2 className="text-lg font-bold font-poppins text-white">
            6. Protecția Datelor cu Caracter Personal (GDPR)
          </h2>
          <p>
            Conform Regulamentului (UE) 2016/679 (GDPR), datele dumneavoastră cu caracter personal (nume, e-mail, telefon, adresă de livrare) sunt prelucrate în condiții de siguranță maximă și doar în scopul procesării și livrării comenzilor dumneavoastră. Datele nu sunt înstrăinate către terți neautorizați.
          </p>
        </section>

        {/* Section 7: ANPC & Litigii */}
        <section className="space-y-4 p-6 rounded-2xl bg-[#1C1C1C] border border-white/10">
          <h2 className="text-lg font-bold font-poppins text-white">
            7. Soluționarea Litigiilor & Legături ANPC
          </h2>
          <p className="text-xs">
            În cazul oricărui nemulțumiri, vă încurajăm să ne contactați mai întâi direct la <strong>hermeneanur@gmail.com</strong> sau la telefon <strong>+40 771 397 634</strong> pentru soluționarea pe cale amiabilă.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              href="https://anpc.ro/"
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-3.5 rounded-xl border border-white/10 bg-black/30 hover:border-[#FF8C2A]/50 transition-colors flex items-center justify-between text-xs font-bold text-zinc-300 font-mono"
            >
              <span>ANPC - Protecția Consumatorilor</span>
              <ExternalLink className="h-4 w-4 text-[#FF8C2A]" />
            </a>
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noreferrer"
              className="flex-1 p-3.5 rounded-xl border border-white/10 bg-black/30 hover:border-[#FF8C2A]/50 transition-colors flex items-center justify-between text-xs font-bold text-zinc-300 font-mono"
            >
              <span>Platforma SOL / ODR (UE)</span>
              <ExternalLink className="h-4 w-4 text-[#FF8C2A]" />
            </a>
          </div>
        </section>

      </div>

      {/* Footer CTA */}
      <div className="mt-12 text-center pt-8 border-t border-white/10">
        <Mascot pose="waving" size={100} className="mx-auto mb-4" />
        <p className="text-xs text-zinc-400 font-inter">
          Ai întrebări suplimentare legate de termenii noștri? Echipa gtreiD este mereu pregătită să îți răspundă.
        </p>
        <Link
          href="/contact"
          className="inline-block mt-4 rounded-full bg-[#FF8C2A] px-8 py-3 text-xs font-black uppercase tracking-wider text-black hover:bg-[#e05b00] transition-colors font-poppins"
        >
          Contactează-ne
        </Link>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/data/data";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import Mascot from "@/components/mascot/Mascot";

export default function ServicesPage() {
  const { setQuoteModalOpen } = useApp();
  const mainService = services[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="mb-8 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">Servicii Complete 3D</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 mb-14">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF8C2A]/10 border border-[#FF8C2A]/30 text-xs font-mono font-bold text-[#FF8C2A] uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Soluție All-In-One
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-poppins text-white">
          Servicii Unificate de Printare & Proiectare 3D
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl mx-auto font-inter leading-relaxed">
          Am comasat toate serviciile noastre într-un pachet complet: de la consultanță tehnică și modelare CAD, până la printare FDM/SLA și finisare manuală pentru orice idee sau piesă specială.
        </p>
      </div>

      {/* Main Unified Service Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#1C1C1C] to-[#141414] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden mb-16 dark:bg-[#1C1C1C] light:bg-white light:text-[#111111] light:border-black/10"
      >
        {/* Glow Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF8C2A]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          
          {/* Left Column - Service Details & Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#FF8C2A] text-black font-black text-[10px] uppercase font-mono tracking-wider">
                SERVICIU INTEGRAT
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-zinc-300 font-bold text-[10px] uppercase font-mono tracking-wider border border-white/10">
                PROIECTARE + PRINTARE 3D
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white dark:text-white light:text-black">
              {mainService ? mainService.name : "Servicii Complete de Printare & Proiectare 3D"}
            </h2>

            <p className="text-sm text-zinc-300 font-inter leading-relaxed dark:text-zinc-300 light:text-zinc-700">
              {mainService ? mainService.description : "Soluție All-In-One pentru orice proiect 3D."}
            </p>

            {/* Bullet Points Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {mainService?.details.map((detail, index) => (
                <div key={index} className="flex gap-2.5 items-start text-xs text-zinc-200 dark:text-zinc-200 light:text-zinc-800 bg-black/30 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="h-4 w-4 text-[#FF8C2A] flex-shrink-0 mt-0.5" />
                  <span className="font-medium font-inter">{detail}</span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="rounded-full bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] px-8 py-4 text-xs font-black uppercase tracking-wider text-black hover:shadow-xl hover:shadow-[#FF8C2A]/20 transition-all font-poppins flex items-center justify-center gap-2 cursor-pointer"
              >
                Solicită cotație proiect
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/contact"
                className="rounded-full border border-white/20 px-8 py-4 text-xs font-black uppercase tracking-wider text-white hover:bg-white/5 transition-all font-poppins flex items-center justify-center gap-2"
              >
                Discută cu un inginer
              </Link>
            </div>
          </div>

          {/* Right Column - Mascot & Core Capabilities */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 bg-black/40 p-8 rounded-2xl border border-white/5 text-center">
            <Mascot pose="printing" size={140} />
            
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF8C2A]">
                SFATUL MASCOTEI 3D
              </span>
              <p className="text-xs text-zinc-300 font-inter italic leading-relaxed">
                „Toate proiectele noastre speciale beneficiază de analiză gratuită de fișier și consultanță tehnică pentru alegerea materialului optim!”
              </p>
            </div>

            <div className="w-full pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-[10px] font-mono text-zinc-400">
              <div className="p-2 rounded bg-white/5">
                <span className="block font-bold text-white text-xs">0.08 mm</span>
                Rezoluție Strat
              </div>
              <div className="p-2 rounded bg-white/5">
                <span className="block font-bold text-white text-xs">24h</span>
                Oferte pe Email
              </div>
              <div className="p-2 rounded bg-white/5">
                <span className="block font-bold text-white text-xs">100%</span>
                Garanție Calitate
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* CTA Bottom Banner */}
      <div className="rounded-3xl bg-[#1C1C1C] border border-white/10 p-8 md:p-12 text-center max-w-4xl mx-auto dark:bg-[#1C1C1C] light:bg-white light:border-black/10">
        <h3 className="text-2xl font-bold font-poppins text-white dark:text-white light:text-black">
          Ai o idee unică sau un fișier 3D pregătit?
        </h3>
        <p className="text-xs text-zinc-400 mt-2 max-w-lg mx-auto font-inter">
          Trimite-ne schița, poza sau modelul tău 3D iar noi vom calcula geometria, greutatea și timpul necesar pentru a-ți transmite oferta personalizată.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-black hover:shadow-lg transition-all font-poppins cursor-pointer"
          >
            Trimite Fișier / Cere Ofertă
          </button>
          <Link
            href="/contact"
            className="w-full sm:w-auto rounded-full border border-zinc-500 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white hover:bg-white/5 transition-all font-poppins"
          >
            Contactează-ne pe WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}

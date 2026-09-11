"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  Compass,
  Truck,
  Sparkles,
  ShoppingBag,
  Sliders,
  Layers,
  HelpCircle,
  Phone,
  ArrowRight
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import Mascot from "@/components/mascot/Mascot";

export default function Home() {
  const { setQuoteModalOpen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigation Dashboard links representing "all buttons for the rest of the pages"
  const dashboardLinks = [
    {
      name: "Catalog Produse",
      desc: "Explorează toate modelele noastre 3D cu opțiuni de filtrare avansată.",
      path: "/produse",
      icon: <ShoppingBag className="h-6 w-6 text-[#FF8C2A]" />,
      actionText: "Vezi catalogul"
    },
    {
      name: "Servicii 3D",
      desc: "Modelare CAD, prototipare rapidă și printare industrială FDM/SLA.",
      path: "/servicii",
      icon: <Sliders className="h-6 w-6 text-[#FF8C2A]" />,
      actionText: "Vezi serviciile"
    },
    {
      name: "Portofoliu & Galerie",
      desc: "Portofoliu vizual și studii de caz cu printuri 3D reale.",
      path: "/galerie",
      icon: <Layers className="h-6 w-6 text-[#FF8C2A]" />,
      actionText: "Vezi galeria"
    },
    {
      name: "Brandul gt3d",
      desc: "PRINT. PLAY. REPEAT. Pasiune pentru printare 3D de înaltă precizie.",
      path: "",
      icon: (
        <div className="h-6 w-6 flex items-center justify-center font-black font-poppins text-xs tracking-tighter">
          <span className="text-zinc-900 dark:text-white">gt</span>
          <span className="text-[#FF8C2A]">3d</span>
        </div>
      )
    },
    {
      name: "Întrebări FAQ",
      desc: "Nelămuriri tehnice legate de materiale, toleranțe și expediere.",
      path: "/faq",
      icon: <HelpCircle className="h-6 w-6 text-[#FF8C2A]" />,
      actionText: "Vezi FAQ"
    },
    {
      name: "Contact Rapid",
      desc: "Locația showroom-ului din Zărnești, număr de telefon și social media.",
      path: "/contact",
      icon: <Phone className="h-6 w-6 text-[#FF8C2A]" />,
      actionText: "Contactează-ne"
    }
  ];

  // 5 slides for the premium slideshow
  const slides = [
    {
      id: 1,
      title: "Printare 3D cu filament",
      description: "Piese rezistente FDM ideale pentru prototipuri funcționale, piese de schimb și carcase de înaltă precizie.",
      bg: "from-[#FF8C2A]/10 to-transparent",
      badge: "TEHNOLOGIE FDM",
      actionText: "Află mai multe",
      actionPath: "/servicii",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 text-[#FF8C2A]">
          <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="2" strokeDasharray="6,4" className="animate-[spin_40s_linear_infinite]" style={{ transformOrigin: 'center' }} />
          <rect x="70" y="70" width="60" height="60" rx="6" stroke="currentColor" strokeWidth="3" fill="rgba(255,140,42,0.1)" />
          <path d="M50 150 L150 150" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M100 30 L100 70" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
        </svg>
      )
    },
    {
      id: 2,
      title: "Din poză în obiect 3D",
      description: "Transformăm fotografiile dragi în lămpi litofanie 3D magice iluminate din spate cu LED.",
      bg: "from-blue-500/10 to-transparent",
      badge: "CADOURI UNICE",
      actionText: "Vezi detalii",
      actionPath: "/servicii",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 text-blue-400">
          <rect x="50" y="40" width="100" height="120" rx="8" stroke="currentColor" strokeWidth="3" fill="rgba(96,165,250,0.1)" />
          <circle cx="100" cy="90" r="25" fill="rgba(96,165,250,0.2)" stroke="currentColor" strokeWidth="2" />
          <path d="M70 140 Q100 110 130 140" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="100" cy="90" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
        </svg>
      )
    },
    {
      id: 3,
      title: "Proiecte la Comandă & Unicate",
      description: "Machete la scară, piese industriale complexe din carbon și proiecte speciale personalizate.",
      bg: "from-purple-500/10 to-transparent",
      badge: "COMENZI SPECIALE",
      actionText: "Cere ofertă",
      actionPath: "/contact",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 text-purple-400">
          <polygon points="100,30 160,80 140,150 60,150 40,80" stroke="currentColor" strokeWidth="3" fill="rgba(192,132,252,0.1)" />
          <line x1="100" y1="30" x2="100" y2="150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="40" y1="80" x2="160" y2="80" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <circle cx="100" cy="80" r="10" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 4,
      title: "Figurine de Colecție",
      description: "Reproduceri spectaculoase low-poly, personaje din gaming și figurine articulate printate dintr-o bucată.",
      bg: "from-pink-500/10 to-transparent",
      badge: "COLECȚIONABILE",
      actionText: "Vezi catalogul",
      actionPath: "/produse",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 text-pink-400">
          <path d="M100 40 C80 40 80 70 100 70 C120 70 120 40 100 40 Z" stroke="currentColor" strokeWidth="3" fill="rgba(244,114,182,0.15)" />
          <path d="M70 160 L70 110 C70 90 130 90 130 110 L130 160" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 70 L100 120" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="110" r="8" fill="currentColor" />
          <circle cx="140" cy="110" r="8" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 5,
      title: "Organizatoare Premium",
      description: "Suporturi de birou modulare și organizatoare magnetice cu design minimalist.",
      bg: "from-green-500/10 to-transparent",
      badge: "MINIMAL DESIGN",
      actionText: "Organizează-te",
      actionPath: "/produse",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" className="w-56 h-56 text-green-400">
          <rect x="40" y="70" width="120" height="70" rx="8" stroke="currentColor" strokeWidth="3" fill="rgba(74,222,128,0.1)" />
          <line x1="80" y1="70" x2="80" y2="140" stroke="currentColor" strokeWidth="2" />
          <line x1="120" y1="70" x2="120" y2="140" stroke="currentColor" strokeWidth="2" />
          <circle cx="60" cy="105" r="6" fill="currentColor" />
          <circle cx="100" cy="105" r="6" fill="currentColor" />
          <circle cx="140" cy="105" r="6" fill="currentColor" />
        </svg>
      )
    }
  ];

  // Auto transition every 2.5 seconds (loop)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const whyUs = [
    { title: "Precizie ridicată", desc: "Printăm la rezoluții de până la 0.05 mm pentru detalii microscopice.", icon: <Cpu className="h-6 w-6 text-[#FF8C2A]" /> },
    { title: "Materiale premium", desc: "Folosim doar filamente și rășini testate, cu rezistență mecanică sau termică.", icon: <ShieldCheck className="h-6 w-6 text-[#FF8C2A]" /> },
    { title: "Livrare rapidă", desc: "Timp mediu de producție de 24-48h. Livrăm rapid în toată țara.", icon: <Truck className="h-6 w-6 text-[#FF8C2A]" /> }
  ];

  const timelineSteps = [
    { step: "01", title: "Trimite ideea", desc: "Încarcă fișierul 3D sau descrie schița ta prin formularul de ofertă.", pose: "analyzing" as const, poseDesc: "Mascota 3D analizează schița..." },
    { step: "02", title: "Printăm produsul", desc: "Piesa prinde viață pe imprimantele noastre premium calibrate la micron.", pose: "printing" as const, poseDesc: "Mascota 3D coordonează printarea..." },
    { step: "03", title: "Livrăm produsul", desc: "Împachetăm sigur și trimitem coletul direct la ușa ta.", pose: "waving" as const, poseDesc: "Mascota 3D îți livrează coletul!" }
  ];

  return (
    <div className="flex flex-col gap-20 overflow-hidden pb-12">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 px-4 sm:px-6 lg:px-8 bg-[#F6F6F6] text-[#111111] dark:bg-[#111111] dark:text-white transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-10">
          <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-gradient-to-tr from-[#FF8C2A]/20 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[#FF8C2A]/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          {/* Left Hero Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF8C2A]/10 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-[#FF8C2A] font-mono">
              <Sparkles className="h-3.5 w-3.5" />
              Printare 3D la nivelul următor
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight font-poppins text-[#111111] dark:text-white">
              Transformăm ideile în <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C2A] to-[#E05B00]">obiecte reale</span> prin printare 3D
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-inter max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Realizăm produse personalizate cu precizie și pasiune: brelocuri, ornamente tematice, pușculițe distractive, organizatoare și proiecte speciale unicat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/produse"
                className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] px-8 py-4 text-sm font-black uppercase tracking-wider text-black hover:shadow-xl hover:shadow-[#FF8C2A]/25 transition-all font-poppins text-center"
              >
                Vezi produsele
              </Link>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="w-full sm:w-auto rounded-full border border-zinc-300 dark:border-white/10 px-8 py-4 text-sm font-black uppercase tracking-wider text-[#111111] dark:text-white hover:bg-[#FF8C2A]/10 hover:border-[#FF8C2A]/50 transition-all font-poppins cursor-pointer"
              >
                Solicită ofertă
              </button>
            </div>
          </motion.div>

          {/* Right Hero Column: Simulated 3D Printer */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center relative"
          >
            <div className="relative w-full max-w-[450px] aspect-square rounded-2xl border border-white/5 dark:bg-[#1C1C1C] bg-white shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              {/* Heated Bed of the 3D Printer */}
              <div className="w-full h-1/4 border border-[#FF8C2A]/30 bg-black/60 rounded-xl relative mt-4 flex items-center justify-center shadow-inner">
                {/* Print head nozzle */}
                <motion.div
                  animate={{
                    x: [-60, 60, -30, 40, -60],
                    y: [-15, 10, -5, 15, -15],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut",
                  }}
                  className="absolute z-10 w-4 h-4 rounded-full bg-[#FF8C2A] shadow-lg shadow-[#FF8C2A]"
                  style={{ top: "10%" }}
                >
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-[#FF8C2A] to-transparent animate-pulse" />
                </motion.div>

                {/* Printed model */}
                <motion.div
                  animate={{ scaleY: [0.1, 1, 0.1] }}
                  transition={{ repeat: Infinity, duration: 15 }}
                  className="w-16 bg-gradient-to-t from-[#E05B00] to-[#FF8C2A] rounded-t-lg origin-bottom shadow-lg"
                  style={{ height: "45px" }}
                />
              </div>

              {/* Mascot */}
              <div className="relative flex-grow flex items-center justify-center z-10">
                <Mascot pose="printing" size={180} />
              </div>

              {/* Status Badge */}
              <div className="z-10 rounded-full bg-[#111111]/80 px-4 py-1.5 text-[10px] font-mono tracking-widest text-[#FF8C2A] uppercase border border-[#FF8C2A]/20">
                STATUS: PRINTING MODEL (82%)
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PREMIUM CAROUSEL (DEASUPRA PANOULUI DE CONTROL) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-poppins">
            Produse & Servicii Recomandate
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto font-inter">
            O selecție de tehnologii și cadouri personalizate din atelierul gtreiD.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#1C1C1C] min-h-[350px] flex items-center shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={`w-full grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center bg-gradient-to-r ${slides[currentSlide].bg}`}
            >
              {/* Slide text details */}
              <div className="space-y-4 text-center md:text-left">
                <span className="inline-flex rounded-full bg-[#FF8C2A]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF8C2A] font-mono">
                  {slides[currentSlide].badge}
                </span>
                <h3 className="text-2xl md:text-3xl font-black font-poppins text-[#111111] dark:text-white">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-inter leading-relaxed">
                  {slides[currentSlide].description}
                </p>
                <div className="pt-2">
                  <Link
                    href={slides[currentSlide].actionPath}
                    className="inline-flex items-center gap-2 rounded-full bg-black dark:bg-[#111111] text-[#FF8C2A] dark:text-[#FF8C2A] px-6 py-3 text-xs font-black uppercase tracking-wider hover:opacity-85 transition-all font-poppins"
                  >
                    {slides[currentSlide].actionText} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Slide Visual (SVG Vector) */}
              <div className="flex justify-center items-center">
                <div className="relative p-6 bg-black/5 dark:bg-black/40 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner">
                  {slides[currentSlide].svg}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === idx ? "bg-[#FF8C2A] w-6" : "bg-zinc-400/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTERFAȚA CU TOATE BUTOANELE (DASHBOARD RAPID) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-poppins">
            Panou de Control Principal
          </h2>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto font-inter">
            Navighează rapid în restul secțiunilor active din cadrul platformei noastre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardLinks.map((link, idx) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group rounded-2xl border border-black/10 dark:border-white/10 dark:bg-[#1C1C1C] bg-white p-5 hover:border-[#FF8C2A]/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="rounded-xl bg-[#FF8C2A]/10 p-3 w-fit">
                  {link.icon}
                </div>
                <h3 className="text-base font-bold font-poppins text-[#111111] dark:text-white">
                  {link.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-inter leading-relaxed">
                  {link.desc}
                </p>
              </div>
              {link.actionText && (
                <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5">
                  <Link
                    href={link.path}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF8C2A] group-hover:underline font-poppins"
                  >
                    {link.actionText} <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* DE CE NOI? & TIMELINE SIMPLE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-poppins">Angajamentul gtreiD</h3>
          <div className="space-y-4">
            {whyUs.map((item) => (
              <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-black/5 dark:border-white/5 dark:bg-[#1C1C1C] bg-white">
                <div className="rounded-xl bg-[#FF8C2A]/10 p-2.5 h-fit">{item.icon}</div>
                <div>
                  <h4 className="text-sm font-bold font-poppins">{item.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold font-poppins">Proces Simplificat</h3>
          <div className="border-l border-[#FF8C2A]/20 pl-6 space-y-6">
            {timelineSteps.map((s) => (
              <div key={s.step} className="relative">
                <div className="absolute -left-[38px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-black border border-[#FF8C2A] text-[10px] font-bold text-[#FF8C2A]">
                  {s.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-poppins">{s.title}</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{s.desc}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-500 font-mono italic">
                    <span>{s.poseDesc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 w-full">
        <div className="rounded-3xl bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] p-10 md:p-14 text-black shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/15 blur-2xl pointer-events-none" />
          <div className="space-y-4 text-center md:text-left z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-poppins">
              Ai o idee? Noi o transformăm în realitate.
            </h2>
            <p className="text-sm font-medium text-black/80 font-inter max-w-md">
              Echipa noastră oferă suport cap-la-cap, de la designul 3D inițial la piesa printată final. Începe acum!
            </p>
          </div>
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="z-10 rounded-full bg-black px-8 py-4 text-sm font-black uppercase tracking-wider text-[#FF8C2A] hover:bg-[#1C1C1C] transition-all font-poppins shadow-lg cursor-pointer"
          >
            Solicită ofertă
          </button>
        </div>
      </section>
    </div>
  );
}

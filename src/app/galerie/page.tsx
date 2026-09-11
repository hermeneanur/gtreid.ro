"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, Search, Sparkles, SlidersHorizontal, ShoppingBag, ChevronRight, Hammer, Zap, Layers, HelpCircle, CheckCircle2 } from "lucide-react";
import { products, Product, portfolioItems, PortfolioItem, CATEGORIES } from "@/data/data";
import { useApp } from "@/context/AppContext";
import { ProductIconMockup } from "@/components/product-card/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Draw for Before & After based on portfolio item slug/id
const CaseStudyDraw: React.FC<{ id: string; type: "before" | "after" }> = ({ id, type }) => {
  const isBefore = type === "before";

  if (id === "port1") {
    // Macheta Arhitecturala
    return (
      <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
        {isBefore ? (
          // 2D Blueprint
          <>
            <rect x="10" y="10" width="180" height="130" stroke="#5A5D64" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="10" y1="75" x2="190" y2="75" stroke="#5A5D64" strokeWidth="0.8" />
            <line x1="100" y1="10" x2="100" y2="140" stroke="#5A5D64" strokeWidth="0.8" />
            <rect x="30" y="30" width="50" height="35" stroke="#5A5D64" strokeWidth="1.5" />
            <rect x="120" y="30" width="50" height="35" stroke="#5A5D64" strokeWidth="1.5" />
            <rect x="30" y="85" width="50" height="35" stroke="#5A5D64" strokeWidth="1.5" />
            <rect x="120" y="85" width="50" height="35" stroke="#5A5D64" strokeWidth="1.5" />
            <path d="M30 20 H80" stroke="#5A5D64" strokeWidth="0.8" />
            <line x1="30" y1="17" x2="30" y2="23" stroke="#5A5D64" strokeWidth="0.8" />
            <line x1="80" y1="17" x2="80" y2="23" stroke="#5A5D64" strokeWidth="0.8" />
            <text x="55" y="15" fill="#5A5D64" fontSize="7" textAnchor="middle">50.0 mm</text>
          </>
        ) : (
          // 3D Printed Finished Macheta
          <>
            <rect x="10" y="10" width="180" height="130" stroke="#FF8C2A" strokeWidth="1.5" fill="rgba(28,28,28,0.9)" />
            <g transform="translate(30, 20) scale(0.7)">
              <polygon points="30,40 60,25 90,40 90,75 30,75" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.15)" />
              <polygon points="60,25 90,40 120,25 90,10" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.2)" />
              <polygon points="90,40 120,25 120,60 90,75" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.1)" />
            </g>
            <g transform="translate(110, 50) scale(0.7)">
              <polygon points="30,40 60,25 90,40 90,75 30,75" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.15)" />
              <polygon points="60,25 90,40 120,25 90,10" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.2)" />
              <polygon points="90,40 120,25 120,60 90,75" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.1)" />
            </g>
            <circle cx="45" cy="115" r="8" stroke="#FF8C2A" strokeWidth="1.5" fill="rgba(255,140,42,0.1)" />
            <line x1="45" y1="123" x2="45" y2="135" stroke="#FF8C2A" strokeWidth="1.5" />
            <circle cx="165" cy="45" r="8" stroke="#FF8C2A" strokeWidth="1.5" fill="rgba(255,140,42,0.1)" />
            <line x1="165" y1="53" x2="165" y2="65" stroke="#FF8C2A" strokeWidth="1.5" />
          </>
        )}
      </svg>
    );
  }

  if (id === "port2") {
    // Piesa Auto Admisie Aer
    return (
      <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
        {isBefore ? (
          // Broken part
          <>
            <path d="M30 75 Q30 35 100 35 Q170 35 170 75 Q170 115 100 115 Q30 115 30 75 Z" stroke="#5A5D64" strokeWidth="2" fill="none" />
            <path d="M90 35 L95 55 L90 65 L105 85" stroke="#5A5D64" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M120 115 L115 95 L125 80" stroke="#5A5D64" strokeWidth="2.5" strokeLinecap="round" />
            <text x="100" y="79" fill="#5A5D64" fontSize="8" textAnchor="middle" fontWeight="bold">DETERIORAT</text>
          </>
        ) : (
          // Newly printed Carbon-PETG part
          <>
            <path d="M30 75 Q30 35 100 35 Q170 35 170 75 Q170 115 100 115 Q30 115 30 75 Z" stroke="#FF8C2A" strokeWidth="4.5" fill="rgba(28,28,28,0.9)" />
            <line x1="45" y1="55" x2="155" y2="55" stroke="#FF8C2A" strokeWidth="1" strokeDasharray="5,2" opacity="0.3" />
            <line x1="45" y1="75" x2="155" y2="75" stroke="#FF8C2A" strokeWidth="1" strokeDasharray="5,2" opacity="0.3" />
            <line x1="45" y1="95" x2="155" y2="95" stroke="#FF8C2A" strokeWidth="1" strokeDasharray="5,2" opacity="0.3" />
            <circle cx="100" cy="75" r="15" stroke="#FF8C2A" strokeWidth="2" fill="rgba(255,140,42,0.1)" />
            <text x="100" y="79" fill="#FF8C2A" fontSize="9" textAnchor="middle" fontWeight="bold">RECONSTRUIT 3D</text>
          </>
        )}
      </svg>
    );
  }

  // port3 - Trofee Personalizate
  return (
    <svg viewBox="0 0 200 150" fill="none" className="w-full h-full">
      {isBefore ? (
        // 2D Conceptual Design Drawing
        <>
          <rect x="70" y="90" width="60" height="30" stroke="#5A5D64" strokeWidth="1.5" />
          <polygon points="100,20 80,90 120,90" stroke="#5A5D64" strokeWidth="1.5" />
          <line x1="100" y1="10" x2="100" y2="20" stroke="#5A5D64" strokeWidth="1" />
          <circle cx="100" cy="8" r="3" stroke="#5A5D64" strokeWidth="1" />
          <line x1="50" y1="50" x2="150" y2="50" stroke="#5A5D64" strokeWidth="0.5" strokeDasharray="2,2" />
        </>
      ) : (
        // Solid Glowing 3D printed trophy
        <>
          <rect x="70" y="90" width="60" height="30" rx="2" fill="#1C1C1C" stroke="#FF8C2A" strokeWidth="2.5" />
          <polygon points="100,20 80,90 120,90" fill="rgba(255,140,42,0.2)" stroke="#FF8C2A" strokeWidth="3" />
          <line x1="100" y1="10" x2="100" y2="20" stroke="#FF8C2A" strokeWidth="2" />
          <circle cx="100" cy="8" r="4" fill="#FF8C2A" />
          <path d="M90 70 L95 60 H105 L110 50" stroke="#FF8C2A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="110" cy="50" r="2" fill="#FF8C2A" />
          <circle cx="100" cy="50" r="30" fill="rgba(255,140,42,0.05)" />
        </>
      )}
    </svg>
  );
};

// Before-After Slider Component
const BeforeAfterSlider: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const touch = e.touches[0];
    if (touch) {
      const x = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#111111] cursor-ew-resize select-none"
    >
      {/* Before Layer (Full Width) */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <CaseStudyDraw id={item.id} type="before" />
      </div>
      <div className="absolute top-4 left-4 bg-zinc-800/80 backdrop-blur text-[10px] text-zinc-400 px-2.5 py-1 rounded font-mono uppercase font-bold z-20">
        ÎNAINTE: Schiță / Piesă Defectă
      </div>

      {/* After Layer (Clipped Width) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-8 bg-[#1C1C1C]"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <CaseStudyDraw id={item.id} type="after" />
      </div>
      <div
        className="absolute top-4 bg-[#FF8C2A] text-black px-2.5 py-1 rounded text-[10px] font-mono uppercase font-black z-20"
        style={{ left: `${Math.min(80, Math.max(5, sliderPosition - 10))}%` }}
      >
        DUPĂ: Print 3D gtreiD
      </div>

      {/* Slider Split line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-[#FF8C2A] z-30"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-[#FF8C2A] text-black flex items-center justify-center font-bold text-sm shadow-xl border border-black">
          ↔
        </div>
      </div>
    </div>
  );
};

export default function UnifiedGalleryPage() {
  const { addToQuote } = useApp();
  const [activeTab, setActiveTab] = useState<"galerie" | "portofoliu">("galerie");
  const [activeFilter, setActiveFilter] = useState("Toate");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["Toate", ...CATEGORIES];

  const filteredProducts = activeFilter === "Toate"
    ? products
    : products.filter(p => p.category === activeFilter || (p.categories && p.categories.includes(activeFilter)));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="mb-8 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">Galerie & Portofoliu</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins text-white">
          Showroom gtreiD
        </h1>
        <p className="text-sm text-zinc-400 max-w-xl mx-auto font-inter">
          Explorează galeria noastră de printuri 3D sau consultă portofoliul nostru de cazuri reale de modelare și reconstrucție.
        </p>
      </div>

      {/* Page Tabs */}
      <div className="flex justify-center border-b border-white/10 mb-10">
        <button
          onClick={() => setActiveTab("galerie")}
          className={`px-8 py-3.5 text-sm font-bold font-poppins transition-all border-b-2 cursor-pointer ${
            activeTab === "galerie"
              ? "border-[#FF8C2A] text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Galerie Printuri 3D
        </button>
        <button
          onClick={() => setActiveTab("portofoliu")}
          className={`px-8 py-3.5 text-sm font-bold font-poppins transition-all border-b-2 cursor-pointer ${
            activeTab === "portofoliu"
              ? "border-[#FF8C2A] text-white"
              : "border-transparent text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Proiecte Portofoliu (Înainte/După)
        </button>
      </div>

      {activeTab === "galerie" ? (
        // Tab 1: GALERIE (Masonry layout)
        <div className="space-y-8">
          {/* Categories Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#FF8C2A] text-black"
                    : "bg-[#1C1C1C] border border-white/5 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry / Dense Grid Layout */}
          <div className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProduct(p)}
                  className="masonry-item relative overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C1C] text-white hover:border-[#FF8C2A]/40 transition-all cursor-pointer group shadow-md"
                >
                  {p.images?.[0] && (p.images[0].endsWith('.jpg') || p.images[0].endsWith('.jpeg') || p.images[0].endsWith('.png')) ? (
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-black/30 border-b border-white/5">
                      <img
                        src={p.images[0].startsWith('/') ? p.images[0] : `/${p.images[0]}`}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <span className="text-xs font-bold uppercase text-[#FF8C2A] tracking-wider font-mono">
                          {p.category}
                        </span>
                        <h4 className="text-sm font-bold text-center px-4 font-poppins">
                          {p.name}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono">
                          Dă click pentru detalii
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-[4/3] relative overflow-hidden bg-zinc-900/60 flex items-center justify-center border-b border-white/5 p-6">
                      <ProductIconMockup slug={p.slug} size={130} />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <span className="text-xs font-bold uppercase text-[#FF8C2A] tracking-wider font-mono">
                          {p.category}
                        </span>
                        <h4 className="text-sm font-bold text-center px-4 font-poppins">
                          {p.name}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono">
                          Dă click pentru detalii
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-400 truncate max-w-[70%]">{p.name}</span>
                    <span className="text-xs font-bold text-[#FF8C2A]">{p.price > 1 ? `${p.price} RON` : "Custom"}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        // Tab 2: PORTOFOLIU (Sliders layout)
        <div className="grid grid-cols-1 gap-12">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-white/10 bg-[#1C1C1C] rounded-3xl p-6 md:p-8"
            >
              {/* Left Side: Before/After Slider */}
              <div className="lg:col-span-6 w-full">
                <BeforeAfterSlider item={item} />
              </div>

              {/* Right Side: Details & Timeline */}
              <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#FF8C2A]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF8C2A] font-mono">
                      {item.category}
                    </span>
                    <span className="text-zinc-500 font-mono text-xs">ID: {item.id}</span>
                  </div>
                  <h3 className="text-2xl font-black font-poppins text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 font-inter leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Workflow steps */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#FF8C2A] font-mono flex items-center gap-1.5">
                    <Hammer className="h-3.5 w-3.5" /> Procesul de Realizare
                  </h4>
                  <div className="space-y-2">
                    {item.process.map((step, i) => (
                      <div key={i} className="flex gap-2.5 items-start text-xs text-zinc-400 font-inter">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal for Gallery */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-4xl rounded-2xl border border-white/10 bg-[#1C1C1C] p-6 md:p-8 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Close Button */}
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Column: Visual Rendering */}
              <div className="flex flex-col items-center justify-center bg-black/60 rounded-xl p-8 relative">
                <ProductIconMockup slug={selectedProduct.slug} size={220} imagePath={selectedProduct.images?.[0]} />
              </div>

              {/* Right Column: Info & CTA */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF8C2A] font-mono">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-2xl font-black font-poppins text-white mt-1">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-400 font-inter leading-relaxed">
                    {selectedProduct.shortDescription}
                  </p>

                  <div className="rounded-xl bg-[#111111] p-4 space-y-2">
                    <span className="text-[10px] font-black uppercase text-zinc-500 font-mono tracking-wider">Specificații Galerie</span>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-inter">
                      <div>
                        <span className="text-zinc-500">Timp Producție:</span>
                        <span className="block font-semibold text-white">{selectedProduct.productionTime}</span>
                      </div>
                      <div>
                        <span className="text-zinc-500">Preț Standard:</span>
                        <span className="block font-semibold text-[#FF8C2A]">{selectedProduct.price > 1 ? `${selectedProduct.price} RON` : "Custom"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/produse/${selectedProduct.slug}`}
                    className="flex-1 rounded-xl bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] py-3 text-center text-xs font-black uppercase tracking-wider text-black font-poppins hover:shadow-lg hover:shadow-[#FF8C2A]/25 transition-all"
                  >
                    Configurează în 3D
                  </Link>
                  <button
                    onClick={() => {
                      addToQuote(selectedProduct.slug);
                      setSelectedProduct(null);
                    }}
                    className="rounded-xl border border-white/10 px-4 py-3 text-xs font-black uppercase tracking-wider text-white hover:bg-white/5 transition-all font-poppins cursor-pointer"
                  >
                    Adaugă la Cotație
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

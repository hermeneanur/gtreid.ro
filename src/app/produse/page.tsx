"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, Trash2, Heart, Sparkles } from "lucide-react";
import { products, CATEGORIES, Product } from "@/data/data";
import { useApp } from "@/context/AppContext";
import ProductCard from "@/components/product-card/ProductCard";

// Simplistic themed category mascots next to each filter
const CategoryMascot: React.FC<{ category: string | null; active: boolean }> = ({ category, active }) => {
  const strokeColor = active ? "#FF8C2A" : "#71717a";
  const fillColor = active ? "rgba(255,140,42,0.12)" : "rgba(255,255,255,0.01)";
  
  if (category === null) {
    // Toate Categoriile (Default Mascot)
    return (
      <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
        <rect x="9" y="11" width="22" height="20" rx="5" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
        <circle cx="16" cy="19" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
        <circle cx="24" cy="19" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
        <path d="M17 24 Q20 26.5 23 24" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M15 31 L15 33" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M25 31 L25 33" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  switch (category) {
    case "Ornamente":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Christmas / Star Ornament Hat */}
          <path d="M20 2 L23 8 L29 9 L24 13 L26 19 L20 16 L14 19 L16 13 L11 9 L17 8 Z" fill="#FF8C2A" opacity={active ? 1 : 0.4} />
          <rect x="9" y="15" width="22" height="18" rx="4" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
          <circle cx="16" cy="22" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <circle cx="24" cy="22" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <path d="M17 27 Q20 29.5 23 27" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "Brelocuri":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Keychain Ring */}
          <circle cx="20" cy="8" r="6" stroke={strokeColor} strokeWidth="2.5" />
          <path d="M20 14 L20 17" stroke={strokeColor} strokeWidth="2.5" />
          <rect x="9" y="17" width="22" height="17" rx="4" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
          <circle cx="16" cy="24" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <circle cx="24" cy="24" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <path d="M17 29 Q20 31.5 23 29" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case "Pușculițe":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Coin Slot with half-inserted coin */}
          <path d="M15 8 H25" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="20" cy="7" r="3.5" fill="#FF8C2A" opacity={active ? 1 : 0.4} />
          <rect x="9" y="13" width="22" height="20" rx="4" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
          <circle cx="16" cy="21" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <circle cx="24" cy="21" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <ellipse cx="20" cy="26" rx="3.5" ry="2.5" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case "Jucării":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Superhero Cape / Wings behind */}
          <path d="M4 14 Q20 22 36 14 L28 32 H12 Z" fill="#FF8C2A" opacity={active ? 0.35 : 0.15} />
          <rect x="9" y="11" width="22" height="20" rx="4" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
          <circle cx="16" cy="19" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <circle cx="24" cy="19" r="1.5" fill={active ? "#FFFFFF" : "#71717a"} />
          <path d="M9 17 H31" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    case "Auto":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Car body */}
          <path d="M7 23 L11 14 C12 12 14 11 17 11 H23 C26 11 28 12 29 14 L33 23 H35 C36 23 37 24 37 25 V28 H3 V25 C3 24 4 23 5 23 H7 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Wheels */}
          <circle cx="11" cy="28" r="3.5" stroke={strokeColor} strokeWidth="2.5" fill="#FF8C2A" />
          <circle cx="29" cy="28" r="3.5" stroke={strokeColor} strokeWidth="2.5" fill="#FF8C2A" />
        </svg>
      );

    case "Cadouri personalizate":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Gift Bow */}
          <path d="M20 10 Q14 4 17 4 Q20 4 20 10 Q26 4 23 4 Q20 4 20 10" fill="#FF8C2A" opacity={active ? 1 : 0.4} />
          <rect x="9" y="11" width="22" height="20" rx="4" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
          <line x1="20" y1="11" x2="20" y2="31" stroke="#FF8C2A" strokeWidth="2.5" />
          <line x1="9" y1="21" x2="31" y2="21" stroke="#FF8C2A" strokeWidth="2.5" />
        </svg>
      );

    case "Proiecte speciale":
      return (
        <svg viewBox="0 0 40 40" className="w-5.5 h-5.5 flex-shrink-0" fill="none">
          {/* Glowing Lightbulb/Aura */}
          <circle cx="20" cy="8" r="3.5" fill="#FF8C2A" className="animate-pulse" />
          <rect x="9" y="15" width="22" height="18" rx="4" stroke={strokeColor} strokeWidth="2.5" fill={fillColor} />
          <circle cx="16" cy="22" r="1.5" fill="#FF8C2A" />
          <circle cx="24" cy="22" r="1.5" fill="#FF8C2A" />
          <path d="M20 26 H26" stroke={strokeColor} strokeWidth="2" />
        </svg>
      );

    default:
      return null;
  }
};

function CatalogContent() {
  const searchParams = useSearchParams();
  const { favorites } = useApp();

  // Search and Filter States
  const [searchVal, setSearchVal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number>(500);
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [sortBy, setSortBy] = useState<string>("popularitate");

  // Load URL Search Params & handle reset
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const filterParam = searchParams.get("filter");

    React.startTransition(() => {
      setSelectedCategory(categoryParam);
      setSearchVal(searchParam || "");
      setFilterFavorites(filterParam === "favorites");
    });
  }, [searchParams]);

  // Clean all filters
  const resetFilters = () => {
    setSearchVal("");
    setSelectedCategory(null);
    setSelectedMaterial("");
    setSelectedColor("");
    setPriceRange(500);
    setFilterFavorites(false);
    setSortBy("popularitate");
  };

  useEffect(() => {
    const handleReset = () => {
      resetFilters();
    };
    window.addEventListener("reset-produse-filters", handleReset);
    return () => window.removeEventListener("reset-produse-filters", handleReset);
  }, []);

  // Unique Materials & Colors for filter options
  const allMaterials = Array.from(new Set(products.flatMap((p) => p.materials)));
  const allColors = Array.from(new Set(products.flatMap((p) => p.colors.map(c => c.name))));

  // Filtering Logic
  const filteredProducts = products.filter((p) => {
    // Search
    if (searchVal.trim()) {
      const q = searchVal.toLowerCase();
      const allCats = [p.category, ...(p.categories || [])].join(" ").toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !allCats.includes(q)) {
        return false;
      }
    }
    // Category
    if (selectedCategory) {
      const matchesCat = p.category === selectedCategory || (p.categories && p.categories.includes(selectedCategory));
      if (!matchesCat) return false;
    }
    // Material
    if (selectedMaterial && !p.materials.includes(selectedMaterial)) {
      return false;
    }
    // Color
    if (selectedColor && !p.colors.map(c => c.name).includes(selectedColor)) {
      return false;
    }
    // Price
    if (p.price > priceRange) {
      return false;
    }
    // Favorites
    if (filterFavorites && !favorites.includes(p.slug)) {
      return false;
    }
    return true;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "pret-crescator") return a.price - b.price;
    if (sortBy === "pret-descrescator") return b.price - a.price;
    if (sortBy === "recenzii") return b.reviewCount - a.reviewCount;
    // default/popularity
    return b.rating - a.rating;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
      {/* Page Title & Breadcrumbs */}
      <div className="mb-8 space-y-1">
        <div className="text-xs text-zinc-500 font-mono tracking-wider">
          <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
          <span className="mx-2">/</span>
          <span className="text-[#FF8C2A] font-semibold">Produse</span>
          {selectedCategory && (
            <>
              <span className="mx-2">/</span>
              <span className="text-zinc-400 capitalize">{selectedCategory.toLowerCase()}</span>
            </>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins text-white">
          Catalog Produse 3D
        </h1>
        <p className="text-sm text-zinc-400 font-inter">
          Explorează sute de modele pregătite pentru printare sau solicită o replică custom.
        </p>
      </div>

      {/* Main Grid: Filters & Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Filters */}
        <div className="space-y-6 lg:col-span-1 border border-white/10 bg-[#1C1C1C] p-6 rounded-2xl dark:bg-[#1C1C1C] light:bg-white light:border-black/10">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-white dark:text-white light:text-black flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#FF8C2A]" />
              Filtre Catalog
            </h3>
            <button
              onClick={resetFilters}
              className="text-[10px] uppercase font-mono text-[#FF8C2A] hover:underline flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" /> Șterge
            </button>
          </div>

          {/* Favorites Filter */}
          <div>
            <button
              onClick={() => setFilterFavorites(!filterFavorites)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold tracking-wider uppercase border transition-all ${
                filterFavorites
                  ? "bg-red-500/10 border-red-500/40 text-red-500"
                  : "border-white/10 hover:border-white/30 text-zinc-400 hover:text-white"
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" /> Doar Favorite
              </span>
              <span>({favorites.length})</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">Categorii</h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                }}
                className={`w-full flex items-center gap-2.5 text-left text-xs py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                  !selectedCategory 
                    ? "text-[#FF8C2A] font-bold bg-[#FF8C2A]/5 border-[#FF8C2A]/20" 
                    : "text-zinc-400 hover:text-white border-transparent hover:bg-white/5"
                }`}
              >
                <CategoryMascot category={null} active={!selectedCategory} />
                <span>Toate Categoriile</span>
              </button>
              {CATEGORIES.map((catName) => {
                const isActive = selectedCategory === catName;
                return (
                  <div key={catName}>
                    <button
                      onClick={() => {
                        setSelectedCategory(catName);
                      }}
                      className={`w-full flex items-center gap-2.5 text-left text-xs py-2.5 px-3 rounded-xl border transition-all cursor-pointer ${
                        isActive 
                          ? "text-[#FF8C2A] font-bold bg-[#FF8C2A]/5 border-[#FF8C2A]/20" 
                          : "text-zinc-300 hover:text-white border-transparent hover:bg-white/5"
                      }`}
                    >
                      <CategoryMascot category={catName} active={isActive} />
                      <span>{catName}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">Preț Maxim</h4>
              <span className="text-xs text-[#FF8C2A] font-mono font-bold">{priceRange} RON</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#FF8C2A]"
            />
            <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
              <span>0 RON</span>
              <span>500 RON</span>
            </div>
          </div>

          {/* Material Filter */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">Material</h4>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#111111] p-2 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
            >
              <option value="">Toate materialele</option>
              {allMaterials.map((mat) => (
                <option key={mat} value={mat}>{mat}</option>
              ))}
            </select>
          </div>

          {/* Color Filter */}
          <div className="space-y-2 border-t border-white/5 pt-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500">Culoare</h4>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#111111] p-2 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
            >
              <option value="">Toate culorile</option>
              {allColors.map((col) => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product Grid & Search/Sort controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/10 bg-[#1C1C1C] p-4 rounded-xl dark:bg-[#1C1C1C] light:bg-white light:border-black/10">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="h-10 w-full rounded-full border border-white/10 bg-[#111111] pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:border-[#FF8C2A]/60 focus:outline-none"
                placeholder="Caută în această pagină..."
              />
              <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-zinc-500" />
            </div>

            {/* Sort & Count */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto text-xs text-zinc-400">
              <span>{sortedProducts.length} obiecte găsite</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#111111] p-2 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
              >
                <option value="popularitate">Popularitate / Rating</option>
                <option value="pret-crescator">Preț: crescător</option>
                <option value="pret-descrescator">Preț: descrescător</option>
                <option value="recenzii">Număr recenzii</option>
              </select>
            </div>
          </div>

          {/* Grid of Product Cards */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-white/10 bg-[#1C1C1C] rounded-2xl p-8 dark:bg-[#1C1C1C] light:bg-white light:border-black/10">
              <div className="mx-auto h-16 w-16 text-[#FF8C2A] opacity-80 mb-4 flex items-center justify-center text-4xl">
                🔎
              </div>
              <h3 className="text-lg font-bold text-white dark:text-white light:text-black">
                Niciun produs găsit
              </h3>
              <p className="text-xs text-zinc-500 mt-2 max-w-sm mx-auto font-inter">
                Nu s-a găsit niciun obiect conform filtrării selectate. Încearcă să schimbi filtrele sau resetează-le.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-lg bg-[#FF8C2A] px-6 py-2.5 text-xs font-bold text-black hover:bg-[#e05b00] transition-colors font-poppins"
              >
                Resetează Filtrele
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function Catalog() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh] text-white">
        <p className="text-sm font-mono tracking-widest text-[#FF8C2A]">Se încarcă catalogul...</p>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}

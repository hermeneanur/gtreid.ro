"use client";

import React from "react";
import Link from "next/link";
import { Heart, Star, ShoppingBag, Eye } from "lucide-react";
import { Product } from "@/data/data";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

// Inline SVG Mockup Generator for various product categories
export const ProductIconMockup: React.FC<{ slug: string; size?: number; imagePath?: string }> = ({ slug, size = 120, imagePath }) => {
  const color = "#FF8C2A";

  if (imagePath && (imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg') || imagePath.endsWith('.png') || imagePath.startsWith('/'))) {
    return (
      <img
        src={imagePath.startsWith('/') ? imagePath : `/${imagePath}`}
        alt={slug}
        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
      />
    );
  }

  const renderIcon = () => {
    switch (slug) {
      case "glob-craciun-personalizat-nume":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="55" r="30" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            <rect x="47" y="20" width="6" height="6" fill={color} />
            <path d="M50 20 C45 10, 55 10, 50 20" stroke={color} strokeWidth="2" fill="none" />
            <path d="M30 55 H70 M50 35 V75" stroke={color} strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="50" y="59" fill={color} fontSize="9" fontWeight="bold" textAnchor="middle">MARIA</text>
          </svg>
        );
      case "iepuras-paste-geometric-modern":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 80 L35 70 L35 50 L42 35 L40 15 L48 25 L52 25 L60 15 L58 35 L65 50 L65 70 Z" stroke={color} strokeWidth="2.5" fill="rgba(255,140,42,0.1)" />
            <line x1="35" y1="50" x2="65" y2="50" stroke={color} strokeWidth="1" />
            <line x1="42" y1="35" x2="58" y2="35" stroke={color} strokeWidth="1" />
          </svg>
        );
      case "dovleac-halloween-led":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <ellipse cx="50" cy="55" rx="35" ry="25" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            <path d="M50 30 Q53 20 48 15" stroke={color} strokeWidth="4" strokeLinecap="round" />
            {/* Scary Face */}
            <polygon points="38,48 44,48 41,42" fill={color} />
            <polygon points="56,48 62,48 59,42" fill={color} />
            <polygon points="47,55 53,55 50,51" fill={color} />
            <path d="M35 62 Q50 72 65 62 Q57 65 50 63 Z" fill={color} />
          </svg>
        );
      case "trandafir-etern-suport-elegant":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M50 15 C40 5, 30 15, 50 35 C70 15, 60 5, 50 15 Z" fill={color} opacity="0.8" />
            <path d="M50 35 C42 28, 45 22, 50 28 C55 22, 58 28, 50 35 Z" fill="#E60000" />
            <line x1="50" y1="35" x2="50" y2="80" stroke={color} strokeWidth="3" />
            <path d="M50 55 Q35 50 50 45" stroke={color} strokeWidth="2" fill="none" />
            <path d="M50 65 Q65 60 50 55" stroke={color} strokeWidth="2" fill="none" />
            <rect x="30" y="80" width="40" height="8" rx="2" fill="#1C1C1C" stroke={color} strokeWidth="2" />
          </svg>
        );
      case "breloc-anime-katana-mini":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" style={{ transform: "rotate(45deg)" }}>
            <line x1="15" y1="50" x2="70" y2="50" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <rect x="70" y="44" width="4" height="12" rx="1" fill="#FFFFFF" stroke={color} strokeWidth="1" />
            <line x1="74" y1="50" x2="90" y2="50" stroke="#FF8C2A" strokeWidth="6" strokeLinecap="round" />
            <circle cx="9" cy="50" r="4" stroke={color} strokeWidth="1.5" />
            <circle cx="10" cy="50" r="1.5" fill={color} />
          </svg>
        );
      case "breloc-personalizat-logo-firma":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="25" y="35" width="50" height="30" rx="4" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            <circle cx="33" cy="50" r="3" fill={color} />
            <text x="53" y="54" fill={color} fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="monospace">LOGO</text>
            <path d="M25 50 Q10 50 15 35" stroke={color} strokeWidth="2" fill="none" />
          </svg>
        );
      case "pusculita-astronaut-3d":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="35" y="30" width="30" height="45" rx="10" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            {/* Visor */}
            <rect x="40" y="36" width="20" height="14" rx="5" fill="#1C1C1C" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="62" r="4.5" stroke={color} strokeWidth="2" />
            {/* Rocket Pack */}
            <rect x="30" y="38" width="5" height="28" rx="2" fill={color} />
            <rect x="65" y="38" width="5" height="28" rx="2" fill={color} />
          </svg>
        );
      case "pusculita-purcelus-poligonal-personalizata":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 50 L35 30 L65 30 L80 50 L70 70 L30 70 Z" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            <circle cx="76" cy="46" r="3" fill={color} />
            <line x1="40" y1="20" x2="60" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" /> {/* slot */}
            {/* legs */}
            <line x1="35" y1="70" x2="35" y2="82" stroke={color} strokeWidth="4" />
            <line x1="65" y1="70" x2="65" y2="82" stroke={color} strokeWidth="4" />
          </svg>
        );
      case "figurina-cthulhu-articulata":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="35" r="16" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            {/* Tentacles */}
            <path d="M42 45 Q40 60 30 65" stroke={color} strokeWidth="2.5" fill="none" />
            <path d="M47 48 Q47 65 45 70" stroke={color} strokeWidth="2.5" fill="none" />
            <path d="M53 48 Q53 65 55 70" stroke={color} strokeWidth="2.5" fill="none" />
            <path d="M58 45 Q60 60 70 65" stroke={color} strokeWidth="2.5" fill="none" />
            {/* Wings */}
            <path d="M34 30 Q10 20 25 45 Z" stroke={color} strokeWidth="1.5" fill="rgba(255,140,42,0.05)" />
            <path d="M66 30 Q90 20 75 45 Z" stroke={color} strokeWidth="1.5" fill="rgba(255,140,42,0.05)" />
          </svg>
        );
      case "logo-birou-personalizat-firma":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M20 75 L35 30 L65 30 L80 75 Z" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
            <text x="50" y="55" fill={color} fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">3D</text>
            <rect x="15" y="75" width="70" height="8" rx="2" fill="#1C1C1C" stroke={color} strokeWidth="2" />
          </svg>
        );
      case "logo-perete-iluminare-led-smart":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* LED Glow Outer */}
            <circle cx="50" cy="50" r="38" stroke="rgba(255,140,42,0.4)" strokeWidth="6" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="4" fill="rgba(17,17,17,0.9)" />
            <path d="M40 45 L50 35 L60 45 L50 65 Z" fill={color} />
            <circle cx="50" cy="50" r="4" fill="#FFFFFF" />
          </svg>
        );
      case "suport-modular-birou-premium":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <rect x="20" y="45" width="25" height="35" rx="3" stroke={color} strokeWidth="2.5" fill="rgba(255,140,42,0.1)" />
            <rect x="48" y="35" width="32" height="45" rx="3" stroke={color} strokeWidth="2.5" fill="rgba(255,140,42,0.1)" />
            {/* Pens sticking out */}
            <line x1="58" y1="35" x2="52" y2="15" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="70" y1="35" x2="74" y2="18" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case "suport-organizare-cabluri-sub-birou":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <path d="M25 40 Q25 60 50 60 Q75 60 75 40" stroke={color} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M20 40 H30 M70 40 H80" stroke={color} strokeWidth="5" strokeLinecap="round" />
            {/* Cabluri */}
            <circle cx="40" cy="50" r="4" fill="#FFFFFF" />
            <circle cx="60" cy="50" r="4" fill="#FFFFFF" />
          </svg>
        );
      case "lampa-litofanie-personalizata-fotografie":
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            {/* Base */}
            <rect x="25" y="75" width="50" height="12" rx="3" fill="#1C1C1C" stroke={color} strokeWidth="2" />
            {/* Lithophane sheet */}
            <rect x="32" y="20" width="36" height="55" rx="1" stroke={color} strokeWidth="3.5" fill="rgba(255,255,255,0.8)" />
            <path d="M42 35 Q40 50 48 55 Q55 45 58 35" stroke="#111111" strokeWidth="1" fill="none" opacity="0.3" />
            {/* Rays */}
            <line x1="50" y1="15" x2="50" y2="5" stroke={color} strokeWidth="1.5" />
            <line x1="25" y1="20" x2="18" y2="15" stroke={color} strokeWidth="1.5" />
            <line x1="75" y1="20" x2="82" y2="15" stroke={color} strokeWidth="1.5" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
            <circle cx="50" cy="50" r="30" stroke={color} strokeWidth="2" strokeDasharray="5,5" />
            <path d="M35 50 L50 35 L65 50 L50 65 Z" stroke={color} strokeWidth="3" fill="rgba(255,140,42,0.1)" />
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center justify-center bg-black/40 rounded-xl p-6" style={{ width: size, height: size }}>
      {renderIcon()}
    </div>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { favorites, toggleFavorite, addToQuote, addToCart } = useApp();
  const isFavorite = favorites.includes(product.slug);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C1C] text-white hover:border-[#FF8C2A]/30 dark:bg-[#1C1C1C] light:bg-white light:text-[#111111] light:border-black/10 transition-all shadow-md"
    >
      {/* Top overlay row */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FF8C2A] font-mono border border-white/5">
            {product.category}
          </span>
          {product.stock !== undefined && (
            product.stock === 0 ? (
              <span className="rounded-full bg-red-500/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white border border-red-500/20">
                Stoc Epuizat
              </span>
            ) : product.stock <= 5 ? (
              <span className="rounded-full bg-orange-500/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white border border-orange-500/20">
                Doar {product.stock} rămase
              </span>
            ) : (
              <span className="rounded-full bg-green-500/90 backdrop-blur-sm px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-white border border-green-500/20">
                În Stoc
              </span>
            )
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.slug);
          }}
          className={`rounded-full p-1.5 transition-colors pointer-events-auto bg-black/60 backdrop-blur-md border border-white/5 ${
            isFavorite ? "text-red-500" : "text-zinc-400 hover:text-white"
          }`}
          title={isFavorite ? "Șterge din Favorite" : "Adaugă la Favorite"}
        >
          <Heart className="h-4.5 w-4.5" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Full-width Product Image Link */}
      {product.images?.[0] && (product.images[0].endsWith('.jpg') || product.images[0].endsWith('.jpeg') || product.images[0].endsWith('.png')) ? (
        <Link href={`/produse/${product.slug}`} className="w-full aspect-square relative overflow-hidden bg-black/30 border-b border-white/5 block">
          <img
            src={product.images[0].startsWith('/') ? product.images[0] : `/${product.images[0]}`}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        </Link>
      ) : (
        <Link href={`/produse/${product.slug}`} className="w-full aspect-square relative overflow-hidden bg-black/30 flex items-center justify-center border-b border-white/5">
          <ProductIconMockup slug={product.slug} size={130} />
        </Link>
      )}

      {/* Info details with padding */}
      <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
        <div className="space-y-1">
          <Link href={`/produse/${product.slug}`} className="block">
            <h4 className="text-sm font-bold font-poppins text-white dark:text-white light:text-black line-clamp-1 group-hover:text-[#FF8C2A] transition-colors">
              {product.name}
            </h4>
          </Link>
          <div className="text-xs text-zinc-400">
            <span>{product.category}</span>
          </div>
        </div>

        {/* Price & Primary CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
          <div>
            <span className="text-[10px] text-zinc-500 block uppercase font-mono tracking-wider">PREȚ</span>
            <span className="text-base font-extrabold font-poppins text-white dark:text-white light:text-black">
              {product.price > 1 ? `${product.price} RON` : "Custom"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/produse/${product.slug}`}
              className="rounded-full bg-white/5 dark:bg-white/5 light:bg-zinc-100 p-2 text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-black transition-colors"
              title="Vezi detalii"
            >
              <Eye className="h-4 w-4" />
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (product.stock === 0) return;
                if (product.price <= 1) {
                  addToQuote(product.slug);
                } else {
                  addToCart(product.slug);
                }
              }}
              disabled={product.stock === 0}
              className={`rounded-full p-2 text-black transition-all ${
                product.stock === 0
                  ? "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed hover:shadow-none"
                  : "bg-[#FF8C2A] hover:bg-[#e05b00] hover:shadow-md hover:shadow-[#FF8C2A]/20 cursor-pointer"
              }`}
              title={
                product.stock === 0
                  ? "Stoc epuizat"
                  : product.price <= 1
                  ? "Solicită ofertă"
                  : "Adaugă în coș"
              }
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;

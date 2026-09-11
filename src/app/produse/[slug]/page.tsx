"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, MessageSquare, ShieldCheck, Clock, Layers, Star, Sparkles, AlertCircle } from "lucide-react";
import { products } from "@/data/data";
import { useApp } from "@/context/AppContext";
import Mascot from "@/components/mascot/Mascot";
import ProductCard, { ProductIconMockup } from "@/components/product-card/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const { favorites, toggleFavorite, addToQuote, addToCart } = useApp();

  // Find product
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  // Gallery and specs states
  const [selectedImage, setSelectedImage] = useState(product.images[0] || "default");
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0] || "PLA Premium");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: "Default", hex: "#FF8C2A" });
  
  // Interactive 3D Card rotation coordinates
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const isFavorite = favorites.includes(product.slug);

  const handleMouseMove3D = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Rotate max 25 degrees
    setRotateY(x / (box.width / 50));
    setRotateX(-y / (box.height / 50));
  };

  const handleMouseLeave3D = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const whatsAppLink = `https://wa.me/40771397634?text=${encodeURIComponent(
    `Bună ziua! Doresc mai multe detalii și o ofertă personalizată pentru produsul "${product.name}" (${product.price} RON), selectat pe materialul ${selectedMaterial} și culoarea ${selectedColor.name}. Mulțumesc!`
  )}`;

  const prodCats = [product.category, ...(product.categories || [])];
  const similarProducts = products
    .filter((p) => p.slug !== product.slug && (p.category === product.category || (p.categories && p.categories.some(c => prodCats.includes(c)))))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="mb-6 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <Link href="/produse" className="hover:underline hover:text-white">Produse</Link>
        <span className="mx-2">/</span>
        <Link href={`/produse?category=${encodeURIComponent(product.category)}`} className="hover:underline hover:text-white capitalize">{product.category.toLowerCase()}</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Columns: Gallery & CSS 3D Viewer */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Main Visual: CSS 3D Interactive Mockup */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block">
              MODEL 3D INTERACTIV (trage cursorul deasupra cardului)
            </span>
            <div
              onMouseMove={handleMouseMove3D}
              onMouseLeave={handleMouseLeave3D}
              className="relative w-full aspect-square rounded-2xl border border-white/10 bg-[#1C1C1C] flex items-center justify-center overflow-hidden shadow-xl cursor-grab active:cursor-grabbing card-3d-container dark:bg-[#1C1C1C] light:bg-white light:border-black/10"
            >
              {/* Radial Grid lines simulating 3D build platform */}
              <div className="absolute inset-0 bg-[radial-gradient(#80808010_1.5px,transparent_1.5px)] bg-[size:16px_16px]" />

              <div
                className="card-3d relative flex items-center justify-center w-full h-full bg-black/40 rounded-2xl overflow-hidden"
                style={{
                  transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                }}
              >
                {/* 3D wireframe effect borders */}
                <div className="absolute inset-0 border border-[#FF8C2A]/20 rounded-2xl pointer-events-none opacity-40 z-10" />
                <div className="absolute inset-2 border border-[#FF8C2A]/5 rounded-xl pointer-events-none opacity-20 z-10" />
                
                {/* Visual rendering of the product */}
                {selectedImage && (selectedImage.endsWith('.jpg') || selectedImage.endsWith('.jpeg') || selectedImage.endsWith('.png')) ? (
                  <img
                    src={selectedImage.startsWith('/') ? selectedImage : `/${selectedImage}`}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="p-8 flex items-center justify-center">
                    <ProductIconMockup slug={product.slug} size={180} />
                  </div>
                )}
              </div>

              {/* Angle labels */}
              <div className="absolute bottom-4 left-4 text-[9px] font-mono text-zinc-500">
                ROT_X: {rotateX.toFixed(0)}° / ROT_Y: {rotateY.toFixed(0)}°
              </div>
            </div>
          </div>

          {/* Multiple Image Gallery list */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl border flex items-center justify-center bg-[#1C1C1C] p-2 transition-all overflow-hidden ${
                    selectedImage === img ? "border-[#FF8C2A]" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  {img.endsWith('.jpg') || img.endsWith('.jpeg') || img.endsWith('.png') ? (
                    <img
                      src={img.startsWith('/') ? img : `/${img}`}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ProductIconMockup slug={product.slug} size={60} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Columns: Details Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="rounded-full bg-[#FF8C2A]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FF8C2A] font-mono">
              {product.category}
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight font-poppins text-white dark:text-white light:text-black">
              {product.name}
            </h2>

          </div>

          <div className="text-3xl font-black text-white dark:text-white light:text-black font-poppins">
            {product.price > 1 ? `${product.price} RON` : "Preț la cerere"}
          </div>

          {product.stock !== undefined && (
            <div className={`text-xs font-semibold py-1.5 px-3 rounded-lg border inline-flex items-center gap-1.5 font-mono ${
              product.stock === 0
                ? "bg-red-500/10 border-red-500/20 text-red-500"
                : product.stock <= 5
                ? "bg-orange-500/10 border-orange-500/20 text-orange-500"
                : "bg-green-500/10 border-green-500/20 text-green-500"
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                product.stock === 0
                  ? "bg-red-500"
                  : product.stock <= 5
                  ? "bg-orange-500 animate-pulse"
                  : "bg-green-500"
              }`} />
              {product.stock === 0 
                ? "STOC EPUIZAT - Acest produs nu mai este disponibil momentan" 
                : product.stock <= 5 
                ? `STOC LIMITAT - Doar ${product.stock} bucăți rămase în stoc!` 
                : `ÎN STOC - ${product.stock} bucăți disponibile pentru expediere rapidă`
              }
            </div>
          )}

          <p className="text-sm font-semibold text-[#FF8C2A] font-inter italic">
            {product.shortDescription}
          </p>

          <p className="text-sm text-zinc-300 font-inter leading-relaxed dark:text-zinc-300 light:text-zinc-700">
            {product.description}
          </p>

          {/* Specifications grid */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-4 font-inter text-xs">
            <div>
              <span className="text-zinc-500 block uppercase font-mono tracking-wider mb-1">Dimensiuni</span>
              <span className="font-semibold text-white dark:text-white light:text-black">{product.dimensions}</span>
            </div>
            <div>
              <span className="text-zinc-500 block uppercase font-mono tracking-wider mb-1">Timp de Producție</span>
              <span className="font-semibold text-white dark:text-white light:text-black">{product.productionTime}</span>
            </div>
          </div>

          {/* Selector 1: Material */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono font-semibold">
              Selectează Materialul
            </span>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold border transition-all ${
                    selectedMaterial === mat
                      ? "bg-[#FF8C2A] border-[#FF8C2A] text-black"
                      : "border-white/10 hover:border-white/20 text-zinc-300"
                  }`}
                >
                  {mat}
                </button>
              ))}
            </div>
          </div>

          {/* Selector 2: Color */}
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-zinc-500 font-mono font-semibold">
              Selectează Culoarea
            </span>
            <div className="flex gap-3">
              {product.colors.map((col) => {
                const isBlack = 
                  col.hex.toLowerCase() === "#111111" || 
                  col.hex.toLowerCase() === "#000000" || 
                  col.hex.toLowerCase() === "#0b0c10" || 
                  col.hex.toLowerCase() === "#1c1c1c" || 
                  col.hex.toLowerCase() === "#000" || 
                  col.name.toLowerCase().includes("negru");

                return (
                  <button
                    key={col.name}
                    onClick={() => {
                      setSelectedColor(col);
                      if (col.imageIndex !== undefined && product.images[col.imageIndex]) {
                        setSelectedImage(product.images[col.imageIndex]);
                      }
                    }}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor.name === col.name ? "border-[#FF8C2A] scale-110" : "border-transparent opacity-80"
                    } ${isBlack ? "ring-1 ring-white/80" : ""}`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  >
                    {selectedColor.name === col.name && (
                      <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-black ${isBlack ? "text-white" : "text-black"}`}>
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">Culoare selectată: {selectedColor.name}</p>
          </div>

          {/* Mascot Helper box */}
          <div className="rounded-xl border border-[#FF8C2A]/20 bg-[#FF8C2A]/5 p-4 flex gap-4 items-start">
            <Mascot pose="presenting" size={60} className="flex-shrink-0" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#FF8C2A] uppercase font-bold block">
                SFATUL MASCOTEI 3D
              </span>
              <p className="text-xs text-zinc-300 font-inter leading-relaxed">
                {product.category === "Brelocuri" ? (
                  <>
                    „La <strong className="text-white">3 brelocuri</strong> luate, primești <strong className="text-white">unul gratis</strong>! Adaugă brelocurile preferate în listă și vom aplica promoția în oferta finală.”
                  </>
                ) : (
                  <>
                    „Pentru modelul <strong className="text-white">{product.name}</strong>, îți recomand să folosești <strong className="text-white">{selectedMaterial}</strong> în culoarea <strong className="text-white">{selectedColor.name}</strong>. Finisajele vor fi impecabile, iar producția va fi gata în doar {product.productionTime}!”
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
            {/* Quote CTA */}
            <button
              onClick={() => {
                if (product.stock === 0) return;
                if (product.price <= 1) {
                  addToQuote(product.slug);
                } else {
                  addToCart(product.slug, 1, selectedColor.name, selectedMaterial);
                }
              }}
              disabled={product.stock === 0}
              className={`flex-1 rounded-full py-4 text-center text-sm font-black uppercase tracking-wider text-black transition-all font-poppins ${
                product.stock === 0
                  ? "bg-zinc-800 text-zinc-500 border border-white/5 cursor-not-allowed hover:shadow-none"
                  : "bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] hover:shadow-xl hover:shadow-[#FF8C2A]/20 cursor-pointer"
              }`}
            >
              {product.stock === 0
                ? "Stoc Epuizat"
                : product.price <= 1
                ? "Solicită ofertă"
                : "Adaugă în coș"}
            </button>

            {/* WhatsApp Direct CTA */}
            <a
              href={whatsAppLink}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#FF8C2A]/20 hover:border-[#FF8C2A]/50 bg-white/5 py-4 px-6 text-center text-sm font-black uppercase tracking-wider text-white hover:bg-[#FF8C2A]/10 transition-all font-poppins flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4.5 w-4.5 text-green-400 fill-current" />
              Trimite pe WhatsApp
            </a>

            {/* Favorite toggle button */}
            <button
              onClick={() => toggleFavorite(product.slug)}
              className={`rounded-full border px-6 py-4 flex items-center justify-center transition-all cursor-pointer ${
                isFavorite
                  ? "border-red-500/20 bg-red-500/10 text-red-500"
                  : "border-white/10 hover:border-white/20 text-zinc-400 hover:text-white"
              }`}
            >
              <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

      </div>

      {/* Similar products block */}
      {similarProducts.length > 0 && (
        <div className="mt-20 space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-bold font-poppins text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#FF8C2A]" />
              Produse Similare
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

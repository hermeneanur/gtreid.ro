"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Sun, Moon, Menu, X, ChevronDown, Sparkles, Heart, ShoppingBag } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { CATEGORIES, products, Product } from "../../data/data";
import Mascot from "../mascot/Mascot";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme, setQuoteModalOpen, favorites, cartItems, setCartOpen } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for transparency change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close search and mega menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search results computed directly
  const searchResults = searchQuery.trim().length > 1
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produse?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Acasă", path: "/" },
    { name: "Produse", path: "/produse", hasMega: true },
    { name: "Servicii", path: "/servicii" },
    { name: "Portofoliu & Galerie", path: "/galerie" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#111111]/80 dark:bg-[#111111]/80 light:bg-white/80 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center rounded-xl bg-white border border-zinc-200/80 px-2 py-1 shadow-sm transition-all group-hover:border-[#FF8C2A]/40 group-hover:shadow-[0_0_12px_rgba(255,140,42,0.15)]">
              <img
                src="/logo.png"
                alt="gt3D Logo"
                className="h-11 object-contain"
              />
            </div>
          </Link>

          {/* Desktop Navigation (Center) */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              if (link.hasMega) {
                return (
                  <div key={link.name} className="relative" ref={megaMenuRef} onMouseEnter={() => setIsMegaMenuOpen(true)}>
                    <Link
                      href="/produse"
                      onClick={() => {
                        setIsMegaMenuOpen(false);
                        if (pathname.startsWith("/produse")) {
                          router.push("/produse");
                          window.dispatchEvent(new CustomEvent("reset-produse-filters"));
                        }
                      }}
                      className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition-colors py-2 cursor-pointer ${
                        isActive || pathname.startsWith("/produse")
                          ? "text-[#FF8C2A]"
                          : "text-zinc-300 hover:text-white dark:text-zinc-300 dark:hover:text-white light:text-zinc-600 light:hover:text-black"
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="h-3 w-3" />
                    </Link>

                    {/* Categories Dropdown Menu */}
                    {isMegaMenuOpen && (
                      <div
                        onMouseLeave={() => setIsMegaMenuOpen(false)}
                        className="absolute left-0 top-full z-50 mt-2 w-64 rounded-2xl border border-white/10 bg-[#1C1C1C] p-2 shadow-2xl dark:bg-[#1C1C1C] light:bg-white light:border-black/10 flex flex-col gap-0.5"
                      >
                        <Link
                          href="/produse"
                          onClick={() => {
                            setIsMegaMenuOpen(false);
                            if (pathname.startsWith("/produse")) {
                              router.push("/produse");
                              window.dispatchEvent(new CustomEvent("reset-produse-filters"));
                            }
                          }}
                          className="flex items-center rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-300 hover:text-[#FF8C2A] hover:bg-white/5 transition-all font-poppins"
                        >
                          Toate Categoriile
                        </Link>
                        {CATEGORIES.map((category) => (
                          <Link
                            key={category}
                            href={`/produse?category=${encodeURIComponent(category)}`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="flex items-center rounded-xl px-4 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-300 hover:text-[#FF8C2A] hover:bg-white/5 transition-all font-poppins"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors py-2 ${
                    isActive
                      ? "text-[#FF8C2A] border-b border-[#FF8C2A]"
                      : "text-zinc-300 hover:text-white dark:text-zinc-300 dark:hover:text-white light:text-zinc-600 light:hover:text-[#111111]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar (Desktop) */}
            <div className="relative hidden md:block" ref={searchRef}>
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="h-10 w-48 rounded-full border border-white/10 bg-[#1C1C1C] pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:w-64 focus:border-[#FF8C2A]/60 focus:outline-none transition-all dark:bg-[#1C1C1C] light:bg-zinc-100 light:text-black light:border-black/10"
                    placeholder="Caută produse..."
                  />
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
                </div>
              </form>

              {/* Search dropdown results */}
              {isSearchFocused && (searchQuery.trim().length > 1 || searchResults.length > 0) && (
                <div className="absolute right-0 mt-2 w-72 rounded-lg border border-white/10 bg-[#1C1C1C] p-2 shadow-2xl dark:bg-[#1C1C1C] light:bg-white light:border-black/10">
                  {searchResults.length > 0 ? (
                    <ul className="space-y-1">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/produse/${product.slug}`}
                            onClick={() => {
                              setIsSearchFocused(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center gap-3 rounded p-2 hover:bg-white/5 transition-colors"
                          >
                            <span className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-[#FF8C2A]">
                              3D
                            </span>
                            <div className="overflow-hidden">
                              <p className="truncate text-xs font-bold text-white dark:text-white light:text-black">
                                {product.name}
                              </p>
                              <p className="text-[10px] text-zinc-500">
                                {product.category} • {product.price} RON
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-3 text-center text-xs text-zinc-500">
                      Niciun rezultat pentru &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Favorite Counter Link */}
            <Link
              href="/produse?filter=favorites"
              className="relative rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-[#FF8C2A] transition-colors"
              title="Favorite"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#FF8C2A] text-[9px] font-extrabold text-black">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart Counter Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-[#FF8C2A] transition-colors"
              title="Coș cumpărături"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#FF8C2A] text-[9px] font-extrabold text-black">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* CTA Orange Button */}
            <button
              onClick={() => setQuoteModalOpen(true)}
              className="hidden sm:flex rounded-full bg-[#FF8C2A] px-5 py-2 text-xs font-black uppercase tracking-wider text-black hover:bg-[#e05b00] hover:shadow-lg hover:shadow-[#FF8C2A]/20 transition-all font-poppins cursor-pointer"
            >
              Solicită ofertă
            </button>

            {/* Mobile Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-[#FF8C2A] lg:hidden transition-colors"
              title="Coș cumpărături"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#FF8C2A] text-[9px] font-extrabold text-black">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden border-t border-white/10 bg-[#111111] px-4 py-6 space-y-4 shadow-xl"
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-full border border-white/10 bg-[#1C1C1C] pl-10 pr-4 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
              placeholder="Caută produse..."
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
          </form>

          {/* Links */}
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (link.path === "/produse" && pathname.startsWith("/produse")) {
                    router.push("/produse");
                    window.dispatchEvent(new CustomEvent("reset-produse-filters"));
                  }
                }}
                className={`text-sm font-semibold py-2 px-3 rounded-lg ${
                  pathname === link.path
                    ? "bg-[#FF8C2A]/10 text-[#FF8C2A]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setQuoteModalOpen(true);
            }}
            className="w-full rounded-full bg-[#FF8C2A] py-3 text-center text-xs font-black uppercase tracking-wider text-black hover:bg-[#e05b00]"
          >
            Solicită ofertă
          </button>
        </motion.div>
      )}
    </header>
  );
};
export default Header;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, Search, HelpCircle, Package, Truck, Cpu, MessageSquare } from "lucide-react";
import { faqItems, FaqItem } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/mascot/Mascot";

const categoryConfig = {
  General: {
    icon: <HelpCircle className="h-5 w-5" />,
    label: "General",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  Comenzi: {
    icon: <Package className="h-5 w-5" />,
    label: "Comenzi",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
  },
  Livrare: {
    icon: <Truck className="h-5 w-5" />,
    label: "Livrare",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
  },
  Tehnic: {
    icon: <Cpu className="h-5 w-5" />,
    label: "Tehnic",
    color: "text-purple-400",
    bg: "bg-purple-400/10 border-purple-400/20",
  },
};

type Category = keyof typeof categoryConfig;

const AccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border dark:border-white/10 border-black/10 rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left dark:bg-[#1C1C1C] bg-white hover:dark:bg-[#222222] hover:bg-zinc-50 transition-colors cursor-pointer"
      >
        <span className="text-sm font-semibold dark:text-white text-[#111111] font-poppins pr-4">
          {item.question}
        </span>
        <div className="flex-shrink-0 text-[#FF8C2A]">
          {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-2 dark:bg-[#1C1C1C] bg-white border-t dark:border-white/5 border-black/5">
              <p className="text-sm dark:text-zinc-300 text-zinc-600 font-inter leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "Toate">("Toate");
  const [search, setSearch] = useState("");

  const categories = Object.keys(categoryConfig) as Category[];

  const filtered = faqItems.filter((item) => {
    const matchCat = activeCategory === "Toate" || item.category === activeCategory;
    const matchSearch =
      !search.trim() ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const grouped: Record<string, FaqItem[]> =
    activeCategory === "Toate"
      ? categories.reduce(
          (acc, cat) => {
            const items = filtered.filter((i) => i.category === cat);
            if (items.length > 0) acc[cat] = items;
            return acc;
          },
          {} as Record<string, FaqItem[]>
        )
      : { [activeCategory]: filtered };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="mb-8 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">FAQ</span>
      </div>

      {/* Header with Mascot */}
      <div className="text-center space-y-4 mb-12">
        <div className="flex justify-center">
          <Mascot pose="analyzing" size={120} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins dark:text-white text-[#111111]">
          Întrebări Frecvente
        </h1>
        <p className="text-sm dark:text-zinc-400 text-zinc-500 max-w-xl mx-auto font-inter">
          Mascota <span className="text-[#FF8C2A] font-bold">3D</span> a analizat mii de întrebări și a pregătit răspunsuri clare la cele mai comune nelămuriri legate de serviciile noastre.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mt-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută o întrebare..."
            className="w-full h-11 rounded-full border dark:border-white/10 border-black/10 dark:bg-[#1C1C1C] bg-white pl-11 pr-5 text-sm dark:text-white text-[#111111] placeholder-zinc-500 focus:border-[#FF8C2A]/60 focus:outline-none"
          />
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-zinc-500" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("Toate")}
          className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
            activeCategory === "Toate"
              ? "bg-[#FF8C2A] text-black"
              : "dark:bg-[#1C1C1C] bg-white border dark:border-white/10 border-black/10 dark:text-zinc-400 text-zinc-500 hover:dark:text-white hover:text-black"
          }`}
        >
          Toate Categoriile
        </button>
        {categories.map((cat) => {
          const cfg = categoryConfig[cat];
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold border transition-all flex items-center gap-1.5 ${
                activeCategory === cat
                  ? `${cfg.bg} ${cfg.color}`
                  : "dark:bg-[#1C1C1C] bg-white dark:border-white/10 border-black/10 dark:text-zinc-400 text-zinc-500 hover:dark:text-white hover:text-black"
              }`}
            >
              {cfg.icon}
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* FAQ Accordeons grouped by category */}
      <div className="space-y-10">
        {Object.entries(grouped).map(([cat, items]) => {
          const cfg = categoryConfig[cat as Category];
          return (
            <div key={cat} className="space-y-3">
              {/* Category header */}
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${cfg.bg} ${cfg.color}`}>
                {cfg.icon}
                <span className="text-sm font-bold font-poppins">{cfg.label}</span>
                <span className="ml-auto text-[10px] font-mono">{items.length} întrebări</span>
              </div>

              {/* Accordion items */}
              <div className="space-y-2">
                {items.map((item) => (
                  <AccordionItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* No results */}
      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-20 dark:bg-[#1C1C1C] bg-white border dark:border-white/10 border-black/10 rounded-2xl">
          <HelpCircle className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-lg font-bold dark:text-white text-black">Niciun rezultat</h3>
          <p className="text-xs dark:text-zinc-500 text-zinc-400 mt-2 max-w-xs mx-auto">
            Nu am găsit o întrebare care să conțină &quot;{search}&quot;. Încearcă să ne contactezi direct.
          </p>
        </div>
      )}

      {/* Contact CTA */}
      <div className="mt-14 rounded-2xl dark:bg-[#1C1C1C] bg-white border dark:border-white/10 border-black/10 p-6 flex flex-col sm:flex-row items-center gap-6">
        <MessageSquare className="h-10 w-10 text-[#FF8C2A] flex-shrink-0" />
        <div className="text-center sm:text-left">
          <h3 className="text-base font-bold font-poppins dark:text-white text-black">
            Nu ai găsit răspunsul?
          </h3>
          <p className="text-xs dark:text-zinc-400 text-zinc-500 mt-1 font-inter">
            Scrie-ne direct pe WhatsApp sau folosește formularul de contact și răspundem în mai puțin de 2 ore.
          </p>
        </div>
        <div className="flex gap-3 ml-auto flex-shrink-0">
          <a
            href="https://wa.me/40771397634"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-green-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-green-700 transition-colors font-poppins"
          >
            WhatsApp
          </a>
          <Link
            href="/contact"
            className="rounded-full border dark:border-white/10 border-black/10 px-5 py-2.5 text-xs font-bold dark:text-white text-black hover:dark:bg-white/5 hover:bg-zinc-100 transition-colors font-poppins"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

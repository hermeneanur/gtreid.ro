"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail, Phone, MapPin, Clock, Instagram, Facebook, Send,
  MessageSquare, CheckCircle2, Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

// TikTok icon (not in lucide, rendered as SVG)
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12.004 2.003C6.479 2.003 2 6.482 2 12.008c0 1.769.456 3.476 1.324 4.978L2.003 22l5.144-1.347A9.957 9.957 0 0012.004 22c5.524 0 10.003-4.479 10.003-10.004 0-5.524-4.479-10.003-10.003-9.993zm0 18.355a8.308 8.308 0 01-4.247-1.166l-.305-.18-3.053.8.814-2.975-.198-.317A8.303 8.303 0 013.7 12.008c0-4.587 3.731-8.315 8.308-8.315 4.588 0 8.315 3.728 8.315 8.315.001 4.585-3.727 8.35-8.319 8.35z"/>
  </svg>
);

export default function ContactPage() {
  const { setQuoteModalOpen } = useApp();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Honeypot bot detection
    if (formData.honeypot) {
      setTimeout(() => {
        setSending(false);
        setSent(true);
      }, 1000);
      return;
    }
    
    const mailSubject = formData.subject ? `Mesaj Nou Contact: ${formData.subject}` : "Mesaj Nou de pe site-ul gtreiD";
    const textBody = 
      `Nume Complet: ${formData.name}\n` +
      `Email Expeditor: ${formData.email}\n` +
      `Telefon Expeditor: ${formData.phone}\n` +
      `Subiect: ${formData.subject || "Nespecificat"}\n\n` +
      `Mesaj:\n${formData.message}`;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          subject: mailSubject,
          replyTo: formData.email,
          text: textBody,
        }),
      });
      // Error responses from the hosting layer (e.g. 413, 504) aren't JSON.
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Eroare la expediere e-mail.");
      } else {
        setSent(true);
      }
    } catch (err) {
      console.error("Eroare la trimitere:", err);
      alert("Eroare de conexiune la trimiterea e-mailului.");
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { icon: <WhatsAppIcon />, label: "WhatsApp", href: "https://wa.me/40771397634", color: "hover:text-green-400 hover:bg-green-400/10" },
    { icon: <Facebook className="h-4 w-4" />, label: "Facebook", href: "https://www.facebook.com/share/1GQRSaMy5G/?mibextid=wwXIfr", color: "hover:text-blue-400 hover:bg-blue-400/10" },
    { icon: <Instagram className="h-4 w-4" />, label: "Instagram", href: "https://www.instagram.com/atelier_3d.ro?igsh=MXRkdDExbnF4ZG9kdQ%3D%3D&utm_source=qr", color: "hover:text-pink-400 hover:bg-pink-400/10" },
    { icon: <TikTokIcon />, label: "TikTok", href: "https://www.tiktok.com/@atelier_3d.ro?_r=1&_t=ZN-97awWclbORH", color: "hover:text-white hover:bg-white/10" },
  ];

  const contactDetails = [
    { icon: <Phone className="h-5 w-5 text-[#FF8C2A]" />, label: "Telefon / WhatsApp", value: "+40 771 397 634" },
    { icon: <Mail className="h-5 w-5 text-[#FF8C2A]" />, label: "Email", value: "hermeneanur@gmail.com" },
    { icon: <MapPin className="h-5 w-5 text-[#FF8C2A]" />, label: "Locație Showroom", value: "Str. Mare, nr. 170, Zărnești Romania" },
    {
      icon: <Clock className="h-5 w-5 text-[#FF8C2A]" />, label: "Program de Lucru",
      value: "Luni–Vineri: 09:00 – 18:00\nSâmbătă: 10:00 – 14:00\nDuminică: Închis"
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="mb-8 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">Contact</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-3 mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-poppins dark:text-white text-[#111111]">
          Hai să vorbim despre proiectul tău
        </h1>
        <p className="text-sm dark:text-zinc-400 text-zinc-500 max-w-lg mx-auto font-inter">
          Trimite-ne un mesaj prin formularul de mai jos, pe WhatsApp sau direct pe rețelele sociale. Răspundem în mai puțin de 2 ore în timpul programului de lucru.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

        {/* Left Panel — Contact Details & Social */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Card */}
          <div className="rounded-2xl border dark:border-white/10 border-black/10 dark:bg-[#1C1C1C] bg-white p-6 space-y-5">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex gap-4 items-start">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest dark:text-zinc-500 text-zinc-400 font-mono font-semibold mb-0.5">
                    {item.label}
                  </span>
                  <span className="text-sm dark:text-white text-[#111111] font-semibold font-inter whitespace-pre-line">
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="rounded-2xl border dark:border-white/10 border-black/10 dark:bg-[#1C1C1C] bg-white p-5 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#FF8C2A] font-mono">
              Rețele Sociale
            </h3>
            <div className="flex flex-col gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold dark:text-zinc-400 text-zinc-500 border dark:border-white/5 border-black/5 transition-all ${social.color}`}
                >
                  {social.icon}
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Quote CTA */}
          <button
            onClick={() => setQuoteModalOpen(true)}
            className="w-full rounded-2xl bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] p-5 text-center cursor-pointer hover:shadow-xl hover:shadow-[#FF8C2A]/20 transition-all"
          >
            <MessageSquare className="h-6 w-6 text-black mx-auto mb-2" />
            <p className="text-sm font-black text-black font-poppins">Solicită Ofertă Rapidă</p>
            <p className="text-xs text-black/70 font-inter mt-1">Formular detaliat cu fișier 3D</p>
          </button>
        </div>

        {/* Right Panel — Contact Form + Map */}
        <div className="lg:col-span-3 space-y-6">
          {/* Premium Form */}
          <div className="rounded-2xl border dark:border-white/10 border-black/10 dark:bg-[#1C1C1C] bg-white p-6 md:p-8">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-bold font-poppins dark:text-white text-black">
                  Trimite un Mesaj
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                      Nume Complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                      placeholder="Ex: Andrei Popescu"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                      Număr Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                      placeholder="Ex: 0722 000 000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                    Adresă Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                    placeholder="Ex: andrei@exemplu.ro"
                  />
                </div>

                {/* Honeypot field (hidden from screen readers & humans, filled by bots) */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                    Subiect
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                  >
                    <option value="">Selectează subiectul...</option>
                    <option value="oferta">Solicit o ofertă de preț</option>
                    <option value="comanda">Informații despre o comandă</option>
                    <option value="tehnic">Ajutor tehnic / modelare 3D</option>
                    <option value="colaborare">Propunere de colaborare</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                    Mesajul Tău *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors resize-none"
                    placeholder="Descrie proiectul sau întrebarea ta cât mai detaliat posibil..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] py-4 text-sm font-black uppercase tracking-wider text-black hover:shadow-lg hover:shadow-[#FF8C2A]/20 transition-all font-poppins flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
                >
                  {sending ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Se trimite...</>
                  ) : (
                    <><Send className="h-4 w-4" /> Trimite Mesajul</>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10 space-y-4"
              >
                <CheckCircle2 className="h-16 w-16 text-green-400" />
                <h3 className="text-2xl font-bold font-poppins dark:text-white text-black">
                  Mesaj Trimis cu Succes!
                </h3>
                <p className="text-sm dark:text-zinc-400 text-zinc-500 font-inter max-w-sm">
                  Mulțumim, <strong>{formData.name}</strong>! Vom reveni cu un răspuns în mai puțin de 2 ore la adresa <strong>{formData.email}</strong>.
                </p>
                <button
                  onClick={() => { setSent(false); setFormData({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" }); }}
                  className="rounded-full border dark:border-white/10 border-black/10 px-6 py-2.5 text-xs font-bold dark:text-white text-black hover:dark:bg-white/5 hover:bg-zinc-100 transition-colors font-poppins"
                >
                  Trimite alt mesaj
                </button>
              </motion.div>
            )}
          </div>

          {/* Google Maps Embed — Real Interactive Map */}
          <div className="rounded-2xl border dark:border-white/10 border-black/10 overflow-hidden h-72 relative dark:bg-[#1C1C1C] bg-zinc-100 shadow-lg group">
            <iframe
              title="Google Maps Location"
              src="https://maps.google.com/maps?q=Strada%20Mare%20170%20Zarnesti%20Romania&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 grayscale dark:opacity-80 dark:invert-[0.9] dark:hue-rotate-180 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:dark:invert-0 hover:dark:hue-rotate-0"
              allowFullScreen
              loading="lazy"
            />
            <a
              href="https://maps.google.com/maps?q=Strada%20Mare%20170%20Zarnesti%20Romania"
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-4 right-4 z-10 rounded-xl bg-white dark:bg-[#1C1C1C] border border-[#FF8C2A]/20 hover:border-[#FF8C2A]/80 px-4 py-2 text-xs font-bold text-[#FF8C2A] shadow-md transition-all font-poppins"
            >
              Deschide în Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

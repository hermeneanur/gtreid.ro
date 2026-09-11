"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle2, ShieldAlert, Loader2 } from "lucide-react";
import Mascot from "@/components/mascot/Mascot";

export default function ReturnPage() {
  const [formData, setFormData] = useState({
    name: "",
    orderNumber: "",
    email: "",
    phone: "",
    productsToReturn: "",
    reason: "",
    iban: "",
    ibanHolder: "",
    honeypot: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Bot detection via honeypot
    if (formData.honeypot) {
      setTimeout(() => {
        setSending(false);
        setSent(true);
      }, 1000);
      return;
    }

    const mailSubject = `Cerere Retur gt3D - Comanda #${formData.orderNumber}`;
    const textBody = 
      `SOLICITARE RETUR PRODUSE:\n` +
      `Nume Complet: ${formData.name}\n` +
      `Număr Comandă: #${formData.orderNumber}\n` +
      `Email Client: ${formData.email}\n` +
      `Telefon Client: ${formData.phone}\n\n` +
      `PRODUSE DE RETURNAT:\n${formData.productsToReturn}\n\n` +
      `MOTIVUL RETURULUI:\n${formData.reason}\n\n` +
      `DETALII CONT PENTRU RESTITUIRE FONDURI:\n` +
      `Cont IBAN: ${formData.iban}\n` +
      `Titular Cont: ${formData.ibanHolder}\n`;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "return",
          subject: mailSubject,
          replyTo: formData.email,
          text: textBody,
        }),
      });
      // Error responses from the hosting layer (e.g. 413, 504) aren't JSON.
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Eroare la trimiterea cererii de retur.");
      } else {
        setSent(true);
      }
    } catch (err) {
      console.error("Eroare la trimitere cerere retur:", err);
      alert("Eroare de conexiune la trimiterea e-mailului.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 w-full">
      {/* Breadcrumbs */}
      <div className="mb-6 text-xs text-zinc-500 font-mono tracking-wider">
        <Link href="/" className="hover:underline hover:text-white">Acasă</Link>
        <span className="mx-2">/</span>
        <span className="text-[#FF8C2A] font-semibold">Politica de Retur</span>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-400 hover:text-[#FF8C2A] transition-colors mb-6 font-poppins"
      >
        <ArrowLeft className="h-4 w-4" />
        Înapoi la magazin
      </Link>

      <div className="space-y-4 mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight font-poppins dark:text-white text-[#111111]">
          Politica și Formularul de Retur
        </h1>
        <p className="text-sm dark:text-zinc-400 text-zinc-500 leading-relaxed font-inter">
          Conform legislației din România, aveți dreptul de a returna produsele cumpărate în termen de <strong>14 zile calendaristice</strong> de la primirea acestora.
          Vă rugăm să rețineți că produsele realizate pe comandă specială (cum ar fi custom designs, logo-uri de firmă customizate sau printuri 3D bazate pe fișierele trimise de dumneavoastră) nu pot fi returnate din motive de personalizare, conform OUG 34/2014.
        </p>
      </div>

      <div className="rounded-2xl border dark:border-white/10 border-black/10 dark:bg-[#1C1C1C] bg-white p-6 md:p-8 shadow-xl">
        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-bold font-poppins dark:text-white text-black border-b dark:border-white/5 border-black/5 pb-2">
              Formular Cerere Retur
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
                  Număr Comandă *
                </label>
                <input
                  type="text"
                  name="orderNumber"
                  required
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                  placeholder="Ex: 1042"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  placeholder="Ex: andrei@email.ro"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                  Număr Telefon *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                  placeholder="Ex: 07xx xxx xxx"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                Produse de Returnat *
              </label>
              <textarea
                name="productsToReturn"
                required
                rows={2}
                value={formData.productsToReturn}
                onChange={handleChange}
                className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                placeholder="Ex: 2x Breloc Garfield, 1x Glob de Crăciun"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                Motivul Returului *
              </label>
              <textarea
                name="reason"
                required
                rows={3}
                value={formData.reason}
                onChange={handleChange}
                className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                placeholder="Ex: Produsul are altă dimensiune / Nu corespunde așteptărilor..."
              />
            </div>

            <div className="p-4 rounded-xl border border-yellow-500/10 bg-yellow-500/5 flex gap-3 text-xs text-yellow-500/80 mb-2">
              <ShieldAlert className="h-5 w-5 flex-shrink-0" />
              <p className="leading-relaxed">
                Conform legilor în vigoare, restituirea banilor se face prin transfer bancar. Vă rugăm să furnizați un cont IBAN valid de RON din România.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                  Cont IBAN (RON) *
                </label>
                <input
                  type="text"
                  name="iban"
                  required
                  value={formData.iban}
                  onChange={handleChange}
                  className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors font-mono"
                  placeholder="ROxx xxxx xxxx xxxx xxxx xxxx"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-zinc-500 text-zinc-400 mb-1.5 font-inter">
                  Nume Titular Cont *
                </label>
                <input
                  type="text"
                  name="ibanHolder"
                  required
                  value={formData.ibanHolder}
                  onChange={handleChange}
                  className="w-full rounded-xl border dark:border-white/10 border-black/10 dark:bg-[#111111] bg-zinc-50 p-3 text-sm dark:text-white text-[#111111] focus:border-[#FF8C2A] focus:outline-none transition-colors"
                  placeholder="Numele din buletin asociat contului"
                />
              </div>
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

            <button
              type="submit"
              disabled={sending}
              className="w-full rounded-xl bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] py-4 text-center text-sm font-black uppercase tracking-wider text-black hover:shadow-xl hover:shadow-[#FF8C2A]/20 transition-all font-poppins flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  Se procesează cererea...
                </>
              ) : (
                <>
                  <Send className="h-4.5 w-4.5" />
                  Trimite Cererea de Retur
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center text-center py-10 space-y-6">
            <CheckCircle2 className="h-16 w-16 text-green-400" />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-poppins dark:text-white text-black">
                Cerere Înregistrată!
              </h3>
              <p className="text-sm dark:text-zinc-400 text-zinc-500 font-inter max-w-md mx-auto">
                Cererea ta de retur a fost transmisă direct către echipa noastră la <strong>hermeneanur@gmail.com</strong>.
                Vom analiza cererea și îți vom transmite instrucțiunile de expediere prin curier în maximum 24-48 de ore lucrătoare.
              </p>
            </div>
            
            <div className="border border-white/5 bg-[#111111]/30 p-4 rounded-xl max-w-sm w-full">
              <Mascot pose="waving" size={120} />
            </div>

            <button
              onClick={() => setSent(false)}
              className="rounded-full border dark:border-white/10 border-black/10 px-6 py-2.5 text-xs font-bold dark:text-white text-black hover:dark:bg-white/5 hover:bg-zinc-100 transition-colors font-poppins"
            >
              Trimite altă cerere
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

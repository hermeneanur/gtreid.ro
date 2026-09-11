"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Check, Loader2, Sparkles, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { products } from "../../data/data";
import Mascot from "../mascot/Mascot";

// Must match MAX_ATTACHMENT_BYTES in src/app/api/send-email/route.ts (Vercel caps request bodies at 4.5 MB).
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".stl", ".obj", ".3mf", ".step", ".stp", ".iges", ".igs"];

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, setQuoteModalOpen, quoteItems, removeFromQuote, clearQuote } = useApp();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Proiect special",
    material: "PLA Premium",
    color: "Portocaliu gtreiD",
    dimensions: "",
    description: "",
    honeypot: "",
  });

  // Automatically select category if quoteItems exists
  useEffect(() => {
    if (quoteItems.length > 0) {
      const firstItem = products.find(p => p.slug === quoteItems[0]);
      if (firstItem) {
        const targetType = `${firstItem.category} - ${firstItem.name}`;
        React.startTransition(() => {
          setFormData(prev => (prev.projectType === targetType ? prev : {
            ...prev,
            projectType: targetType
          }));
        });
      }
    }
  }, [quoteItems]);

  if (!isQuoteModalOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // The input's accept attribute doesn't apply to drag-and-drop, so both paths validate here.
  const selectFile = (file: File) => {
    const extension = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase() : "";
    if (!ACCEPTED_EXTENSIONS.includes(extension)) {
      alert("Tip de fișier neacceptat. Încarcă un fișier .STL, .OBJ, .3MF, .STEP sau .IGES.");
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      alert(
        `Fișierul are ${(file.size / (1024 * 1024)).toFixed(1)} MB, iar limita este 3 MB. ` +
        "Trimite cererea fără fișier și adaugă în descriere un link (Google Drive, WeTransfer), sau trimite-ne fișierul pe WhatsApp."
      );
      return;
    }
    setSelectedFile(file);
    setFileName(file.name);
    setFileSize((file.size / (1024 * 1024)).toFixed(2) + " MB");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      selectFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      selectFile(e.target.files[0]);
    }
    // Allow re-selecting the same file after a rejection.
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Anti-spam honeypot check
    if (formData.honeypot) {
      setTimeout(() => {
        setSubmitting(false);
        setSuccess(true);
        clearQuote();
      }, 1500);
      return;
    }
    
    const mailSubject = `Cotație Nouă gt3D - ${formData.projectType}`;
    const textBody = 
      `Nume Complet: ${formData.name}\n` +
      `Email Client: ${formData.email}\n` +
      `Telefon Client: ${formData.phone}\n\n` +
      `Tip Proiect: ${formData.projectType}\n` +
      `Material Preferat: ${formData.material}\n` +
      `Culoare Preferată: ${formData.color}\n` +
      `Dimensiuni Estimate: ${formData.dimensions || "Nespecificate"}\n` +
      `Fișier 3D selectat: ${fileName ? `${fileName} (${fileSize})` : "Fără fișier"}\n\n` +
      `Descriere / Cerințe Suplimentare:\n${formData.description}\n`;

    const attachments: { filename: string; content: string; contentType: string }[] = [];
    if (selectedFile) {
      try {
        const base64Content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const res = reader.result as string;
            const base64Data = res.split(",")[1] || res;
            resolve(base64Data);
          };
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(selectedFile);
        });

        attachments.push({
          filename: selectedFile.name,
          content: base64Content,
          contentType: selectedFile.type || "application/octet-stream",
        });
      } catch (err) {
        console.error("Eroare citire fisier 3D:", err);
        alert("Fișierul nu a putut fi citit. Încarcă-l din nou sau trimite cererea fără fișier.");
        setSubmitting(false);
        return;
      }
    }

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          subject: mailSubject,
          replyTo: formData.email,
          text: textBody,
          attachments: attachments.length > 0 ? attachments : undefined,
        }),
      });
      // Error responses from the hosting layer (e.g. 413) aren't JSON.
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Eroare la trimiterea cererii de cotație.");
      } else {
        setSuccess(true);
        clearQuote();
      }
    } catch (err) {
      console.error("Eroare la trimitere cotație:", err);
      alert("Eroare de conexiune la trimiterea e-mailului.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setQuoteModalOpen(false);
    // Reset state after transition
    setTimeout(() => {
      setStep(1);
      setSuccess(false);
      setFileName("");
      setSelectedFile(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "Proiect special",
        material: "PLA Premium",
        color: "Portocaliu gtreiD",
        dimensions: "",
        description: "",
        honeypot: "",
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#1C1C1C] text-white shadow-2xl dark:border-white/10 dark:bg-[#1C1C1C] light:bg-white light:text-[#111111] light:border-black/10"
        >
          {/* Top orange gradient accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#FF8C2A] to-[#E05B00]" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6 md:p-8">
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header */}
                <div>
                  <h3 className="text-2xl font-bold font-poppins text-white flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-[#FF8C2A]" />
                    Solicită Ofertă Personalizată
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 font-inter">
                    Trimite-ne schița, fișierul 3D sau detalii despre ideea ta, iar noi revenim cu calculul de cost.
                  </p>
                </div>

                {/* Progress Tabs/Steps */}
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider font-inter border-b border-white/10 pb-4">
                  <span className={`${step === 1 ? "text-[#FF8C2A]" : ""}`}>1. Date Contact</span>
                  <span>/</span>
                  <span className={`${step === 2 ? "text-[#FF8C2A]" : ""}`}>2. Detalii Tehnic</span>
                </div>

                {/* Quote Items alert if user came from a product page */}
                {quoteItems.length > 0 && (
                  <div className="bg-[#FF8C2A]/10 border border-[#FF8C2A]/20 rounded-lg p-3 text-xs text-[#FF8C2A] flex items-center justify-between">
                    <div>
                      Ați selectat produsul: <strong className="underline">{products.find(p => p.slug === quoteItems[0])?.name}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromQuote(quoteItems[0])}
                      className="text-zinc-400 hover:text-[#FF8C2A] font-bold"
                    >
                      Șterge
                    </button>
                  </div>
                )}

                {/* STEP 1: Personal Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                          Nume Complet
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                          placeholder="Ex: Andrei Popescu"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                          placeholder="Ex: 0722 000 000"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                        Adresă Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                        placeholder="Ex: andrei@exemplu.ro"
                      />
                    </div>

                    {/* Honeypot anti-spam field hidden from screen readers & humans */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                        Tip Proiect
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                      >
                        <option value="Proiect special">Proiect Special / Comandă Unicat</option>
                        <option value="Ornamente">Ornamente / Decorațiuni</option>
                        <option value="Brelocuri">Brelocuri Personalizate</option>
                        <option value="Pușculițe">Pușculițe</option>
                        <option value="Jucării">Jucării & Figurine</option>
                        <option value="Logo-uri 3D">Logo 3D Firmă</option>
                        <option value="Auto">Accesorii Auto & Piese 3D</option>
                        <option value="Cadouri personalizate">Cadouri Personalizate / Lămpi</option>
                      </select>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        disabled={!formData.name || !formData.email || !formData.phone}
                        className="rounded-lg bg-[#FF8C2A] px-6 py-3 text-sm font-bold text-black hover:bg-[#e05b00] disabled:opacity-50 transition-all font-poppins flex items-center gap-2"
                      >
                        Pasul Următor
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Technical Specifications */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                          Material Recomandat
                        </label>
                        <select
                          name="material"
                          value={formData.material}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                        >
                          <option value="PLA Premium">PLA Premium (Estetic, Eco)</option>
                          <option value="PETG Rezistent">PETG (Rezistent mecanic, UV)</option>
                          <option value="ABS Industrial">ABS Industrial (Rezistă la impact)</option>
                          <option value="TPU Flexibil">TPU (Garnituri, Cauciucat)</option>
                          <option value="Resină Detaliată">Rășină Ultra-Detailată (Figurine)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                          Culoare
                        </label>
                        <select
                          name="color"
                          value={formData.color}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                        >
                          <option value="Portocaliu gtreiD">Portocaliu gtreiD</option>
                          <option value="Negru Mat">Negru Mat</option>
                          <option value="Alb Glossy">Alb Glossy</option>
                          <option value="Gri Space">Gri Space</option>
                          <option value="Roșu Translucid">Roșu Translucid</option>
                          <option value="Cameleon">Cameleonic / Curcubeu</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                          Dimensiuni Estimative (mm)
                        </label>
                        <input
                          type="text"
                          name="dimensions"
                          value={formData.dimensions}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                          placeholder="Ex: 100x100x50 mm"
                        />
                      </div>
                    </div>

                    {/* File Upload Area */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                        Încarcă Model 3D (Opțional)
                      </label>
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all ${
                          dragActive ? "border-[#FF8C2A] bg-[#FF8C2A]/5" : "border-white/10 hover:border-[#FF8C2A]/40 bg-[#111111]"
                        }`}
                      >
                        <input
                          type="file"
                          id="file-upload"
                          accept=".stl,.obj,.3mf,.step,.stp,.iges,.igs"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Upload className="h-8 w-8 text-zinc-500 mb-2" />
                        <p className="text-sm font-semibold mb-1">
                          Trage fișierul aici sau{" "}
                          <label htmlFor="file-upload" className="text-[#FF8C2A] cursor-pointer hover:underline">
                            răsfoiește computerul
                          </label>
                        </p>
                        <p className="text-xs text-zinc-500">Fișiere acceptate: .STL, .OBJ, .3MF, .STEP, .IGES (max. 3 MB). Pentru fișiere mai mari, pune un link în descriere.</p>

                        {fileName && (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mt-4 p-2 bg-zinc-800 rounded border border-[#FF8C2A]/30 text-xs text-[#FF8C2A] font-mono flex items-center gap-2"
                          >
                            <Check className="h-4 w-4 text-green-500" />
                            {fileName} ({fileSize})
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Description Details */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 font-inter">
                        Descrie Proiectul Tău
                      </label>
                      <textarea
                        name="description"
                        required
                        rows={3}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-sm text-white focus:border-[#FF8C2A] focus:outline-none transition-colors"
                        placeholder="Ex: Doresc o figurină unică pe post de lampă, să aibă grosimea..."
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="rounded-lg border border-white/10 px-6 py-3 text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-poppins"
                      >
                        Înapoi
                      </button>

                      <button
                        type="submit"
                        disabled={submitting || !formData.description}
                        className="rounded-lg bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] px-8 py-3 text-sm font-bold text-black hover:shadow-lg hover:shadow-[#FF8C2A]/20 transition-all font-poppins flex items-center gap-2 disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Se analizează modelul...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Trimite Cererea
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            ) : (
              // Success Screen with Mascot
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center text-center py-6 w-full"
              >
                <Mascot pose="printing" size={160} />
                <h3 className="text-3xl font-black font-poppins text-white mt-6">
                  Cerere Trimisă cu Succes!
                </h3>
                <p className="text-sm text-zinc-400 mt-3 max-w-md font-inter leading-relaxed px-2">
                  Salut! Sunt mascota <span className="text-[#FF8C2A] font-extrabold">3D</span> și m-am ocupat personal de trimiterea fișierului tău! Echipa noastră de ingineri gtreiD va analiza geometria și materialul, iar în maximum <span className="text-white font-semibold">24 ore</span> vei primi oferta pe email.
                </p>

                {/* Elegant Ticket / Summary Badge */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 max-w-md w-full text-left space-y-4 shadow-xl backdrop-blur-md relative overflow-hidden">
                  {/* Decorative glowing accent */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#FF8C2A]/10 blur-xl pointer-events-none" />
                  
                  <div className="border-b border-white/5 pb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8C2A] font-mono">Sumar Cerere Cotație</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-inter">
                    <div className="space-y-1">
                      <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-mono">CLIENT</span>
                      <span className="block font-semibold text-white text-sm">{formData.name}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-mono">MATERIAL</span>
                      <span className="block font-semibold text-white text-sm">{formData.material}</span>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-mono">PROIECT</span>
                      <span className="block font-semibold text-white text-sm">{formData.projectType}</span>
                    </div>

                    {fileName && (
                      <div className="space-y-1 md:col-span-2 bg-black/40 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-zinc-500 uppercase tracking-wider text-[9px] font-mono block">FIȘIER 3D SELECTIONAT</span>
                          <span className="font-mono text-xs text-[#FF8C2A] truncate block max-w-[280px]">{fileName}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-2 py-0.5 rounded">{fileSize}</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-8 rounded-xl bg-gradient-to-r from-zinc-800 to-zinc-900 border border-white/10 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:border-[#FF8C2A]/30 hover:shadow-lg hover:shadow-[#FF8C2A]/10 transition-all font-poppins cursor-pointer"
                >
                  Închide fereastra
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default QuoteModal;

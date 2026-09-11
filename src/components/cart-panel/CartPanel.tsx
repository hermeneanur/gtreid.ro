"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, Send, Check, Loader2, Sparkles, Truck } from "lucide-react";
import { useApp, getCartItemKey } from "../../context/AppContext";
import { products } from "../../data/data";
import Mascot from "../mascot/Mascot";

export const CartPanel: React.FC = () => {
  const { isCartOpen, setCartOpen, cartItems, removeFromCart, updateCartQuantity, clearCart } = useApp();
  const [checkoutStep, setCheckoutStep] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    county: "",
    notes: "",
  });

  if (!isCartOpen) return null;

  // Retrieve products detail from cart items
  const itemsWithDetails = cartItems
    .map((item) => {
      const product = products.find((p) => p.slug === item.slug);
      return product ? { ...item, product } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Math subtotal
  const rawSubtotal = itemsWithDetails.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Apply Brelocuri promo: buy 3, get 1 free (i.e. every 4th keychain is free)
  const keychainItems = itemsWithDetails.filter((item) => item.product.category === "Brelocuri");
  const keychainCount = keychainItems.reduce((sum, item) => sum + item.quantity, 0);
  const freeKeychains = Math.floor(keychainCount / 4);
  const discount = freeKeychains * 15; // 15 RON per keychain

  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discount);

  // Shipping logic: 25 RON shipping fee, FREE for orders >= 250 RON
  const FREE_SHIPPING_THRESHOLD = 250;
  const isFreeShipping = subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = itemsWithDetails.length > 0 && !isFreeShipping ? 25 : 0;
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount);

  const total = subtotalAfterDiscount + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const itemsText = itemsWithDetails
      .map(
        (item) =>
          `- ${item.product.name} x${item.quantity} (${item.product.price} RON/buc)` +
          (item.selectedColor ? ` [Culoare: ${item.selectedColor}]` : "") +
          (item.selectedMaterial ? ` [Material: ${item.selectedMaterial}]` : "")
      )
      .join("\n");

    const promoText = discount > 0 ? `Reducere aplicată (Promoție Brelocuri 3+1): -${discount} RON\n` : "";
    const shippingText = isFreeShipping 
      ? `Taxă Livrare (Curier): GRATUIT (Comandă peste 250 RON)\n` 
      : `Taxă Livrare (Curier): 25 RON\n`;

    const mailSubject = `Comandă Nouă gt3D - Client: ${shippingInfo.name}`;
    const textBody = 
      `DETALII CLIENT:\n` +
      `Nume Complet: ${shippingInfo.name}\n` +
      `Telefon: ${shippingInfo.phone}\n` +
      `Email: ${shippingInfo.email}\n` +
      `Adresă Livrare: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.county}\n\n` +
      `PRODUSE COMANDATE:\n${itemsText}\n\n` +
      `Subtotal Produse: ${rawSubtotal} RON\n` +
      `${promoText}` +
      `${shippingText}` +
      `TOTAL FINAL DE PLATĂ: ${total} RON\n\n` +
      `Observații / Mențiuni:\n${shippingInfo.notes || "Fără observații"}\n`;

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "cart",
          subject: mailSubject,
          replyTo: shippingInfo.email,
          text: textBody,
        }),
      });
      // Error responses from the hosting layer (e.g. 413, 504) aren't JSON.
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Eroare la trimiterea comenzii.");
      } else {
        setSuccess(true);
        clearCart();
      }
    } catch (err) {
      console.error("Eroare la trimitere comandă:", err);
      alert("Eroare de conexiune la trimiterea e-mailului.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setCartOpen(false);
    setTimeout(() => {
      setCheckoutStep(false);
      setSuccess(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
      />

      {/* Cart Slider Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 pointer-events-auto">
        <div className="w-screen max-w-md bg-[#1C1C1C] border-l border-white/10 text-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-bold font-poppins flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-[#FF8C2A]" />
              Coșul tău
            </h3>
            <button
              onClick={handleClose}
              className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {success ? (
              // Success checkout screen
              <div className="flex flex-col items-center justify-center h-full text-center space-y-5 py-8">
                <Mascot pose="printing" size={150} />
                <h4 className="text-2xl font-black font-poppins text-white">Comandă Trimisă!</h4>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
                  Salut! Am trimis detaliile comenzii tale către emailul nostru. Te vom contacta în scurt timp pe telefon sau e-mail pentru confirmarea livrării!
                </p>
                <div className="p-4 bg-zinc-800/50 border border-white/5 rounded-xl text-left w-full text-xs space-y-2 font-mono">
                  <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">Info Livrare</div>
                  <div><span className="text-zinc-400">Client:</span> {shippingInfo.name}</div>
                  <div><span className="text-zinc-400">Telefon:</span> {shippingInfo.phone}</div>
                  <div><span className="text-zinc-400">Email:</span> {shippingInfo.email}</div>
                  <div><span className="text-zinc-400">Destinație:</span> {shippingInfo.city}, {shippingInfo.county}</div>
                  <div><span className="text-zinc-400">Total Achitat:</span> <strong className="text-[#FF8C2A]">{total} RON</strong></div>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-3.5 rounded-full bg-[#FF8C2A] text-black text-xs font-black uppercase tracking-wider hover:bg-[#e05b00] transition-colors font-poppins cursor-pointer"
                >
                  Închide coșul
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              // Empty cart
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-8">
                <ShoppingBag className="h-16 w-16 text-zinc-600 stroke-[1.5]" />
                <p className="text-sm font-semibold text-zinc-400">Coșul tău este gol</p>
                <button
                  onClick={handleClose}
                  className="rounded-full border border-white/10 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/5 transition-colors font-poppins"
                >
                  Continuă Cumpărăturile
                </button>
              </div>
            ) : !checkoutStep ? (
              // Items List
              <div className="space-y-4">
                {/* Free Shipping Progress Banner */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-black/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="flex items-center gap-1.5 text-zinc-300 font-bold">
                      <Truck className="h-4 w-4 text-[#FF8C2A]" />
                      {isFreeShipping ? "Transport Gratuit" : "Livrare prin Curier"}
                    </span>
                    <span className={isFreeShipping ? "text-green-400 font-bold" : "text-[#FF8C2A] font-bold"}>
                      {isFreeShipping ? "GRATUIT" : "25 RON"}
                    </span>
                  </div>
                  {!isFreeShipping ? (
                    <div className="space-y-1.5">
                      <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] h-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-inter">
                        Mai adaugă produse de <strong className="text-white">{amountForFreeShipping} RON</strong> pentru <strong className="text-[#FF8C2A]">Transport GRATUIT</strong>!
                      </p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-green-400 font-inter font-medium flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Ai obținut transport gratuit pentru această comandă!
                    </p>
                  )}
                </div>

                {itemsWithDetails.map((item) => (
                  <div key={getCartItemKey(item)} className="flex gap-4 p-3 bg-zinc-900/50 border border-white/5 rounded-xl relative group">
                    <div className="w-20 h-20 bg-black/40 rounded-lg overflow-hidden flex-shrink-0 relative">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0].startsWith("/") ? item.product.images[0] : `/${item.product.images[0]}`}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 font-mono">3D</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm font-bold truncate pr-6">{item.product.name}</h4>
                        <div className="text-[10px] text-zinc-400 flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
                          {item.selectedColor && <span>Culoare: {item.selectedColor}</span>}
                          {item.selectedMaterial && <span>Material: {item.selectedMaterial}</span>}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#FF8C2A]">
                          {item.product.price} RON
                        </span>

                        <div className="flex items-center border border-white/10 rounded-lg bg-[#111111] overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(getCartItemKey(item), item.quantity - 1)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="px-3 text-xs font-mono font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(getCartItemKey(item), item.quantity + 1)}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(getCartItemKey(item))}
                      className="absolute top-2 right-2 p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Elimină din coș"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {/* Promo notice box */}
                {keychainCount > 0 && (
                  <div className="p-3.5 rounded-xl border border-[#FF8C2A]/20 bg-[#FF8C2A]/5 flex items-start gap-3 mt-6">
                    <Sparkles className="h-5 w-5 text-[#FF8C2A] flex-shrink-0 mt-0.5" />
                    <div className="text-xs space-y-1">
                      <span className="font-bold text-[#FF8C2A] uppercase tracking-wider block text-[10px] font-mono">Promoție Activă Brelocuri</span>
                      <p className="text-zinc-300">
                        La fiecare <strong className="text-white">4 brelocuri</strong> adăugate, unul este <strong className="text-white">GRATIS</strong>! 
                        {keychainCount < 4 ? (
                          <> Mai adaugă <strong className="text-white">{4 - keychainCount}</strong> brelocuri pentru a beneficia de reducere.</>
                        ) : (
                          <> Ai primit <strong className="text-white">{freeKeychains} breloc(uri) gratuit(e)</strong>!</>
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Shipping Form
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h4 className="text-sm font-bold font-poppins uppercase tracking-wider text-[#FF8C2A] border-b border-white/10 pb-2">
                  Date de Livrare & Contact
                </h4>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Nume Complet *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
                    placeholder="Popescu Andrei"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Telefon *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
                      placeholder="07xx xxx xxx"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={shippingInfo.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
                      placeholder="nume@domain.ro"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Adresă de Livrare *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
                    placeholder="Strada, Număr, Bloc, Ap..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Oraș / Localitate *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingInfo.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
                      placeholder="Ex: Zărnești"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Județ *</label>
                    <input
                      type="text"
                      name="county"
                      required
                      value={shippingInfo.county}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none"
                      placeholder="Ex: Brașov"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1">Observații</label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={shippingInfo.notes}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-[#111111] p-3 text-xs text-white focus:border-[#FF8C2A] focus:outline-none resize-none"
                    placeholder="Detalii curier, instrucțiuni speciale..."
                  />
                </div>

                <div className="text-[10px] text-zinc-500 font-mono leading-relaxed mt-2 bg-black/20 p-2.5 rounded-lg border border-white/5">
                  🛡️ Comanda ta este trimisă direct și securizat către echipa noastră la <strong>hermeneanur@gmail.com</strong>.
                </div>
              </form>
            )}
          </div>

          {/* Footer Billing Details & Actions */}
          {!success && cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-zinc-900/40 space-y-4">
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal produse:</span>
                  <span>{rawSubtotal} RON</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (Promo 3+1):</span>
                    <span>-{discount} RON</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Taxă livrare (Curier):</span>
                  <span className={isFreeShipping ? "text-green-400 font-bold" : "text-zinc-200 font-bold"}>
                    {isFreeShipping ? "GRATUIT" : "25 RON"}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                  <span>Total final plată:</span>
                  <span className="text-[#FF8C2A]">{total} RON</span>
                </div>
              </div>

              {!checkoutStep ? (
                <button
                  onClick={() => setCheckoutStep(true)}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF8C2A] to-[#E05B00] text-black text-sm font-black uppercase tracking-wider hover:shadow-xl hover:shadow-[#FF8C2A]/20 transition-all font-poppins flex items-center justify-center gap-2 cursor-pointer"
                >
                  Finalizează Comanda
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep(false)}
                    className="flex-1 py-3.5 rounded-full border border-white/10 text-xs font-bold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors font-poppins cursor-pointer"
                  >
                    Înapoi la coș
                  </button>
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={submitting || !shippingInfo.name || !shippingInfo.phone || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city || !shippingInfo.county}
                    className="flex-1.5 py-3.5 rounded-full bg-[#FF8C2A] text-black text-xs font-black uppercase tracking-wider hover:bg-[#e05b00] transition-colors disabled:opacity-50 font-poppins flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                        Se trimite...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Trimite Comanda
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartPanel;

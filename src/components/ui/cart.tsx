"use client";
import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  X, Minus, Plus, ShoppingBag, CreditCard, Wallet,
  DollarSign, QrCode, Check, Shield, ChevronRight, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem } from "@/types";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

type PaymentMethod = "card" | "wallet" | "cod";
type Tab = "cart" | "payment" | "success";

export function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const [tab, setTab]             = useState<Tab>("cart");
  const [method, setMethod]       = useState<PaymentMethod>("card");
  const [wallet, setWallet]       = useState("");
  const [upiId, setUpiId]         = useState("");
  const [upiVerified, setUpiVerified] = useState(false);
  const [processing, setProcessing]   = useState(false);

  const calc = useMemo(() => {
    const sub  = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const tax  = sub * 0.18;
    const svc  = sub * 0.05;
    const pkg  = 1.5;
    const del  = sub >= 100 ? 0 : 5;
    return { sub, tax, svc, pkg, del, total: sub + tax + svc + pkg + del };
  }, [items]);

  const verifyUpi = useCallback(() => {
    if (!upiId.trim()) return;
    setProcessing(true);
    setTimeout(() => { setUpiVerified(true); setProcessing(false); }, 1800);
  }, [upiId]);

  const placeOrder = useCallback(() => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setTab("success");
      setTimeout(() => {
        onCheckout();
        setTab("cart");
        setMethod("card");
        setWallet("");
        setUpiId("");
        setUpiVerified(false);
      }, 2800);
    }, 2000);
  }, [onCheckout]);

  const canPay =
    method === "card" || method === "cod" ||
    (method === "wallet" && wallet !== "" && (wallet !== "upi" || upiVerified));

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-[var(--warm-white)] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[var(--obsidian)] px-6 py-5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-[var(--gold)]" />
            <div>
              <h2 className="text-white font-body text-sm tracking-[0.2em] uppercase">
                {tab === "success" ? "Order Placed" : tab === "payment" ? "Secure Checkout" : "Your Selection"}
              </h2>
              {items.length > 0 && tab === "cart" && (
                <p className="text-white/40 text-[0.6rem] tracking-widest mt-0.5">{items.length} item{items.length > 1 ? "s" : ""}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Gold line */}
        <div className="h-px bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold)]" />

        {/* ── SUCCESS STATE ── */}
        {tab === "success" && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <div className="w-16 h-16 bg-[var(--obsidian)] flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-[var(--gold)]" />
            </div>
            <p className="section-eyebrow mb-3">Confirmed</p>
            <h3 className="text-3xl font-light text-[var(--text-primary)] mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Order Received
            </h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-xs">
              Thank you for dining with Maison Dorée. Your order is being prepared with care.
            </p>
            <div className="mt-6 border-t border-[var(--parchment)] pt-6 w-full">
              <p className="text-[0.65rem] tracking-[0.3em] uppercase text-[var(--gold)]">
                Total Charged: ${calc.total.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* ── EMPTY CART ── */}
        {tab !== "success" && items.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="w-12 h-12 text-[var(--parchment)] mb-5" />
            <p className="text-[var(--text-muted)] text-sm mb-6">Your cart is empty</p>
            <Button variant="gold" size="sm" onClick={onClose}>Explore Menu</Button>
          </div>
        )}

        {/* ── CART TAB ── */}
        {tab === "cart" && items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-[var(--parchment)] last:border-0">
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium text-[var(--text-primary)] leading-tight pr-2 line-clamp-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[var(--text-muted)] hover:text-red-500 transition-colors flex-shrink-0"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--gold)] font-body text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-7 h-7 border border-[var(--parchment)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center text-[var(--text-primary)]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 border border-[var(--parchment)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill summary */}
            <div className="flex-shrink-0 border-t border-[var(--parchment)] px-6 py-5 bg-[var(--ivory)]">
              <div className="space-y-2 text-[0.72rem] text-[var(--text-muted)] mb-4">
                {[
                  ["Subtotal", `$${calc.sub.toFixed(2)}`],
                  ["Tax (18%)", `$${calc.tax.toFixed(2)}`],
                  ["Service (5%)", `$${calc.svc.toFixed(2)}`],
                  ["Packaging", `$${calc.pkg.toFixed(2)}`],
                  ["Delivery", calc.del === 0 ? "Complimentary" : `$${calc.del.toFixed(2)}`],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span>{k}</span>
                    <span className={v === "Complimentary" ? "text-[var(--gold)]" : ""}>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-3 border-t border-[var(--parchment)] font-medium text-[var(--text-primary)] text-sm">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>Total</span>
                  <span className="text-[var(--gold)]">${calc.total.toFixed(2)}</span>
                </div>
              </div>
              <Button variant="gold" size="md" onClick={() => setTab("payment")} className="w-full gap-2">
                Proceed to Payment
                <ChevronRight className="w-4 h-4" />
              </Button>
              <p className="text-center text-[0.6rem] text-[var(--text-muted)] mt-3 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> SSL encrypted · Secure payment
              </p>
            </div>
          </>
        )}

        {/* ── PAYMENT TAB ── */}
        {tab === "payment" && items.length > 0 && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Method selector */}
              <div className="mb-6">
                <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--text-muted)] mb-3">Payment Method</p>
                <div className="space-y-2">
                  {([
                    { id: "card",   Icon: CreditCard,  label: "Credit / Debit Card",  sub: "Visa · Mastercard · Amex" },
                    { id: "wallet", Icon: Wallet,       label: "UPI & Digital Wallets", sub: "PayPal · Apple Pay · GPay · UPI" },
                    { id: "cod",    Icon: DollarSign,   label: "Pay at Delivery",       sub: "Cash on delivery" },
                  ] as const).map(({ id, Icon, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => setMethod(id)}
                      className={`w-full flex items-center gap-4 p-4 border text-left transition-all ${
                        method === id
                          ? "border-[var(--gold)] bg-[var(--gold)]/5"
                          : "border-[var(--parchment)] hover:border-[var(--gold)]/40"
                      }`}
                    >
                      <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0 ${
                        method === id ? "border-[var(--gold)]" : "border-[var(--parchment)]"
                      }`}>
                        {method === id && <div className="w-2 h-2 rounded-full bg-[var(--gold)]" />}
                      </div>
                      <Icon className={`w-4 h-4 flex-shrink-0 ${method === id ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`} />
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{label}</p>
                        <p className="text-[0.65rem] text-[var(--text-muted)]">{sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Card fields */}
              {method === "card" && (
                <div className="space-y-3 mb-6">
                  <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--text-muted)] mb-2">Card Details</p>
                  {[
                    { ph: "Card Number", type: "text" },
                    { ph: "MM / YY", type: "text" },
                    { ph: "CVV", type: "text" },
                    { ph: "Cardholder Name", type: "text" },
                  ].map((f) => (
                    <input
                      key={f.ph}
                      type={f.type}
                      placeholder={f.ph}
                      className="w-full border border-[var(--parchment)] px-4 py-3 text-sm bg-white placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                    />
                  ))}
                </div>
              )}

              {/* Wallet picker */}
              {method === "wallet" && (
                <div className="mb-6">
                  <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--text-muted)] mb-3">Choose Wallet</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {["PayPal", "Apple Pay", "Google Pay", "UPI"].map((w) => (
                      <button
                        key={w}
                        onClick={() => { setWallet(w.toLowerCase().replace(" ", "")); setUpiVerified(false); }}
                        className={`py-3 px-4 border text-xs font-medium transition-all ${
                          wallet === w.toLowerCase().replace(" ", "")
                            ? "border-[var(--gold)] bg-[var(--gold)]/5 text-[var(--gold)]"
                            : "border-[var(--parchment)] text-[var(--text-muted)] hover:border-[var(--gold)]/40"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                  {wallet === "upi" && (
                    <div className="space-y-3">
                      <div className="bg-[var(--obsidian)] p-6 flex flex-col items-center">
                        <QrCode className="w-16 h-16 text-[var(--gold)] mb-2" />
                        <p className="text-[0.6rem] tracking-widest uppercase text-white/50">Scan to pay ${calc.total.toFixed(2)}</p>
                      </div>
                      <input
                        type="text"
                        placeholder="Or enter UPI ID (e.g. name@upi)"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full border border-[var(--parchment)] px-4 py-3 text-sm bg-white placeholder-[var(--text-muted)]/50 focus:outline-none focus:border-[var(--gold)] transition-colors"
                      />
                      {!upiVerified ? (
                        <Button variant="outline" size="sm" onClick={verifyUpi} className="w-full" disabled={!upiId || processing}>
                          {processing ? "Verifying…" : "Verify UPI ID"}
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-3">
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-green-700 text-xs font-medium">UPI Verified</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* COD */}
              {method === "cod" && (
                <div className="border border-[var(--parchment)] p-5 mb-6 bg-white">
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Pay <span className="text-[var(--gold)] font-medium">${calc.total.toFixed(2)}</span> in cash when your order arrives. Please have the exact amount ready.
                  </p>
                </div>
              )}

              {/* Order total recap */}
              <div className="border border-[var(--parchment)] p-4 bg-white">
                <div className="flex justify-between items-center">
                  <span className="text-[0.7rem] tracking-widest uppercase text-[var(--text-muted)]">Amount Due</span>
                  <span className="text-xl text-[var(--gold)] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    ${calc.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 border-t border-[var(--parchment)] px-6 py-5 bg-[var(--ivory)] space-y-3">
              <Button variant="gold" size="md" onClick={placeOrder} disabled={!canPay || processing} className="w-full">
                {processing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[var(--obsidian)] border-t-transparent rounded-full animate-spin" />
                    Processing…
                  </span>
                ) : (
                  `Confirm & Pay $${calc.total.toFixed(2)}`
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setTab("cart")} className="w-full text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xs tracking-widest uppercase">
                ← Back to Cart
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { MenuItem } from "@/types";
import type { CartItem } from "@/components/ui/cart";

interface CartContextValue {
  items: CartItem[];
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  checkout: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems]   = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty === 0) { setItems((p) => p.filter((i) => i.id !== id)); return; }
    setItems((p) => p.map((i) => i.id === id ? { ...i, quantity: qty } : i));
  }, []);

  const removeItem  = useCallback((id: string) => setItems((p) => p.filter((i) => i.id !== id)), []);
  const checkout    = useCallback(() => { setItems([]); setIsOpen(false); }, []);
  const count       = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, count, isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addItem, updateQty, removeItem, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

"use client";
import { CartProvider, useCart } from "@/lib/cart-context";
import { Cart } from "@/components/ui/cart";
import { Chatbot } from "@/components/ui/chatbot";
import { ReactNode } from "react";

function CartRenderer() {
  const { items, isOpen, closeCart, updateQty, removeItem, checkout } = useCart();
  return (
    <Cart
      isOpen={isOpen}
      onClose={closeCart}
      items={items}
      onUpdateQuantity={updateQty}
      onRemoveItem={removeItem}
      onCheckout={checkout}
    />
  );
}

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartRenderer />
      <Chatbot />
    </CartProvider>
  );
}

import { MenuSection } from "@/components/sections/menu-section";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "The Menu",
  description: "Tasting menus, entrées, main courses and desserts. Classical French cuisine elevated by Chef Édouard Dubois. Two Michelin stars.",
};
export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)] pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-center border-b border-[var(--parchment)] mb-16">
        <p className="section-eyebrow mb-4">Chef Édouard Dubois</p>
        <h1 className="text-6xl md:text-7xl font-light text-[var(--text-primary)] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>The Menu</h1>
      </div>
      <section className="pb-24"><MenuSection /></section>
    </div>
  );
}

import { ExperiencesSection } from "@/components/sections/experiences-section";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Private Experiences",
  description: "Chef's Table, Cave Privée, Sunday Brunch and Carte Blanche — bespoke dining experiences at Maison Dorée.",
};
export default function OffersPage() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-center border-b border-[var(--parchment)] mb-16">
        <p className="section-eyebrow mb-4">Beyond the Menu</p>
        <h1 className="text-6xl md:text-7xl font-light text-[var(--text-primary)] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Private Experiences
        </h1>
      </div>
      <section className="pb-24"><ExperiencesSection /></section>
    </div>
  );
}

import { LocationsSection } from "@/components/sections/locations-section";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Locations",
  description: "Maison Dorée in New York, London Mayfair and Paris 8ème. Reserve your table at any of our three houses.",
};
export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)] pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-center border-b border-[var(--parchment)] mb-16">
        <p className="section-eyebrow mb-4">Three Cities</p>
        <h1 className="text-6xl md:text-7xl font-light text-[var(--text-primary)] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Our Houses
        </h1>
      </div>
      <section className="pb-24"><LocationsSection /></section>
    </div>
  );
}

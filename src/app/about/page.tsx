import { AboutSection } from "@/components/sections/about-section";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Our Story",
  description: "Chef Édouard Dubois, 25 years of excellence, two Michelin stars and a philosophy of refined restraint.",
};
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--warm-white)] pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-center border-b border-[var(--parchment)] mb-16">
        <p className="section-eyebrow mb-4">Since 1997</p>
        <h1 className="text-6xl md:text-7xl font-light text-[var(--text-primary)] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Our Story
        </h1>
      </div>
      <section className="pb-24"><AboutSection /></section>
    </div>
  );
}

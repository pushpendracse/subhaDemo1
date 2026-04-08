import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/sections/hero-section";
import { MenuSection } from "@/components/sections/menu-section";
import { ExperiencesSection } from "@/components/sections/experiences-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { Button } from "@/components/ui/button";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  title: siteData.metaDefaults.title,
  description: siteData.metaDefaults.description,
};

function SectionDivider({ labelLeft, labelRight }: { labelLeft: string; labelRight: string }) {
  return (
    <div className="flex items-center justify-between px-6 lg:px-10 max-w-7xl mx-auto py-4 border-b border-[var(--parchment)]">
      <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[var(--text-muted)]/50">{labelLeft}</span>
      <span className="text-[0.55rem] tracking-[0.4em] uppercase text-[var(--text-muted)]/50">{labelRight}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Opening hours bar */}
      <div className="bg-[var(--obsidian)] py-3.5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.6rem] tracking-[0.35em] uppercase text-white/40">
            ✦ Open Tuesday through Sunday — Dinner from 6:00 PM
          </p>
          <Link href="/reservations" className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
            Reserve a Table →
          </Link>
        </div>
      </div>

      {/* Menu preview */}
      <SectionDivider labelLeft="Our Cuisine" labelRight="Nos Créations" />
      <section className="py-20 bg-[var(--warm-white)]">
        <MenuSection />
        <div className="text-center mt-12">
          <Link href="/menu">
            <Button variant="outline" size="md">View Complete Menu</Button>
          </Link>
        </div>
      </section>

      {/* Experiences */}
      <SectionDivider labelLeft="Private Experiences" labelRight="Expériences Privées" />
      <section className="py-20 bg-[var(--ivory)]">
        <ExperiencesSection />
        <div className="text-center mt-12">
          <Link href="/offers">
            <Button variant="outline" size="md">All Experiences</Button>
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <ReviewsSection />

      {/* Reservation CTA strip */}
      <section className="bg-[var(--obsidian)] py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="section-eyebrow mb-5" style={{ color: "var(--gold)" }}>Reserve</p>
          <h2
            className="text-4xl md:text-5xl font-light text-white mb-5 leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Begin Your Evening at Maison Dorée
          </h2>
          <p className="text-white/40 text-sm mb-10 leading-relaxed max-w-xl mx-auto">
            We invite you to reserve your table and allow us to compose an evening worthy of your memory.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservations">
              <Button variant="gold" size="lg">Reserve a Table</Button>
            </Link>
            <a href={`tel:${siteData.contact.phone}`}>
              <Button variant="outline" size="lg"
                className="border-white/20 text-white/60 hover:border-[var(--gold)] hover:text-[var(--gold)]">
                {siteData.contact.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

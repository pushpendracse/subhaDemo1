import { ReviewsSection } from "@/components/sections/reviews-section";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Guest Reviews",
  description: "Rated 4.9 stars — testimonials from guests worldwide and press acclaim from the New York Times and Michelin Guide.",
};
export default function ReviewsPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 text-center border-b border-[var(--parchment)] bg-[var(--warm-white)]">
        <p className="section-eyebrow mb-4">Our Guests</p>
        <h1 className="text-6xl md:text-7xl font-light text-[var(--text-primary)] leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          In Their Words
        </h1>
      </div>
      <ReviewsSection />
    </div>
  );
}

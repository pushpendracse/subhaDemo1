"use client";
import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import reviewsData from "@/data/reviews.json";

export function ReviewsSection() {
  const [idx, setIdx] = useState(0);
  const { reviews, summary } = reviewsData;
  const prev = () => setIdx((i) => (i - 1 + reviews.length) % reviews.length);
  const next = () => setIdx((i) => (i + 1) % reviews.length);

  return (
    <div className="bg-[var(--ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-eyebrow mb-4">Testimonials</p>
          <h2
            className="text-5xl md:text-6xl font-light text-[var(--text-primary)] mb-5"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            In Their Words
          </h2>
          <div className="ornament-divider max-w-xs mx-auto text-[0.6rem]">Nos Clients</div>
        </div>

        {/* Press quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--parchment)] mb-16">
          {summary.publications.map((pub) => (
            <div
              key={pub.name}
              className="p-8 border-r border-[var(--parchment)] last:border-r-0 text-center"
            >
              <p
                className="text-lg text-[var(--text-primary)] italic font-light mb-4 leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                "{pub.quote}"
              </p>
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--gold)] font-body">
                {pub.name}
              </p>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="text-center">
            <div
              className="text-6xl font-light text-[var(--text-primary)] leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {summary.averageRating}
            </div>
            <div className="flex justify-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
              ))}
            </div>
            <p className="text-[0.65rem] tracking-widest uppercase text-[var(--text-muted)] font-body">
              {summary.totalReviews.toLocaleString()} reviews
            </p>
          </div>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center px-12">
            <div
              className="text-6xl text-[var(--gold)]/20 leading-none mb-4 font-serif select-none"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "
            </div>
            <p
              className="text-xl md:text-2xl font-light text-[var(--text-primary)] italic leading-relaxed mb-8"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {reviews[idx].comment}
            </p>
            <div className="w-8 h-px bg-[var(--gold)] mx-auto mb-5" />
            <p className="font-body text-[0.7rem] tracking-[0.3em] uppercase text-[var(--text-primary)] mb-1">
              {reviews[idx].name}
            </p>
            <p className="text-[0.65rem] tracking-widest text-[var(--text-muted)]">
              {reviews[idx].location} · {reviews[idx].occasion} · {reviews[idx].date}
            </p>
          </div>

          {/* Navigation */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--parchment)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 border border-[var(--parchment)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`transition-all duration-300 ${
                i === idx ? "w-6 h-1 bg-[var(--gold)]" : "w-1 h-1 bg-[var(--parchment)]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

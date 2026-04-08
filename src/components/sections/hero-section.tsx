import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import siteData from "@/data/site.json";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src={siteData.heroImages[0].src}
        alt={siteData.heroImages[0].alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Layered overlays for cinematic depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
      {/* Subtle vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-4 mb-8 animate-fade-up">
          <div className="h-px w-12 bg-[var(--gold)]/60" />
          <span className="text-white text-[0.6rem] tracking-[0.5em] uppercase font-body mt-12">
            {siteData.awards[0]} · Est. {siteData.established}
          </span>
          <div className="h-px w-12 bg-[var(--gold)]/60" />
        </div>

        {/* Title */}
        <h1
          className="animate-fade-up delay-100 mb-5 leading-none"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "clamp(3.5rem, 9vw, 7rem)", letterSpacing: "0.05em" }}
        >
          Maison Dorée
        </h1>

        {/* Tagline */}
        <p
          className="animate-fade-up delay-200 text-white/60 mb-10 tracking-[0.3em] uppercase text-[0.75rem] font-body"
        >
          {siteData.tagline}
        </p>

        {/* Description */}
        <p
          className="animate-fade-up delay-300 text-white/70 text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed font-light"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
        >
          {siteData.description}
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/reservations">
            <Button variant="gold" size="lg">
              Reserve Your Table
            </Button>
          </Link>
          <Link href="/menu">
            <Button variant="outline" size="lg">
              View Our Menu
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-500 flex items-center justify-center gap-12 mt-16 pt-12 border-t border-white/10">
          {siteData.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl text-[var(--gold)] mb-1 font-light"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {stat.number}
              </div>
              <div className="text-[0.6rem] tracking-[0.3em] uppercase text-white/40 font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up delay-500">
        <span className="text-[0.55rem] tracking-[0.4em] uppercase text-white/30 font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--gold)]/50 to-transparent" />
      </div>
    </section>
  );
}

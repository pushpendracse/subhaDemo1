import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import offersData from "@/data/offers.json";

const badgeVariant: Record<string, "gold" | "dark" | "olive"> = {
  gold: "gold", dark: "dark", olive: "olive",
};

export function ExperiencesSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="section-eyebrow mb-4">Curated Evenings</p>
        <h2
          className="text-5xl md:text-6xl font-light text-[var(--text-primary)] mb-5 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Private Experiences
        </h2>
        <div className="ornament-divider max-w-xs mx-auto text-[0.6rem]">Nos Expériences</div>
        <p className="text-[var(--text-muted)] text-sm max-w-xl mx-auto mt-6 leading-relaxed font-light">
          Beyond the menu — immersive evenings designed for those who seek the extraordinary.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {offersData.experiences.map((exp, i) => (
          <div
            key={exp.id}
            className={`group relative overflow-hidden card-lift bg-white border border-[var(--parchment)] ${
              i === 0 ? "md:col-span-2 md:grid md:grid-cols-2" : ""
            }`}
          >
            {/* Image */}
            <div className={`relative overflow-hidden ${i === 0 ? "h-72 md:h-full" : "h-60"}`}>
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-5 left-5">
                <Badge variant={badgeVariant[exp.badgeColor] ?? "gold"}>
                  {exp.badge}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--gold)] mb-2 font-body">
                  {exp.subtitle}
                </p>
                <h3
                  className="text-2xl md:text-3xl font-light text-[var(--text-primary)] mb-3 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {exp.title}
                </h3>
                <p className="text-[0.78rem] text-[var(--text-muted)] leading-relaxed mb-5">
                  {exp.description}
                </p>
                <div className="flex items-center gap-2 text-[0.65rem] text-[var(--text-muted)] tracking-wide mb-6">
                  <CalendarDays className="w-3.5 h-3.5 text-[var(--gold)]/70" />
                  {exp.availability}
                </div>
              </div>
              <div className="flex items-end justify-between pt-5 border-t border-[var(--parchment)]">
                <div>
                  <div
                    className="text-3xl text-[var(--gold)] font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    ${exp.price}
                  </div>
                  <p className="text-[0.6rem] text-[var(--text-muted)] mt-0.5">{exp.priceNote}</p>
                </div>
                <Link href="/reservations">
                  <Button variant="outline" size="sm">Enquire</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

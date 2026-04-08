import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import locationsData from "@/data/locations.json";

export function LocationsSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="section-eyebrow mb-4">Our Houses</p>
        <h2
          className="text-5xl md:text-6xl font-light text-[var(--text-primary)] mb-5"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Find Us
        </h2>
        <div className="ornament-divider max-w-xs mx-auto text-[0.6rem]">Nos Adresses</div>
      </div>

      {/* Locations */}
      <div className="space-y-16">
        {locationsData.locations.map((loc, i) => (
          <div
            key={loc.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--parchment)] group ${
              i % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className={`relative h-72 lg:h-auto overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
              {loc.isPrimary && (
                <div className="absolute top-5 left-5 bg-[var(--gold)] text-[var(--obsidian)] text-[0.55rem] tracking-[0.3em] uppercase px-4 py-1.5">
                  Flagship
                </div>
              )}
            </div>

            {/* Details */}
            <div className={`p-10 lg:p-14 flex flex-col justify-center bg-white ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <p className="text-[0.6rem] tracking-[0.35em] uppercase text-[var(--gold)] mb-2 font-body">
                {loc.neighbourhood}
              </p>
              <h3
                className="text-3xl font-light text-[var(--text-primary)] mb-6"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {loc.name}
              </h3>

              <div className="space-y-3 mb-7">
                {[
                  { Icon: MapPin,  text: loc.address },
                  { Icon: Phone,   text: loc.phone, href: `tel:${loc.phone}` },
                  { Icon: Mail,    text: loc.email, href: `mailto:${loc.email}` },
                  { Icon: Clock,   text: `Dinner: ${loc.hours.dinner}` },
                ].map(({ Icon, text, href }, j) => (
                  <div key={j} className="flex items-start gap-3 text-[0.75rem] text-[var(--text-muted)]">
                    <Icon className="w-3.5 h-3.5 text-[var(--gold)]/60 mt-0.5 flex-shrink-0" />
                    {href ? (
                      <a href={href} className="hover:text-[var(--gold)] transition-colors">{text}</a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-8">
                {loc.features.map((f) => (
                  <span
                    key={f}
                    className="text-[0.6rem] tracking-[0.2em] uppercase border border-[var(--parchment)] px-3 py-1.5 text-[var(--text-muted)]"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href="/reservations">
                  <Button variant="gold" size="sm">Reserve</Button>
                </Link>
                <a
                  href={`https://maps.google.com/?q=${loc.lat},${loc.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">Directions</Button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

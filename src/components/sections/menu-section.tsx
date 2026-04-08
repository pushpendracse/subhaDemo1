"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Plus, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import menuData from "@/data/menu.json";
import type { MenuItem } from "@/types";

export function MenuSection() {
  const [active, setActive]       = useState("tasting");
  const [added, setAdded]         = useState<string | null>(null);
  const { categories, items }     = menuData;
  const filtered                  = items.filter((i) => i.category === active);
  const { addItem }               = useCart();

  const handleAdd = (item: typeof items[0]) => {
    addItem(item as unknown as MenuItem);
    setAdded(item.id);
    setTimeout(() => setAdded(null), 1400);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-10">
      {/* Section header */}
      <div className="text-center mb-16">
        <p className="section-eyebrow mb-4">Cuisine</p>
        <h2
          className="text-5xl md:text-6xl font-light text-[var(--text-primary)] mb-5 leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          The Menu
        </h2>
        <div className="ornament-divider max-w-xs mx-auto text-[0.6rem]">Notre Cuisine</div>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap justify-center gap-0 mb-14 border border-[var(--parchment)]">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-8 py-4 text-[0.6rem] tracking-[0.3em] uppercase font-body transition-all duration-300 border-r border-[var(--parchment)] last:border-r-0 ${
              active === cat.id
                ? "bg-[var(--obsidian)] text-[var(--gold)]"
                : "bg-white text-[var(--text-muted)] hover:bg-[var(--ivory)] hover:text-[var(--text-primary)]"
            }`}
          >
            <span className="block">{cat.name}</span>
            <span className="block text-[0.5rem] tracking-widest mt-0.5 opacity-60">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Tasting menu — featured card layout */}
      {active === "tasting" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filtered.map((item) => (
            <div key={item.id} className="group relative overflow-hidden card-lift bg-white border border-[var(--parchment)]">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {item.isSignature && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">Signature</Badge>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3
                  className="text-2xl font-light text-[var(--text-primary)] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.name}
                </h3>
                <p className="text-[0.75rem] text-[var(--text-muted)] leading-relaxed mb-5">{item.description}</p>
                <div className="flex items-end justify-between pt-4 border-t border-[var(--parchment)]">
                  <div>
                    <div className="text-3xl text-[var(--gold)] font-light" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      ${item.price}
                    </div>
                    {item.priceNote && <p className="text-[0.6rem] text-[var(--text-muted)] mt-0.5 tracking-wide">{item.priceNote}</p>}
                  </div>
                  <div className="text-right">
                    {item.courses && <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--text-muted)]">{item.courses} Courses</p>}
                    {item.duration && <p className="text-[0.6rem] tracking-[0.25em] uppercase text-[var(--gold)]/60 mt-0.5">{item.duration}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleAdd(item)}
                  className={`mt-5 w-full flex items-center justify-center gap-2 py-3 text-[0.65rem] tracking-[0.3em] uppercase font-body transition-all duration-300 border ${
                    added === item.id
                      ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--obsidian)]"
                      : "border-[var(--gold)]/40 text-[var(--gold)] hover:bg-[var(--gold)] hover:border-[var(--gold)] hover:text-[var(--obsidian)]"
                  }`}
                >
                  {added === item.id ? <><Check className="w-3.5 h-3.5" /> Added</> : <><Plus className="w-3.5 h-3.5" /> Reserve This Menu</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Standard à la carte list */
        <div className="max-w-4xl mx-auto divide-y divide-[var(--parchment)]">
          {filtered.map((item) => (
            <div key={item.id} className="py-8 flex gap-6 group">
              <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="96px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3
                        className="text-xl font-light text-[var(--text-primary)]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {item.name}
                      </h3>
                      {item.isSignature && <Badge variant="outline" className="text-[0.5rem]">Signature</Badge>}
                    </div>
                    <p className="text-[0.75rem] text-[var(--text-muted)] leading-relaxed max-w-lg mb-2">{item.description}</p>
                    {item.allergens && item.allergens.length > 0 && (
                      <p className="text-[0.6rem] text-[var(--text-muted)]/60 tracking-wide uppercase">Contains: {item.allergens.join(", ")}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0 flex flex-col items-end gap-3">
                    <div
                      className="text-2xl text-[var(--gold)] font-light"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      ${item.price}
                    </div>
                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-[0.58rem] tracking-[0.25em] uppercase font-body border transition-all duration-300 ${
                        added === item.id
                          ? "bg-[var(--gold)] border-[var(--gold)] text-[var(--obsidian)]"
                          : "border-[var(--parchment)] text-[var(--text-muted)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
                      }`}
                    >
                      {added === item.id ? <><Check className="w-3 h-3" /> Added</> : <><Plus className="w-3 h-3" /> Add</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-[0.65rem] text-[var(--text-muted)] tracking-wide mt-14 max-w-lg mx-auto">
        All dishes are prepared with seasonal ingredients. Please inform us of any dietary requirements prior to your visit. Service compris.
      </p>
    </div>
  );
}

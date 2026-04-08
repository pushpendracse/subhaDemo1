"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import membershipData from "@/data/membership.json";

export function MembershipSection() {
  const [modalTier, setModalTier] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { tiers, programName, programSubtitle, description } = membershipData;
  const selected = tiers.find((t) => t.id === modalTier);

  return (
    <div className="bg-[var(--obsidian)] py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[var(--gold)] text-[0.6rem] tracking-[0.5em] uppercase mb-4 font-body">
            {programName}
          </p>
          <h2
            className="text-5xl md:text-6xl font-light text-white mb-5 leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            {programSubtitle}
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent mb-6" />
          <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed font-light italic"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {description}
          </p>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`relative p-10 border-r border-white/10 last:border-r-0 transition-all duration-500 group hover:bg-white/3 ${
                tier.popular ? "bg-white/5" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                  <span className="bg-[var(--gold)] text-[var(--obsidian)] text-[0.55rem] tracking-[0.3em] uppercase px-5 py-1.5 block">
                    Recommended
                  </span>
                </div>
              )}

              {/* Tier colour accent */}
              <div
                className="w-8 h-px mb-8"
                style={{ backgroundColor: tier.color }}
              />

              <p className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-2 font-body">
                {tier.nameEn}
              </p>
              <h3
                className="text-3xl font-light mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: tier.color }}
              >
                {tier.name}
              </h3>
              <p className="text-white/40 text-[0.72rem] leading-relaxed mb-6 min-h-[3rem]">
                {tier.description}
              </p>

              <div className="mb-8 pb-8 border-b border-white/10">
                <div
                  className="text-4xl font-light text-white"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {tier.price}
                </div>
              </div>

              <ul className="space-y-3 mb-10">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-[0.72rem] text-white/50">
                    <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.color }} />
                    {perk}
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setModalTier(tier.id)}
                className="w-full border-white/20 text-white/60 hover:border-[var(--gold)] hover:text-[var(--gold)] tracking-widest"
              >
                Join {tier.name}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalTier && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setModalTier(null)}
        >
          <div
            className="bg-[var(--charcoal)] border border-white/10 p-10 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-8 h-px mb-6" style={{ backgroundColor: selected.color }} />
            <p className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-1 font-body">Apply for</p>
            <h3
              className="text-3xl font-light mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: selected.color }}
            >
              {selected.name}
            </h3>
            <div className="space-y-4 mb-6">
              {[
                { label: "Full Name", value: name, setter: setName, type: "text", placeholder: "Your full name" },
                { label: "Email Address", value: email, setter: setEmail, type: "email", placeholder: "you@example.com" },
              ].map(({ label, value, setter, type, placeholder }) => (
                <div key={label}>
                  <label className="text-[0.6rem] tracking-[0.3em] uppercase text-white/30 block mb-2 font-body">
                    {label}
                  </label>
                  <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full bg-transparent border border-white/15 px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[var(--gold)] transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setModalTier(null)}
                className="flex-1 text-white/30 hover:text-white/60 tracking-widest border border-white/10"
              >
                Cancel
              </Button>
              <Button
                variant="gold"
                size="sm"
                onClick={() => { alert(`Thank you, ${name}! We will contact you at ${email}.`); setModalTier(null); setName(""); setEmail(""); }}
                className="flex-1"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import siteData from "@/data/site.json";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[var(--obsidian)] text-white/50">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-5">
              <span
                className="text-[var(--gold)] tracking-[0.15em] text-2xl font-light block"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Maison Dorée
              </span>
              <span className="text-white/30 text-[0.5rem] tracking-[0.5em] uppercase">
                Fine Dining · Est. {siteData.established}
              </span>
            </Link>
            <p className="text-[0.75rem] leading-loose text-white/35 mb-6 max-w-xs">
              {siteData.description}
            </p>
            {/* Awards */}
            <div className="flex flex-col gap-1.5">
              {siteData.awards.map((award) => (
                <span key={award} className="text-[0.6rem] tracking-[0.2em] text-[var(--gold)]/60 uppercase">
                  ✦ {award}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-6">Navigate</h4>
            <ul className="space-y-3.5">
              {[
                { label: "Our Menu", href: "/menu" },
                { label: "Experiences", href: "/offers" },
                { label: "Membership", href: "/membership" },
                { label: "Our Story", href: "/about" },
                { label: "Guest Reviews", href: "/reviews" },
                { label: "Locations", href: "/locations" },
                { label: "Reservations", href: "/reservations" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.7rem] tracking-widest uppercase hover:text-[var(--gold)] transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-6">Hours</h4>
            <div className="space-y-4 text-[0.72rem] leading-relaxed">
              <div>
                <p className="text-[var(--gold)]/70 tracking-widest uppercase text-[0.6rem] mb-1">Dinner</p>
                <p>{siteData.hours.dinner}</p>
              </div>
              <div>
                <p className="text-[var(--gold)]/70 tracking-widest uppercase text-[0.6rem] mb-1">Lunch</p>
                <p>{siteData.hours.lunch}</p>
              </div>
              <div>
                <p className="text-[var(--gold)]/70 tracking-widest uppercase text-[0.6rem] mb-1">Closed</p>
                <p>{siteData.hours.closed}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[0.6rem] tracking-[0.4em] uppercase text-white/30 mb-6">Contact</h4>
            <div className="space-y-4 text-[0.72rem]">
              <div className="flex items-start gap-3">
                <MapPin className="w-3.5 h-3.5 text-[var(--gold)]/60 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{siteData.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-3.5 h-3.5 text-[var(--gold)]/60 flex-shrink-0" />
                <a href={`tel:${siteData.contact.phone}`} className="hover:text-[var(--gold)] transition-colors">
                  {siteData.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-3.5 h-3.5 text-[var(--gold)]/60 flex-shrink-0" />
                <a href={`mailto:${siteData.contact.email}`} className="hover:text-[var(--gold)] transition-colors">
                  {siteData.contact.email}
                </a>
              </div>
            </div>
            {/* Social */}
            <div className="flex gap-3 mt-7">
              {[
                { Icon: Instagram, href: siteData.social.instagram, label: "Instagram" },
                { Icon: Facebook, href: siteData.social.facebook, label: "Facebook" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 hover:border-[var(--gold)] flex items-center justify-center transition-colors duration-300 group"
                >
                  <Icon className="w-3.5 h-3.5 text-white/30 group-hover:text-[var(--gold)] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.6rem] tracking-[0.2em] text-white/20 uppercase">
            © {year} Shubha IT Solution. All rights reserved.
          </p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms", "Allergens"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[0.6rem] tracking-widest uppercase text-white/20 hover:text-white/50 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";
import siteData from "@/data/site.json";

const navLinks = [
  { label: "Menu",        href: "/menu" },
  { label: "Experiences", href: "/offers" },
  { label: "Membership",  href: "/membership" },
  { label: "Our Story",   href: "/about" },
  { label: "Guests",      href: "/reviews" },
  { label: "Locations",   href: "/locations" },
];

export function Header() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname                = usePathname();
  const { count, openCart }     = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[var(--obsidian)]/97 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/20"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group flex-shrink-0">
            <span
              className="text-[var(--gold)] tracking-[0.15em] text-xl font-light transition-opacity group-hover:opacity-80"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Maison Dorée
            </span>
            <span className="text-white/30 text-[0.5rem] tracking-[0.5em] uppercase font-body mt-0.5">
              Fine Dining
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[0.65rem] tracking-[0.25em] uppercase font-body transition-colors duration-300 group",
                  pathname === link.href
                    ? "text-[var(--gold)]"
                    : "text-orange-500 hover:text-[var(--gold)] scale-105 hover:scale-110"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-[var(--gold)] transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${siteData.contact.phone}`}
              className="text-orange-500 hover:text-[var(--gold)] transition-colors text-[0.6rem] tracking-widest uppercase flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" />
              {siteData.contact.phone}
            </a>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-9 h-9 border border-white/10 hover:border-[var(--gold)]/60 text-orange-500 hover:text-[var(--gold)] transition-all duration-300"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[var(--gold)] text-[var(--obsidian)] text-[0.6rem] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                  {count}
                </span>
              )}
            </button>

            <Link
              href="/reservations"
              className="border border-[var(--gold)] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)] transition-all duration-300 text-[0.6rem] tracking-[0.3em] uppercase px-6 py-2.5 font-body"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile right: cart + toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-9 h-9 border border-white/10 text-white/50 hover:text-[var(--gold)] transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-[var(--gold)] text-[var(--obsidian)] text-[0.6rem] font-bold rounded-full flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={cn(
          "lg:hidden bg-[var(--obsidian)]/98 border-t border-white/5 overflow-hidden transition-all duration-300",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 py-5 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "py-3 text-[0.7rem] tracking-[0.3em] uppercase border-b border-white/5 transition-colors",
                pathname === link.href ? "text-[var(--gold)]" : "text-white/50 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/reservations"
            onClick={() => setOpen(false)}
            className="mt-3 text-center border border-[var(--gold)] text-[var(--gold)] text-[0.65rem] tracking-[0.3em] uppercase py-3"
          >
            Reserve a Table
          </Link>
        </nav>
      </div>
    </header>
  );
}

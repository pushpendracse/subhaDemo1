# 🥂 Maison Dorée — Fine Dining Next.js Website

A luxury 5-star restaurant website built with Next.js 15, React 19, and Tailwind CSS.

## Design Philosophy

- **Palette:** Warm ivory/cream backgrounds with gold accents and obsidian dark sections
- **Typography:** Cormorant Garamond (display) + Montserrat (body) — no generic fonts
- **Theme:** Editorial luxury — think Michelin Guide meets *Vogue* — minimal, refined, timeless

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Structure

```
src/
├── app/                        # Next.js 15 App Router
│   ├── layout.tsx              # Root layout with Header + Footer
│   ├── page.tsx                # Homepage
│   ├── menu/page.tsx           # /menu
│   ├── offers/page.tsx         # /offers  (Private Experiences)
│   ├── membership/page.tsx     # /membership  (Les Amis de la Maison)
│   ├── about/page.tsx          # /about
│   ├── reviews/page.tsx        # /reviews
│   ├── locations/page.tsx      # /locations
│   ├── sitemap.ts              # Auto-generated /sitemap.xml
│   └── robots.ts               # /robots.txt
│
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Sticky dark navbar with gold accents
│   │   └── footer.tsx          # Multi-column footer
│   ├── sections/
│   │   ├── hero-section.tsx    # Full-bleed cinematic hero
│   │   ├── menu-section.tsx    # Tab-based menu with tasting/à la carte views
│   │   ├── experiences-section.tsx  # Private dining experiences
│   │   ├── membership-section.tsx   # Les Amis loyalty programme
│   │   ├── about-section.tsx   # Story, chef, values, team
│   │   ├── reviews-section.tsx # Press quotes + guest testimonials
│   │   └── locations-section.tsx    # NYC, London, Paris
│   └── ui/
│       ├── button.tsx          # Gold / outline / dark variants
│       └── badge.tsx           # Gold / dark / olive variants
│
├── data/                       # ✅ All content as JSON — edit freely
│   ├── site.json               # Brand name, contact, hours, awards, SEO
│   ├── menu.json               # Categories + dishes with allergens
│   ├── offers.json             # Private dining experiences
│   ├── membership.json         # Tier structure and perks
│   ├── reviews.json            # Press quotes + guest reviews
│   ├── about.json              # Story, chef bio, values, team
│   └── locations.json          # Restaurant locations with hours
│
├── lib/utils.ts                # cn() helper
└── types/index.ts              # TypeScript interfaces
```

---

## ✏️ How to Update Content

All content lives in `src/data/*.json` — **no code changes needed.**

| File | What to edit |
|------|-------------|
| `site.json` | Restaurant name, tagline, hours, contact, awards, SEO |
| `menu.json` | Add/edit dishes, prices, allergens, categories |
| `offers.json` | Private dining experiences and pricing |
| `membership.json` | Loyalty tiers, perks, pricing |
| `reviews.json` | Press quotes, guest testimonials |
| `about.json` | Story, chef bio, philosophy, team |
| `locations.json` | Restaurants, hours, features |

---

## 🎨 Theme Customisation

Edit CSS variables in `src/app/globals.css`:

```css
:root {
  --gold:       #c9a84c;   /* Primary accent */
  --obsidian:   #0f0e0c;   /* Dark backgrounds */
  --warm-white: #faf8f3;   /* Page background */
  --ivory:      #f2ede3;   /* Section backgrounds */
  --parchment:  #e8dfc8;   /* Borders / dividers */
}
```

---

## 🔍 SEO

- Per-page `Metadata` (title, description, OG, Twitter)
- Auto `/sitemap.xml` via `src/app/sitemap.ts`
- `robots.txt` via `src/app/robots.ts`
- `next/image` for all images (lazy, optimised, WebP)
- Semantic HTML throughout

---

## 🔌 Backend-Ready

When adding a backend:

- **Reservations:** Replace `/reservations` href with booking modal + API
- **Menu:** Replace `menuData` import with `fetch()` from CMS/API
- **Reviews:** Connect to Google Places, Yelp or custom review API
- **Membership:** Add NextAuth + Stripe for payments

---

## 🚢 Deploy to Vercel

```bash
npx vercel
```

Or push to GitHub and connect at [vercel.com](https://vercel.com) — zero config.

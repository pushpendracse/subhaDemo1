import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ClientShell } from "@/components/layout/client-shell";
import siteData from "@/data/site.json";

export const metadata: Metadata = {
  metadataBase: new URL("https://maisondoree.com"),
  title: { default: siteData.metaDefaults.title, template: `%s — Maison Dorée` },
  description: siteData.metaDefaults.description,
  keywords: siteData.metaDefaults.keywords,
  openGraph: {
    title: siteData.metaDefaults.title,
    description: siteData.metaDefaults.description,
    siteName: siteData.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: siteData.metaDefaults.title, description: siteData.metaDefaults.description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-[var(--warm-white)]">
        <ClientShell>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientShell>
      </body>
    </html>
  );
}

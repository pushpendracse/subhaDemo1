import { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://maisondoree.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                      changeFrequency: "weekly",  priority: 1.0, lastModified: new Date() },
    { url: `${base}/menu`,            changeFrequency: "weekly",  priority: 0.9, lastModified: new Date() },
    { url: `${base}/offers`,          changeFrequency: "monthly", priority: 0.8, lastModified: new Date() },
    { url: `${base}/membership`,      changeFrequency: "monthly", priority: 0.8, lastModified: new Date() },
    { url: `${base}/about`,           changeFrequency: "monthly", priority: 0.7, lastModified: new Date() },
    { url: `${base}/reviews`,         changeFrequency: "weekly",  priority: 0.7, lastModified: new Date() },
    { url: `${base}/locations`,       changeFrequency: "monthly", priority: 0.8, lastModified: new Date() },
  ];
}
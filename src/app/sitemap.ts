import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await getSiteSettings();
  const base = site.url.replace(/\/$/, "");

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/menu`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/order`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];
}

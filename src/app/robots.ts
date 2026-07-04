import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/cms";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await getSiteSettings();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}

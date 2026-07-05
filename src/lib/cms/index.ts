import siteData from "../../../content/site.json";
import galleryData from "../../../content/gallery.json";
import { prisma } from "../prisma";
import type {
  GalleryData,
  MenuCategory,
  MenuData,
  MenuItem,
  SiteSettings,
} from "./types";

/**
 * CMS layer — file-based by default.
 * Set CMS_PROVIDER=sanity in .env to swap providers (see sanity.ts).
 */
const provider = process.env.CMS_PROVIDER ?? "file";

export async function getSiteSettings(): Promise<SiteSettings> {
  let site: SiteSettings;
  if (provider === "sanity") {
    const { getSiteSettingsFromSanity } = await import("./sanity");
    site = await getSiteSettingsFromSanity();
  } else {
    site = siteData as SiteSettings;
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    site = { ...site, url: process.env.NEXT_PUBLIC_SITE_URL };
  }
  return site;
}

export async function getMenu(): Promise<MenuData> {
  if (provider === "sanity") {
    const { getMenuFromSanity } = await import("./sanity");
    return getMenuFromSanity();
  }
  
  const categories = await prisma.menuCategory.findMany({
    include: { items: true },
    orderBy: { id: 'asc' }
  });

  return { categories: categories as any[] };
}

export async function getGallery(): Promise<GalleryData> {
  if (provider === "sanity") {
    const { getGalleryFromSanity } = await import("./sanity");
    return getGalleryFromSanity();
  }
  return galleryData as GalleryData;
}

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const menu = await getMenu();
  return menu.categories;
}

export async function getOrderableItems(): Promise<MenuItem[]> {
  const menu = await getMenu();
  return menu.categories.flatMap((cat) =>
    cat.items.filter((item) => item.orderable !== false)
  );
}

export async function getMenuItemById(id: string): Promise<MenuItem | undefined> {
  const items = await getOrderableItems();
  return items.find((item) => item.id === id);
}

/** Sync helpers for client components that receive data as props */
export function getSiteSettingsSync(): SiteSettings {
  return siteData as SiteSettings;
}

export function getMenuSync(): MenuData {
  return { categories: [] };
}

export function getGallerySync(): GalleryData {
  return galleryData as GalleryData;
}

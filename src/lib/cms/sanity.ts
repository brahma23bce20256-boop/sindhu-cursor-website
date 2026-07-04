import type { GalleryData, MenuData, SiteSettings } from "./types";
import { getGallerySync, getMenuSync, getSiteSettingsSync } from "./index";

/**
 * Sanity CMS adapter stub.
 * To connect Sanity:
 * 1. npm install next-sanity @sanity/client
 * 2. Set SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN in .env
 * 3. Set CMS_PROVIDER=sanity
 * 4. Implement fetch queries below using your Sanity schema
 */
export async function getSiteSettingsFromSanity(): Promise<SiteSettings> {
  // Fallback to file CMS until Sanity is configured
  return getSiteSettingsSync();
}

export async function getMenuFromSanity(): Promise<MenuData> {
  return getMenuSync();
}

export async function getGalleryFromSanity(): Promise<GalleryData> {
  return getGallerySync();
}

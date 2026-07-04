import { getGallery, getMenu, getSiteSettings } from "@/lib/cms";
import HomePageClient from "@/components/HomePageClient";

export default async function Home() {
  const [site, menu, gallery] = await Promise.all([
    getSiteSettings(),
    getMenu(),
    getGallery(),
  ]);

  return (
    <HomePageClient
      site={site}
      menuCategories={menu.categories.slice(0, 3)}
      galleryImages={gallery.images}
    />
  );
}

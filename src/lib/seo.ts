import type { Metadata } from "next";
import type { SiteSettings } from "./cms/types";

export function buildMetadata(
  site: SiteSettings,
  overrides?: Partial<Metadata>
): Metadata {
  const title = overrides?.title ?? `${site.name} | Fine Dining Restaurant`;
  const description =
    (typeof overrides?.description === "string"
      ? overrides.description
      : undefined) ?? site.description;

  return {
    title,
    description,
    keywords: [
      "restaurant",
      "fine dining",
      "Indian cuisine",
      site.name,
      "reservations",
      "online ordering",
    ],
    metadataBase: new URL(site.url),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: site.url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
          width: 1200,
          height: 630,
          alt: `${site.name} Restaurant`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: site.url,
    },
    ...overrides,
  };
}

export function buildRestaurantJsonLd(site: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.contact.address,
    },
    servesCuisine: "Indian",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday"],
        opens: "17:00",
        closes: "22:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Friday", "Saturday", "Sunday"],
        opens: "17:00",
        closes: "23:00",
      },
    ],
    sameAs: [
      site.social.instagram,
      site.social.facebook,
      site.social.twitter,
    ],
  };
}

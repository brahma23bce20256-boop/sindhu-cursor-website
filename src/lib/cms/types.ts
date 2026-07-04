export type MenuTag = "vegetarian" | "spicy" | "bestseller";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: MenuTag[];
  orderable?: boolean;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  span: string;
}

export interface GalleryData {
  images: GalleryImage[];
}

export interface SiteSettings {
  name: string;
  tagline: string;
  description: string;
  url: string;
  contact: {
    address: string;
    phone: string;
    phoneHref: string;
    email: string;
    reservationEmail: string;
    orderEmail: string;
  };
  hours: {
    weekday: { days: string; time: string };
    weekend: { days: string; time: string };
    closed: string;
    reservation: string;
  };
  social: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  maps: {
    embedUrl: string;
    directionsUrl: string;
  };
  stats: {
    years: string;
    dishes: string;
    rating: string;
    awards: string;
  };
}

export interface ReservationPayload {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  message?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderPayload {
  name: string;
  email: string;
  phone: string;
  type: "pickup" | "delivery";
  address?: string;
  notes?: string;
  items: OrderItem[];
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(price % 1 === 0 ? 0 : 2)}`;
}

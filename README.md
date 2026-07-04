# Sindhu Restaurant Website

A premium, mobile-first restaurant website for **Sindhu** — featuring smooth scroll animations, parallax effects, online ordering, reservations, and a CMS-ready content layer.

## Features

- **Mobile-first design** — touch-friendly navigation, cart drawer, stacked layouts
- **Dedicated menu page** (`/menu`) — sticky category tabs, full menu with tags
- **Gallery lightbox** — tap/swipe on mobile, keyboard nav on desktop
- **Working reservations** — API-backed form with local storage + optional email
- **Online ordering** (`/order`) — cart with pickup/delivery checkout
- **Google Maps embed** — location section with directions link
- **SEO & performance** — metadata, Open Graph, JSON-LD, sitemap, `next/image`
- **CMS integration** — edit content in `content/` JSON files (Sanity-ready)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, about, menu preview, gallery, map, reservations |
| `/menu` | Full menu with category navigation |
| `/order` | Online ordering with cart |

## Content Management (CMS)

All content lives in the `content/` folder:

| File | Contents |
|------|----------|
| `content/site.json` | Restaurant info, contact, hours, maps, social links |
| `content/menu.json` | Menu categories, items, prices, tags, orderable flag |
| `content/gallery.json` | Gallery images and captions |

Edit these files to update the site — no code changes needed.

### Connecting Sanity

1. Set `CMS_PROVIDER=sanity` in `.env.local`
2. Add Sanity credentials (see `.env.example`)
3. Implement queries in `src/lib/cms/sanity.ts`

## Reservations & Orders

Forms submit to API routes that save to `.data/` locally:

- `POST /api/reservations`
- `POST /api/orders`

To receive email notifications, add a [Resend](https://resend.com) API key:

```env
RESEND_API_KEY=re_xxxxxxxx
NOTIFICATION_EMAIL=owner@sindhu.com
EMAIL_FROM=Sindhu <onboarding@resend.dev>
```

## Tech Stack

- Next.js 15 · React 19 · TypeScript
- Tailwind CSS · Framer Motion · Lenis
- File-based CMS (Sanity adapter stub included)

## Build for Production

```bash
npm run build
npm start
```

## Customization

- **Photos** — update URLs in `content/` files or replace Unsplash links
- **Map** — set `maps.embedUrl` and `maps.directionsUrl` in `content/site.json`
- **Brand colors** — `tailwind.config.ts` → `sindhu` palette
- **SEO** — update `content/site.json` `url` and `description`

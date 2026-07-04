"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const menuCategories = [
  {
    title: "Starters",
    subtitle: "Awaken Your Palate",
    items: [
      { name: "Tandoori Prawns", description: "Charred tiger prawns with mint chutney", price: "$18" },
      { name: "Paneer Tikka", description: "Smoky cottage cheese with bell peppers", price: "$14" },
      { name: "Samosa Chaat", description: "Crispy pastry with tamarind & yogurt", price: "$12" },
    ],
  },
  {
    title: "Mains",
    subtitle: "The Heart of Sindhu",
    items: [
      { name: "Butter Chicken", description: "Creamy tomato curry, aged basmati rice", price: "$26" },
      { name: "Lamb Rogan Josh", description: "Kashmiri spices, slow-braised lamb", price: "$32" },
      { name: "Palak Paneer", description: "Spinach gravy with house-made paneer", price: "$22" },
      { name: "Biryani Royale", description: "Saffron-infused rice with tender lamb", price: "$28" },
    ],
  },
  {
    title: "Desserts",
    subtitle: "Sweet Endings",
    items: [
      { name: "Gulab Jamun", description: "Warm milk dumplings in rose syrup", price: "$10" },
      { name: "Kulfi Falooda", description: "Traditional ice cream with vermicelli", price: "$12" },
      { name: "Rasmalai", description: "Soft cheese patties in cardamom milk", price: "$11" },
    ],
  },
];

export default function Menu() {
  return (
    <section id="menu" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sindhu-smoke/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-gold">CULINARY COLLECTION</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
              Our <span className="gold-gradient-text">Menu</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light text-sindhu-cream/50">
              Each dish is crafted with premium ingredients sourced from local farms
              and authentic spices from the subcontinent
            </p>
          </Reveal>
        </div>

        <div className="grid gap-16 md:gap-24">
          {menuCategories.map((category, catIndex) => (
            <div key={category.title}>
              <Reveal delay={catIndex * 0.1}>
                <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-6">
                  <div>
                    <h3 className="font-display text-3xl font-light text-sindhu-cream md:text-4xl">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs tracking-widest text-sindhu-gold/60">{category.subtitle}</p>
                  </div>
                  <span className="font-display text-5xl font-light text-white/5">
                    0{catIndex + 1}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-1">
                {category.items.map((item, itemIndex) => (
                  <Reveal key={item.name} delay={itemIndex * 0.05}>
                    <motion.div
                      whileHover={{ x: 8 }}
                      transition={{ duration: 0.3 }}
                      className="group flex items-center justify-between border-b border-white/5 py-6 transition-colors hover:border-sindhu-gold/20"
                    >
                      <div className="flex-1">
                        <h4 className="font-display text-xl font-light text-sindhu-cream transition-colors group-hover:text-sindhu-gold md:text-2xl">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-sm font-light text-sindhu-cream/40">{item.description}</p>
                      </div>
                      <div className="ml-8 flex items-center gap-4">
                        <div className="hidden h-px w-12 bg-sindhu-gold/20 transition-all group-hover:w-20 group-hover:bg-sindhu-gold/40 sm:block" />
                        <span className="font-display text-lg text-sindhu-gold">{item.price}</span>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-20 text-center">
            <a
              href="#reserve"
              className="inline-block border border-sindhu-gold/30 px-10 py-4 text-xs tracking-widest text-sindhu-gold transition-all hover:bg-sindhu-gold hover:text-sindhu-charcoal"
            >
              VIEW FULL MENU
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

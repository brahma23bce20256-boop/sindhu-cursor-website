"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { MenuCategory, MenuTag, SiteSettings } from "@/lib/cms/types";
import { formatPrice } from "@/lib/cms/types";

const tagLabels: Record<MenuTag, string> = {
  vegetarian: "🌿 Veg",
  spicy: "🌶 Spicy",
  bestseller: "⭐ Bestseller",
};

interface OrderPageClientProps {
  categories: MenuCategory[];
  site: SiteSettings;
}

export default function OrderPageClient({ categories, site }: OrderPageClientProps) {
  const { lines, itemCount, total, addItem, updateQuantity, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "all");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "delivery" as "pickup" | "delivery",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveCategory(visible.target.id.replace("order-", ""));
        }
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0, 0.2] }
    );

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const inputClass =
    "w-full min-h-[48px] border-b border-white/10 bg-transparent py-3 text-base text-sindhu-text outline-none focus:border-sindhu-gold md:text-sm";

  const deliveryPresets = site.serviceAreas ?? [
    "VIT-AP University Campus",
    "Mandadam",
    "Amaravati",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lines.length) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: lines.map((l) => ({
            id: l.item.id,
            name: l.item.name,
            price: l.item.price,
            quantity: l.quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order failed");

      setSuccess(data.message);
      clearCart();
      setCartOpen(false);
      setForm({ name: "", email: "", phone: "", type: "delivery", address: "", notes: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky category nav */}
      <div
        className="sticky z-30 border-b border-sindhu-border bg-white/95 backdrop-blur-xl"
        style={{ top: "calc(4rem + env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-3 scrollbar-none sm:px-6 md:px-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[11px] font-medium tracking-wide sm:text-xs ${
                activeCategory === cat.id
                  ? "bg-sindhu-terracotta text-sindhu-charcoal"
                  : "bg-sindhu-bg-alt text-sindhu-text-light active:text-sindhu-terracotta"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="section-padding !pb-28 !pt-6 md:!pb-16">
        <div className="mx-auto max-w-7xl">
          {success && (
            <div className="mb-6 rounded-lg border border-sindhu-leaf/40 bg-sindhu-leaf/10 p-4 text-sm text-sindhu-text">
              ✅ {success}
            </div>
          )}

          {categories.map((category, catIndex) => (
            <section
              key={category.id}
              id={`order-${category.id}`}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              className="scroll-mt-32 mb-14 md:mb-16"
            >
              <div className="mb-6 flex items-end justify-between border-b border-sindhu-gold/15 pb-4">
                <div>
                  <p className="text-[10px] tracking-widest text-sindhu-terracotta">
                    {String(catIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-2xl font-light text-sindhu-text md:text-3xl">
                    {category.title}
                  </h2>
                  <p className="mt-1 text-xs text-sindhu-text-light/70">{category.subtitle}</p>
                </div>
                {category.id === "biryanis" && (
                  <span className="hidden rounded-full bg-sindhu-maroon/40 px-3 py-1 text-[10px] tracking-widest text-sindhu-terracotta md:inline">
                    OUR ORIGIN
                  </span>
                )}
              </div>

              {/* Mobile: compact list */}
              <div className="space-y-2 md:hidden">
                {category.items
                  .filter((item) => item.orderable !== false)
                  .map((item) => {
                    const inCart = lines.find((l) => l.item.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border border-white/5 bg-sindhu-bg-alt/50 p-3"
                      >
                        {item.image && (
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-medium text-sindhu-text">{item.name}</h3>
                            <span className="shrink-0 text-sm font-semibold text-sindhu-terracotta">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-[11px] text-sindhu-text-light/70">
                            {item.description}
                          </p>
                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {item.tags.map((tag) => (
                                <span key={tag} className="text-[9px] text-sindhu-terracotta/70">
                                  {tagLabels[tag]}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {inCart ? (
                          <div className="flex shrink-0 flex-col items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                              className="touch-target flex h-8 w-8 items-center justify-center bg-sindhu-terracotta text-sindhu-charcoal"
                            >
                              <Plus size={14} />
                            </button>
                            <span className="text-xs font-medium">{inCart.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                              className="touch-target flex h-8 w-8 items-center justify-center border border-white/10"
                            >
                              <Minus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => addItem(item)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center bg-sindhu-terracotta/15 text-sindhu-terracotta active:bg-sindhu-terracotta active:text-sindhu-charcoal"
                            aria-label={`Add ${item.name}`}
                          >
                            <Plus size={18} />
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>

              {/* Desktop: card grid */}
              <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
                {category.items
                  .filter((item) => item.orderable !== false)
                  .map((item) => {
                    const inCart = lines.find((l) => l.item.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="glass-card flex flex-col overflow-hidden border-sindhu-border"
                      >
                        {item.image && (
                          <div className="relative aspect-[16/10] w-full">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="33vw" />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-lg text-sindhu-text">{item.name}</h3>
                            <span className="shrink-0 font-semibold text-sindhu-terracotta">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="mt-1 flex-1 text-xs leading-relaxed text-sindhu-text-light/70">
                            {item.description}
                          </p>
                          {item.tags && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span key={tag} className="text-[10px] text-sindhu-terracotta/70">
                                  {tagLabels[tag]}
                                </span>
                              ))}
                            </div>
                          )}
                          {inCart ? (
                            <div className="mt-4 flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, inCart.quantity - 1)}
                                className="touch-target flex items-center justify-center border border-white/10 px-3 py-2"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-[24px] text-center">{inCart.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, inCart.quantity + 1)}
                                className="touch-target flex items-center justify-center border border-white/10 px-3 py-2"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addItem(item)}
                              className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 bg-sindhu-terracotta/15 text-xs font-medium tracking-widest text-sindhu-terracotta hover:bg-sindhu-terracotta hover:text-sindhu-charcoal"
                            >
                              <Plus size={14} />
                              ADD
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Mobile cart bar */}
      {itemCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-sindhu-gold/20 bg-white/98 p-3 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <button
            onClick={() => setCartOpen(true)}
            className="flex w-full min-h-[52px] items-center justify-between rounded-lg bg-sindhu-terracotta px-5 py-3 text-sindhu-charcoal"
          >
            <span className="flex items-center gap-2 text-xs font-semibold tracking-wide">
              <ShoppingBag size={18} />
              CART · {itemCount} items
            </span>
            <span className="text-lg font-bold">{formatPrice(total)}</span>
          </button>
        </div>
      )}

      {/* Desktop cart button */}
      {itemCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 z-40 hidden min-h-[56px] items-center gap-3 rounded-lg bg-sindhu-terracotta px-6 py-3 font-semibold text-sindhu-charcoal shadow-lg md:flex"
        >
          <ShoppingBag size={18} />
          {itemCount} items · {formatPrice(total)}
        </button>
      )}

      {/* Cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[92dvh] flex-col bg-sindhu-bg-alt md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-full md:max-w-md"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between border-b border-sindhu-border px-4 py-4">
                <h2 className="font-display text-xl text-sindhu-text">Your Order</h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="touch-target flex items-center justify-center text-sindhu-text"
                  aria-label="Close cart"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {lines.length === 0 ? (
                  <p className="py-8 text-center text-sm text-sindhu-text-light/70">
                    Add biryanis from the menu above 👆
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {lines.map(({ item, quantity }) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between border-b border-white/5 pb-3"
                      >
                        <div>
                          <p className="text-sm text-sindhu-text">{item.name}</p>
                          <p className="text-xs text-sindhu-terracotta">
                            {formatPrice(item.price)} × {quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="touch-target flex h-8 w-8 items-center justify-center border border-white/10"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-5 text-center text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="touch-target flex h-8 w-8 items-center justify-center border border-white/10"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {lines.length > 0 && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t border-sindhu-border pt-6">
                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-text-light/70">NAME</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-text-light/70">PHONE</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        placeholder="+91 XXXXX XXXXX"
                        autoComplete="tel"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-text-light/70">
                        EMAIL (OPTIONAL)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {(["delivery", "pickup"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, type: t })}
                          className={`min-h-[44px] rounded-lg text-[10px] font-medium tracking-widest ${
                            form.type === t
                              ? "bg-sindhu-terracotta text-sindhu-charcoal"
                              : "border border-white/10 text-sindhu-text-light"
                          }`}
                        >
                          {t === "delivery" ? "DELIVERY" : "PICKUP"}
                        </button>
                      ))}
                    </div>

                    {form.type === "delivery" && (
                      <>
                        <div>
                          <label className="mb-2 block text-[10px] tracking-widest text-sindhu-text-light/70">
                            QUICK AREA
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {deliveryPresets.map((area) => (
                              <button
                                key={area}
                                type="button"
                                onClick={() =>
                                  setForm((f) => ({
                                    ...f,
                                    address: f.address ? f.address : area + " — ",
                                  }))
                                }
                                className="rounded-full border border-sindhu-gold/25 px-3 py-1.5 text-[10px] text-sindhu-terracotta active:bg-sindhu-terracotta/20"
                              >
                                <MapPin size={10} className="mr-1 inline" />
                                {area}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-[10px] tracking-widest text-sindhu-text-light/70">
                            FULL ADDRESS / HOSTEL / FLAT
                          </label>
                          <textarea
                            required
                            value={form.address}
                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                            rows={2}
                            className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-base text-sindhu-text outline-none focus:border-sindhu-gold md:text-sm"
                            placeholder="e.g. VIT-AP Boys Hostel, Block B, Room 214"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-text-light/70">
                        NOTES (spice level, extra raita…)
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        rows={2}
                        className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-base text-sindhu-text outline-none focus:border-sindhu-gold md:text-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-white/80 px-4 py-3">
                      <span className="text-xs tracking-widest text-sindhu-text-light">TOTAL</span>
                      <span className="text-2xl font-bold text-sindhu-terracotta">{formatPrice(total)}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full min-h-[52px] rounded-lg bg-sindhu-terracotta py-4 text-sm font-bold tracking-wide text-sindhu-charcoal disabled:opacity-50"
                    >
                      {submitting ? "PLACING ORDER..." : "PLACE ORDER 🍛"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { MenuCategory } from "@/lib/cms/types";
import { formatPrice } from "@/lib/cms/types";

interface OrderPageClientProps {
  categories: MenuCategory[];
}

export default function OrderPageClient({ categories }: OrderPageClientProps) {
  const { lines, itemCount, total, addItem, updateQuantity, clearCart } =
    useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "pickup" as "pickup" | "delivery",
    address: "",
    notes: "",
  });

  const filteredCategories =
    activeCategory === "all"
      ? categories
      : categories.filter((c) => c.id === activeCategory);

  const inputClass =
    "w-full min-h-[48px] border-b border-white/10 bg-transparent py-3 text-base text-sindhu-cream outline-none focus:border-sindhu-gold md:text-sm";

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
      setForm({ name: "", email: "", phone: "", type: "pickup", address: "", notes: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Category filter — mobile horizontal scroll */}
      <div
        className="sticky z-30 border-b border-white/5 bg-sindhu-charcoal/95 backdrop-blur-xl"
        style={{ top: "calc(4rem + env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 sm:px-6 md:px-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`shrink-0 px-4 py-2.5 text-[10px] tracking-widest sm:text-xs ${
              activeCategory === "all"
                ? "bg-sindhu-gold text-sindhu-charcoal"
                : "text-sindhu-cream/60"
            }`}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-4 py-2.5 text-[10px] tracking-widest sm:text-xs ${
                activeCategory === cat.id
                  ? "bg-sindhu-gold text-sindhu-charcoal"
                  : "text-sindhu-cream/60"
              }`}
            >
              {cat.title.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="section-padding !pb-28 !pt-8 md:!pb-16">
        <div className="mx-auto max-w-7xl">
          {success && (
            <div className="mb-6 border border-sindhu-gold/30 bg-sindhu-gold/10 p-4 text-sm text-sindhu-cream">
              {success}
            </div>
          )}

          {filteredCategories.map((category) => (
            <section key={category.id} className="mb-12">
              <h2 className="mb-6 font-display text-2xl font-light text-sindhu-cream md:text-3xl">
                {category.title}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {category.items
                  .filter((item) => item.orderable !== false)
                  .map((item) => {
                    const inCart = lines.find((l) => l.item.id === item.id);
                    return (
                      <div
                        key={item.id}
                        className="glass-card flex flex-col overflow-hidden"
                      >
                        {item.image && (
                          <div className="relative aspect-[4/3] w-full">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          </div>
                        )}
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-display text-lg font-light text-sindhu-cream">
                              {item.name}
                            </h3>
                            <span className="shrink-0 font-display text-sindhu-gold">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="mt-1 flex-1 text-xs leading-relaxed text-sindhu-cream/40">
                            {item.description}
                          </p>
                          {inCart ? (
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, inCart.quantity - 1)
                                  }
                                  className="touch-target flex items-center justify-center border border-white/10 text-sindhu-cream"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="min-w-[24px] text-center text-sm">
                                  {inCart.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, inCart.quantity + 1)
                                  }
                                  className="touch-target flex items-center justify-center border border-white/10 text-sindhu-cream"
                                  aria-label="Increase quantity"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button
                              onClick={() => addItem(item)}
                              className="mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 bg-sindhu-gold/10 text-xs tracking-widest text-sindhu-gold active:bg-sindhu-gold active:text-sindhu-charcoal md:hover:bg-sindhu-gold md:hover:text-sindhu-charcoal"
                            >
                              <Plus size={14} />
                              ADD TO CART
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

      {/* Mobile fixed cart bar */}
      {itemCount > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-sindhu-charcoal/95 p-4 backdrop-blur-xl md:hidden"
          style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
          <button
            onClick={() => setCartOpen(true)}
            className="flex w-full min-h-[48px] items-center justify-between bg-sindhu-gold px-5 py-3 text-sindhu-charcoal"
          >
            <span className="flex items-center gap-2 text-xs font-medium tracking-widest">
              <ShoppingBag size={16} />
              VIEW CART ({itemCount})
            </span>
            <span className="font-display text-lg">{formatPrice(total)}</span>
          </button>
        </div>
      )}

      {/* Desktop floating cart button */}
      {itemCount > 0 && (
        <button
          onClick={() => setCartOpen(true)}
          className="fixed bottom-8 right-8 z-40 hidden min-h-[56px] items-center gap-3 bg-sindhu-gold px-6 py-3 text-sindhu-charcoal shadow-lg md:flex"
        >
          <ShoppingBag size={18} />
          <span className="text-xs tracking-widest">
            CART ({itemCount}) · {formatPrice(total)}
          </span>
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
              className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[90dvh] flex-col bg-sindhu-smoke md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-full md:max-w-md"
              style={{
                paddingBottom: "env(safe-area-inset-bottom)",
              }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                <h2 className="font-display text-xl text-sindhu-cream">
                  Your Order
                </h2>
                <button
                  onClick={() => setCartOpen(false)}
                  className="touch-target flex items-center justify-center text-sindhu-cream"
                  aria-label="Close cart"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {lines.length === 0 ? (
                  <p className="py-8 text-center text-sm text-sindhu-cream/40">
                    Your cart is empty
                  </p>
                ) : (
                  <ul className="space-y-4">
                    {lines.map(({ item, quantity }) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between border-b border-white/5 pb-4"
                      >
                        <div>
                          <p className="text-sm text-sindhu-cream">{item.name}</p>
                          <p className="text-xs text-sindhu-gold">
                            {formatPrice(item.price)} × {quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="touch-target flex items-center justify-center border border-white/10"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-6 text-center text-sm">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="touch-target flex items-center justify-center border border-white/10"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {lines.length > 0 && (
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4 border-t border-white/10 pt-6">
                    {error && (
                      <p className="text-sm text-red-400">{error}</p>
                    )}
                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-cream/40">
                        FULL NAME
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-cream/40">
                        EMAIL
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        autoComplete="email"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-cream/40">
                        PHONE
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                        autoComplete="tel"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(["pickup", "delivery"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, type: t })}
                          className={`min-h-[44px] text-[10px] tracking-widest ${
                            form.type === t
                              ? "bg-sindhu-gold text-sindhu-charcoal"
                              : "border border-white/10 text-sindhu-cream/60"
                          }`}
                        >
                          {t.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    {form.type === "delivery" && (
                      <div>
                        <label className="mb-1 block text-[10px] tracking-widest text-sindhu-cream/40">
                          DELIVERY ADDRESS
                        </label>
                        <textarea
                          required
                          value={form.address}
                          onChange={(e) => setForm({ ...form, address: e.target.value })}
                          rows={2}
                          className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-base text-sindhu-cream outline-none focus:border-sindhu-gold md:text-sm"
                        />
                      </div>
                    )}
                    <div>
                      <label className="mb-1 block text-[10px] tracking-widest text-sindhu-cream/40">
                        NOTES (OPTIONAL)
                      </label>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        rows={2}
                        className="w-full resize-none border-b border-white/10 bg-transparent py-3 text-base text-sindhu-cream outline-none focus:border-sindhu-gold md:text-sm"
                        placeholder="Allergies, spice level..."
                      />
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs tracking-widest text-sindhu-cream/50">
                        TOTAL
                      </span>
                      <span className="font-display text-2xl text-sindhu-gold">
                        {formatPrice(total)}
                      </span>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full min-h-[48px] bg-sindhu-gold py-4 text-xs font-medium tracking-widest text-sindhu-charcoal disabled:opacity-50"
                    >
                      {submitting ? "PLACING ORDER..." : "PLACE ORDER"}
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

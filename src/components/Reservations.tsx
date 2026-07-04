"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { Calendar, Clock, Users, Phone, MapPin } from "lucide-react";

export default function Reservations() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your reservation request has been received. We will confirm shortly.");
  };

  const inputClassName =
    "w-full min-h-[48px] border-b border-white/10 bg-transparent py-3 text-base text-sindhu-cream outline-none transition-colors focus:border-sindhu-gold md:text-sm";

  return (
    <section id="reserve" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
          alt="Restaurant ambiance"
          className="h-full w-full object-cover opacity-10"
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 md:gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-gold">RESERVATIONS</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
                Reserve Your
                <span className="gold-gradient-text block">Table</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-sindhu-cream/50">
                Join us for an evening of exceptional dining. We recommend booking
                at least 48 hours in advance for weekend reservations.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 space-y-5 md:mt-12 md:space-y-6">
                {[
                  { icon: MapPin, text: "123 Culinary Avenue, Downtown District", href: undefined },
                  { icon: Phone, text: "+1 (555) 234-5678", href: "tel:+15552345678" },
                  { icon: Clock, text: "Tue–Sun: 5:00 PM – 11:00 PM", href: undefined },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sindhu-gold/20">
                      <Icon size={16} className="text-sindhu-gold" />
                    </div>
                    {href ? (
                      <a href={href} className="text-sm font-light text-sindhu-cream/60 active:text-sindhu-gold">
                        {text}
                      </a>
                    ) : (
                      <span className="text-sm font-light leading-snug text-sindhu-cream/60">{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <motion.form
              onSubmit={handleSubmit}
              className="glass-card p-5 sm:p-8 md:p-10"
            >
              <div className="grid gap-5 md:gap-6">
                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-sindhu-cream/40">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={inputClassName}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-sindhu-cream/40">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputClassName}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-[10px] tracking-widest text-sindhu-cream/40">
                      <Calendar size={12} /> DATE
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className={inputClassName}
                    />
                  </div>
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-[10px] tracking-widest text-sindhu-cream/40">
                      <Clock size={12} /> TIME
                    </label>
                    <select
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className={inputClassName}
                    >
                      <option value="" className="bg-sindhu-charcoal">Select time</option>
                      {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"].map((t) => (
                        <option key={t} value={t} className="bg-sindhu-charcoal">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-[10px] tracking-widest text-sindhu-cream/40">
                    <Users size={12} /> GUESTS
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className={inputClassName}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n} className="bg-sindhu-charcoal">
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[10px] tracking-widest text-sindhu-cream/40">
                    SPECIAL REQUESTS
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className="w-full min-h-[96px] resize-none border-b border-white/10 bg-transparent py-3 text-base text-sindhu-cream outline-none transition-colors focus:border-sindhu-gold md:text-sm"
                    placeholder="Allergies, celebrations, seating preferences..."
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-2 w-full min-h-[48px] bg-sindhu-gold py-4 text-xs font-medium tracking-widest text-sindhu-charcoal transition-colors active:bg-sindhu-gold-light md:mt-4 md:hover:scale-[1.02] md:hover:bg-sindhu-gold-light"
                >
                  CONFIRM RESERVATION
                </motion.button>
              </div>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

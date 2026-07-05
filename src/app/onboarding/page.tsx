"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNumber) return;

    // Validate phone number format (basic India format validation)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          phoneNumber: phoneNumber.replace(/\D/g, "") 
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // Force session update so the JWT/middleware sees the completed profile
        await update({ name: data.user.name, phoneNumber: data.user.phoneNumber });
        router.push("/");
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sindhu-bg flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sindhu-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sindhu-saffron/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-sindhu-text mb-2">Complete Profile</h1>
          <p className="text-sindhu-text-light text-sm">
            Just a few more details before you can order
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-2 uppercase pl-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border border-sindhu-border/50 rounded-2xl px-5 py-4 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all shadow-sm"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-2 uppercase pl-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full bg-white border border-sindhu-border/50 rounded-2xl px-5 py-4 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all shadow-sm"
              placeholder="9876543210"
              maxLength={10}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name || !phoneNumber}
            className="w-full bg-sindhu-terracotta text-white font-bold tracking-widest text-sm py-4 rounded-2xl shadow-lg shadow-sindhu-terracotta/20 hover:bg-[#c9633e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : "CONTINUE"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-sindhu-bg flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorations - slightly darker/different for admin */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-sindhu-text/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-sindhu-terracotta/10 rounded-full blur-3xl" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
      >
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-sindhu-terracotta/10 flex items-center justify-center text-sindhu-terracotta">
            <ShieldAlert size={24} />
          </div>
        </div>
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-sindhu-text mb-2">Admin Portal</h1>
          <p className="text-sindhu-text-light text-sm">Sign in to manage Sindhu Restaurant</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-bold px-4 py-3 rounded-xl border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-1.5 uppercase">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-sindhu-border/50 rounded-xl px-4 py-3 text-sindhu-text focus:outline-none focus:border-sindhu-text focus:ring-1 focus:ring-sindhu-text transition-all"
              placeholder="admin@sindhu.com"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-1.5 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-sindhu-border/50 rounded-xl px-4 py-3 text-sindhu-text focus:outline-none focus:border-sindhu-text focus:ring-1 focus:ring-sindhu-text transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sindhu-text text-white font-bold tracking-widest text-sm py-4 rounded-xl shadow-lg hover:bg-[#1f1e1d] transition-colors mt-8 disabled:opacity-50"
          >
            {loading ? "AUTHORIZING..." : "AUTHORIZE"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-medium text-sindhu-text-light/60">
          This is a restricted portal. <Link href="/" className="underline hover:text-sindhu-text">Return to main site</Link>
        </p>
      </motion.div>
    </div>
  );
}

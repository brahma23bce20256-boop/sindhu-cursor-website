"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className="min-h-screen bg-sindhu-bg flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sindhu-terracotta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sindhu-saffron/10 rounded-full blur-3xl" />
      
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-sindhu-text-light hover:text-sindhu-terracotta transition-colors font-bold text-sm tracking-widest">
        <ChevronLeft size={16} /> BACK TO HOME
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-sindhu-text mb-2">Welcome Back</h1>
          <p className="text-sindhu-text-light text-sm">Sign in to your Sindhu account to order</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-1.5 uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-sindhu-border/50 rounded-xl px-4 py-3 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-1.5 uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-sindhu-border/50 rounded-xl px-4 py-3 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="flex items-center justify-between mt-2 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-sindhu-border text-sindhu-terracotta focus:ring-sindhu-terracotta" />
              <span className="text-xs font-medium text-sindhu-text-light">Remember me</span>
            </label>
            <a href="#" className="text-xs font-bold text-sindhu-terracotta hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-sindhu-terracotta text-white font-bold tracking-widest text-sm py-4 rounded-xl shadow-lg hover:bg-[#c9633e] transition-colors"
          >
            SIGN IN
          </button>
        </form>

        <p className="mt-6 text-center text-sm font-medium text-sindhu-text-light">
          Don't have an account? <Link href="/register" className="font-bold text-sindhu-terracotta hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

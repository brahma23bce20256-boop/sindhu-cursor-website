"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "signup" | "login";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [mode, setMode] = useState<Mode>("signup");

  // New customer sign up (OTP) state
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Existing customer login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPhone, setLoginPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setStep(1);
    setError(null);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!email.endsWith("@vitapstudent.ac.in") && email !== "admin@sindhu.com") {
      setError("Only @vitapstudent.ac.in emails are allowed.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    document.cookie = "guest_access=true; path=/; max-age=86400"; // 24 hours
    router.push("/orders");
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email,
        otp,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid or expired OTP");
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExistingLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPhone) return;

    const phoneDigits = loginPhone.replace(/\D/g, "");
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneDigits)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await signIn("credentials", {
        email: loginEmail,
        phoneNumber: phoneDigits,
        redirect: false,
      });

      if (res?.error) {
        setError("No account found with that email and phone number.");
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("Failed to login");
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
          <h1 className="font-display text-4xl font-bold text-sindhu-text mb-2">Welcome</h1>
          <p className="text-sindhu-text-light text-sm">
            {mode === "signup"
              ? (step === 1 ? "Sign up to order your favorite biryani" : "Check your student email for the OTP")
              : "Login with your registered email and phone number"}
          </p>
        </div>

        <div className="flex bg-white border border-sindhu-border/50 rounded-2xl p-1 mb-6">
          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors ${
              mode === "signup"
                ? "bg-sindhu-terracotta text-white shadow-sm"
                : "text-sindhu-text-light hover:text-sindhu-terracotta"
            }`}
          >
            New Customer
          </button>
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors ${
              mode === "login"
                ? "bg-sindhu-terracotta text-white shadow-sm"
                : "text-sindhu-text-light hover:text-sindhu-terracotta"
            }`}
          >
            Existing Customer
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600 font-medium">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          {mode === "signup" ? (
            step === 1 ? (
              <motion.form
                key="signup-step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-5"
                onSubmit={handleSendOtp}
              >
                <div>
                  <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-2 uppercase pl-1">
                    VIT-AP Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-sindhu-border/50 rounded-2xl px-5 py-4 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all shadow-sm"
                    placeholder="name.23bce0000@vitapstudent.ac.in"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sindhu-terracotta text-white font-bold tracking-widest text-sm py-4 rounded-2xl shadow-lg shadow-sindhu-terracotta/20 hover:bg-[#c9633e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : "SEND OTP"}
                </button>

                <div className="relative flex items-center py-4">
                  <div className="flex-grow border-t border-sindhu-border/50"></div>
                  <span className="flex-shrink-0 mx-4 text-xs font-bold tracking-widest text-sindhu-text-light uppercase">OR</span>
                  <div className="flex-grow border-t border-sindhu-border/50"></div>
                </div>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full block text-center bg-white border-2 border-sindhu-border/50 text-sindhu-text-light font-bold tracking-widest text-sm py-3.5 rounded-2xl hover:border-sindhu-terracotta hover:text-sindhu-terracotta transition-colors"
                >
                  CONTINUE AS GUEST
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="signup-step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
                onSubmit={handleVerifyOtp}
              >
                <div>
                  <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-2 uppercase pl-1">
                    6-Digit OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full bg-white border border-sindhu-border/50 rounded-2xl px-5 py-4 text-center text-2xl tracking-[0.5em] text-sindhu-text font-bold focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all shadow-sm"
                    placeholder="------"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className="w-full bg-sindhu-terracotta text-white font-bold tracking-widest text-sm py-4 rounded-2xl shadow-lg shadow-sindhu-terracotta/20 hover:bg-[#c9633e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : "VERIFY & LOGIN"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs font-bold text-sindhu-text-light hover:text-sindhu-terracotta transition-colors"
                >
                  Change Email Address
                </button>
              </motion.form>
            )
          ) : (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-5"
              onSubmit={handleExistingLogin}
            >
              <div>
                <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-2 uppercase pl-1">
                  Email
                </label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-white border border-sindhu-border/50 rounded-2xl px-5 py-4 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all shadow-sm"
                  placeholder="name.23bce0000@vitapstudent.ac.in"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-sindhu-text-light mb-2 uppercase pl-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  className="w-full bg-white border border-sindhu-border/50 rounded-2xl px-5 py-4 text-sindhu-text focus:outline-none focus:border-sindhu-terracotta focus:ring-1 focus:ring-sindhu-terracotta transition-all shadow-sm"
                  placeholder="9876543210"
                  maxLength={10}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sindhu-terracotta text-white font-bold tracking-widest text-sm py-4 rounded-2xl shadow-lg shadow-sindhu-terracotta/20 hover:bg-[#c9633e] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : "LOGIN"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function UserLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sindhu-bg flex items-center justify-center"><Loader2 className="animate-spin text-sindhu-terracotta" /></div>}>
      <LoginContent />
    </Suspense>
  );
}

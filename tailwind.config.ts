import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sindhu: {
          // New soft palette
          bg: "#FDFBF7",
          "bg-alt": "#FAFAFA",
          terracotta: "#D9734E",
          saffron: "#E07A5F",
          sage: "#81B29A",
          text: "#2F2E2C",
          "text-light": "#3D405B",
          border: "#E2DCD0",
          // Old palette
          gold: "#F4A825",
          "gold-light": "#FFD56B",
          "gold-dark": "#C47F0A",
          cream: "#FFF8ED",
          charcoal: "#1A120E",
          smoke: "#2A1F18",
          ember: "#C0392B",
          spice: "#D35400",
          maroon: "#7B241C",
          rice: "#F5E6C8",
          leaf: "#2E7D4F",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
        yatra: ["var(--font-yatra)", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 1s ease-out forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(244, 168, 37, 0.4)" },
          "50%": { boxShadow: "0 0 20px 4px rgba(244, 168, 37, 0.25)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

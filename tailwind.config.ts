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
          gold: "#C9A962",
          "gold-light": "#E8D5A3",
          "gold-dark": "#8B7340",
          cream: "#F5F0E8",
          charcoal: "#1A1814",
          smoke: "#2D2A26",
          ember: "#8B3A2F",
          saffron: "#D4A04A",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 1s ease-out forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;

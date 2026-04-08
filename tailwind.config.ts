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
        gold: {
          50:  "#fdfbf3",
          100: "#faf5e4",
          200: "#f5ecc9",
          300: "#edda96",
          400: "#e3c55e",
          500: "#d4a832",
          600: "#b8891f",
          700: "#946c18",
          800: "#795719",
          900: "#65481a",
        },
        obsidian: {
          DEFAULT: "#0a0a0a",
          50:  "#f5f5f5",
          100: "#e8e8e8",
          200: "#d0d0d0",
          300: "#a8a8a8",
          400: "#737373",
          500: "#525252",
          600: "#3d3d3d",
          700: "#282828",
          800: "#1a1a1a",
          900: "#0f0f0f",
        },
        cream: "#faf8f3",
        ivory: "#f5f0e8",
      },
      fontFamily: {
        display: ["var(--font-display)", "Didot", "Bodoni MT", "serif"],
        body:    ["var(--font-body)", "Garamond", "Georgia", "serif"],
        accent:  ["var(--font-accent)", "Optima", "Candara", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.5em",
      },
      animation: {
        "fade-up":     "fadeUp 0.8s ease forwards",
        "fade-in":     "fadeIn 1s ease forwards",
        "shimmer":     "shimmer 2.5s linear infinite",
        "line-expand": "lineExpand 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        lineExpand: {
          "0%":   { width: "0" },
          "100%": { width: "3rem" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

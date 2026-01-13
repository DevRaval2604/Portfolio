import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      colors: {
        background: "#020617",
        "background-soft": "#020617",
        primary: {
          DEFAULT: "#38bdf8",
          soft: "#0ea5e9"
        },
        accent: {
          purple: "#8b5cf6",
          blue: "#22d3ee"
        },
        surface: {
          DEFAULT: "#020617",
          elevated: "#020617"
        }
      },
      boxShadow: {
        "glow-cyan": "0 0 40px rgba(56, 189, 248, 0.35)",
        "glow-purple": "0 0 40px rgba(129, 140, 248, 0.35)",
        "card": "0 18px 45px rgba(15,23,42,0.8)"
      },
      backgroundImage: {
        "gradient-hero":
          "radial-gradient(circle at top, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(129,140,248,0.15), transparent 55%)",
        "gradient-title":
          "linear-gradient(90deg, #22d3ee 0%, #8b5cf6 50%, #22d3ee 100%)"
      }
    }
  },
  plugins: []
};

export default config;


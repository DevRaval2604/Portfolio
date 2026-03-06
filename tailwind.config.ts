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
        background: "#060810",
      },
      backgroundImage: {
        "gradient-title":
          "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #34d399 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(56,189,248,0.12) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 60%, rgba(129,140,248,0.08) 0%, transparent 60%), #060810",
      },
      boxShadow: {
        card:          "0 8px 40px rgba(0,0,0,0.45)",
        "glow-cyan":   "0 0 28px rgba(56,189,248,0.40)",
        "glow-purple": "0 0 28px rgba(129,140,248,0.40)",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
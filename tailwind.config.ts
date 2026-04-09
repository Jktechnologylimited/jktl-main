import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans:    ["'Plus Jakarta Sans'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        navy: {
          950: "#020818",
          900: "#060E2A",
          800: "#0B1640",
          700: "#112055",
          600: "#1A316E",
          500: "#254387",
          400: "#3A5FA3",
          300: "#6080BC",
          200: "#96AECF",
          100: "#D0DAED",
          50:  "#EEF2F9",
        },
        cream: {
          50:  "#FDFCF8",
          100: "#F9F7F0",
          200: "#F3EFE4",
          300: "#E8E1D0",
          400: "#D6CCBA",
        },
        gold: {
          400: "#C9A84C",
          300: "#D4B96A",
          200: "#E2CF96",
          100: "#F0E5C4",
        },
      },
    },
  },
  plugins: [],
};
export default config;

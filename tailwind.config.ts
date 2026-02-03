import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // CodeMasti brand: black + amber/yellow (primary palette)
        brand: {
          black: "var(--brand-black)",
          amber: "var(--brand-amber)",
          "amber-light": "var(--brand-amber-light)",
          "amber-dark": "var(--brand-amber-dark)",
          yellow: "var(--brand-yellow)",
          "yellow-muted": "var(--brand-yellow-muted)",
        },
        primary: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        secondary: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        accent: {
          DEFAULT: "#FBBF24",
          50: "#FEFCE8",
          100: "#FEF9C3",
          200: "#FEF08A",
          300: "#FDE047",
          400: "#FCD34D",
          500: "#FBBF24",
          600: "#F59E0B",
          700: "#D97706",
          800: "#B45309",
          900: "#92400E",
        },
      },
    },
  },
  plugins: [],
};
export default config;

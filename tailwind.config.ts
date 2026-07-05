import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#ecfdf6",
          100: "#d1fae9",
          200: "#a6f4d0",
          300: "#6ee7b3",
          400: "#34d399",
          500: "#16c27d",
          600: "#0aa567",
          700: "#058254",
          800: "#066646",
          900: "#07523c",
          950: "#022e22",
        },
        secondary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bedcff",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3288ff",
          600: "#1f6ef0",
          700: "#1a57d8",
          800: "#1c49b0",
          900: "#1d418b",
          950: "#152a56",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        success: {
          50: "#ecfdf6",
          100: "#d1fae9",
          500: "#16c27d",
          700: "#058254",
        },
        warning: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          700: "#b45309",
        },
        error: {
          50: "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          700: "#b91c1c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04), 0 4px 16px -2px rgb(0 0 0 / 0.06)",
        "card-hover": "0 2px 4px 0 rgb(0 0 0 / 0.06), 0 12px 32px -4px rgb(0 0 0 / 0.12)",
        glow: "0 0 24px -4px rgb(22 194 125 / 0.4)",
        "glow-lg": "0 0 48px -8px rgb(22 194 125 / 0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
};

export default config;

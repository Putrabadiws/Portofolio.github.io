import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens dari versi statis (style.css :root)
        bg: {
          DEFAULT: "#1b1f24",
          secondary: "#22282f",
          card: "#2d343f",
        },
        accent: {
          DEFAULT: "#13bbff", // cyan utama
          alt: "#075fe4",     // biru untuk icon portfolio + scroll-top
        },
        muted: "#c3cad5",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Responsive headings — via clamp() agar mengikuti breakpoint lama
        h1: ["clamp(2.1rem, 5vw + 1rem, 4.5rem)", { lineHeight: "1.2", fontWeight: "900" }],
        h2: ["clamp(1.8rem, 2.5vw + 1rem, 2.9rem)", { lineHeight: "1.3" }],
      },
      boxShadow: {
        accent: "0 0 20px #13bbff",
        "accent-sm": "0 0 5px #13bbff",
      },
      transitionDuration: {
        "500": "500ms",
      },
    },
  },
  plugins: [],
};

export default config;

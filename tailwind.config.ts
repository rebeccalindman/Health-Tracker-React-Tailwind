import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)", 
        "primary-foreground": "var(--primary-foreground)", 
        secondary: "var(--secondary)", 
        "secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)", // ✅ Ensure Tailwind resolves this properly
        destructive: "var(--destructive)", 
        accent: "var(--accent)", 
        ring: "var(--ring)", 
        input: "var(--input)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};

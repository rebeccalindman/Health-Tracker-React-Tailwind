/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
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

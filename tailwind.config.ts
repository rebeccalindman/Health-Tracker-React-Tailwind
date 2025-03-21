import { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

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
        "secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)",
        destructive: "var(--destructive)", 
        accent: "var(--accent)", 
        ring: "var(--ring)", 
        input: "var(--input)",
      },
    },
  },
  darkMode: "class",
  plugins: [tailwindAnimate], // ✅ Ensure the plugin is registered
};

export default config;

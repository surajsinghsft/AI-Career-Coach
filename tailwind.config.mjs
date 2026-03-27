/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🌌 Background
        background: "hsl(222 47% 11%)",
        foreground: "hsl(210 40% 98%)",

        // 💎 Cards
        card: {
          DEFAULT: "hsl(222 47% 13%)",
          foreground: "hsl(210 40% 98%)",
        },

        popover: {
          DEFAULT: "hsl(222 47% 13%)",
          foreground: "hsl(210 40% 98%)",
        },

        // 🚀 Primary (Purple Neon)
        primary: {
          DEFAULT: "hsl(262 83% 58%)",
          foreground: "hsl(210 40% 98%)",
        },

        // 🌑 Secondary
        secondary: {
          DEFAULT: "hsl(217 33% 17%)",
          foreground: "hsl(210 40% 98%)",
        },

        // 🔥 Accent (Cyan Glow)
        accent: {
          DEFAULT: "hsl(190 100% 50%)",
          foreground: "hsl(222 47% 11%)",
        },

        // 🌫 Muted
        muted: {
          DEFAULT: "hsl(215 28% 17%)",
          foreground: "hsl(217 10% 64%)",
        },

        // ❌ Danger
        destructive: {
          DEFAULT: "hsl(0 72% 51%)",
          foreground: "hsl(210 40% 98%)",
        },

        // 🧱 Borders
        border: "hsl(217 33% 25%)",
        input: "hsl(217 33% 20%)",
        ring: "hsl(262 83% 58%)",

        // 📊 Charts
        chart: {
          "1": "hsl(262 83% 58%)",
          "2": "hsl(190 100% 50%)",
          "3": "hsl(142 76% 36%)",
          "4": "hsl(38 92% 50%)",
          "5": "hsl(0 72% 51%)",
        },
      },

      // 🔳 Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // 🌈 Gradient
      backgroundImage: {
        "gradient-premium":
          "linear-gradient(135deg, #6366f1, #06b6d4, #8b5cf6)",
      },

      // 🌫 Glass Effect
      backdropBlur: {
        xs: "2px",
      },

      // 💡 Shadow (Premium Glow)
      boxShadow: {
        premium:
          "0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(99,102,241,0.3)",
      },

      // 🎞 Animations
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },

        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        float: "float 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
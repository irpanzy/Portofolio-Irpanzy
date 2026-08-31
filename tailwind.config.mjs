/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: "#fcf4ff",
        darkHover: "#2a004a",
        darkTheme: "#11001f",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        ovo: ["Ovo", "serif"],
      },
      boxShadow: {
        black: "4px 4px 0px #000",
        white: "4px 4px 0px #fff",
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      keyframes: {
        "toast-in": {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, -120%, 0) scale(0.92)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0) scale(1)",
          },
        },
        "toast-out": {
          "0%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translate3d(0, -40%, 0) scale(0.94)",
          },
        },
      },
      animation: {
        "toast-in": "toast-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "toast-out": "toast-out 0.25s cubic-bezier(0.4, 0, 1, 1) forwards",
      },
    },
  },
  darkMode: "selector",
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    preflight: true,
  },
};

export default config;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
    "./helpers/**/*.{js,ts,jsx,tsx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        space: {
          950: "#030109",
          900: "#070314",
          850: "#0c0621",
          800: "#130b32",
          700: "#1d1248",
        },
        hud: {
          bg: "rgba(12, 7, 33, 0.72)",
          card: "rgba(16, 10, 42, 0.8)",
          cardHover: "rgba(25, 16, 62, 0.9)",
          border: "rgba(0, 245, 255, 0.2)",
          borderActive: "rgba(0, 245, 255, 0.6)",
          borderPink: "rgba(255, 0, 128, 0.4)",
        },
        neon: {
          cyan: "#00f5ff",
          pink: "#ff0080",
          purple: "#7928ca",
          violet: "#a855f7",
          emerald: "#10b981",
          amber: "#f59e0b",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 15px rgba(0, 245, 255, 0.35), 0 0 30px rgba(0, 245, 255, 0.15)",
        "neon-pink": "0 0 15px rgba(255, 0, 128, 0.35), 0 0 30px rgba(255, 0, 128, 0.15)",
        "neon-violet": "0 0 15px rgba(168, 85, 247, 0.35), 0 0 30px rgba(168, 85, 247, 0.15)",
        "hud-card": "0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.65, transform: "scale(0.98)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};


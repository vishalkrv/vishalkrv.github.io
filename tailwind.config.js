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
        paper: "var(--color-paper)",
        "paper-2": "var(--color-paper-2)",
        "paper-3": "var(--color-paper-3)",
        ink: "var(--color-ink)",
        "ink-2": "var(--color-ink-2)",
        muted: "var(--color-muted)",
        rule: "var(--color-rule)",
        "rule-2": "var(--color-rule-2)",
        accent: "var(--color-accent)",
        "accent-hi": "var(--color-accent-hi)",
        "accent-ink": "var(--color-accent-ink)",
        focus: "var(--color-focus)",
        space: {
          950: "var(--color-paper)",
          900: "var(--color-paper-2)",
          850: "var(--color-paper-3)",
          800: "var(--color-paper-3)",
          700: "var(--color-rule)",
        },
        hud: {
          bg: "var(--color-paper-2)",
          card: "var(--color-paper-2)",
          cardHover: "var(--color-paper-3)",
          border: "var(--color-rule)",
          borderActive: "var(--color-accent)",
          borderPink: "var(--color-rule-2)",
        },
        neon: {
          cyan: "var(--color-accent)",
          pink: "var(--color-accent)",
          purple: "var(--color-rule-2)",
          violet: "var(--color-rule-2)",
          emerald: "var(--color-accent)",
          amber: "var(--color-muted)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Geologica", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Geologica", "ui-sans-serif", "system-ui", "sans-serif"],
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


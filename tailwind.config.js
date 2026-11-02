/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0a1030", up: "#111a45", line: "#27346a" },
        soft: "#b4bee4",
        dim: "#8592c0",
        lime: { DEFAULT: "#86c232", deep: "#3f7a0c" },
        signal: "#4a72e0",
        amber: "#e68c0c",
        ink: { DEFAULT: "#111838", soft: "#4d5779" },
        rule: "#e3e6ef",
        wine: "#620f44",
        peach: "#f5e1d3",
        blush: "#fbdcd6",
        orchid: "#d18ebb",
      },
      fontFamily: {
        sans: ['"Onest Variable"', '"Helvetica Neue"', "Arial", "sans-serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "Menlo", "monospace"],
      },
      boxShadow: {
        phone: "0 40px 70px -28px rgba(2, 5, 25, .8), 0 16px 30px -18px rgba(2, 5, 25, .6)",
      },
    },
  },
  plugins: [],
};

const { url } = require("inspector");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        pearl: "#faf1e4",
        whiteOpacity: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  plugins: [],
};

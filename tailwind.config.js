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
        darkPearl: "#dad2c7",
        darkGray2: "#2D2925",
        darkGray4: "#70655c",
        darkGray5: "#918378",
        skinTan: "#F5E8D4",
        red: "#ed4e33",
        whiteOpacity: "rgba(255, 255, 255, 0.1)",
        blackOpacity: "rgba(0, 0, 0, 0.6)",
        grayOpacity: "rgba(0, 0, 0, 0.05)",
      },
      fontSize: {
        h5: "1.36rem",
      },
    },
  },
  plugins: [],
};

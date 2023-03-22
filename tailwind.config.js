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
        darkGray1: "#0b0a09",
        darkGray2: "#2D2925",
        darkGray3: "#4f4740",
        darkGray4: "#70655c",
        darkGray5: "#918378",
        skinTan: "#F5E8D4",
        red: "#ed4e33",
        red1: "#AA2912",
        green: "#97ad11",
        gray: "#F0EEEC",
        whiteOpacity: "rgba(255, 255, 255, 0.1)",
        blackOpacity: "rgba(0, 0, 0, 0.6)",
        grayOpacity: "rgba(0, 0, 0, 0.05)",
        darkGray2Opacity: "rgba(54,54,50,.301)",
        yellow: "#EDCD5B",
      },
      fontSize: {
        h5: "1.36rem",
      },
    },
  },
  plugins: [],
};

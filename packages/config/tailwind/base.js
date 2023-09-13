// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

const config = {
  content: [
    // app content
    "src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    "../../packages/*/src/**/*.{js,ts,jsx,tsx}",
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
        darkGray400: "#898175",
        darkGray300: "#6E675C",
        darGray800: "#262017",
        darkGray700: "#3D372D",
        skinTan: "#F5E8D4",
        red: "#ed4e33",
        red1: "#AA2912",
        red2: "#6b1c0e",
        green: "#97ad11",
        gray: "#F0EEEC",
        whiteOpacity: "rgba(255, 255, 255, 0.1)",
        blackOpacity: "rgba(0, 0, 0, 0.6)",
        grayOpacity: "rgba(0, 0, 0, 0.05)",
        grayOpacity2: "#FFFFFFB2",
        darkGray2Opacity: "rgba(54,54,50,.301)",
        yellow: "#EDCD5B",
        lightGrey: "#806E6B",
        strokeGrey: "#DBD3D1",
        lightGreen: "#C4EBD2",
        green1: "#31B886",
        green2: "#15803D",
        pink: "#FED2CA",
        gray1: "#413836",
        gray300: "#D1D5DB",
        lightYellow: "#F4E5BA",
        lightYellow1: "#FEFCE8",
        lightYellow2: "#F0FDF4",
        lightYellow3: "#DFF2E5",
        brown: "#854D0E",
      },
      fontSize: {
        h5: "1.36rem",
      },
      lineHeight: {
        "leading-0": "0",
      },
    },
  },
  plugins: [],
};
export default config;

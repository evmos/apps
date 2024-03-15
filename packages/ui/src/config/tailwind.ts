// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import typography from "@tailwindcss/typography";
import path from "path";
import colors from "./colors.json";
import chroma from "chroma-js";

const { entries, values, fromEntries } = Object;

const toTwColor = (color: string) => {
  const [r, g, b] = chroma(color).rgb();
  return `rgb(${r} ${g} ${b} / <alpha-value>)`;
};

const evmosColors = fromEntries(
  values(colors).flatMap(({ colors }) =>
    entries(colors).map(([color, { dark, light }]) => {
      return [
        color,
        {
          DEFAULT: toTwColor(light),
          dark: toTwColor(dark),
        },
      ] as const;
    }),
  ),
);

const dirName = __dirname; // this works because postcss loads as cjs, otherwise __dirname wouldn't be available
const repositoryRoot = path.resolve(dirName, "../../../../");

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],

  content: [
    "src/**/*.tsx",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/build/**",
    "!**/.next/**",

    path.join(repositoryRoot, "packages/*/(src|.storybook)/**/*.tsx"),
    path.join(repositoryRoot, "pages/*/src/**/*.tsx"),
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)"],
        brand: ["var(--font-brand)", "sans-serif"],
        evmos: ["var(--font-evmos)"],
        poppins: ["var(--font-poppins)"],
        inter: ["var(--font-inter)"],
      },
      boxShadow: {
        custom: "0px 1px 8px 0px #9C848199",
        "custom-sm": "0px 4px 15px 0px #9C848199",
        "custom-pink": "4px 4px 8px 2px #CE250040 inset",
      },
      colors: {
        wosmongton: {
          100: "#D3D1FF",
          200: "#B3B1FD",
          300: "#8C8AF9",
          400: "#6A67EA",
          500: "#5B57FA",
          700: "#462ADF",
        },
        osmoverse: {
          100: "#E4E1FB",
          200: "#CEC8F3",
          300: "#B0AADC",
          400: "#958FC0",
          500: "#736CA3",
          600: "#565081",
          700: "#3C356D",
          800: "#282750",
          825: "#232047",
          850: "#201B43",
          900: "#140F34",
          1000: "#090524",
        },
        pearl: "#FFF4E1",
        pearl1: "#FAF8F8",
        pearl2: "#FEF2F2",
        darkPearl: "#dad2c7",
        darkGray1: "#0b0a09",
        darkGray2: "#2D2925",
        darkGray3: "#4f4740",
        darkGray4: "#70655c",
        darkGray5: "#A2958B",
        darkGray400: "#898175",
        darkGray300: "#6E675C",
        darGray800: "#262017",
        darkGray700: "#3D372D",
        darkGray900: "#16110D",
        skinTan: "#F5E8D4",
        red: "#ed4e33",
        red1: "#AA2912",
        red2: "#6b1c0e",
        "red-300": "#FE5F05",
        "red-900": "#F83E3E",
        green: "#97ad11",
        "green-200": "#70FF7E",
        gray: "#F0EEEC",
        gray2: "#858B97",
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
        "gray-200": "#F3F3F3",
        "gray-300": "#C9C9C9",
        "gray-400": "#919191",
        "gray-500": "#F3F3F333",
        "gray-600": "#FFE6E233",
        "gray-700": "#797979",
        "gray-800": "#D1D1D1",
        lightYellow: "#F4E5BA",
        lightYellow1: "#FEFCE8",
        lightYellow2: "#F0FDF4",
        lightYellow3: "#DFF2E5",
        brown: "#854D0E",
        lightBlue: "#EFF6FF",
        blue: "#1E429F",
        "black-100": "#656159",
        "black-200": "#5b5448",
        "black-300": "#44413c",
        "black-500": "#2d271d",
        "black-900": "#121212",
        "pink-200": "#FFE6E2",
        "pink-300": "#FF745D",
        "pink-400": "#FF745D80",
        "pink-500": "#FFD6D0",
        "pink-600": "#FCDBD6",
        "pink-700": "#FFC1C1",
        "purple-200": "#F8E3FF",
        "purple-300": "#BD89FF",
        "purple-400": "#AE00FF",
        // colors above are deprecated and should eventually be removed
        ...evmosColors,
      },
      fontSize: {
        h5: "1.36rem",

        xxxs: "8.5px",
        xxs: "10px",
      },
    },
  },
  plugins: [typography],
};

export default config;

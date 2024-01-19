// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import localFont from "next/font/local";

export const evmos = localFont({
  variable: "--font-evmos",
  src: [
    {
      path: "./evmos/EvmosDisplay-ExtraBold.otf",
      weight: "700",
    },
    {
      path: "./evmos/EvmosDisplay-Regular.otf",
      weight: "400",
    },
  ],
});

export const nb = localFont({
  variable: "--font-brand",
  src: [
    {
      path: "./nb/NBInternationalProBol.otf",
      weight: "700",
    },
    {
      path: "./nb/NBInternationalProReg.otf",
      weight: "400",
    },
    {
      path: "./nb/NBInternationalProLig.otf",
      weight: "300",
    },
  ],
});

export const poppins = localFont({
  variable: "--font-poppins",
  src: [
    { path: "./poppins/Poppins-Thin.ttf", weight: "300" },
    { path: "./poppins/Poppins-Regular.ttf", weight: "400" },
    { path: "./poppins/Poppins-Medium.ttf", weight: "500" },
    { path: "./poppins/Poppins-SemiBold.ttf", weight: "600" },
    { path: "./poppins/Poppins-Bold.ttf", weight: "700" },
  ],
});

export const inter = localFont({
  variable: "--font-inter",
  src: [{ path: "./inter/Inter-Medium.ttf", weight: "400" }],
});

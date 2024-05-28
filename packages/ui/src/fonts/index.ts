// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import localFont from "next/font/local";

export const evmos = localFont({
  variable: "--font-brand",
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
  variable: "--font-body",
  src: [
    {
      path: "./nb/NBInternationalProBol.otf",
      weight: "700",
    },
    {
      path: "./nb/NBInternationalProMed.otf",
      weight: "500",
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

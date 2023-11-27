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

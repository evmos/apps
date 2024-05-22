// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Metadata } from "next";
export { PortfolioPage as default } from "@evmosapps/portfolio-page";

const title = "Evmos Portfolio";
const description =
  "Evmos Portfolio is the official Evmos dApp to withdraw, deposit and convert your Evmos assets.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    title,
    description,
  },
  openGraph: {
    title,
    description,
  },
};

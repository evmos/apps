// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Metadata } from "next";

export { StakingPage as default } from "@evmosapps/staking-page";

const title = "Evmos Staking | Evmos dApp Store";
const description =
  "Evmos Staking is the official Evmos dApp to stake/unstake your Evmos tokens, claim your rewards, and watch your stake grow.";

export const metadata: Metadata = {
  description,
  title,
  twitter: {
    title,
    description,
  },
  openGraph: {
    title,
    description,
  },
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Metadata } from "next";

export { VestingPage as default } from "@evmosapps/vesting-page";

const title = "Evmos Vesting";
const description =
  "Evmos Vesting is the official Evmos dApp to manage your vested Evmos tokens, claim your vesting schedule, and monitor your vesting progress.";
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

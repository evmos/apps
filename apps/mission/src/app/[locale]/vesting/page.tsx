// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Metadata } from "next";

export { VestingPage as default } from "@evmosapps/vesting-page";

export const metadata: Metadata = {
  description:
    "Evmos Vesting is the official Evmos dApp to manage your vested Evmos tokens, claim your vesting schedule, and monitor your vesting progress.",
  title: "Evmos Vesting",
  twitter: {
    description:
      "Evmos Vesting is the official Evmos dApp to manage your vested Evmos tokens, claim your vesting schedule, and monitor your vesting progress.",
  },
  openGraph: {
    title: "Evmos Vesting",
  },
};

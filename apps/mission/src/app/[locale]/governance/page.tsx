// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Metadata } from "next";
export { ProposalsListPage as default } from "@evmosapps/governance-page/src/ProposalsListPage";

const title = "Evmos Governance | Evmos dApp Store";

const description =
  "Evmos Governance is the official Evmos dApp to view and vote on Evmos governance proposals.";

export const metadata: Metadata = {
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

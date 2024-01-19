// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { createConfig, http } from "wagmi";
import { getEvmosChainInfo } from "./chains";
import { injected, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { keplr } from "./keplrConnector";

const evmos = getEvmosChainInfo();

export const wagmiConfig = createConfig({
  chains: [evmos],
  transports: {
    [evmos.id]: http(),
  },
  ssr: true,
  multiInjectedProviderDiscovery: false,

  connectors: [
    injected({ target: "metaMask" }),
    keplr,
    walletConnect({
      showQrModal: process.env.NODE_ENV !== "test",
      projectId: WALLET_CONNECT_PROJECT_ID,
    }),
    safe({
      debug: false,
    }),
  ],
});

export type ConnetorId = "MetaMask" | "WalletConnect" | "Keplr" | "Safe";

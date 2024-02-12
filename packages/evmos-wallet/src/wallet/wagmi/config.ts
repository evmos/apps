// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { createConfig, http } from "wagmi";

import { injected, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";
import { KeplrProvider } from "./keplrConnector";
import {
  evmoslocalnet,
  evmosmainnet,
  evmostestnet,
} from "helpers/src/evmos-info";

export const wagmiConfig = createConfig({
  chains: [evmosmainnet, evmostestnet, evmoslocalnet],
  transports: {
    [evmosmainnet.id]: http(),
    [evmostestnet.id]: http(),
    [evmoslocalnet.id]: http(),
  },
  ssr: true,
  multiInjectedProviderDiscovery: false,

  connectors: [
    injected({ target: "metaMask" }),
    injected({
      target() {
        return {
          id: "keplr",
          name: "Keplr",
          provider: new KeplrProvider({
            DEFAULT: evmosmainnet.id,
            [evmosmainnet.id]: {
              isNative: true,
              chainId: evmosmainnet.cosmosChainId,
            },
            [evmostestnet.id]: () =>
              import("@evmosapps/registry/src/keplr/evmostestnet.json").then(
                (module) => module.default,
              ),
            [evmoslocalnet.id]: () =>
              import("@evmosapps/registry/src/keplr/evmostestnet.json").then(
                (module) => module.default,
              ),
          }),
        };
      },
    }),
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

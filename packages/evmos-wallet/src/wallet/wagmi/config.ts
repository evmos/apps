// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { createConfig, http } from "wagmi";

import { injected, safe, walletConnect } from "wagmi/connectors";
import { WALLET_CONNECT_PROJECT_ID } from "../../internal/wallet/functionality/networkConfig";

import {
  evmoslocalnet,
  evmosmainnet,
  evmostestnet,
} from "helpers/src/evmos-info";
import { EIP1193Provider } from "viem";
import { coinbaseWallet } from "wagmi/connectors";
import {
  keplrProvider,
  leapProvider,
} from "./cosmos-providers/cosmos-providers";

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

    coinbaseWallet({
      appName: "Dappstore Evmos",
    }),
    injected({ target: "braveWallet" }),

    injected({
      target: {
        id: "rabby",
        name: "Rabby Wallet",
        provider: (window) => {
          if (window && "rabby" in window) {
            return window.rabby as EIP1193Provider;
          }
        },
      },
    }),

    // injected({
    //   target: {
    //     id: "rainbow",
    //     name: "Rainbow",
    //     provider: window.ethereum.providers?.find(isMetaMask),
    //   },
    // }),
    injected({
      target: {
        id: "trustWallet",
        name: "Trust Wallet",
        provider: (window) => {
          if (window && "trustwallet" in window) {
            return window.trustwallet as EIP1193Provider;
          }
        },
      },
    }),
    // injected({
    //   target: {
    //     id: "okxWallet",
    //     name: "OKX Wallet",
    //     provider: (window) => {
    //       if (window && "okxwallet" in window) {
    //         return window.okxwallet as EIP1193Provider;
    //       }
    //     },
    //   },
    // }),
    injected({
      target() {
        return {
          id: "keplr",
          name: "Keplr",
          provider: keplrProvider,
        };
      },
    }),
    injected({
      target() {
        return {
          id: "leap",
          name: "Leap",
          provider: leapProvider,
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

export type ConnetorId =
  | "MetaMask"
  | "WalletConnect"
  | "Keplr"
  | "Safe"
  | "Leap"
  | "Rabby"
  // | "Rainbow"
  | "CoinbaseWallet"
  | "BraveWallet"
  | "okxWallet"
  | "Trust Wallet";

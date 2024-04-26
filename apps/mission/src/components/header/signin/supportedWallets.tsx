// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/**
 * We have to add to this list all the wallets that we want to support on our dappstore
 */

"use client";

import { IconCoinbaseCirc } from "@evmosapps/ui/icons/wallet/coinbase-circ.tsx";
import { IconMetamaskCirc } from "@evmosapps/ui/icons/wallet/metamask-circ.tsx";
import { IconKeplrCirc } from "@evmosapps/ui/icons/wallet/keplr-circ.tsx";
import { IconWalletConnectCirc } from "@evmosapps/ui/icons/wallet/wallet-connect-circ.tsx";
import { IconBraveWalletCirc } from "@evmosapps/ui/icons/wallet/brave-wallet-circ.tsx";
import { IconRabbyCirc } from "@evmosapps/ui/icons/wallet/rabby-circ.tsx";
import { IconRainbowCirc } from "@evmosapps/ui/icons/wallet/rainbow-circ.tsx";
import { IconTrustWalletCirc } from "@evmosapps/ui/icons/wallet/trust-wallet-circ.tsx";
import { IconLeap } from "@evmosapps/ui/icons/wallet/leap.tsx";
import { IconOkxWallet } from "@evmosapps/ui/icons/wallet/okx-wallet.tsx";
export type SUPPORTED_WALLETS_TYPE =
  | {
      name: string;
      url: string;
      icon?: React.ForwardRefExoticComponent<
        Omit<React.SVGProps<SVGSVGElement>, "ref"> &
          React.RefAttributes<SVGSVGElement>
      >;
    }
  | undefined;

export const supportedWallets = [
  {
    name: "MetaMask",
    url: "https://metamask.io/download/",
    icon: IconMetamaskCirc,
    displayName: "MetaMask",
  },
  {
    name: "Coinbase Wallet",
    url: "https://www.coinbase.com/es-LA/wallet/downloads",
    icon: IconCoinbaseCirc,
    displayName: "Coinbase",
  },
  {
    name: "BraveWallet",
    url: "https://brave.com/wallet/",
    icon: IconBraveWalletCirc,
    displayName: "Brave",
  },
  {
    name: "Rabby Wallet",
    url: "https://rabby.io/",
    icon: IconRabbyCirc,
    displayName: "Rabby",
  },
  {
    name: "Rainbow",
    url: "https://rainbow.me/download",
    icon: IconRainbowCirc,
    displayName: "Rainbow",
  },
  {
    name: "Trust Wallet",
    url: "https://trustwallet.com/es/download",
    icon: IconTrustWalletCirc,
    displayName: "Trust",
  },
  {
    name: "OKX Wallet",
    url: "https://www.okx.com/web3",
    icon: IconOkxWallet,
    displayName: "OKX",
  },

  {
    name: "Keplr",
    url: "https://www.keplr.app/download",
    icon: IconKeplrCirc,
    displayName: "Keplr",
  },
  {
    name: "Leap",
    url: "https://www.leapwallet.io/#download",
    icon: IconLeap,
    displayName: "Leap",
  },
  {
    name: "WalletConnect",
    url: "",
    icon: IconWalletConnectCirc,
    displayName: "WalletConnect",
  },
];

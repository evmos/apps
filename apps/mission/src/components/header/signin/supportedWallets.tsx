/**
 * We have to add to this list all the wallets that we want to support on our dappstore
 */

"use client";

import { IconCoinbaseCirc } from "../../../../../../packages/ui/src/icons/wallet/coinbase-circ";
import { IconMetamaskCirc } from "../../../../../../packages/ui/src/icons/wallet/metamask-circ";
import { IconKeplrCirc } from "../../../../../../packages/ui/src/icons/wallet/keplr-circ";
import { IconWalletConnectCirc } from "../../../../../../packages/ui/src/icons/wallet/wallet-connect-circ";
import { IconBraveWalletCirc } from "../../../../../../packages/ui/src/icons/wallet/brave-wallet-circ";
import { IconRabbyCirc } from "../../../../../../packages/ui/src/icons/wallet/rabby-circ";
import { IconRainbowCirc } from "../../../../../../packages/ui/src/icons/wallet/rainbow-circ";
import { IconTrustWalletCirc } from "../../../../../../packages/ui/src/icons/wallet/trust-wallet-circ";
import { IconLeap } from "../../../../../../packages/ui/src/icons/wallet/leap";

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
  },
  {
    name: "Coinbase Wallet",
    url: "https://www.coinbase.com/es-LA/wallet/downloads",
    icon: IconCoinbaseCirc,
  },
  {
    name: "BraveWallet",
    url: "https://brave.com/wallet/",
    icon: IconBraveWalletCirc,
  },
  {
    name: "Rabby Wallet",
    url: "https://rabby.io/",
    icon: IconRabbyCirc,
  },
  {
    name: "Rainbow",
    url: "https://rainbow.me/download",
    icon: IconRainbowCirc,
  },
  {
    name: "Trust Wallet",
    url: "https://trustwallet.com/es/download",
    icon: IconTrustWalletCirc,
  },
  {
    name: "OKX Wallet",
    url: "https://www.okx.com/web3",
    icon: IconMetamaskCirc,
  },

  { name: "Keplr", url: "https://www.keplr.app/download", icon: IconKeplrCirc },
  {
    name: "Leap",
    url: "https://www.leapwallet.io/#download",
    icon: IconLeap,
  },
  { name: "WalletConnect", url: "", icon: IconWalletConnectCirc },
];

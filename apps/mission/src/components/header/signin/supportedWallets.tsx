/**
 * We have to add to this list all the wallets that we want to support on our dappstore
 */

"use client";

import { LeapIcon } from "@evmosapps/icons/LeapWalletIcon";

import { RabbyIcon } from "@evmosapps/icons/RabbyWalletIcon";

import { RainbowIcon } from "@evmosapps/icons/Rainbow";
import { CoinbaseWalletIcon } from "@evmosapps/icons/CoinbaseWallet";
import { IconMetamask } from "../../../../../../packages/ui/src/icons/wallet/metamask";
import { IconKeplr } from "../../../../../../packages/ui/src/icons/wallet/keplr";
import { IconWalletConnectRect } from "../../../../../../packages/ui/src/icons/wallet/wallet-connect-rect";
export const supportedWallets = [
  {
    name: "MetaMask",
    url: "https://metamask.io/download/",
    icon: IconMetamask,
  },
  {
    name: "Coinbase Wallet",
    url: "https://www.coinbase.com/es-LA/wallet/downloads",
    icon: CoinbaseWalletIcon,
  },
  {
    name: "BraveWallet",
    url: "https://brave.com/wallet/",
    icon: IconMetamask,
  },
  {
    name: "Rabby Wallet",
    url: "https://rabby.io/",
    icon: RabbyIcon,
  },
  {
    name: "Rainbow",
    url: "https://rainbow.me/download",
    icon: RainbowIcon,
  },
  {
    name: "Trust Wallet",
    url: "https://trustwallet.com/es/download",
  },
  {
    name: "OKX Wallet",
    url: "https://www.okx.com/web3",
  },

  { name: "Keplr", url: "https://www.keplr.app/download", icon: IconKeplr },
  { name: "Leap", url: "https://www.leapwallet.io/#download", icon: LeapIcon },
  { name: "WalletConnect", url: "", icon: IconWalletConnectRect },
];

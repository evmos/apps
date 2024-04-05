// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { KeplrIcon } from "@evmosapps/icons/KeplrIcon";
import { LeapIcon } from "@evmosapps/icons/LeapWalletIcon";
import { MetamaskIcon } from "@evmosapps/icons/MetamaskIcon";
import { RabbyIcon } from "@evmosapps/icons/RabbyWalletIcon";
import { WalletConnectIcon } from "@evmosapps/icons/WalletConnectIcon";
import { RainbowIcon } from "@evmosapps/icons/Rainbow";
import { CoinbaseWalletIcon } from "@evmosapps/icons/CoinbaseWallet";
export const ProvidersIcons: Record<
  string,
  React.FC<React.SVGAttributes<SVGElement>>
> = {
  MetaMask: MetamaskIcon,
  Keplr: KeplrIcon,
  WalletConnect: WalletConnectIcon,
  Leap: LeapIcon,
  "Rabby Wallet": RabbyIcon,
  Rainbow: RainbowIcon,
  "Coinbase Wallet": CoinbaseWalletIcon,
};

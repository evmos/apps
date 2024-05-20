// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { useEffectEvent } from "helpers";
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const predefinedWallets = [
  "MetaMask",
  "Rainbow",
  "Coinbase Wallet",
  "Leap",
  "WalletConnect",
];

const WALLET_KEY = "most-used-wallets-list";

type Wallet = string;
export interface WalletsContext {
  wallets: Wallet[] | null;
  setWallets: (wallet: string) => void;
}
const WalletsContext = createContext<WalletsContext | null>(null);

const readWallets = (address: string) => {
  if (typeof window === "undefined") {
    return [];
  }

  const values = window.localStorage.getItem(`${WALLET_KEY}.${address}`);
  return values ? (JSON.parse(values) as Wallet[]) : [];
};

const writeWallets = (address: string, wallets: Wallet[]) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      `${WALLET_KEY}.${address}`,
      JSON.stringify(wallets),
    );
  }
};

// Create the provider component
export const WalletsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wallets, setWallets] = useState<Wallet[] | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) {
      setWallets(predefinedWallets);
      return;
    }
    setWallets(readWallets(address));
  }, [address]);

  useEffect(() => {
    if (!address || !wallets) {
      return;
    }
    writeWallets(address, wallets);
  }, [address, wallets]);

  const updateWallets = useEffectEvent((wallet: Wallet) => {
    setWallets((prevWallets) => {
      if (!prevWallets) return prevWallets;
      if (prevWallets.includes(wallet)) {
        return prevWallets;
      }
      return [wallet, ...prevWallets.slice(0, 3), ...prevWallets.slice(4)];
    });
  });

  return (
    <WalletsContext.Provider value={{ wallets, setWallets: updateWallets }}>
      {children}
    </WalletsContext.Provider>
  );
};

export function useWalletsContext() {
  const context = useContext(WalletsContext);
  if (!context)
    throw new Error(
      "`WalletsContext` can only be used inside `WalletsProvider`",
    );
  return context;
}

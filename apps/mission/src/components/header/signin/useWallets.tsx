// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)
"use client";
import { createContext, useContext, useState } from "react";

const predefinedWallets = [
  "MetaMask",
  "Rainbow",
  "Coinbase Wallet",
  "Leap",
  "WalletConnect",
];

const WALLET_KEY = "wallets_list";

export interface WalletsContext {
  wallets: string[];
  setWallets: (newWallets: string) => void;
}
const WalletsContext = createContext<WalletsContext | null>(null);

// Create the provider component
export const WalletsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const setWalletsDb = (wallets: string[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(WALLET_KEY, JSON.stringify(wallets));
    }
  };

  const getWalletsDb = () => {
    if (typeof window === "undefined") {
      return predefinedWallets;
    }
    const values = window.localStorage.getItem(WALLET_KEY);
    return values ? (JSON.parse(values) as string[]) : predefinedWallets;
  };

  const [wallets, setWallets] = useState<string[]>(getWalletsDb());

  const updateWallets = (wallet: string) => {
    setWallets((prevWallets) => {
      if (!prevWallets.includes(wallet)) {
        const newWallets = [
          wallet,
          ...prevWallets.slice(0, 3),
          ...prevWallets.slice(4),
        ];
        setWalletsDb(newWallets);
        return newWallets;
      }
      return prevWallets;
    });
  };

  return (
    <WalletsContext.Provider value={{ wallets, setWallets: updateWallets }}>
      {children}
    </WalletsContext.Provider>
  );
};

export function useWAlletsContext() {
  return useContext(WalletsContext);
}

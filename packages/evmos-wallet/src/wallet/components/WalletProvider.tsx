// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import {
  useEffect,
  PropsWithChildren,
  useLayoutEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useAccount, useAccountEffect } from "wagmi";
import {  wagmiConfig } from "../wagmi";
import { resetWallet, setWallet } from "../redux/WalletSlice";
import {
  RemoveWalletFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../../internal/wallet/functionality/localstorage";
import { useEffectEvent } from "helpers";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { store } from "../../redux/Store";

type WalletProviderProps = PropsWithChildren<{}>;
type DropdownState = "profile" | "settings" | "wallets";
const WalletContext = createContext<{
  isWalletHydrated: boolean;
  config: typeof wagmiConfig;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (val: boolean) => void;
  dropdownState: string;
  setDropdownState: (val: DropdownState) => void;
}>({
  isWalletHydrated: false,
  config: wagmiConfig,
  isDropdownOpen: false,
  setIsDropdownOpen: () => { },
  dropdownState: "",
  setDropdownState: () => { },
});

const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

export const useWallet = () => {
  const {
    isWalletHydrated,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownState,
    setDropdownState,
  } = useWalletContext();

  const account = useAccount();

  return {
    ...account,
    bech32Address: account.address ? normalizeToCosmos(account.address) : null,
    isHydrating: !isWalletHydrated,
    isDropdownOpen,
    setIsDropdownOpen,
    dropdownState,
    setDropdownState,
  };
};

function Provider({ children }: WalletProviderProps) {
  const [isWalletHydrated, setIsWalletHydrated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownState, setDropdownState] = useState<DropdownState>("profile");
  const { address, connector, isConnected } = useAccount();

  /**
   * I would expect that the behavior of reconnect would be to only reconnect if there was a previous connection
   * however, even when you don't have a recent connection, it reconnects to the first in the list
   * I'm not sure if that's a bug or not, but this is a workaround for now
   */
  // TODO Mili: ask Julia if we still need this.

  const reconnectIfRecent = useEffectEvent(async () => {
    const recentId = await wagmiConfig.storage?.getItem("recentConnectorId");
    setIsWalletHydrated(true);
    if (!recentId) return;
  });
  useLayoutEffect(() => {
    void reconnectIfRecent();
  }, [reconnectIfRecent]);

  useAccountEffect({
    onConnect: ({ isReconnected }) => {
      if (isReconnected) {
        return;
      }
      // TODO Mili: update notifications
      // notifySuccess(
      //   WALLET_NOTIFICATIONS.SuccessTitle,
      //   "Connected with wallet {address}",
      //   {
      //     walletName: connector?.name ?? "",
      //     address: truncateAddress(address) ?? "",
      //   },
      // );
    },

    onDisconnect() {
      RemoveWalletFromLocalStorage();
      store.dispatch(resetWallet());
    },
  });

  useEffect(() => {
    const connectorId = connector?.id.toLowerCase();
    if (!connectorId || !address) return;
    /**
     * TODO: this is to sync with the current wallet redux store
     * In a future PR I intent to remove this store
     * and use wagmi to get the wallet data
     */
    SaveProviderToLocalStorate(connectorId);
    store.dispatch(
      setWallet({
        active: true,
        extensionName: connectorId,
        evmosAddressEthFormat: address,
        evmosAddressCosmosFormat: normalizeToCosmos(address),
        evmosPubkey: "",
        osmosisPubkey: null,
        accountName: null,
      }),
    );
  }, [isConnected, connector, address]);

  return (
    <WalletContext.Provider
      value={{
        isWalletHydrated,
        config: wagmiConfig,
        isDropdownOpen: dropdownOpen,
        setIsDropdownOpen: setDropdownOpen,
        dropdownState,
        setDropdownState,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function WalletProvider(props: WalletProviderProps) {
  return <Provider {...props} />;
}

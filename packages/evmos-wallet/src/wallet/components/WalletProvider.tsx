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
import { useAccount, useAccountEffect, useDisconnect } from "wagmi";
import { usePubKey, wagmiConfig } from "../wagmi";
import // WALLET_NOTIFICATIONS,
// notifyError,
// notifySuccess,
"../../internal/wallet/functionality/errors";
// import { truncateAddress } from "../../internal/wallet/style/format";
import { getActiveProviderKey, store } from "../..";
import { resetWallet, setWallet } from "../redux/WalletSlice";
import {
  RemoveWalletFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../../internal/wallet/functionality/localstorage";
import { useEffectEvent, useWatch } from "helpers";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";

type WalletProviderProps = PropsWithChildren<{}>;

const WalletContext = createContext<{
  isWalletHydrated: boolean;
  config: typeof wagmiConfig;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}>({
  isWalletHydrated: false,
  config: wagmiConfig,
  isOpen: false,
  setIsOpen: () => {},
});

const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

export const useWallet = () => {
  const { isWalletHydrated, isOpen, setIsOpen } = useWalletContext();

  const account = useAccount();

  return {
    ...account,
    bech32Address: account.address ? normalizeToCosmos(account.address) : null,
    isHydrating: !isWalletHydrated,
    isOpen,
    setIsOpen,
  };
};

function Provider({ children }: WalletProviderProps) {
  const [isWalletHydrated, setIsWalletHydrated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
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
  // const { variables } = useConnect();
  const { disconnect } = useDisconnect();
  const { pubkey, error: pubkeyError, isFetching } = usePubKey();

  useEffect(() => {
    const connectorId = connector?.id.toLowerCase();
    if (
      !connectorId ||
      !address ||
      (!pubkey && getActiveProviderKey() !== "Safe")
    )
      return;
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
        evmosPubkey: pubkey ?? "",
        osmosisPubkey: null,
        accountName: null,
      }),
    );
  }, [isConnected, connector, pubkey, address]);

  useWatch(() => {
    if (getActiveProviderKey() === "Safe") return;
    if (!pubkeyError || isFetching) return;

    disconnect();

    // TODO Mili: ask about pubkey and it we still need to show this, handle the error
    // ask swan how to handle this
    // notifyError(
    //   WALLET_NOTIFICATIONS.ErrorTitle,
    //   WALLET_NOTIFICATIONS.PubkeySubtext,
    //   { walletName: variables?.connector?.name ?? "" },
    // );
  }, [isFetching]);
  return (
    <WalletContext.Provider
      value={{
        isWalletHydrated,
        config: wagmiConfig,
        isOpen: dropdownOpen,
        setIsOpen: setDropdownOpen,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function WalletProvider(props: WalletProviderProps) {
  return <Provider {...props} />;
}

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
import {
  useAccount,
  useAccountEffect,
  useConnect,
  useDisconnect,
  useReconnect,
} from "wagmi";
import { usePubKey, wagmiConfig } from "../wagmi";
import {
  WALLET_NOTIFICATIONS,
  notifyError,
  notifySuccess,
} from "../../internal/wallet/functionality/errors";
import { truncateAddress } from "../../internal/wallet/style/format";
import {
  getActiveProviderKey,
  normalizeToCosmosAddress,
  normalizeToEvmos,
  store,
} from "../..";
import { resetWallet, setWallet } from "../redux/WalletSlice";
import {
  RemoveWalletFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../../internal/wallet/functionality/localstorage";
import { useEffectEvent, useWatch } from "helpers";

type WalletProviderProps = PropsWithChildren<{}>;

const WalletContext = createContext<{
  isWalletHydrated: boolean;
  config: typeof wagmiConfig;
}>({
  isWalletHydrated: false,
  config: wagmiConfig,
});

const useWalletContext = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWalletContext must be used within a WalletProvider");
  }
  return context;
};

export const useWallet = () => {
  const { isWalletHydrated } = useWalletContext();

  const account = useAccount();
  return {
    ...account,
    bech32Address: account.address
      ? normalizeToCosmosAddress(account.address)
      : null,
    isHydrating: !isWalletHydrated,
  };
};

function Provider({ children }: WalletProviderProps) {
  const [isWalletHydrated, setIsWalletHydrated] = useState(false);

  const { reconnect } = useReconnect();
  const { address, connector, isConnected } = useAccount();

  /**
   * I would expect that the behavior of reconnect would be to only reconnect if there was a previous connection
   * however, even when you don't have a recent connection, it reconnects to the first in the list
   * I'm not sure if that's a bug or not, but this is a workaround for now
   */
  const reconnectIfRecent = useEffectEvent(async () => {
    const recentId = await wagmiConfig.storage?.getItem("recentConnectorId");
    setIsWalletHydrated(true);
    if (!recentId) return;
    reconnect();
  });
  useLayoutEffect(() => {
    void reconnectIfRecent();
  }, [reconnectIfRecent]);

  useAccountEffect({
    onConnect: ({ connector, address, isReconnected }) => {
      if (isReconnected) {
        return;
      }

      notifySuccess(
        WALLET_NOTIFICATIONS.SuccessTitle,
        "Connected with wallet {address}",
        {
          walletName: connector?.name ?? "",
          address: truncateAddress(address) ?? "",
        }
      );
    },

    onDisconnect() {
      RemoveWalletFromLocalStorage();
      store.dispatch(resetWallet());
    },
  });
  const { variables } = useConnect();
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
        evmosAddressCosmosFormat: normalizeToEvmos(address),
        evmosPubkey: pubkey ?? "",
        osmosisPubkey: null,
        accountName: null,
      })
    );
  }, [isConnected, connector, pubkey, address]);

  useWatch(() => {
    if (getActiveProviderKey() === "Safe") return;
    if (!pubkeyError || isFetching) return;

    disconnect();

    // disconnect();
    notifyError(
      WALLET_NOTIFICATIONS.ErrorTitle,
      WALLET_NOTIFICATIONS.PubkeySubtext,
      { walletName: variables?.connector?.name ?? "" }
    );
  }, [isFetching]);
  return (
    <WalletContext.Provider
      value={{
        isWalletHydrated,
        config: wagmiConfig,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function WalletProvider(props: WalletProviderProps) {
  return <Provider {...props} />;
}

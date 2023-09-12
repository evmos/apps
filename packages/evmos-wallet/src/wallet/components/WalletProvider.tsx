import { useEffect, PropsWithChildren } from "react";
import { WagmiConfig, useAccount, useConnect, useDisconnect } from "wagmi";
import { usePubKey, wagmiConfig } from "../wagmi";
import {
  WALLET_NOTIFICATIONS,
  notifyError,
  notifySuccess,
} from "../../internal/wallet/functionality/errors";
import { truncateAddress } from "../../internal/wallet/style/format";
import { store } from "../..";
import { resetWallet, setWallet } from "../redux/WalletSlice";
import { ethToEvmos } from "@evmos/address-converter";
import {
  RemoveWalletFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../../internal/wallet/functionality/localstorage";

type WalletProviderProps = PropsWithChildren<{}>;

function Provider({ children }: WalletProviderProps) {
  const { address, connector, isConnected } = useAccount({
    onConnect: ({ isReconnected, connector, address }) => {
      if (isReconnected) return;
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
  const { pubkey, error: pubkeyError } = usePubKey();

  useEffect(() => {
    const connectorId = connector?.id.toLowerCase();
    if (!connectorId || !address || !pubkey) return;
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
        evmosAddressCosmosFormat: ethToEvmos(address),
        evmosPubkey: pubkey,
        osmosisPubkey: null,
        accountName: null,
      })
    );
  }, [isConnected, connector, pubkey, address]);

  useEffect(() => {
    if (!pubkeyError) return;
    disconnect();
    notifyError(
      WALLET_NOTIFICATIONS.ErrorTitle,
      WALLET_NOTIFICATIONS.PubkeySubtext,
      { walletName: variables?.connector?.name ?? "" }
    );
  }, [disconnect, pubkeyError, variables?.connector?.name]);
  return <>{children}</>;
}

export function WalletProvider(props: WalletProviderProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Provider {...props} />
    </WagmiConfig>
  );
}

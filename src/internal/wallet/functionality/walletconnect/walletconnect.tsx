import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { useEffect } from "react";
import { useAccount, configureChains, createClient } from "wagmi";
import { evmos } from "wagmi/chains";
import { useWeb3Modal } from "@web3modal/react";

import {
  NotifyError,
  NotifySuccess,
} from "../../../common/notifications/notifications";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../components/wallet/redux/WalletSlice";
import { truncateAddress } from "../../style/format";
import { WALLECT_CONNECT_KEY } from "../wallet";
import { SaveProviderToLocalStorate } from "../localstorage";
import { ethToEvmos } from "@evmos/address-converter";
import { queryPubKey } from "../pubkey";
import { EVMOS_GRPC_URL } from "../networkConfig";
import type { Logger } from "ethers/lib/utils.js";
import { generatePubkeyFromSignatureWalletConnect } from "./walletconnectHelpers";
//
// Ethers does not have an error type so we can use this for casting
// https://github.com/ethers-io/ethers.js/blob/main/packages/logger/src.ts/index.ts#L268
export type EthersError = Error & {
  reason: string;
  code: keyof typeof Logger.errors;
};

// Config
// TODO: move this to a ENV VAR
export const projectId = "ae920fe62c5a565cfaaa6edacbbb6fa7";

const chains = [evmos];
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);

export const wagmiClient = createClient({
  autoConnect: false,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

export const ethereumClient = new EthereumClient(wagmiClient, chains);

export function useWalletConnect(reduxStore: ReduxWalletStore) {
  const { open } = useWeb3Modal();
  const { address, isConnecting } = useAccount();

  async function connect() {
    if (!address && !isConnecting) {
      await open({ route: "ConnectWallet" });
    }
    SaveProviderToLocalStorate(WALLECT_CONNECT_KEY);
    reduxStore.dispatch(
      setWallet({
        active: false,
        extensionName: WALLECT_CONNECT_KEY,
        evmosAddressEthFormat: "",
        evmosAddressCosmosFormat: "",
        evmosPubkey: null,
        osmosisPubkey: null,
      })
    );
  }

  return { connect, address };
}

export function useActivateWalletConnect(
  store: ReduxWalletStore,
  notificationsEnabled: boolean,
  extensionName: string
) {
  const { address, isDisconnected } = useAccount();

  async function generatePubKeyWalletConnect(
    account: string,
    evmosGRPCUrl = EVMOS_GRPC_URL
  ) {
    let pubkey = await queryPubKey(evmosGRPCUrl, account);
    if (pubkey === null) {
      pubkey = await generatePubkeyFromSignatureWalletConnect(account);
    }
    return pubkey;
  }

  useEffect(() => {
    async function execute() {
      if (extensionName !== WALLECT_CONNECT_KEY) {
        return;
      }

      if (isDisconnected) {
        store.dispatch(resetWallet());
        return;
      }

      if (address) {
        const pubkey = await generatePubKeyWalletConnect(address);

        if (pubkey === null) {
          store.dispatch(resetWallet());
          NotifyError(
            "WalletConnect Error",
            "You must sign the generate pubkey message to use the dashboard.",
            store,
            notificationsEnabled
          );
          return;
        }

        store.dispatch(
          setWallet({
            active: true,
            extensionName: WALLECT_CONNECT_KEY,
            evmosAddressEthFormat: address,
            evmosAddressCosmosFormat: ethToEvmos(address),
            evmosPubkey: pubkey,
            osmosisPubkey: null,
          })
        );

        NotifySuccess(
          "Connected with WalletConnect",
          "Using wallet " + truncateAddress(address),
          store,
          notificationsEnabled
        );
      }
    }

    // Execute the async function
    // Can not await inside a useEffect
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    execute();
  }, [address, isDisconnected, extensionName, notificationsEnabled, store]);
}

import { evmosToEth } from "@evmos/address-converter";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../components/wallet/redux/WalletSlice";
import { store } from "../../../../redux/Store";
import { KEPLR_ERRORS, KEPLR_SUCCESS_MESSAGES, ResultMessage } from "../errors";
import {
  RemoveProviderFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../localstorage";
import {
  EVMOS_CHAIN,
  EVMOS_GRPC_URL,
  OSMOSIS_CHAIN_ID,
} from "../networkConfig";
import { KEPLR_KEY } from "../wallet";
import {
  subscribeToKeplrEvents,
  unsubscribeToKeplrEvents,
} from "./keplrHelpers";

export class Keplr {
  active = false;
  extensionName = KEPLR_KEY;
  addressCosmosFormat = "";
  addressEthFormat = "";
  evmosPubkey: string | null = null;
  cosmosPubkey: string | null = null;
  grpcEndpoint = EVMOS_GRPC_URL;
  reduxStore: ReduxWalletStore;

  constructor(
    reduxStore: ReduxWalletStore,
    grpcEndpoint: string = EVMOS_GRPC_URL
  ) {
    this.grpcEndpoint = grpcEndpoint;
    this.reduxStore = reduxStore;
  }

  disconnect() {
    this.reset();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    unsubscribeToKeplrEvents(this.connectHandler);
    RemoveProviderFromLocalStorage();
    return { result: true, message: KEPLR_SUCCESS_MESSAGES.Disconnected };
  }

  reset() {
    this.active = false;
    this.extensionName = KEPLR_KEY;
    this.addressCosmosFormat = "";
    this.addressEthFormat = "";
    this.evmosPubkey = null;
    this.cosmosPubkey = null;
    store.dispatch(resetWallet());
    RemoveProviderFromLocalStorage();
  }

  async connectHandler() {
    if (!window.keplr) {
      this.reset();
      // ExtensionNotFound
      return false;
    }

    try {
      const offlineSignerEvmos = window.keplr.getOfflineSigner(
        EVMOS_CHAIN.cosmosChainId
      );
      const offlineSignerOsmosis =
        window.keplr.getOfflineSigner(OSMOSIS_CHAIN_ID);

      const accountsEvmos = await offlineSignerEvmos.getAccounts();
      const accountsOsmosis = await offlineSignerOsmosis.getAccounts();

      if (
        !accountsEvmos ||
        accountsEvmos.length === 0 ||
        !accountsOsmosis ||
        accountsOsmosis.length === 0
      ) {
        // Could not get accounts information
        this.reset();
        return false;
      }

      const pubkeyEvmos = Buffer.from(accountsEvmos[0].pubkey).toString(
        "base64"
      );
      const pubkeyOsmosis = Buffer.from(accountsOsmosis[0].pubkey).toString(
        "base64"
      );

      // let name = (await window.keplr.getKey(EVMOS_CHAIN.cosmosChainId)).name;

      this.active = true;
      store.dispatch(
        setWallet({
          active: this.active,
          extensionName: KEPLR_KEY,
          evmosAddressEthFormat: evmosToEth(accountsEvmos[0].address),
          evmosAddressCosmosFormat: accountsEvmos[0].address,
          evmosPubkey: pubkeyEvmos,
          osmosisPubkey: pubkeyOsmosis,
        })
      );
      SaveProviderToLocalStorate(KEPLR_KEY);
      return true;
    } catch (error) {
      // The error message is hardcoded on keplr's side
      if (
        (error as { message: string })?.message !==
        "Please initialize ethereum app on ledger first"
      ) {
        // Init ethereum app first
      }
      this.reset();
      return false;
    }
  }

  async connect(): Promise<ResultMessage> {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    subscribeToKeplrEvents(this.connectHandler);

    const error = await this.connectHandler();
    if (error) {
      this.reset();
      return {
        result: false,
        message: KEPLR_ERRORS.ConnectionError,
      };
    }

    return {
      result: true,
      message: KEPLR_SUCCESS_MESSAGES.Connected,
    };
  }
}

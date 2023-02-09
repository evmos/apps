import { evmosToEth } from "@evmos/address-converter";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../components/wallet/redux/WalletSlice";
import { store } from "../../../../redux/Store";
import { truncateAddress } from "../../style/format";
import {
  KEPLR_ERRORS,
  KEPLR_NOTIFICATIONS,
  KEPLR_SUCCESS_MESSAGES,
  ResultMessage,
} from "../errors";
import {
  RemoveProviderFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../localstorage";
import {
  EVMOS_CHAIN,
  EVMOS_GRPC_URL,
  OSMOSIS_CHAIN_ID,
} from "../networkConfig";
import {
  NotifyError,
  NotifySuccess,
} from "../../../common/notifications/notifications";
import { KEPLR_KEY } from "../wallet";
import {
  subscribeToKeplrEvents,
  unsubscribeToKeplrEvents,
} from "./keplrHelpers";
import { SNACKBAR_CONTENT_TYPES } from "../../../../components/notification/types";

export class Keplr {
  active = false;
  extensionName = KEPLR_KEY;
  addressCosmosFormat = "";
  addressEthFormat = "";
  evmosPubkey: string | null = null;
  cosmosPubkey: string | null = null;
  grpcEndpoint = EVMOS_GRPC_URL;
  reduxStore: ReduxWalletStore;
  notificationsEnabled: boolean;

  constructor(
    reduxStore: ReduxWalletStore,
    notificationsEnabled = true,
    grpcEndpoint: string = EVMOS_GRPC_URL
  ) {
    this.grpcEndpoint = grpcEndpoint;
    this.reduxStore = reduxStore;
    this.notificationsEnabled = notificationsEnabled;
  }

  disconnect() {
    this.reset();
    unsubscribeToKeplrEvents();
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
      NotifyError(
        {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: KEPLR_NOTIFICATIONS.ErrorTitle,
          text: KEPLR_NOTIFICATIONS.ExtensionNotFoundSubtext,
        },

        this.reduxStore,
        this.notificationsEnabled
      );
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
      const accountName =
        (await window.keplr.getKey(EVMOS_CHAIN.cosmosChainId)).name || null;

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
          accountName: accountName,
        })
      );
      SaveProviderToLocalStorate(KEPLR_KEY);
      NotifySuccess(
        {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: KEPLR_NOTIFICATIONS.SuccessTitle,
          text:
            "Connected with wallet" + truncateAddress(accountsEvmos[0].address),
        },
        this.reduxStore,
        this.notificationsEnabled
      );
      return true;
    } catch (error) {
      // The error message is hardcoded on keplr's side
      if (
        (error as { message: string })?.message ===
        "Please initialize ethereum app on ledger first"
      ) {
        // Init ethereum app first
        NotifyError(
          {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: KEPLR_NOTIFICATIONS.ErrorTitle,
            text: KEPLR_NOTIFICATIONS.LedgerNotInitSubtext,
          },
          this.reduxStore,
          this.notificationsEnabled
        );
      }
      if ((error as { message: string })?.message === "Request rejected") {
        NotifyError(
          {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: KEPLR_NOTIFICATIONS.ErrorTitle,
            text: KEPLR_NOTIFICATIONS.RequestRejectedSubtext,
          },
          this.reduxStore,
          this.notificationsEnabled
        );
      }
      // TODO: catch wallet not unlocked
      // TODO: catch wallet not allowed to connect to evmos/osmosis
      this.reset();
      return false;
    }
  }

  async connect(): Promise<ResultMessage> {
    subscribeToKeplrEvents(async () => {
      return await this.connectHandler();
    });

    const ok = await this.connectHandler();
    if (!ok) {
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

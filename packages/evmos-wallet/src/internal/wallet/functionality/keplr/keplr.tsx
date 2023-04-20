import { evmosToEth } from "@evmos/address-converter";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../wallet/redux/WalletSlice";
import { store } from "../../../../redux/Store";
import { truncateAddress } from "../../style/format";
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
  NotifyWarning,
} from "../../../common/notifications/notifications";
import { KEPLR_KEY } from "../wallet";
import {
  subscribeToKeplrEvents,
  unsubscribeToKeplrEvents,
} from "./keplrHelpers";
import { SNACKBAR_CONTENT_TYPES } from "../../../../notification/types";
import {
  KEPLR_ERRORS,
  KEPLR_NOTIFICATIONS,
  KEPLR_SUCCESS_MESSAGES,
  ResultMessage,
} from "../errors";

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
    console.log("Keplr disconnect");
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
    console.log("Keplr reset");
    RemoveProviderFromLocalStorage();
  }

  async getKeplr() {
    // Promise<Keplr | undefined>
    console.log("inside getKeplr");
    if (window.keplr) {
      console.log("window.keplr inside getKeplr");
      return window.keplr;
    }

    if (document.readyState === "complete") {
      console.log('document.readyState === "complete" inside getKeplr');
      return window.keplr;
    }

    return new Promise((resolve) => {
      console.log("inside new promise");
      const documentStateChange = (event: Event) => {
        if (
          event.target &&
          (event.target as Document).readyState === "complete"
        ) {
          resolve(window.keplr);
          document.removeEventListener("readystatechange", documentStateChange);
        }
      };

      document.addEventListener("readystatechange", documentStateChange);
    });
  }

  async connectHandler() {
    console.log(await this.getKeplr(), "this.getKpelr");
    if (document.readyState === "complete") {
      console.log("Document.readyState === complete", document.readyState);
    } else {
      console.log("Document.readyState !== complete", document.readyState);
    }
    console.log(window.keplr, "window.keplr");
    if (!window.keplr) {
      console.log("connect handler !window.keplr");
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
      let accountsEvmos;
      try {
        accountsEvmos = await offlineSignerEvmos.getAccounts();
      } catch (error) {
        if (
          (error as { message: string })?.message ===
          "Please initialize ethereum app on ledger first"
        ) {
          // Init ethereum app first
          NotifyWarning(
            {
              type: SNACKBAR_CONTENT_TYPES.TEXT,
              title: "",
              text: KEPLR_NOTIFICATIONS.WarningSubtext,
            },
            this.reduxStore,
            this.notificationsEnabled
          );
        } else {
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
      const accountsOsmosis = await offlineSignerOsmosis.getAccounts();
      const accountName = (await window.keplr.getKey("osmosis-1")).name || null;
      if (!accountsOsmosis || accountsOsmosis.length === 0) {
        // Could not get accounts information
        this.reset();
        return false;
      }

      const pubkeyEvmos = accountsEvmos
        ? Buffer.from(accountsEvmos[0].pubkey).toString("base64")
        : "";
      const pubkeyOsmosis = Buffer.from(accountsOsmosis[0].pubkey).toString(
        "base64"
      );

      // let name = (await window.keplr.getKey(EVMOS_CHAIN.cosmosChainId)).name;

      this.active = true;
      store.dispatch(
        setWallet({
          active: this.active,
          extensionName: KEPLR_KEY,
          evmosAddressEthFormat: accountsEvmos
            ? evmosToEth(accountsEvmos[0].address)
            : "",
          evmosAddressCosmosFormat: accountsEvmos
            ? accountsEvmos[0].address
            : "",
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
            "Connected with wallet " +
            truncateAddress(
              accountsEvmos ? accountsEvmos[0].address : accountsEvmos
            ),
        },
        this.reduxStore,
        this.notificationsEnabled
      );
      return true;
    } catch (error) {
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
      console.log("!ok");
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

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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
import { GetProviderFromLocalStorage } from "../localstorage";

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

  async getKeplr() {
    // Promise<Keplr | undefined>
    if (window.keplr) {
      return window.keplr;
    }

    if (document.readyState === "complete") {
      return window.keplr;
    }

    return new Promise((resolve) => {
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
    const providerLocalStorage = GetProviderFromLocalStorage();
    await this.getKeplr();
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
      // show the connect snackbar only if the user clicks on connect wallet
      if (providerLocalStorage === KEPLR_KEY) {
        return true;
      }
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

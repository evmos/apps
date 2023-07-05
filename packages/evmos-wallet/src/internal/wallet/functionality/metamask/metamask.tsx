// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ethToEvmos } from "@evmos/address-converter";
import { Maybe } from "@metamask/providers/dist/utils";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../wallet/redux/WalletSlice";
import { store } from "../../../../redux/Store";
import { truncateAddress } from "../../style/format";
import {
  METAMASK_ERRORS,
  METAMASK_NOTIFICATIONS,
  METAMASK_SUCCESS_MESSAGES,
  ResultMessage,
} from "../errors";
import {
  GetProviderFromLocalStorage,
  RemoveProviderFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../localstorage";
import { EVMOS_GRPC_URL } from "../networkConfig";
import {
  NotifyError,
  NotifySuccess,
} from "../../../common/notifications/notifications";
import { queryPubKey } from "../pubkey";
import { METAMASK_KEY } from "../wallet";
import {
  changeNetworkToEvmosMainnet,
  generatePubKey,
  generatePubkeyFromSignature,
  getWallet,
  isMetamaskInstalled,
  subscribeToAccountChange,
  subscribeToChainChanged,
  unsubscribeToEvents,
} from "./metamaskHelpers";
import { SNACKBAR_CONTENT_TYPES } from "../../../../notification/types";

export class Metamask {
  active = false;
  extensionName = METAMASK_KEY;
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
    unsubscribeToEvents();
    RemoveProviderFromLocalStorage();
    return { result: true, message: METAMASK_SUCCESS_MESSAGES.Disconnected };
  }

  reset() {
    this.active = false;
    this.extensionName = METAMASK_KEY;
    this.addressCosmosFormat = "";
    this.addressEthFormat = "";
    this.evmosPubkey = null;
    this.cosmosPubkey = null;
    store.dispatch(resetWallet());
    RemoveProviderFromLocalStorage();
  }

  async connectHandler(addresses: Maybe<string[]>) {
    const providerLocalStorage = GetProviderFromLocalStorage();
    if (addresses === undefined || addresses === null) {
      this.reset();
      return;
    }
    if (addresses.length > 0 && addresses[0]) {
      this.addressEthFormat = addresses[0];
      this.addressCosmosFormat = ethToEvmos(addresses[0]);
      this.evmosPubkey = await generatePubKey(this.addressCosmosFormat);
      // TODO: if the user did not sign the pubkey, pop up a message
      if (this.evmosPubkey === null) {
        NotifyError(
          {
            type: SNACKBAR_CONTENT_TYPES.TEXT,
            title: METAMASK_NOTIFICATIONS.ErrorTitle,
            text: METAMASK_NOTIFICATIONS.PubkeySubtext,
          },
          store,
          this.notificationsEnabled
        );
        this.reset();
        return;
      }

      this.active = true;
      store.dispatch(
        setWallet({
          active: this.active,
          extensionName: METAMASK_KEY,
          evmosAddressEthFormat: this.addressEthFormat,
          evmosAddressCosmosFormat: this.addressCosmosFormat,
          evmosPubkey: this.evmosPubkey,
          osmosisPubkey: null,
          accountName: null,
        })
      );
      SaveProviderToLocalStorate(METAMASK_KEY);
      // show the connect snackbar only if the user clicks on connect wallet
      if (providerLocalStorage === METAMASK_KEY) {
        return;
      }
      NotifySuccess(
        {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: METAMASK_NOTIFICATIONS.SuccessTitle,
          text:
            "Connected with wallet " + truncateAddress(this.addressEthFormat),
        },
        store,
        this.notificationsEnabled
      );

      SaveProviderToLocalStorate(METAMASK_KEY);
      return;
    }
    this.reset();
  }

  async connect(): Promise<ResultMessage> {
    // TODO: call disconnect from the previous connected extension (if different from us)
    // Make sure that we are on the evmos chain

    if (!isMetamaskInstalled()) {
      NotifyError(
        {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: METAMASK_NOTIFICATIONS.ErrorTitle,
          text: METAMASK_NOTIFICATIONS.ExtensionNotFoundSubtext,
        },
        store,
        this.notificationsEnabled
      );
      return {
        result: false,
        message: METAMASK_NOTIFICATIONS.ExtensionNotFoundSubtext,
      };
    }

    if (!(await changeNetworkToEvmosMainnet())) {
      this.reset();

      NotifyError(
        {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: METAMASK_NOTIFICATIONS.ErrorTitle,
          text: METAMASK_NOTIFICATIONS.PubkeySubtext,
        },
        store,
        this.notificationsEnabled
      );

      return {
        result: false,
        message: METAMASK_ERRORS.ChangeNetwork,
      };
    }

    // If the user switchs networks, suggest the evmos chain again
    if (subscribeToChainChanged() === false) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.SubscribeChangeNetwork,
      };
    }

    // Set the wallet and get the pubkey
    const wallet = await getWallet();
    if (wallet === null) {
      this.reset();

      NotifyError(
        {
          type: SNACKBAR_CONTENT_TYPES.TEXT,
          title: METAMASK_NOTIFICATIONS.ErrorTitle,
          text: METAMASK_NOTIFICATIONS.AddressSubtext,
        },
        store,
        this.notificationsEnabled
      );

      return {
        result: false,
        message: METAMASK_ERRORS.GetWallet,
      };
    }

    await this.connectHandler([wallet]);
    if (this.evmosPubkey === null) {
      this.reset();
      // NOTE: the snackbar is displayed by the handler, so it can be displayed also when changing wallets
      return {
        result: false,
        message: METAMASK_ERRORS.PubkeyError,
      };
    }

    // Handle wallet changes
    subscribeToAccountChange(async (addresses: Maybe<string[]>) => {
      await this.connectHandler(addresses);
      this.active = true;
      SaveProviderToLocalStorate(METAMASK_KEY);
    });

    return {
      result: true,
      message: METAMASK_SUCCESS_MESSAGES.Connected,
    };
  }

  async generatePubKey(account: string) {
    let pubkey = await queryPubKey(EVMOS_GRPC_URL, account);
    if (pubkey === undefined) {
      pubkey = await generatePubkeyFromSignature(account);
    }
    return pubkey;
  }
}

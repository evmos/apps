import { ethToEvmos } from "@evmos/address-converter";
import { Maybe } from "@metamask/providers/dist/utils";
import {
  ReduxWalletStore,
  resetWallet,
  setWallet,
} from "../../../../components/wallet/redux/WalletSlice";
import { store } from "../../../../redux/Store";
import {
  METAMASK_ERRORS,
  METAMASK_SUCCESS_MESSAGES,
  ResultMessage,
} from "../errors";
import {
  RemoveProviderFromLocalStorage,
  SaveProviderToLocalStorate,
} from "../localstorage";
import { EVMOS_GRPC_URL } from "../networkConfig";
import { queryPubKey } from "../pubkey";
import { METAMASK_KEY } from "../wallet";
import {
  changeNetworkToEvmosMainnet,
  generatePubKey,
  generatePubkeyFromSignature,
  getWallet,
  subscribeToAccountChange,
  subscribeToChainChanged,
  unsubscribeToEvents,
} from "./metamaskHelpers";

export class Metamask {
  active = false;
  extensionName = METAMASK_KEY;
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
    if (addresses === undefined || addresses === null) {
      this.reset();
      return;
    }
    if (addresses.length > 0 && addresses[0]) {
      this.addressEthFormat = addresses[0];
      this.addressCosmosFormat = ethToEvmos(addresses[0]);
      this.evmosPubkey = await generatePubKey(this.addressCosmosFormat);
      // TODO: if the user did not sign the pubkey, pop up a message
      if (this.evmosPubkey !== null) {
        this.active = true;
        store.dispatch(
          setWallet({
            active: this.active,
            extensionName: METAMASK_KEY,
            evmosAddressEthFormat: this.addressEthFormat,
            evmosAddressCosmosFormat: this.addressCosmosFormat,
            evmosPubkey: this.evmosPubkey,
            osmosisPubkey: null,
          })
        );
        SaveProviderToLocalStorate(METAMASK_KEY);
        return;
      }
    }
    this.reset();
  }

  async connect(): Promise<ResultMessage> {
    // TODO: call disconnect from the previous connected extension (if different from us)
    // Make sure that we are on the evmos chain
    if ((await changeNetworkToEvmosMainnet()) == false) {
      this.reset();
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

    // Handle wallet changes
    subscribeToAccountChange(async (addresses: Maybe<string[]>) => {
      await this.connectHandler(addresses);
      this.active = true;
      SaveProviderToLocalStorate(METAMASK_KEY);
    });

    // Set the wallet and get the pubkey
    const wallet = await getWallet();
    if (wallet === null) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.GetWallet,
      };
    }

    await this.connectHandler([wallet]);
    if (this.evmosPubkey === null) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.PubkeyError,
      };
    }

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

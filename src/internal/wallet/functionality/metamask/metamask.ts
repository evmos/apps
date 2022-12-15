import { ethToEvmos } from "@evmos/address-converter";
import { Maybe } from "@metamask/providers/dist/utils";
import { EVMOS_GRPC_URL } from "../networkConfig";
import { queryPubKey } from "../pubkey";
import { METAMASK_KEY, WalletExtension } from "../wallet";
import {
  changeNetworkToEvmosMainnet,
  generatePubkeyFromSignature,
  getWallet,
  subscribeToAccountChange,
  subscribeToChainChanged,
  unsubscribeToEvents,
} from "./metamaskHelpers";

export class Metamask implements WalletExtension {
  active = false;
  extensionName = METAMASK_KEY;
  addressCosmosFormat = "";
  addressEthFormat = "";
  evmosPubkey: string | undefined = undefined;
  cosmosPubkey: string | undefined = undefined;
  grpcEndpoint = EVMOS_GRPC_URL;

  constructor(grpcEndpoint: string = EVMOS_GRPC_URL) {
    this.grpcEndpoint = grpcEndpoint;
  }

  disconnect() {
    this.reset();
    unsubscribeToEvents();
  }

  reset() {
    this.active = false;
    this.extensionName = METAMASK_KEY;
    this.addressCosmosFormat = "";
    this.addressEthFormat = "";
    this.evmosPubkey = undefined;
    this.cosmosPubkey = undefined;
  }

  async _connectHandler(addresses: Maybe<string[]>) {
    if (addresses === undefined || addresses === null) {
      this.reset();
      return;
    }
    if (addresses.length > 0 && addresses[0]) {
      this.addressEthFormat = addresses[0];
      this.addressCosmosFormat = ethToEvmos(addresses[0]);
      this.evmosPubkey = await this.generatePubKey(this.addressCosmosFormat);
    } else {
      this.reset();
    }
  }

  async connect() {
    // Make sure that we are on the evmos chain
    if ((await changeNetworkToEvmosMainnet()) == false) {
      this.reset();
      return false;
    }

    // If the user switchs networks, suggest the evmos chain again
    if ((await subscribeToChainChanged()) == false) {
      this.reset();
      return false;
    }

    // Handle wallet changes
    subscribeToAccountChange(this._connectHandler);

    // Set the wallet and get the pubkey
    const wallet = await getWallet();
    await this._connectHandler([wallet]);
    if (this.evmosPubkey === undefined) {
      this.reset();
      return false;
    }

    this.active = true;
    return true;
  }

  async generatePubKey(account: string) {
    let pubkey = await queryPubKey(EVMOS_GRPC_URL, account);
    if (pubkey === undefined) {
      pubkey = await generatePubkeyFromSignature(account);
    }
    return pubkey;
  }
}

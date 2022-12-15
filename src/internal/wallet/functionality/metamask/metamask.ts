import { ethToEvmos } from "@evmos/address-converter";
import { Sender, TxGenerated } from "@evmos/transactions";
import { Maybe } from "@metamask/providers/dist/utils";
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
import { RawTx, TxGeneratedByBackend } from "../signing";
import { METAMASK_KEY, WalletExtension } from "../wallet";
import {
  changeNetworkToEvmosMainnet,
  generatePubkeyFromSignature,
  getWallet,
  subscribeToAccountChange,
  subscribeToChainChanged,
  unsubscribeToEvents,
} from "./metamaskHelpers";
import {
  signBackendTxWithMetamask,
  signEvmosjsTxWithMetamask,
} from "./metamaskSigner";

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
    RemoveProviderFromLocalStorage();
    return { result: true, message: METAMASK_SUCCESS_MESSAGES.Disconnected };
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

  async connect(): Promise<ResultMessage> {
    // Make sure that we are on the evmos chain
    if ((await changeNetworkToEvmosMainnet()) == false) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.ChangeNetwork,
      };
    }

    // If the user switchs networks, suggest the evmos chain again
    if ((await subscribeToChainChanged()) == false) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.SubscribeChangeNetwork,
      };
    }

    // Handle wallet changes
    subscribeToAccountChange(this._connectHandler);

    // Set the wallet and get the pubkey
    const wallet = await getWallet();
    if (wallet === undefined) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.GetWallet,
      };
    }

    await this._connectHandler([wallet]);
    if (this.evmosPubkey === undefined) {
      this.reset();
      return {
        result: false,
        message: METAMASK_ERRORS.PubkeyError,
      };
    }

    this.active = true;
    SaveProviderToLocalStorate(METAMASK_KEY);
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

  // Signatures
  signEvmosjsTx(sender: Sender, tx: TxGenerated): Promise<RawTx | undefined> {
    return signEvmosjsTxWithMetamask(sender, tx);
  }

  signBackendTx(
    sender: string,
    tx: TxGeneratedByBackend
  ): Promise<string | undefined> {
    return signBackendTxWithMetamask(sender, tx);
  }
}

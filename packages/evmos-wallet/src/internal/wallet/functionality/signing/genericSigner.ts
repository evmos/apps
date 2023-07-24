// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Sender, TxGenerated } from "@evmos/transactions";
import { Web3Provider } from "@ethersproject/providers";

import {
  signBackendTxWithKeplr,
  signEvmosjsTxWithKeplr,
  signKeplrAmino,
} from "../keplr/keplrSigner";
import {
  signBackendTxWithMetamask,
  signEvmosjsTxWithMetamask,
} from "../metamask/metamaskSigner";
import {
  broadcastEip712BackendTxToBackend,
  broadcastSignedTxToBackend,
  RawTx,
  TxGeneratedByBackend,
} from "../signing";
import { KEPLR_KEY, METAMASK_KEY, WALLECT_CONNECT_KEY } from "../wallet";
import {
  signBackendTxWithWalletConnect,
  signEvmosjsTxWithWalletConnect,
} from "../walletconnect/walletconnectSigner";
import { wagmiConfig } from "../walletconnect/walletconnectConstants";
import { providers } from "ethers";
import { StdSignDoc } from "@keplr-wallet/types";

type EIP712Data = {
  chainId: string;
  address: string;
  signature: string;
  body: string;
  auth: string;
};

export class Signer {
  keplrBackendData: {
    tx: RawTx | null;
    eipData: EIP712Data | null;
    sender: string;
    network: string;
  } | null = null;
  metamaskBackendData: EIP712Data | null = null;
  currentExtension: string | null = null;

  reset() {
    this.keplrBackendData = null;
    this.metamaskBackendData = null;
  }

  async signEvmosjsTx(
    sender: Sender,
    tx: TxGenerated,
    chainId: string,
    currentExtension: string
  ) {
    if (currentExtension === METAMASK_KEY) {
      return signEvmosjsTxWithMetamask(sender, tx);
    }

    if (currentExtension === WALLECT_CONNECT_KEY) {
      return signEvmosjsTxWithWalletConnect(sender, tx);
    }

    if (currentExtension === KEPLR_KEY) {
      return signEvmosjsTxWithKeplr(sender, tx, chainId);
    }

    return {
      result: false,
      message: `Error signing the tx: Extension not supported`,
      transaction: null,
    };
  }

  // eslint-disable-next-line sonarjs/cognitive-complexity
  async signBackendTx(
    sender: string,
    tx: TxGeneratedByBackend,
    network: string,
    currentExtension: string
  ) {
    this.reset();
    if (
      currentExtension === METAMASK_KEY ||
      currentExtension === WALLECT_CONNECT_KEY
    ) {
      let res: {
        result: boolean;
        message: string;
        signature: null | string;
      };
      if (currentExtension === METAMASK_KEY) {
        res = await signBackendTxWithMetamask(sender, tx);
        if (res.signature === null) {
          return {
            result: res.result,
            message: res.message,
          };
        }
        this.currentExtension = METAMASK_KEY;
      } else {
        res = await signBackendTxWithWalletConnect(sender, tx);
        if (res.signature === null) {
          return {
            result: res.result,
            message: res.message,
          };
        }
        this.currentExtension = WALLECT_CONNECT_KEY;
      }

      this.metamaskBackendData = {
        chainId: tx.chainId,
        address: sender,
        signature: res.signature,
        body: tx.legacyAmino.body,
        auth: tx.legacyAmino.authInfo,
      };
      return {
        result: res.result,
        message: res.message,
      };
    }

    if (currentExtension === KEPLR_KEY) {
      const res = await signBackendTxWithKeplr(sender, tx);
      if (res.result === false) {
        return {
          result: res.result,
          message: res.message,
        };
      }

      if (res.signature) {
        // EIPTransaction
        this.keplrBackendData = {
          tx: null,
          eipData: {
            chainId: tx.chainId,
            address: sender,
            signature: res.signature,
            body: tx.legacyAmino.body,
            auth: tx.legacyAmino.authInfo,
          },
          sender,
          network,
        };
        this.currentExtension = KEPLR_KEY;
        return {
          result: res.result,
          message: res.message,
        };
      }

      if (res.transaction) {
        this.keplrBackendData = {
          tx: res.transaction,
          eipData: null,
          sender,
          network,
        };
        this.currentExtension = KEPLR_KEY;
        return {
          result: res.result,
          message: res.message,
        };
      }

      // The code must always return before reaching this point
      return {
        result: false,
        message: "Unknow error",
      };
    }

    return {
      result: false,
      message: `Error signing the tx: Extension not supported`,
    };
  }

  async signBackendTxWithAmino(
    sender: string,
    tx: TxGeneratedByBackend,
    network: string,
    currentExtension: string
  ) {
    this.reset();
    if (
      currentExtension === METAMASK_KEY ||
      currentExtension === WALLECT_CONNECT_KEY
    ) {
      return {
        result: false,
        message:
          "You can not sign amino transactions with a wallet different from Keplr",
        aminoResponse: null,
      };
    }

    if (currentExtension === KEPLR_KEY) {
      const res = await signKeplrAmino(
        tx.chainId,
        JSON.parse(tx.dataSigningAmino) as StdSignDoc
      );
      if (res.transaction === null) {
        return {
          result: res.result,
          message: res.message,
          aminoResponse: null,
        };
      }
      return {
        result: true,
        message: "",
        aminoResponse: res.transaction,
      };
    }

    return {
      result: false,
      message: `Error signing the tx: Extension not supported`,
      aminoResponse: null,
    };
  }

  // TODO: add support to broadcast EvmosJS transactions
  async broadcastTxToBackend() {
    // Metamask and wallet connect
    if (
      this.currentExtension === METAMASK_KEY ||
      this.currentExtension === WALLECT_CONNECT_KEY
    ) {
      if (this.metamaskBackendData === null) {
        return {
          error: true,
          message: `There is no transaction to be signed`,
          txhash: `0x0`,
        };
      }
      // Broadcast
      return await broadcastEip712BackendTxToBackend(
        cosmosChainIdToEth(this.metamaskBackendData.chainId),
        this.metamaskBackendData.address,
        this.metamaskBackendData.signature,
        this.metamaskBackendData.body,
        this.metamaskBackendData.auth
      );
    }

    // Keplr
    if (this.currentExtension === KEPLR_KEY) {
      if (this.keplrBackendData == null) {
        return {
          error: true,
          message: `There is no transaction to be signed`,
          txhash: `0x0`,
        };
      }

      // Broadcast
      if (this.keplrBackendData.tx !== null) {
        // ProtoTransaction
        return broadcastSignedTxToBackend(
          this.keplrBackendData.tx,
          this.keplrBackendData.network
        );
      }
      if (this.keplrBackendData.eipData !== null) {
        // EIP712 transaction
        return await broadcastEip712BackendTxToBackend(
          cosmosChainIdToEth(this.keplrBackendData.eipData.chainId),
          this.keplrBackendData.eipData.address,
          this.keplrBackendData.eipData.signature,
          this.keplrBackendData.eipData.body,
          this.keplrBackendData.eipData.auth
        );
      }
    }

    return {
      error: true,
      message: `Invalid wallet extension`,
      txhash: `0x0`,
    };
  }

  // get provider
  async getProvider(currentExtension: string) {
    if (!window.ethereum) {
      return;
    }
    if (currentExtension === METAMASK_KEY) {
      // @ts-expect-error type error
      return new Web3Provider(window.ethereum);
    }
    if (currentExtension === WALLECT_CONNECT_KEY) {
      const connector = wagmiConfig.connector;
      if (!connector) {
        return;
      }

      const provider = (await connector.getProvider({
        chainId: 9001,
      })) as providers.JsonRpcFetchFunc;

      if (!provider) {
        return;
      }

      return new Web3Provider(provider);
    }
  }
}

// TODO: move this to utils
function cosmosChainIdToEth(chainId: string) {
  const start = chainId.indexOf("_");
  const end = chainId.indexOf("-");
  if (start !== undefined && end !== undefined) {
    try {
      return parseInt(chainId.substring(start + 1, end), 10);
    } catch (e) {
      return -1;
    }
  }
  return -1;
}

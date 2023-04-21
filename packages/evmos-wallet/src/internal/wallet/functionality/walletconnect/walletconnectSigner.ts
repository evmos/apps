// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { evmosToEth } from "@evmos/address-converter";
import { Sender, TxGenerated } from "@evmos/transactions";
import { providers } from "ethers";
import { ProviderRpcError } from "wagmi";
import { EVMOS_CHAIN } from "../networkConfig";
import { createEIP712Transaction, TxGeneratedByBackend } from "../signing";
import { EthersError } from "./walletconnect";
import { wagmiClient } from "./walletconnectConstants";

export async function signEvmosjsTxWithWalletConnect(
  sender: Sender,
  tx: TxGenerated
) {
  try {
    const signer = (await wagmiClient.connector?.getSigner?.({
      chainId: 9001,
    })) as providers.JsonRpcSigner;

    if (
      signer === undefined ||
      evmosToEth(sender.accountAddress).toLowerCase() !=
        (await signer.getAddress()).toLowerCase()
    ) {
      return {
        result: false,
        message: `Error signing the tx: Wallect Connect signer could not be connected`,
        transaction: null,
      };
    }

    let signature = "";
    try {
      signature = (await signer.provider.send("eth_signTypedData_v4", [
        evmosToEth(sender.accountAddress).toLowerCase(),
        tx.eipToSign,
      ])) as string;
    } catch (error) {
      if (
        (error as ProviderRpcError).code === 4001 ||
        (error as EthersError).code === "ACTION_REJECTED"
      ) {
        return {
          result: false,
          message: `Error signing the tx: Transaction was not signed.`,
          transaction: null,
        };
      }
      return {
        result: false,
        // Disabled until catching all the possible errors
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        message: `Error signing the tx: ${error}`,
        transaction: null,
      };
    }

    const transaction = createEIP712Transaction(
      EVMOS_CHAIN,
      sender,
      signature,
      tx
    );
    return {
      result: true,
      message: "",
      transaction: transaction,
    };
  } catch (e) {
    // TODO: send custom responses for each of the knonw cases
    return {
      result: false,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Error signing the tx: ${e}`,
      transaction: null,
    };
  }
}

export async function signBackendTxWithWalletConnect(
  sender: string,
  tx: TxGeneratedByBackend
) {
  const eipToSignUTF8 = Buffer.from(tx.eipToSign, "base64").toString("utf-8");

  const signer = (await wagmiClient.connector?.getSigner?.({
    chainId: 9001,
  })) as providers.JsonRpcSigner;

  if (
    signer === undefined ||
    evmosToEth(sender).toLowerCase() !=
      (await signer.getAddress()).toLowerCase()
  ) {
    return {
      result: false,
      message: `Error signing the tx: Wallect Connect signer could not be connected`,
      signature: null,
    };
  }

  let signature = "";
  try {
    signature = (await signer.provider.send("eth_signTypedData_v4", [
      evmosToEth(sender).toLowerCase(),
      eipToSignUTF8,
    ])) as string;
    return {
      result: true,
      message: "",
      signature: signature,
    };
  } catch (error) {
    if (
      (error as ProviderRpcError).code === 4001 ||
      (error as EthersError).code === "ACTION_REJECTED"
    ) {
      return {
        result: false,
        message: `Error signing the tx: Transaction was not signed.`,
        signature: null,
      };
    }
    return {
      result: false,
      // Disabled until catching all the possible errors
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      message: `Error signing the tx: ${error}`,
      signature: null,
    };
  }
}

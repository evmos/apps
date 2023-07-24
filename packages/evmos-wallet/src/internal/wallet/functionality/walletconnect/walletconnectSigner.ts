// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { evmosToEth } from "@evmos/address-converter";
import { Sender, TxGenerated } from "@evmos/transactions";
import { providers } from "ethers";
import { EVMOS_CHAIN } from "../networkConfig";
import { createEIP712Transaction, TxGeneratedByBackend } from "../signing";
import { EthersError } from "./walletconnect";
import { wagmiConfig } from "./walletconnectConstants";
import { EIPToSign } from "@evmos/transactions";

export async function signEvmosjsTxWithWalletConnect(
  sender: Sender,
  tx: TxGenerated
) {
  try {
    const signer = await wagmiConfig.connector?.getWalletClient({
      chainId: 9001,
    });

    if (
      signer === undefined ||
      evmosToEth(sender.accountAddress).toLowerCase() !=
        signer.account.address.toLowerCase()
    ) {
      return {
        result: false,
        message: `Error signing the tx: Wallect Connect signer could not be connected`,
        transaction: null,
      };
    }

    let signature = "";
    let eip = tx.eipToSign;
    try {
      signature = (await signer.signTypedData({
        //@ts-ignore
        account: evmosToEth(sender.accountAddress).toLowerCase(),
        domain: {
          name: eip.domain.name,
          version: eip.domain.version,
          chainId: 9001,
          //@ts-ignore
          verifyingContract: eip.domain.verifyingContract,
        },
        //@ts-ignore
        types: eip.types,
        //@ts-ignore
        message: eip.message,
      })) as string;
    } catch (error) {
      if ((error as EthersError).code === "ACTION_REJECTED") {
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
  let eipToSignUTF8 = JSON.parse(
    Buffer.from(tx.eipToSign, "base64").toString("utf-8")
  ) as EIPToSign;

  const client = await wagmiConfig.connector?.getWalletClient({
    chainId: 9001,
  });

  if (
    client === undefined ||
    evmosToEth(sender).toLowerCase() != client.account.address.toLowerCase()
  ) {
    return {
      result: false,
      message: `Error signing the tx: Wallect Connect signer could not be connected`,
      signature: null,
    };
  }
  const _provider = new providers.Web3Provider(client?.transport, {
    chainId: 9001,
    name: "Evmos",
  });

  eipToSignUTF8.domain.chainId = 9001;

  let signature = "";
  try {
    signature = (await client.request({
      method: "eth_signTypedData_v4",
      //@ts-ignore
      params: [evmosToEth(sender).toLowerCase(), JSON.stringify(eipToSignUTF8)],
    })) as string;

    return {
      result: true,
      message: "",
      signature: signature,
    };
  } catch (error) {
    if ((error as EthersError).code === "ACTION_REJECTED") {
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

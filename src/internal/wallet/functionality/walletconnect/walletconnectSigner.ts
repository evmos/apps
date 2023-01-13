import { evmosToEth } from "@evmos/address-converter";
import { EIPToSign, Sender, TxGenerated } from "@evmos/transactions";
import { providers, TypedDataField } from "ethers";
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
      evmosToEth(sender.accountAddress) != (await signer.getAddress())
    ) {
      return {
        result: false,
        message: `Error signing the tx: Wallect Connect signer could not be connected`,
        transaction: null,
      };
    }

    const types_ = Object.entries(tx.eipToSign.types)
      .filter(([key]) => key !== "EIP712Domain")
      .reduce((types, [key, attributes]: [string, TypedDataField[]]) => {
        types[key] = attributes.filter((attr) => attr.type !== "EIP712Domain");
        return types;
      }, {} as Record<string, TypedDataField[]>);

    let signature = "";
    try {
      signature = await signer._signTypedData(
        tx.eipToSign.domain,
        types_,
        tx.eipToSign.message
      );
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
  const eipToSignUTF8 = JSON.parse(
    Buffer.from(tx.eipToSign, "base64").toString("utf-8")
  ) as EIPToSign;

  const signer = (await wagmiClient.connector?.getSigner?.({
    chainId: 9001,
  })) as providers.JsonRpcSigner;

  if (signer === undefined || sender != (await signer.getAddress())) {
    return {
      result: false,
      message: `Error signing the tx: Wallect Connect signer could not be connected`,
      transaction: null,
    };
  }

  const types_ = Object.entries(eipToSignUTF8.types)
    .filter(([key]) => key !== "EIP712Domain")
    .reduce((types, [key, attributes]: [string, TypedDataField[]]) => {
      types[key] = attributes.filter((attr) => attr.type !== "EIP712Domain");
      return types;
    }, {} as Record<string, TypedDataField[]>);

  let signature = "";
  try {
    // Method name may be changed in the future, see https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
    signature = await signer._signTypedData(
      eipToSignUTF8.domain,
      types_,
      eipToSignUTF8.message
    );

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
}

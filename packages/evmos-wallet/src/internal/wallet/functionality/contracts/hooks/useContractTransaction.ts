import { BigNumber } from "@ethersproject/bignumber";

import { UnsignedTransaction, ethers } from "ethers";
import { convertToKeplrTx, signKeplrTx } from "../helpers/keplr_utils";
import { JsonRpcProvider, TransactionResponse } from "@ethersproject/providers";

async function signAndSubmitKeplr(
  tx: UnsignedTransaction,
  customHttpProvider: JsonRpcProvider
) {
  const res: Uint8Array = await signKeplrTx({ ...tx });
  const serializedTx: string = ethers.utils.serializeTransaction(tx, res);

  return await customHttpProvider.sendTransaction(serializedTx);
}

export function useContractTransaction() {
  const customHttpProvider = new JsonRpcProvider(
    "https://eth.bd.evmos.org:8545/"
  );

  async function executeKeplr(
    encodedData: string,
    amount: BigNumber | null,
    contractAddress: string,
    hexAddress: string
  ): Promise<TransactionResponse> {
    const data: UnsignedTransaction = {
      data: encodedData,
      to: contractAddress,
    };

    amount ? (data["value"] = amount) : null;

    const unsignedTx = await convertToKeplrTx(
      customHttpProvider,
      hexAddress,
      data
    );

    return await signAndSubmitKeplr(unsignedTx, customHttpProvider);
  }
  return { executeKeplr } as const;
}

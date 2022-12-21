import {
  EVMOS_BACKEND,
  EVMOS_CHAIN,
} from "../../../wallet/functionality/networkConfig";
import { broadcastEip712ToBackend } from "../../../wallet/functionality/signing";
import { signBackendTx } from "../../../wallet/functionality/signing/genericSigner";
import { IBCChainParams, IBCTransferResponse, TransactionBody } from "./types";

async function createIBCTx(
  transactionBody: TransactionBody
): Promise<IBCTransferResponse> {
  const post = await fetch(`${EVMOS_BACKEND}/ibcTransfer`, {
    method: "post",
    body: JSON.stringify(transactionBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = (await post.json()) as IBCTransferResponse;
  return data;
}

export async function executeIBC(
  pubkey: string,
  address: string,
  extension: string,
  params: IBCChainParams
) {
  const txBody = {
    transaction: {
      pubKey: pubkey,
      sender: params.sender,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      dstChain: params.dstChain?.toUpperCase(),
      sender: params.sender,
      receiver: params.receiver,
      amount: params.amount,
      token: params.token,
    },
  };
  const tx = await createIBCTx(txBody);
  const sign = await signBackendTx(address, tx, extension);
  if (sign.signature !== null) {
    const broadEip712 = await broadcastEip712ToBackend(
      EVMOS_CHAIN.chainId,
      address,
      sign.signature,
      tx.legacyAmino.body,
      tx.legacyAmino.authInfo
    );
    console.log(broadEip712);
  }
}

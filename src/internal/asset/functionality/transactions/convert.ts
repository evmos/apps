import {
  EVMOS_BACKEND,
  EVMOS_CHAIN,
} from "../../../wallet/functionality/networkConfig";
import { BigNumber, utils } from "ethers";
import { signBackendTx } from "../../../wallet/functionality/signing/genericSigner";
import { broadcastEip712ToBackend } from "../../../wallet/functionality/signing";
import { TxConvert, IBCTransferResponse, ConvertMsg, ErrorTx } from "./types";

async function convertCoin(
  transactionBody: TxConvert
): Promise<IBCTransferResponse> {
  const post = await fetch(`${EVMOS_BACKEND}/convertCoin`, {
    method: "post",
    body: JSON.stringify(transactionBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = (await post.json()) as IBCTransferResponse;
  return data;
}

async function convertERC20(
  transactionBody: TxConvert
): Promise<IBCTransferResponse> {
  const post = await fetch(`${EVMOS_BACKEND}/convertERC20`, {
    method: "post",
    body: JSON.stringify(transactionBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = (await post.json()) as IBCTransferResponse;
  return data;
}

export async function executeConvert(
  pubkey: string,
  address: string,
  params: ConvertMsg,
  isConvertCoin: boolean,
  feeBalance: BigNumber,
  extension: string
) {
  const txBodyConvertCoin = {
    transaction: {
      pubKey: pubkey,
      sender: address,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      sender: params.addressCosmos,
      receiver: params.addressEth,
      amount: params.amount,
      token: params.token,
    },
  };

  const txBodyConvertERC20 = {
    transaction: {
      pubKey: pubkey,
      sender: address,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      sender: params.addressEth,
      receiver: params.addressCosmos,
      amount: params.amount,
      token: params.token,
    },
  };
  let tx: IBCTransferResponse | ErrorTx;

  if (feeBalance.lt(BigNumber.from("30000000000000000"))) {
    return;
  }

  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    return;
  }

  //  TODO: if value is bigger than amount, return error
  if (!isConvertCoin) {
    tx = await convertCoin(txBodyConvertCoin);
  } else {
    tx = await convertERC20(txBodyConvertERC20);
  }
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
  // TODO: show right notifications
  // if (isErrorTx(tx)) {
  //   return { executed: false, msg: tx.error, explorerTxUrl: "" };
  // }
}

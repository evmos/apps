import {
  EVMOS_BACKEND,
  EVMOS_CHAIN,
} from "../../../wallet/functionality/networkConfig";
import { BigNumber, utils } from "ethers";
import { signBackendTx } from "../../../wallet/functionality/signing/genericSigner";
import { broadcastEip712ToBackend } from "../../../wallet/functionality/signing";

interface LegacyAmino {
  body: string;
  authInfo: string;
  signBytes: string;
}

interface SignDirect {
  body: string;
  authInfo: string;
  signBytes: string;
}
export interface IBCTransferResponse {
  eipToSign: string;
  legacyAmino: LegacyAmino;
  signDirect: SignDirect;
  accountNumber: string;
  chainId: string;
  explorerTxUrl: string;
}

export interface Transaction {
  pubKey: string | null;
  sender: string;
  //   gas?: number | string;
}

export interface ConvertMsg {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  token: string;
}

interface TxConvert {
  transaction: Transaction;
  message: ConvertMsg;
}
export interface ErrorTx {
  error: string;
}

// function isErrorTx(object: any): object is ErrorTx {
//   return "error" in object;
// }

async function convertCoin(
  transactionBody: TxConvert
): Promise<IBCTransferResponse> {
  const post = await fetch(`${EVMOS_BACKEND}/convertCoin`, {
    method: "post",
    body: JSON.stringify(transactionBody),
    headers: { "Content-Type": "application/json" },
  });
  const data = (await post.json()) as IBCTransferResponse;
  console.log(data);
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
  pubkey: string | null,
  address: string,
  addressEth: string,
  params: ConvertMsg,
  isConvertCoin: boolean,
  feeBalance: BigNumber,
  extension: string
) {
  const txBody = {
    transaction: {
      pubKey: pubkey,
      sender: address,
    },
    message: {
      srcChain: params.srcChain.toUpperCase(),
      sender: params.sender,
      receiver: params.receiver,
      amount: params.amount,
      token: params.token,
    },
  };
  let tx: IBCTransferResponse | ErrorTx;

  if (feeBalance.lt(BigNumber.from("30000000000000000"))) {
    console.log("fee");
    return;
  }

  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    console.log("0");

    return;
  }

  //   si el valor es mayor que el amount, return
  if (!isConvertCoin) {
    console.log("entre a convert coin");
    tx = await convertCoin(txBody);
  } else {
    console.log("entre a convert erc20");

    tx = await convertERC20(txBody);
  }
  const qwe = await signBackendTx(address, tx, extension);
  console.log(qwe);
  if (qwe.signature !== null) {
    await broadcastEip712ToBackend(
      EVMOS_CHAIN.chainId,
      address,
      qwe.signature,
      tx.legacyAmino.body,
      tx.legacyAmino.authInfo
    );
  }
  // if (isErrorTx(tx)) {
  //   return { executed: false, msg: tx.error, explorerTxUrl: "" };
  // }

  // return await signAndBroadcast(
  //   activeWallet,
  //   tx,
  //   activeWallet?.evmosAddress,
  //   "EVMOS"
  // );
}

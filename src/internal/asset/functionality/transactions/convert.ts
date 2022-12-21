import {
  EVMOS_BACKEND,
  EVMOS_CHAIN,
} from "../../../wallet/functionality/networkConfig";
import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";
import { signBackendTx } from "../../../wallet/functionality/signing/genericSigner";
import { broadcastEip712ToBackend } from "../../../wallet/functionality/signing";
import { IBCTransferResponse, ConvertMsg } from "./types";
import { BIG_ZERO } from "../../../common/math/Bignumbers";

const feeAmountForConvert = BigNumber.from("30000000000000000");

async function convertCoinBackendCall(
  pubkey: string,
  address: string,
  params: ConvertMsg
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/convertCoin`, {
      method: "post",
      body: JSON.stringify({
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
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: "Error generating the transaction, please try again later",
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: "Error generating the transaction, please try again later",
      data: null,
    };
  }
}

async function convertERC20BackendCall(
  pubkey: string,
  address: string,
  params: ConvertMsg
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/convertERC20`, {
      method: "post",
      body: JSON.stringify({
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
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: "Error generating the transaction, please try again later",
        data: null,
      };
    }
    return { error: false, message: "", data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: "Error generating the transaction, please try again later",
      data: null,
    };
  }
}

export async function executeConvert(
  pubkey: string,
  address: string,
  params: ConvertMsg,
  isConvertCoin: boolean,
  feeBalance: BigNumber,
  extension: string
) {
  if (feeBalance.lt(feeAmountForConvert)) {
    return {
      error: true,
      message: "Insuficient EVMOS balance to pay the fee",
      title: "Wrong params",
    };
  }

  if (parseEther(params.amount).lte(BIG_ZERO)) {
    return {
      error: true,
      message: "Amount to send must be bigger than 0",
      title: "Wrong params",
    };
  }

  //  TODO: if value is bigger than amount, return error
  let tx;
  if (!isConvertCoin) {
    tx = await convertCoinBackendCall(pubkey, address, params);
  } else {
    tx = await convertERC20BackendCall(pubkey, address, params);
  }

  if (tx.error === true || tx.data === null) {
    // Error generating the transaction
    return { error: true, message: tx.message, title: "Error generating tx" };
  }

  const sign = await signBackendTx(address, tx.data, extension);
  if (sign.result === false || sign.signature === null) {
    return { error: true, message: sign.message, title: "Error signing tx" };
  }

  const broadcastResponse = await broadcastEip712ToBackend(
    EVMOS_CHAIN.chainId,
    address,
    sign.signature,
    tx.data.legacyAmino.body,
    tx.data.legacyAmino.authInfo
  );

  if (broadcastResponse.error === true) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: broadcastResponse.message,
      title: "Error broadcasting tx",
    };
  }

  return {
    error: true,
    message: `Transaction submit with hash: ${broadcastResponse.txhash}`,
    title: "Error broadcasting tx",
  };
}

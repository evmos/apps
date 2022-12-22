import { BigNumber, utils } from "ethers";
import {
  EVMOS_BACKEND,
  EVMOS_NETWORK_FOR_BACKEND,
} from "../../../wallet/functionality/networkConfig";
import { Signer } from "../../../wallet/functionality/signing/genericSigner";
import { IBCChainParams, IBCTransferResponse } from "./types";

const feeAmountForWithdraw = BigNumber.from("200000000000000000");

async function ibcTransferBackendCall(
  pubkey: string,
  address: string,
  params: IBCChainParams
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/ibcTransfer`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
        },
        message: {
          srcChain: params.srcChain.toUpperCase(),
          dstChain: params.dstChain?.toUpperCase(),
          sender: params.sender,
          receiver: params.receiver,
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

export async function executeIBC(
  pubkey: string,
  address: string,
  params: IBCChainParams,
  feeBalance: BigNumber,
  extension: string
) {
  if (feeBalance.lt(feeAmountForWithdraw)) {
    return {
      error: true,
      message: "Insuficient EVMOS balance to pay the fee",
      title: "Wrong params",
    };
  }

  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    return {
      error: true,
      message: "Amount to send must be bigger than 0",
      title: "Wrong params",
    };
  }

  //  TODO: if value is bigger than amount, return error
  const tx = await ibcTransferBackendCall(pubkey, address, params);
  console.log(tx);
  if (tx.error === true || tx.data === null) {
    // Error generating the transaction
    return { error: true, message: tx.message, title: "Error generating tx" };
  }

  const signer = new Signer();
  const sign = await signer.signBackendTx(
    address,
    tx.data,
    EVMOS_NETWORK_FOR_BACKEND,
    extension
  );
  if (sign.result === false) {
    return { error: true, message: sign.message, title: "Error signing tx" };
  }

  const broadcastResponse = await signer.broadcastTxToBackend();

  if (broadcastResponse.error === true) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: broadcastResponse.message,
      title: "Error broadcasting tx",
    };
  }

  return {
    error: false,
    message: `Transaction submit with hash: ${broadcastResponse.txhash}`,
    title: "Successfully broadcasted",
  };
}

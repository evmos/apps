import { BigNumber, utils } from "ethers";
import { Signer } from "../../../wallet/functionality/signing/genericSigner";
import { ibcTransferBackendCall } from "./ibcTransfer";
import { IBCChainParams } from "./types";

export async function executeDeposit(
  pubkey: string,
  address: string,
  params: IBCChainParams,
  identifier: string,
  extension: string
) {
  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    return {
      error: true,
      message: "Amount to send must be bigger than 0",
      title: "Wrong params",
    };
  }

  //  TODO: if value is bigger than amount, return error
  const tx = await ibcTransferBackendCall(pubkey, address, params);
  if (tx.error === true || tx.data === null) {
    // Error generating the transaction
    return { error: true, message: tx.message, title: "Error generating tx" };
  }

  const signer = new Signer();
  const sign = await signer.signBackendTx(
    address,
    tx.data,
    identifier,
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

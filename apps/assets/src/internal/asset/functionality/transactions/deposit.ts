import { BigNumber, utils } from "ethers";
import { checkFormatAddress } from "helpers";
import { ibcTransferBackendCall } from "./ibcTransfer";
import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  SIGNING_NOTIFICATIONS,
  IBCChainParams,
  broadcastAminoBackendTxToBackend,
  Signer,
  EVMOS_NETWORK_FOR_BACKEND,
} from "evmos-wallet";

export async function executeDeposit(
  pubkey: string,
  address: string,
  params: IBCChainParams,
  identifier: string,
  extension: string,
  prefix: string,
  chainId: string,
  chainIdentifier: string
) {
  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  if (!checkFormatAddress(params.sender, prefix)) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  const tx = await ibcTransferBackendCall(pubkey, address, params, false);
  if (tx.error === true || tx.data === null) {
    // Error generating the transaction
    return {
      error: true,
      message: tx.message,
      title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      txHash: "",
      explorerTxUrl: "",
    };
  }
  // As stride does not support amino, we sign with proto.
  if (params.srcChain.toLowerCase() === "stride") {
    const signer = new Signer();
    const sign = await signer.signBackendTx(
      address,
      tx.data,
      identifier,
      extension
    );
    if (sign.result === false) {
      return {
        error: true,
        message: sign.message,
        title: SIGNING_NOTIFICATIONS.ErrorTitle,
        txHash: "",
        explorerTxUrl: "",
      };
    }
    const broadcastResponse = await signer.broadcastTxToBackend();
    if (broadcastResponse.error === true) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: broadcastResponse.message,
        title: BROADCASTED_NOTIFICATIONS.ErrorTitle,
        txHash: "",
        explorerTxUrl: "",
      };
    }
    return {
      error: false,
      message: `${BROADCASTED_NOTIFICATIONS.SubmitTitle} ${broadcastResponse.txhash}`,
      title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
      txHash: broadcastResponse.txhash,
      explorerTxUrl: tx?.data?.explorerTxUrl,
    };
  }

  // for chains that supports amino. This allows the user
  // to use Ledger
  const signer = new Signer();
  const sign = await signer.signBackendTxWithAmino(
    address,
    tx.data,
    EVMOS_NETWORK_FOR_BACKEND,
    extension
  );
  if (sign.result === false) {
    return {
      error: true,
      message: sign.message,
      title: SIGNING_NOTIFICATIONS.ErrorTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  if (
    sign.aminoResponse === null ||
    sign.aminoResponse?.signature === undefined
  ) {
    return {
      error: true,
      message: sign.message,
      title: SIGNING_NOTIFICATIONS.ErrorTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }
  const broadcastResponse = await broadcastAminoBackendTxToBackend(
    sign.aminoResponse.signature,
    sign.aminoResponse.signed,
    chainIdentifier
  );
  if (broadcastResponse.error === true) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: broadcastResponse.message,
      title: BROADCASTED_NOTIFICATIONS.ErrorTitle,
      txHash: "",
      explorerTxUrl: "",
    };
  }

  return {
    error: false,
    message: `${BROADCASTED_NOTIFICATIONS.SubmitTitle} ${broadcastResponse.txhash}`,
    title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
    txHash: broadcastResponse.txhash,
    explorerTxUrl: tx?.data?.explorerTxUrl,
  };
}

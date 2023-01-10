import { BigNumber, utils } from "ethers";
import { EVMOS_NETWORK_FOR_BACKEND } from "../../../wallet/functionality/networkConfig";
import { Signer } from "../../../wallet/functionality/signing/genericSigner";
import { checkFormatAddress } from "../../style/format";
import {
  BROADCASTED_NOTIFICATIONS,
  GENERATING_TX_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  SIGNING_NOTIFICATIONS,
} from "./errors";
import { ibcTransferBackendCall } from "./ibcTransfer";
import { IBCChainParams } from "./types";

const feeAmountForWithdraw = BigNumber.from("200000000000000000");

export async function executeWithdraw(
  pubkey: string,
  address: string,
  params: IBCChainParams,
  feeBalance: BigNumber,
  extension: string,
  useERC20Denom: boolean
) {
  if (feeBalance.lt(feeAmountForWithdraw)) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
      txHash: "",
    };
  }

  if (utils.parseEther(params.amount).lte(BigNumber.from("0"))) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
      txHash: "",
    };
  }

  if (!checkFormatAddress(params.sender, "evmos")) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
      txHash: "",
    };
  }
  // TODO: add prefix when the value is in ERC20ModuleBalance endpoint
  if (!checkFormatAddress(params.receiver, "juno")) {
    return {
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
      txHash: "",
    };
  }

  const tx = await ibcTransferBackendCall(
    pubkey,
    address,
    params,
    useERC20Denom
  );
  if (tx.error === true || tx.data === null) {
    // Error generating the transaction
    return {
      error: true,
      message: tx.message,
      title: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      txHash: "",
    };
  }

  const signer = new Signer();
  const sign = await signer.signBackendTx(
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
    };
  }

  if (sign.result === true && sign.message == "") {
    return {
      error: true,
      message: sign.message,
      title: SIGNING_NOTIFICATIONS.ErrorTitle,
      txHash: "",
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
    };
  }

  return {
    error: false,
    message: `${BROADCASTED_NOTIFICATIONS.SubmitTitle} ${broadcastResponse.txhash}`,
    title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
    txHash: broadcastResponse.txhash,
  };
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";

import {
  ConvertMsg,
  BROADCASTED_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  WalletExtension,
  mapExecuteResponse,
  executeApiTransaction,
  apiConvertCoin,
  apiConvertERC20,
} from "evmos-wallet";
import { raise } from "helpers";
const feeAmountForConvert = BigNumber.from("30000000000000000");

export const executeConvert = async (
  wallet: WalletExtension,
  params: ConvertMsg,
  isERC20Selected: boolean,
  feeBalance: BigNumber
) => {
  if (feeBalance.lt(feeAmountForConvert)) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
    });
  }

  if (parseEther(params.amount).lte(BigNumber.from(0))) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
    });
  }

  const apiFn = isERC20Selected ? apiConvertCoin : apiConvertERC20;
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiFn({
      address: wallet.evmosAddressCosmosFormat,
      pubkey: wallet.evmosPubkey ?? raise("ACCOUNT_NOT_FOUND"),
      params,
    })
  );
  if (error) {
    return mapExecuteResponse({
      error: true,
      message: error.message,
      title: BROADCASTED_NOTIFICATIONS.ErrorTitle,
    });
  }
  return mapExecuteResponse({
    error: false,
    message: `${BROADCASTED_NOTIFICATIONS.SubmitTitle} ${hash}`,
    title: BROADCASTED_NOTIFICATIONS.SuccessTitle,
    txHash: hash,
    explorerTxUrl: apiResponse.explorerTxUrl,
  });
};

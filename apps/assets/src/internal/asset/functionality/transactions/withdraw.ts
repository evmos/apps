// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { FEE_WITHDRAW } from "constants-helper";
import { checkFormatAddress, raise } from "helpers";

import {
  BROADCASTED_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  IBCChainParams,
  executeApiTransaction,
  apiIBCTransfer,
  mapExecuteResponse,
  WalletExtension,
} from "evmos-wallet";
import { BigNumber } from "@ethersproject/bignumber";
import { parseEther } from "@ethersproject/units";

export const executeWithdraw = async (
  wallet: WalletExtension,
  params: IBCChainParams,
  feeBalance: BigNumber,
  useERC20Denom: boolean
) => {
  if (feeBalance.lt(BigNumber.from(FEE_WITHDRAW))) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorInsufficientFeeSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
    });
  }

  if (parseEther(params.amount).lte(BigNumber.from("0"))) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
    });
  }

  if (!checkFormatAddress(params.sender, "evmos")) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
    });
  }
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiIBCTransfer({
      params,
      useERC20Denom,
      address: wallet.evmosAddressCosmosFormat,
      pubkey: wallet.evmosPubkey ?? raise("ACCOUNT_NOT_FOUND"),
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

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import {
  BROADCASTED_NOTIFICATIONS,
  executeApiTransaction,
  apiStakingRedelegate,
  mapExecuteResponse,
} from "evmos-wallet";

import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { raise } from "helpers";

export const executeRedelegate = async (
  wallet: WalletExtension,
  valAddress: string,
  amount: BigNumber,
  valDstAddress: string
) => {
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiStakingRedelegate({
      amount: amount.toString(),
      fromValidatorAddress: valAddress,
      toValidatorAddress: valDstAddress,
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

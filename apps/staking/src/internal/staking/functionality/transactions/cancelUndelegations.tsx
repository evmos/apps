// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  BROADCASTED_NOTIFICATIONS,
  apiStakingCancelUndelegation,
  executeApiTransaction,
  mapExecuteResponse,
} from "evmos-wallet";

import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { BigNumber } from "@ethersproject/bignumber";
import { raise } from "helpers";

export const executeCancelUndelegations = async (
  wallet: WalletExtension,
  valAddress: string,
  amount: BigNumber,
  creationHeight: string
) => {
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiStakingCancelUndelegation({
      amount: amount.toString(),
      validatorAddress: valAddress,
      creationHeight,
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

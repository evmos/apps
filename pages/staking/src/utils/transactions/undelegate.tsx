// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import {
  BROADCASTED_NOTIFICATIONS,
  executeApiTransaction,
  mapExecuteResponse,
  apiStakingUndelegate,
} from "@evmosapps/evmos-wallet";

import { WalletExtension } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/wallet";
import { raise } from "helpers";

export const executeUndelegate = async (
  wallet: WalletExtension,
  valAddress: string,
  amount: BigNumber
) => {
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiStakingUndelegate({
      amount: amount.toString(),
      validatorAddress: valAddress,
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

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  BROADCASTED_NOTIFICATIONS,
  apiVote,
  executeApiTransaction,
  mapExecuteResponse,
} from "evmos-wallet";
import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { raise } from "helpers";

export const executeVote = async (
  wallet: WalletExtension,
  id: string,
  option: number
) => {
  const { apiResponse, error, hash } = await executeApiTransaction(() =>
    apiVote({
      address: wallet.evmosAddressCosmosFormat,
      pubkey: wallet.evmosPubkey ?? raise("ACCOUNT_NOT_FOUND"),
      id,
      option,
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

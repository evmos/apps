// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { checkFormatAddress } from "helpers";
import {
  BROADCASTED_NOTIFICATIONS,
  MODAL_NOTIFICATIONS,
  IBCChainParams,
  mapExecuteResponse,
  executeApiTransaction,
  apiIBCTransfer,
  signApiAminoTx,
} from "evmos-wallet";
import { parseEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

export const executeDeposit = async (
  pubkey: string,
  address: string,
  params: IBCChainParams,
  prefix: string,
  chainIdentifier: string
) => {
  if (parseEther(params.amount).lte(BigNumber.from("0"))) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorZeroAmountSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAmountTitle,
    });
  }

  if (!checkFormatAddress(params.sender, prefix)) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
    });
  }

  if (!checkFormatAddress(params.sender, prefix)) {
    return mapExecuteResponse({
      error: true,
      message: MODAL_NOTIFICATIONS.ErrorAddressSubtext,
      title: MODAL_NOTIFICATIONS.ErrorAddressTitle,
    });
  }
  const { apiResponse, error, hash } = await executeApiTransaction(
    () =>
      apiIBCTransfer({
        pubkey,
        params,
        address,
        useERC20Denom: true,
      }),
    (response) => signApiAminoTx(response, chainIdentifier)
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

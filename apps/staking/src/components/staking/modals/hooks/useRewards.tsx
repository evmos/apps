// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { snackExecuteIBCTransfer } from "evmos-wallet";
import { executeRewards } from "../../../../internal/staking/functionality/transactions/rewards";
import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { useCallback } from "react";

export const useRewards = (value: WalletExtension) => {
  const dispatch = useDispatch();

  const handleConfirmButton = useCallback(async () => {
    const res = await executeRewards(value);

    dispatch(snackExecuteIBCTransfer(res));
  }, [dispatch, value]);
  return { handleConfirmButton };
};

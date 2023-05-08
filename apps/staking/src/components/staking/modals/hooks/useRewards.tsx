// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { snackExecuteIBCTransfer } from "evmos-wallet";
import { executeRewards } from "../../../../internal/staking/functionality/transactions/rewards";
import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { useCallback } from "react";
import { CLICK_CLAIM_REWARDS_TOPBAR, useTracker } from "tracker";

export const useRewards = (value: WalletExtension, totalRewards: number) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_CLAIM_REWARDS_TOPBAR, {
    amount: totalRewards,
  });
  const handleConfirmButton = useCallback(async () => {
    handlePreClickAction();
    const res = await executeRewards(value);
    dispatch(snackExecuteIBCTransfer(res));
  }, [dispatch, value, totalRewards]);
  return { handleConfirmButton };
};

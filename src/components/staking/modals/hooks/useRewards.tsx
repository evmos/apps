import { useDispatch } from "react-redux";
import { snackExecuteIBCTransfer } from "../../../../internal/asset/style/snackbars";
import { executeRewards } from "../../../../internal/staking/functionality/transactions/rewards";
import { WalletExtension } from "../../../../internal/wallet/functionality/wallet";
import { useCallback } from "react";

export const useRewards = (value: WalletExtension) => {
  const dispatch = useDispatch();

  const handleConfirmButton = useCallback(async () => {
    const res = await executeRewards(value);

    dispatch(snackExecuteIBCTransfer(res));
  }, [dispatch, value]);
  return { handleConfirmButton };
};

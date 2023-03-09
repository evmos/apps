import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils.js";
import { useDispatch } from "react-redux";
import { BROADCASTED_NOTIFICATIONS } from "../../../../internal/asset/functionality/transactions/errors";
import {
  snackbarExecutedTx,
  snackbarIncludedInBlock,
  snackbarWaitingBroadcast,
} from "../../../../internal/asset/style/format";
import { snackExecuteIBCTransfer } from "../../../../internal/asset/style/snackbars";
import { executeDelegate } from "../../../../internal/staking/functionality/transactions/delegate";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { DelegateProps } from "../types";

export const useDelegation = (useDelegateProps: DelegateProps) => {
  const dispatch = useDispatch();

  const handleConfirmButton = async () => {
    useDelegateProps.setConfirmClicked(true);
    if (
      useDelegateProps.value === undefined ||
      useDelegateProps.value === null ||
      useDelegateProps.value === "" ||
      Number(useDelegateProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(useDelegateProps.value, BigNumber.from(18));

    if (amount.gt(useDelegateProps.evmosBalance)) {
      return;
    }
    // TODO: check amount: empty, greater than...
    const res = await executeDelegate(
      useDelegateProps.wallet,
      useDelegateProps.item.validatorAddress,
      amount
    );

    dispatch(snackExecuteIBCTransfer(res));
    useDelegateProps.setShow(false);
    // check if tx is executed
    if (res.title === BROADCASTED_NOTIFICATIONS.SuccessTitle) {
      dispatch(snackbarWaitingBroadcast());
      dispatch(
        await snackbarIncludedInBlock(
          res.txHash,
          EVMOS_SYMBOL,
          res.explorerTxUrl
        )
      );
      // TODO: it is failing, remove it?
      dispatch(await snackbarExecutedTx(res.txHash, EVMOS_SYMBOL));
    }
  };
  return { handleConfirmButton };
};

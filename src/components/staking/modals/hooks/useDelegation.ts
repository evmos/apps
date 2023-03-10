import { BigNumber } from "ethers";
import { parseUnits } from "@ethersproject/units";
import { useDispatch } from "react-redux";
import { snackExecuteIBCTransfer } from "../../../../internal/asset/style/snackbars";
import { executeDelegate } from "../../../../internal/staking/functionality/transactions/delegate";
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

    useDelegateProps.setDisabled(true);

    const res = await executeDelegate(
      useDelegateProps.wallet,
      useDelegateProps.item.validatorAddress,
      amount
    );

    dispatch(snackExecuteIBCTransfer(res));
    useDelegateProps.setShow(false);
  };
  return { handleConfirmButton };
};

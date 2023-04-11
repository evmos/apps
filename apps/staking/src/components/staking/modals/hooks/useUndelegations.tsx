import { useDispatch } from "react-redux";
import { UndelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { executeUndelegate } from "../../../../internal/staking/functionality/transactions/undelegate";
import { snackExecuteIBCTransfer } from "evmos-wallet";

export const useUndelegation = (useUndelegateProps: UndelegateProps) => {
  const dispatch = useDispatch();

  const handleConfirmButton = async () => {
    useUndelegateProps.setConfirmClicked(true);
    if (
      useUndelegateProps.value === undefined ||
      useUndelegateProps.value === null ||
      useUndelegateProps.value === "" ||
      Number(useUndelegateProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(useUndelegateProps.value, BigNumber.from(18));

    if (amount.gt(useUndelegateProps.item.balance)) {
      return;
    }

    useUndelegateProps.setDisabled(true);

    const res = await executeUndelegate(
      useUndelegateProps.wallet,
      useUndelegateProps.item.validatorAddress,
      amount
    );
    dispatch(snackExecuteIBCTransfer(res));
    useUndelegateProps.setShow(false);
  };

  return { handleConfirmButton };
};

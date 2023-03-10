import { useDispatch } from "react-redux";
import { RedelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { executeRedelegate } from "../../../../internal/staking/functionality/transactions/redelegate";
import { snackExecuteIBCTransfer } from "../../../../internal/asset/style/snackbars";

export const useRedelegation = (useRedelegateProps: RedelegateProps) => {
  const dispatch = useDispatch();

  //   async
  const handleConfirmButton = async () => {
    useRedelegateProps.setConfirmClicked(true);
    if (
      useRedelegateProps.value === undefined ||
      useRedelegateProps.value === null ||
      useRedelegateProps.value === "" ||
      Number(useRedelegateProps.value) === 0 ||
      useRedelegateProps.validatorDst === undefined ||
      useRedelegateProps.validatorDst === null ||
      useRedelegateProps.validatorDst === ""
    ) {
      return;
    }
    const amount = parseUnits(useRedelegateProps.value, BigNumber.from(18));

    if (amount.gt(useRedelegateProps.item.balance)) {
      return;
    }

    useRedelegateProps.setDisabled(true);
    const res = await executeRedelegate(
      useRedelegateProps.wallet,
      useRedelegateProps.item.validatorAddress,
      amount,
      useRedelegateProps.validatorDst
    );
    dispatch(snackExecuteIBCTransfer(res));
    useRedelegateProps.setShow(false);
  };

  return { handleConfirmButton };
};

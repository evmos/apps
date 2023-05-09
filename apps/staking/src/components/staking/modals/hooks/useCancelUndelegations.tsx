// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { CancelUndelegationsProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { snackExecuteIBCTransfer } from "evmos-wallet";
import { executeCancelUndelegations } from "../../../../internal/staking/functionality/transactions/cancelUndelegations";
import { CLICK_CONFIRM_CANCEL_UNDELEGATION_BUTTON, useTracker } from "tracker";

export const useCancelUndelegations = (
  useCancelUndelegationProps: CancelUndelegationsProps
) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(
    CLICK_CONFIRM_CANCEL_UNDELEGATION_BUTTON
  );
  //   async
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: useCancelUndelegationProps?.wallet?.evmosAddressEthFormat,
      provider: useCancelUndelegationProps?.wallet?.extensionName,
    });
    useCancelUndelegationProps.setConfirmClicked(true);
    if (
      useCancelUndelegationProps.value === undefined ||
      useCancelUndelegationProps.value === null ||
      useCancelUndelegationProps.value === "" ||
      Number(useCancelUndelegationProps.value) === 0
    ) {
      return;
    }
    const amount = parseUnits(
      useCancelUndelegationProps.value,
      BigNumber.from(18)
    );

    if (amount.gt(BigNumber.from(useCancelUndelegationProps.item.balance))) {
      return;
    }

    useCancelUndelegationProps.setDisabled(true);
    const res = await executeCancelUndelegations(
      useCancelUndelegationProps.wallet,
      useCancelUndelegationProps.item.validatorAddress,
      amount,
      useCancelUndelegationProps.item.creationHeight
    );
    dispatch(snackExecuteIBCTransfer(res));
    useCancelUndelegationProps.setShow(false);
  };

  return { handleConfirmButton };
};

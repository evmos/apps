// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { RedelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { executeRedelegate } from "../../../../internal/staking/functionality/transactions/redelegate";
import { snackExecuteIBCTransfer } from "evmos-wallet";
import {
  CLICK_BUTTON_CONFIRM_REDELEGATE,
  useTracker,
  SUCCESSFUL_TX_REDELEGATE,
  UNSUCCESSFUL_TX_REDELEGATE,
} from "tracker";
export const useRedelegation = (useRedelegateProps: RedelegateProps) => {
  const dispatch = useDispatch();

  const { handlePreClickAction } = useTracker(CLICK_BUTTON_CONFIRM_REDELEGATE);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_REDELEGATE
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_REDELEGATE
  );
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: useRedelegateProps?.wallet?.evmosAddressEthFormat,
      provider: useRedelegateProps?.wallet?.extensionName,
    });
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
    if (res.error === true) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: useRedelegateProps.wallet?.evmosAddressEthFormat,
        provider: useRedelegateProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    } else {
      successfulTx({
        txHash: res.txHash,
        wallet: useRedelegateProps.wallet?.evmosAddressEthFormat,
        provider: useRedelegateProps.wallet?.extensionName,
        transaction: "successful",
      });
    }
    useRedelegateProps.setShow(false);
  };

  return { handleConfirmButton };
};

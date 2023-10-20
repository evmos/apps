// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useDispatch } from "react-redux";
import { snackExecuteIBCTransfer } from "evmos-wallet";
import { executeDelegate } from "../../../../internal/staking/functionality/transactions/delegate";
import { DelegateProps } from "../types";
import {
  CLICK_BUTTON_CONFIRM_DELEGATE,
  useTracker,
  SUCCESSFUL_TX_DELEGATE,
  UNSUCCESSFUL_TX_DELEGATE,
} from "tracker";

export const useDelegation = (useDelegateProps: DelegateProps) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_BUTTON_CONFIRM_DELEGATE);
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_DELEGATE
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_DELEGATE
  );
  const handleConfirmButton = async () => {
    handlePreClickAction({
      wallet: useDelegateProps?.wallet?.evmosAddressEthFormat,
      provider: useDelegateProps?.wallet?.extensionName,
    });
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

    if (
      useDelegateProps.evmosBalance.eq(BigNumber.from(-1)) ||
      amount.gt(useDelegateProps.evmosBalance)
    ) {
      return;
    }

    useDelegateProps.setDisabled(true);

    const res = await executeDelegate(
      useDelegateProps.wallet,
      useDelegateProps.item.validatorAddress,
      amount
    );

    dispatch(snackExecuteIBCTransfer(res));
    if (res.error === true) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: useDelegateProps.wallet?.evmosAddressEthFormat,
        provider: useDelegateProps.wallet?.extensionName,
        transaction: "unsuccessful",
      });
    } else {
      successfulTx({
        txHash: res.txHash,
        wallet: useDelegateProps.wallet?.evmosAddressEthFormat,
        provider: useDelegateProps.wallet?.extensionName,
        transaction: "successful",
      });
    }
    useDelegateProps.setShow(false);
  };
  return { handleConfirmButton };
};

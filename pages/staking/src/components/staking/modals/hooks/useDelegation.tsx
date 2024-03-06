// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { BigNumber } from "@ethersproject/bignumber";
import { parseUnits } from "@ethersproject/units";
import { useDispatch } from "react-redux";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "@evmosapps/evmos-wallet";
import { DelegateProps } from "../types";
import {
  SUCCESSFUL_TX_DELEGATE,
  UNSUCCESSFUL_TX_DELEGATE,
  sendEvent,
} from "tracker";

import { EXPLORER_URL } from "constants-helper";
import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";

import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";

export const useDelegation = (useDelegateProps: DelegateProps) => {
  const dispatch = useDispatch();

  const { delegate } = useStakingPrecompile();
  const handleConfirmButton = async () => {
    const [err] = await E.try(() => switchToEvmosChain());
    if (err) return;

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

    try {
      const hash = await delegate(
        useDelegateProps.wallet.evmosAddressEthFormat,
        useDelegateProps.item.validatorAddress,
        amount,
      );

      dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx`));

      sendEvent(SUCCESSFUL_TX_DELEGATE, {
        "User Wallet Address": useDelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useDelegateProps.wallet?.extensionName,
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      sendEvent(UNSUCCESSFUL_TX_DELEGATE, {
        "User Wallet Address": useDelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useDelegateProps.wallet?.extensionName,
        // TODO: we should update this error. Show the correct message for the error
        "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      });
    }

    useDelegateProps.setIsOpen(false);
  };
  return { handleConfirmButton };
};

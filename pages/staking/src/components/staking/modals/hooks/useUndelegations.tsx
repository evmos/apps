// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { UndelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "@evmosapps/evmos-wallet";

import {
  SUCCESSFUL_TX_UNDELEGATE,
  UNSUCCESSFUL_TX_UNDELEGATE,
  sendEvent,
} from "tracker";

import { EXPLORER_URL } from "@evmosapps/constants";

import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";

import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";

export const useUndelegation = (useUndelegateProps: UndelegateProps) => {
  const dispatch = useDispatch();

  const { undelegate } = useStakingPrecompile();
  const handleConfirmButton = async () => {
    const [err] = await E.try(() => switchToEvmosChain());
    if (err) return;
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

    try {
      const hash = await undelegate(
        useUndelegateProps.wallet.evmosAddressEthFormat,
        useUndelegateProps.item.validatorAddress,
        amount,
      );

      dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx`));

      sendEvent(SUCCESSFUL_TX_UNDELEGATE, {
        "User Wallet Address": useUndelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useUndelegateProps.wallet?.extensionName,
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      sendEvent(UNSUCCESSFUL_TX_UNDELEGATE, {
        "User Wallet Address": useUndelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useUndelegateProps.wallet?.extensionName,
        // TODO: we should update this error. Show the correct message for the error
        "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      });
    }
    useUndelegateProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};

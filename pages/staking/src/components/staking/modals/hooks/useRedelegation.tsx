// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { RedelegateProps } from "../types";
import { parseUnits } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";
import {
  GENERATING_TX_NOTIFICATIONS,
  snackBroadcastSuccessful,
  snackErrorGeneratingTx,
} from "@evmosapps/evmos-wallet";
import {
  SUCCESSFUL_TX_REDELEGATE,
  UNSUCCESSFUL_TX_REDELEGATE,
  sendEvent,
} from "tracker";

import { EXPLORER_URL } from "@evmosapps/constants";

import { E } from "helpers";
import { useStakingPrecompile } from "../../../../utils/hooks/useStakingPrecompile";
import { switchToEvmosChain } from "@evmosapps/evmos-wallet/src/wallet/actions/switchToEvmosChain";

export const useRedelegation = (useRedelegateProps: RedelegateProps) => {
  const dispatch = useDispatch();

  const { redelegate } = useStakingPrecompile();
  const handleConfirmButton = async () => {
    const [err] = await E.try(() => switchToEvmosChain());
    if (err) return;

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
    try {
      const hash = await redelegate(
        useRedelegateProps.wallet.evmosAddressEthFormat,
        useRedelegateProps.item.validatorAddress,
        useRedelegateProps.validatorDst,
        amount,
      );

      dispatch(snackBroadcastSuccessful(hash, `${EXPLORER_URL}/tx`));

      sendEvent(SUCCESSFUL_TX_REDELEGATE, {
        "User Wallet Address": useRedelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useRedelegateProps.wallet?.extensionName,
      });
    } catch (e) {
      dispatch(snackErrorGeneratingTx());
      sendEvent(UNSUCCESSFUL_TX_REDELEGATE, {
        "User Wallet Address": useRedelegateProps.wallet?.evmosAddressEthFormat,
        "Wallet Provider": useRedelegateProps.wallet?.extensionName,
        // TODO: we should update this error. Show the correct message for the error
        "Error Message": GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      });
    }
    useRedelegateProps.setIsOpen(false);
  };

  return { handleConfirmButton };
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useDispatch } from "react-redux";
import { executeRewards } from "./rewards";
import { useCallback } from "react";
import {
  CLICK_CLAIM_REWARDS_BUTTON,
  SUCCESSFUL_TX_CLAIM_REWARDS,
  UNSUCCESSFUL_TX_CLAIM_REWARDS,
  sendEvent,
} from "tracker";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { snackExecuteIBCTransfer } from "../../notification/helpers";
import { E } from "helpers";
import { switchToEvmosChain } from "../../wallet/actions/switchToEvmosChain";

type RewardsProps = {
  wallet: WalletExtension;
  setConfirmClicked: (value: boolean) => void;
};

export const useRewards = (rewardsProps: RewardsProps) => {
  const dispatch = useDispatch();
  const { wallet: value, setConfirmClicked } = rewardsProps;
  const handleConfirmButton = useCallback(async () => {
    const [err] = await E.try(() => switchToEvmosChain());
    if (err) return;

    sendEvent(CLICK_CLAIM_REWARDS_BUTTON, {
      "User Wallet Address": value?.evmosAddressEthFormat,
      "Wallet Provider": value?.extensionName,
    });

    setConfirmClicked(true);
    const res = await executeRewards(value);
    if (res.error === true) {
      sendEvent(UNSUCCESSFUL_TX_CLAIM_REWARDS, {
        "User Wallet Address": value?.evmosAddressEthFormat,
        "Wallet Provider": value?.extensionName,
        "Error Message": res.message,
      });
    } else {
      sendEvent(SUCCESSFUL_TX_CLAIM_REWARDS, {
        "User Wallet Address": value?.evmosAddressEthFormat,
        "Wallet Provider": value?.extensionName,
      });
    }
    setConfirmClicked(false);
    dispatch(snackExecuteIBCTransfer(res));
  }, [dispatch, value, setConfirmClicked]);
  return { handleConfirmButton };
};

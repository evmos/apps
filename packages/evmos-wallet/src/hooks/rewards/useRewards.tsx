"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useDispatch } from "react-redux";
import { executeRewards } from "./rewards";
import { useCallback } from "react";
import {
  CLICK_CLAIM_REWARDS_TOPBAR,
  useTracker,
  SUCCESSFUL_TX_CLAIM_REWARDS,
  UNSUCCESSFUL_TX_CLAIM_REWARDS,
} from "tracker";
import { WalletExtension } from "../../internal/wallet/functionality/wallet";
import { snackExecuteIBCTransfer } from "../../notification/helpers";
import { getNetwork, switchNetwork } from "wagmi/actions";
import { getEvmosChainInfo } from "../../wallet/wagmi/chains";
import { E } from "helpers";

const evmos = getEvmosChainInfo();

export const useRewards = (value: WalletExtension, totalRewards: number) => {
  const dispatch = useDispatch();
  const { handlePreClickAction } = useTracker(CLICK_CLAIM_REWARDS_TOPBAR, {
    amount: totalRewards,
  });
  const { handlePreClickAction: successfulTx } = useTracker(
    SUCCESSFUL_TX_CLAIM_REWARDS
  );
  const { handlePreClickAction: unsuccessfulTx } = useTracker(
    UNSUCCESSFUL_TX_CLAIM_REWARDS
  );
  const handleConfirmButton = useCallback(async () => {
    const connectedNetwork = getNetwork();
    if (connectedNetwork.chain?.id !== evmos.id) {
      const [err] = await E.try(() =>
        switchNetwork({
          chainId: evmos.id,
        })
      );
      if (err) return;
    }
    handlePreClickAction({
      wallet: value?.evmosAddressEthFormat,
      provider: value?.extensionName,
    });
    const res = await executeRewards(value);
    if (res.error === true) {
      unsuccessfulTx({
        errorMessage: res.message,
        wallet: value?.evmosAddressEthFormat,
        provider: value?.extensionName,
        transaction: "unsuccessful",
      });
    } else {
      successfulTx({
        txHash: res.txHash,
        wallet: value?.evmosAddressEthFormat,
        provider: value?.extensionName,
        transaction: "successful",
      });
    }
    dispatch(snackExecuteIBCTransfer(res));
  }, [dispatch, value, handlePreClickAction, unsuccessfulTx, successfulTx]);
  return { handleConfirmButton };
};

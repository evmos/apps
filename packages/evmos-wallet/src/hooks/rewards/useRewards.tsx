// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useEffect, useState } from "react";
import {
  SUCCESSFUL_TX_CLAIM_REWARDS,
  UNSUCCESSFUL_TX_CLAIM_REWARDS,
  sendEvent,
} from "tracker";
import { useEffectEvent } from "helpers";
import { switchToEvmosChain } from "../../wallet/actions/switchToEvmosChain";
import { useEvmosChainRef } from "../../registry-actions/hooks/use-evmos-chain-ref";
import { useAccount } from "wagmi";
import { getRewards } from "./getRewards";
import { useSignTypedDataMessage } from "../../registry-actions/hooks/use-sign-typed-message";
import { MsgWithdrawDelegatorReward } from "@buf/cosmos_cosmos-sdk.bufbuild_es/cosmos/distribution/v1beta1/tx_pb";
import { normalizeToCosmos } from "helpers/src/crypto/addresses/normalize-to-cosmos";
import { getActiveProviderKey } from "../../wallet/actions/getActiveProviderKey";
import { alertsManager } from "@evmosapps/ui/components/alert/alert-manager.tsx";
import Link from "next/link";

export const useRewards = () => {
  const chainRef = useEvmosChainRef();
  const { address } = useAccount();
  const { mutateAsync, data, error, isPending, ...rest } =
    useSignTypedDataMessage();
  const [rewardsDataPending, setRewardsDataPending] = useState(false);

  const claimRewards = useEffectEvent(async () => {
    try {
      if (rewardsDataPending) return;
      if (!address) return;
      setRewardsDataPending(true);
      await switchToEvmosChain();
      const rewards = await getRewards(chainRef, address);

      return await mutateAsync({
        messages: rewards.map(
          (reward) =>
            new MsgWithdrawDelegatorReward({
              delegatorAddress: normalizeToCosmos(address),
              validatorAddress: reward.validatorAddress,
            }),
        ),
        gasLimit: 600000n,
      });
    } finally {
      setRewardsDataPending(false);
    }
  });

  const onError = useEffectEvent(() => {
    if (!error) return;

    sendEvent(UNSUCCESSFUL_TX_CLAIM_REWARDS, {
      "User Wallet Address": address,
      "Wallet Provider": getActiveProviderKey(),
      "Error Message": error.message,
    });

    alertsManager.error({
      title: "Failed to claim rewards",
    });
  });

  useEffect(onError, [error, onError]);

  const onSuccess = useEffectEvent(() => {
    if (!data) return;
    sendEvent(SUCCESSFUL_TX_CLAIM_REWARDS, {
      "User Wallet Address": address,
      "Wallet Provider": getActiveProviderKey(),
    });

    alertsManager.success({
      title: "Rewards claimed",
      message: (
        <Link
          href={`https://escan.live/tx/${data.tx_response.txhash}`}
          target="_blank"
        >
          Tx: {data.tx_response.txhash?.slice(0, 18)}...
        </Link>
      ),
    });
  });

  useEffect(onSuccess, [data, onSuccess]);
  

  return {
    claimRewards,
    data,
    error,
    isPending: isPending || rewardsDataPending,
    ...rest,
  };
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useMemo } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { raise } from "helpers";
import { useTrpcQuery } from "@evmosapps/trpc/client";
import { useAccount } from "wagmi";
import { useEvmosChainRef } from "../registry-actions/hooks/use-evmos-chain-ref";
import { safeBigInt } from "helpers/src/bigint/safe-bigint";

export const useStakingInfo = () => {
  const { address } = useAccount();

  const chainRef = useEvmosChainRef();

  const stakingInfo = useTrpcQuery((t) =>
    t.legacy.stakingInfo({
      address: address ?? raise("Address not found"),
      chainRef,
    }),
  );

  const totalDelegations = useMemo(() => {
    let total = BigNumber.from(0);
    if (stakingInfo.data !== undefined) {
      const sum = stakingInfo.data.delegations.reduce((prev, curr) => {
        return prev.add(BigNumber.from(curr?.balance.amount));
      }, total);
      total = sum ? sum : BigNumber.from(0);

      return total;
    }

    return total;
  }, [stakingInfo]);

  const totalUndelegations = useMemo(() => {
    let total = BigNumber.from(0);
    if (stakingInfo.data !== undefined) {
      // for each validator, get the undelegations balances
      // that are in the entries array
      stakingInfo.data.undelegations.map((validator) => {
        const sum = validator.entries.reduce((prev, curr) => {
          return prev.add(BigNumber.from(curr?.balance));
        }, total);
        total = sum ? sum : BigNumber.from(0);
      });
      return total;
    }
    return total;
  }, [stakingInfo]);

  const totalRewards = useMemo(() => {
    const total = stakingInfo?.data?.rewards?.total?.[0]?.amount ?? "0";
    return safeBigInt(total);
  }, [stakingInfo]);

  const delegations = useMemo(() => {
    const delegations = [...(stakingInfo.data?.delegations ?? [])];
    if (stakingInfo.data !== undefined) {
      delegations.sort((a, b) => {
        return a.delegation.validator.rank > b.delegation.validator.rank
          ? 1
          : -1;
      });
    }
    return delegations;
  }, [stakingInfo]);

  const undelegations = useMemo(() => {
    const undelegations = [...(stakingInfo.data?.undelegations ?? [])];
    if (stakingInfo.data !== undefined) {
      undelegations.sort((a, b) => {
        return a.validator.rank > b.validator.rank ? 1 : -1;
      });
    }
    return undelegations;
  }, [stakingInfo]);

  return {
    totalDelegations,
    totalUndelegations,
    totalRewards,
    delegations,
    undelegations,
    rewards: stakingInfo?.data?.rewards,
  };
};

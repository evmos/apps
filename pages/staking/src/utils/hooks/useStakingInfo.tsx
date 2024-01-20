// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getStakingInfo } from "../fetch";
import { StoreType } from "@evmosapps/evmos-wallet";
import {
  DelegationsResponse,
  StakingInfoResponse,
  UndelegationsResponse,
} from "../types";
import { useMemo } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { convertStringFromAtto } from "helpers";

export const useStakingInfo = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const stakingInfo = useQuery<StakingInfoResponse, Error>({
    queryKey: ["stakingInfo", value?.evmosAddressCosmosFormat],
    queryFn: () => getStakingInfo(value?.evmosAddressCosmosFormat),
    refetchInterval: 15_000,
  });

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

    return convertStringFromAtto(total);
  }, [stakingInfo]);

  const delegations = useMemo(() => {
    let delegations: DelegationsResponse[] = [];
    if (stakingInfo.data !== undefined) {
      delegations = stakingInfo.data?.delegations;
      delegations.sort((a, b) => {
        return a.delegation.validator.rank > b.delegation.validator.rank
          ? 1
          : -1;
      });
    }
    return delegations;
  }, [stakingInfo]);

  const undelegations = useMemo(() => {
    let undelegations: UndelegationsResponse[] = [];
    if (stakingInfo.data !== undefined) {
      undelegations = stakingInfo.data?.undelegations;
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

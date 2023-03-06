import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getStakingInfo } from "../fetch";
import { StoreType } from "../../../../redux/Store";
import {
  DelegationsResponse,
  StakingInfoResponse,
  UndelegationsResponse,
} from "../types";
import { useMemo } from "react";
import { BIG_ZERO } from "../../../common/math/Bignumbers";
import { BigNumber } from "ethers";
import { convertStringFromAtto } from "../../../asset/style/format";

export const useStakingInfo = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const stakingInfo = useQuery<StakingInfoResponse, Error>({
    queryKey: ["stakingInfo", value.evmosAddressCosmosFormat],
    queryFn: () => getStakingInfo(value.evmosAddressCosmosFormat),
  });

  const totalUndelegations = useMemo(() => {
    let total = BIG_ZERO;
    if (stakingInfo.data !== undefined) {
      // for each validator, get the undelegations balances
      // that are in the entries array
      stakingInfo.data.undelegations.map((validator) => {
        const sum = validator.entries.reduce((prev, curr) => {
          return prev.add(BigNumber.from(curr?.balance));
        }, total);
        total = sum ? sum : BIG_ZERO;
      });
      return total;
    }
    return total;
  }, [stakingInfo]);

  const totalRewards = useMemo(() => {
    let total = "0";
    if (stakingInfo.data !== undefined) {
      if (stakingInfo.data.rewards !== undefined) {
        if (stakingInfo.data.rewards.total.length !== 0) {
          total = stakingInfo.data.rewards.total[0].amount;
        }
      }
    }
    return convertStringFromAtto(total);
  }, [stakingInfo]);

  const delegations = useMemo(() => {
    let delegations: DelegationsResponse[] = [];
    if (stakingInfo.data !== undefined) {
      delegations = stakingInfo.data?.delegations;
    }
    return delegations;
  }, [stakingInfo]);

  const undelegations = useMemo(() => {
    let undelegations: UndelegationsResponse[] = [];
    if (stakingInfo.data !== undefined) {
      undelegations = stakingInfo.data?.undelegations;
    }
    return undelegations;
  }, [stakingInfo]);

  return { totalUndelegations, totalRewards, delegations, undelegations };
};

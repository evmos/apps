import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import { convertStringFromAtto } from "../../common/helpers/style";
import { BIG_ZERO } from "../../common/math/Bignumbers";
import { StakingInfoResponse } from "../../types";
import { getStakingInfo } from "../../fetch";

export const useHeaderInfo = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const stakingInfo = useQuery<StakingInfoResponse, Error>({
    queryKey: ["stakingInfo", value.evmosAddressCosmosFormat],
    queryFn: () => getStakingInfo(value.evmosAddressCosmosFormat),
  });

  const totalStaked = useMemo(() => {
    let total = BIG_ZERO;
    if (stakingInfo.data !== undefined) {
      const sum = stakingInfo.data.delegations.reduce((prev, curr) => {
        return prev.add(BigNumber.from(curr?.balance.amount));
      }, total);
      total = sum ? sum : BIG_ZERO;

      return total;
    }

    return total;
  }, [stakingInfo]);

  const totalRewards = useMemo(() => {
    let total = "0";
    if (stakingInfo.data !== undefined) {
      if (stakingInfo.data.rewards !== undefined) {
        if (stakingInfo.data.rewards.total.length !== 0) {
          // the sum is already done in the backend
          total = stakingInfo.data.rewards.total[0].amount;
        }
      }
    }
    return convertStringFromAtto(total);
  }, [stakingInfo]);

  return { totalStaked, totalRewards };
};

import { useQuery } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../redux/Store";
import { BIG_ZERO } from "../../../common/math/Bignumbers";
import { getStakingInfo } from "../../../staking/functionality/fetch";
import { StakingInfoResponse } from "../../../staking/functionality/types";

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

  return { totalStaked };
};

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getStakingRewards } from "../fetch";
import { StoreType } from "../../../../redux/Store";
import { StakingRewardsResponse } from "../types";

export const useClaimRewards = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const rewards = useQuery<StakingRewardsResponse, Error>({
    queryKey: ["stakingRewards", value.evmosAddressCosmosFormat],
    queryFn: () => getStakingRewards(value.evmosAddressCosmosFormat),
  });

  // TODO: get the amount for rewards
  return { rewards: rewards };
};

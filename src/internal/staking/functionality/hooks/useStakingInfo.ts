import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getStakingInfo } from "../fetch";
import { StoreType } from "../../../../redux/Store";
import { StakingInfoResponse } from "../types";
import { useMemo } from "react";
import { BIG_ZERO } from "../../../common/math/Bignumbers";
import { BigNumber } from "ethers";

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

  return { totalUndelegations };
};

import { BigNumber } from "ethers";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "../../../../redux/Store";

import { convertAndFormat } from "../../../asset/style/format";
import { getTotalStaked, TotalStakedResponse } from "./fetch";

export const useStakedEvmos = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const totalStakedResults = useQuery<TotalStakedResponse, Error>({
    queryKey: ["totalStaked", value.evmosAddressCosmosFormat],
    queryFn: () => getTotalStaked(value.evmosAddressCosmosFormat),
  });

  const totalStaked = useMemo(() => {
    let stakedRes = totalStakedResults?.data?.value;
    if (stakedRes !== "" && stakedRes !== undefined) {
      stakedRes = convertAndFormat(BigNumber.from(stakedRes), 18);
    } else {
      stakedRes = "0";
    }

    return stakedRes;
  }, [totalStakedResults]);

  return { stakedData: totalStakedResults.data, totalStaked };
};

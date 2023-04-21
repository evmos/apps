// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { StoreType } from "evmos-wallet";

import { getTotalStaked, TotalStakedResponse } from "services";

export const useStakedEvmos = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  const totalStakedResults = useQuery<TotalStakedResponse, Error>({
    queryKey: ["totalStaked", value.evmosAddressCosmosFormat],
    queryFn: () => getTotalStaked(value.evmosAddressCosmosFormat),
  });

  return { stakedData: totalStakedResults.data };
};

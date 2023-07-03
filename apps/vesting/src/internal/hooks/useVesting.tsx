// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getVesting } from "../fetch";
import { VestingAccountDetail } from "../types";

export const useVestingAccounts = (account?: string) => {
  const vestingResponse = useQuery({
    queryKey: ["vesting", account],
    queryFn: () => getVesting(account),
  });

  const vestingDetails = useMemo(() => {
    let temp: VestingAccountDetail = {
      accountAddress: "",
      funderAddress: "",
      unvestedAmount: "",
      originalVestingAmount: "",
    };
    if (vestingResponse.data !== undefined) {
      if (typeof vestingResponse.data === "string") {
        return "There is no vesting account linked to this address.";
      }
      temp = {
        accountAddress:
          vestingResponse.data.account.base_vesting_account.base_account
            .address,
        funderAddress: vestingResponse.data.account.funder_address,
        unvestedAmount: vestingResponse.data.unvested[0].amount,
        originalVestingAmount:
          vestingResponse.data.account.base_vesting_account.original_vesting[0]
            .amount,
      };
    }
    return temp;
  }, [vestingResponse]);

  return {
    vestingDetails: vestingDetails,
    loading: vestingResponse.isLoading,
    error: vestingResponse.error,
  };
};

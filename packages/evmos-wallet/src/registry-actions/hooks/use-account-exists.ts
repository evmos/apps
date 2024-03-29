// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useQuery } from "@tanstack/react-query";

import { E } from "helpers";
import { getAccountInfo } from "../get-account-info";
import { Address } from "helpers/src/crypto/addresses/types";

export const useAccountExists = (address?: Address) => {
  return useQuery({
    queryKey: ["accountExists", address],
    retry: false,
    queryFn: async () => {
      if (!address) return false;
      const [err, response] = await E.try(() => getAccountInfo({ address }));
      if (err) {
        if (E.match.byPattern(err, /NotFound/g)) {
          return false;
        }
      }
      if (!response) false;
      return true;
    },
    enabled: !!address,
  });
};

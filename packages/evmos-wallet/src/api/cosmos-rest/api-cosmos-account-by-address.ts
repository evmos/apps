// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { CosmosAddress } from "../../wallet";

import { apiCosmosFetch } from "./api-cosmos-fetch";

export const apiCosmosAccountByAddress = (
  urls: Readonly<[string, ...string[]]>,
  address: CosmosAddress,
) =>
  apiCosmosFetch(
    z.object({
      account: z
        .object({
          "@type": z.string(),
        })
        .passthrough(),
    }),
    urls,
    `/cosmos/auth/v1beta1/accounts/${address}`,
  );

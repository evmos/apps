// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server"

import { z } from "zod";

import { apiCosmosFetch } from "./api-cosmos-fetch";
import { CosmosAddress } from "helpers/src/crypto/addresses/types";

export const apiCosmosAccountByAddress = (
  urls: Readonly<[string, ...string[]]>,
  address: CosmosAddress,
) =>
  apiCosmosFetch(
    z.object({
      info: z
        .object({
          address: z.string(),
          pub_key: z
            .object({
              "@type": z.string(),
              key: z.string(),
            })
            .nullable(),
          account_number: z.coerce.bigint(),
          sequence: z.coerce.bigint(),
        })
        .passthrough()
        .transform((data) => ({
          address: data.address,
          accountNumber: data.account_number,
          sequence: data.sequence,
          pubKey: data.pub_key,
        })),
    }),
    urls,
    `/cosmos/auth/v1beta1/account_info/${address}`,
  );

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ZodRawShape, z } from "zod";

const PaginatedCosmosSchema = z.object({
  pagination: z.object({
    next_key: z.string().nullable(),
    total: z.string(),
  }),
});

export const paginateCosmosSchema = <TSchema extends ZodRawShape>(
  shape: TSchema,
) => PaginatedCosmosSchema.extend(shape);

export const BigIntSchema = z.string().transform((x) => BigInt(x));
export const AmountSchema = z.object({
  denom: z.string(),
  amount: BigIntSchema,
});

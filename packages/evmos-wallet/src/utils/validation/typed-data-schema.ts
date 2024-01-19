// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

const EIP712DomainSchema = z.object({
  name: z.string(),
  version: z.string(),
  chainId: z.string(),
  verifyingContract: z.string(),
  salt: z.string(),
});

export const TypedDataSchema = z
  .object({
    domain: EIP712DomainSchema,
    message: z.record(z.unknown()),
    primaryType: z.string(),
    types: z.record(
      z.array(
        z.object({
          name: z.string(),
          type: z.string(),
        }),
      ),
    ),
  })
  .passthrough();

export type TypedData = z.infer<typeof TypedDataSchema>;

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ZodRawShape, z } from "zod";

const JSONRPCSchema = z.object({
  jsonrpc: z.string(),
  id: z.number(),
});

export const makeJSONRPCResponseSchema = <TSchema extends ZodRawShape>(
  schema: TSchema,
) => JSONRPCSchema.extend(schema);

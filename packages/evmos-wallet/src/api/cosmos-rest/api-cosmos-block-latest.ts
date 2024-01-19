// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const BlockLatestSchema = z.object({
  block_id: z.object({
    hash: z.string(),
    part_set_header: z.object({ total: z.number(), hash: z.string() }),
  }),
  block: z.object({
    header: z.object({
      version: z.object({ block: z.string(), app: z.string() }),
      chain_id: z.string(),
      height: z.string(),
      time: z.string(),
      last_block_id: z.object({
        hash: z.string(),
        part_set_header: z.object({ total: z.number(), hash: z.string() }),
      }),
      last_commit_hash: z.string(),
      data_hash: z.string(),
      validators_hash: z.string(),
      next_validators_hash: z.string(),
      consensus_hash: z.string(),
      app_hash: z.string(),
      last_results_hash: z.string(),
      evidence_hash: z.string(),
      proposer_address: z.string(),
    }),
    data: z.object({ txs: z.array(z.string()) }),
    evidence: z.object({ evidence: z.array(z.unknown()) }),
    last_commit: z.object({
      height: z.string(),
      round: z.number(),
      block_id: z.object({
        hash: z.string(),
        part_set_header: z.object({ total: z.number(), hash: z.string() }),
      }),
      signatures: z.array(
        z.union([
          z.object({
            block_id_flag: z.string(),
            validator_address: z.string(),
            timestamp: z.string(),
            signature: z.string(),
          }),
          z.object({
            block_id_flag: z.string(),
            validator_address: z.null(),
            timestamp: z.string(),
            signature: z.null(),
          }),
        ]),
      ),
    }),
  }),
});

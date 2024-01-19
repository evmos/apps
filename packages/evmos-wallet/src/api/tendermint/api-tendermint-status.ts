// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { apiTendermintFetch } from "./api-tendermint-fetch";
import { makeJSONRPCResponseSchema } from "./validation";
import { BigIntSchema } from "../cosmos-rest";

const TendermintStatusResponse = makeJSONRPCResponseSchema({
  result: z.object({
    node_info: z.object({
      protocol_version: z.object({
        p2p: z.string(),
        block: z.string(),
        app: z.string(),
      }),
      id: z.string(),
      listen_addr: z.string(),
      network: z.string(),
      version: z.string(),
      channels: z.string(),
      moniker: z.string(),
      other: z.object({ tx_index: z.string(), rpc_address: z.string() }),
    }),
    sync_info: z.object({
      latest_block_hash: z.string(),
      latest_app_hash: z.string(),
      latest_block_height: BigIntSchema,
      latest_block_time: z.string(),
      earliest_block_hash: z.string(),
      earliest_app_hash: z.string(),
      earliest_block_height: z.string(),
      earliest_block_time: z.string(),
      catching_up: z.boolean(),
    }),
    validator_info: z.object({
      address: z.string(),
      pub_key: z.object({ type: z.string(), value: z.string() }),
      voting_power: z.string(),
    }),
  }),
});

export const apiTendermintStatus = (urls: Readonly<[string, ...string[]]>) =>
  apiTendermintFetch(TendermintStatusResponse, urls, `/status`);

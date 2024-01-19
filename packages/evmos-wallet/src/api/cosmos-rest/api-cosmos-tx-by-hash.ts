// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { apiCosmosFetch } from "./api-cosmos-fetch";

const MsgTransferSchema = z.object({
  "@type": z.literal("/ibc.applications.transfer.v1.MsgTransfer"),
  source_port: z.string(),
  source_channel: z.string(),
  token: z.object({ denom: z.string(), amount: z.string() }),
  sender: z.string(),
  receiver: z.string(),
  timeout_height: z.object({
    revision_number: z.string(),
    revision_height: z.string(),
  }),
  timeout_timestamp: z.string(),
  memo: z.string(),
});

export type MsgTransfer = z.infer<typeof MsgTransferSchema>;
const TxSchema = z.object({
  body: z.object({
    messages: z.array(
      z.union([
        MsgTransferSchema,
        z.object({ "@type": z.string() }).passthrough(),
      ]),
    ),
    memo: z.string(),
    timeout_height: z.string(),
    extension_options: z.array(z.object({ "@type": z.string() })),
    non_critical_extension_options: z.array(z.unknown()),
  }),
  auth_info: z.object({
    signer_infos: z.array(z.unknown()),
    fee: z.object({
      amount: z.array(z.object({ denom: z.string(), amount: z.string() })),
      gas_limit: z.string(),
      payer: z.string(),
      granter: z.string(),
    }),
  }),
  signatures: z.array(z.unknown()),
});

const TxResponseSchema = z.object({
  tx: TxSchema,
  tx_response: z.object({
    height: z.string(),
    txhash: z.string(),
    codespace: z.string(),
    code: z.number(),
    data: z.string(),
    raw_log: z.string(),
    logs: z.array(
      z.object({
        msg_index: z.number(),
        log: z.string(),
        events: z.array(
          z.object({
            type: z.string(),
            attributes: z.array(
              z.object({ key: z.string(), value: z.string() }),
            ),
          }),
        ),
      }),
    ),
    info: z.string(),
    gas_wanted: z.string(),
    gas_used: z.string(),
    tx: TxSchema,
    timestamp: z.string(),
    events: z.array(
      z.union([
        z.object({
          type: z.string(),
          attributes: z.array(
            z.object({
              key: z.string(),
              value: z.string(),
              index: z.boolean(),
            }),
          ),
        }),
        z.object({
          type: z.string(),
          attributes: z.array(
            z.union([
              z.object({
                key: z.string(),
                value: z.string(),
                index: z.boolean(),
              }),
              z.object({
                key: z.string(),
                value: z.null(),
                index: z.boolean(),
              }),
            ]),
          ),
        }),
      ]),
    ),
  }),
});

export const apiCosmosTxByHash = (
  urls: Readonly<[string, ...string[]]>,
  hash: string,
) =>
  apiCosmosFetch(
    TxResponseSchema,
    urls,
    `/cosmos/tx/v1beta1/txs/${hash.replace(/^0x/, "")}`,
  );

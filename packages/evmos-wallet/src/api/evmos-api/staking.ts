// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ApiPresignTxSchema } from "../../utils";
import { makeApiRequester } from "../utils/makeApiRequester";

export const apiStakingRewards = makeApiRequester(
  "/rewards",
  (params: { pubkey: string; address: string }) => ({
    transaction: {
      pubKey: params.pubkey,
      sender: params.address,
      gas: 0,
    },
  }),
  ApiPresignTxSchema
);

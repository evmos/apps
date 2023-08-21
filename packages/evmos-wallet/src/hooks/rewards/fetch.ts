// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EVMOS_BACKEND } from "../../internal/wallet/functionality/networkConfig";
import { GENERATING_TX_NOTIFICATIONS } from "../../notification/errors";
import { IBCTransferResponse } from "../../notification/transactionsTypes";

export async function rewardsBackendCall(
  pubkey: string,
  address: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/rewards`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: GENERATING_TX_NOTIFICATIONS.ErrorGeneratingTx,
      data: null,
    };
  }
}

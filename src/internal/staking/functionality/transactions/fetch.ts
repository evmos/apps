import { GENERATING_TX_NOTIFICATIONS } from "../../../asset/functionality/transactions/errors";
import { IBCTransferResponse } from "../../../asset/functionality/transactions/types";
import { EVMOS_BACKEND } from "../../../wallet/functionality/networkConfig";

export async function delegateBackendCall(
  pubkey: string,
  address: string,
  valAddress: string,
  amount: string
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/delegate`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
        message: {
          amount: amount,
          validatorAddress: valAddress,
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

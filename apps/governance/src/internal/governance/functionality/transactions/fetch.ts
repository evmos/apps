import {
  EVMOS_BACKEND,
  GENERATING_TX_NOTIFICATIONS,
  IBCTransferResponse,
} from "evmos-wallet";

export async function voteBackendCall(
  pubkey: string,
  address: string,
  id: string,
  option: number
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/vote`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
          gas: 0,
        },
        message: {
          proposalId: Number(id),
          // 0: empty, 1: yes, 2: abstain, 3: no, 4: no with veto
          option: option,
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

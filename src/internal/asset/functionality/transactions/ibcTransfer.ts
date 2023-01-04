import { EVMOS_BACKEND } from "../../../wallet/functionality/networkConfig";
import { IBCChainParams, IBCTransferResponse } from "./types";

export async function ibcTransferBackendCall(
  pubkey: string,
  address: string,
  params: IBCChainParams,
  useERC20Denom = false
): Promise<{
  error: boolean;
  message: string;
  data: IBCTransferResponse | null;
}> {
  try {
    const post = await fetch(`${EVMOS_BACKEND}/ibcTransfer`, {
      method: "post",
      body: JSON.stringify({
        transaction: {
          pubKey: pubkey,
          sender: address,
        },
        message: {
          srcChain: params.srcChain.toUpperCase(),
          dstChain: params.dstChain.toUpperCase(),
          sender: params.sender,
          receiver: params.receiver,
          amount: params.amount,
          token: params.token,
          useERC20Denom,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = (await post.json()) as IBCTransferResponse;
    if ("error" in data) {
      // TODO: add sentry call here!
      return {
        error: true,
        message: "Error generating the transaction, please try again later",
        data: null,
      };
    }
    return { error: false, message: "", data: data };
  } catch (e) {
    // TODO: add sentry call here!
    return {
      error: true,
      message: "Error generating the transaction, please try again later",
      data: null,
    };
  }
}

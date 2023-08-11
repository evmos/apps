import { getAccount, getWalletClient } from "@wagmi/core";
import { assertIf, raise } from "helpers";
import { TypedData } from "../../utils";

export async function signTypedDataMessage(transaction: TypedData) {
  const { address = raise("WALLET_NOT_CONNECTED") } = getAccount();

  const client = (await getWalletClient()) ?? raise("PROVIDER_NOT_AVAILABLE");
  const signature = await client.request({
    method: "eth_signTypedData_v4",
    params: [address, JSON.stringify(transaction)],
  });

  assertIf(typeof signature === "string", "COULD_NOT_SIGN_TRANSACTION");
  return signature;
}

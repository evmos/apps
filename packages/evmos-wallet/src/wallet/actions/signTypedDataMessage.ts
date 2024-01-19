// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getAccount, getWalletClient, switchChain } from "wagmi/actions";
import { assertIf, raise } from "helpers";
import { TypedData } from "../../utils";
import { Hex, fromHex } from "viem";

import { wagmiConfig } from "../wagmi";

export async function signTypedDataMessage(transaction: TypedData) {
  const { address = raise("WALLET_NOT_CONNECTED") } = getAccount(wagmiConfig);
  await switchChain(wagmiConfig, {
    chainId: fromHex(transaction.domain.chainId as Hex, "number"),
  });

  const client =
    (await getWalletClient(wagmiConfig)) ?? raise("PROVIDER_NOT_AVAILABLE");

  const signature = await client.request({
    method: "eth_signTypedData_v4",
    params: [address, JSON.stringify(transaction)],
  });

  assertIf(typeof signature === "string", "COULD_NOT_SIGN_TRANSACTION");
  return signature;
}

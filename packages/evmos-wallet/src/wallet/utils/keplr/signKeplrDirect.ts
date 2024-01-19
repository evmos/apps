// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Keplr } from "@keplr-wallet/types";
import { getKeplrProvider } from "./getKeplrProvider";
type SignDirectBody = Parameters<Keplr["signDirect"]>[2];

export async function signKeplrDirect(message: {
  sender: string;
  chainId: string;
  body: SignDirectBody;
}) {
  const keplr = await getKeplrProvider();
  return await keplr.signDirect(message.chainId, message.sender, message.body);
}

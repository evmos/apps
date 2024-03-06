// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { getLeapProvider } from "./getLeapProvider";
import { Leap } from "./types/leap";

type SignDirectBody = Parameters<Leap["signDirect"]>[2];

export async function signLeapDirect(message: {
  sender: string;
  chainId: string;
  body: SignDirectBody;
}) {
  const leap = await getLeapProvider();
  return await leap.signDirect(message.chainId, message.sender, message.body);
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Address } from "../../wallet";
import { Prefix, Token } from "../types";
import { getIBCChannelId } from "./get-ibc-channel-id";
import { toIBCDenom } from "helpers";
import { normalizeToPrefix } from "./normalize-to-prefix";
import { getChain } from "../get-chain";

export const getIBCDenom = ({
  sender,
  receiver,
  token,
}: {
  sender: Address<Prefix> | Prefix;
  receiver: Address<Prefix> | Prefix;
  token: Token;
}) => {
  const chain = getChain(token.sourcePrefix);
  if (chain.prefix === normalizeToPrefix(sender)) {
    return token.sourceDenom;
  }

  return toIBCDenom(
    "transfer",
    getIBCChannelId({
      sender,
      receiver,
    }),
    token.sourceDenom
  );
};

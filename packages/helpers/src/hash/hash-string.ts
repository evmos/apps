// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { sha256 } from "@noble/hashes/sha256";

export const hashString = (str: string, hashLength = 6) =>
  Buffer.from(sha256(str)).toString("base64url").slice(0, hashLength);

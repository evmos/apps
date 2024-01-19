// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Hex, hexToNumber } from "viem";
import { secp256k1 } from "@noble/curves/secp256k1";

export const recoverPublicKey = ({
  signature,
  hash,
}: {
  signature: Hex;
  hash: Hex;
}): Hex => {
  // Derive v = recoveryId + 27 from end of the signature (27 is added when signing the message)
  // The recoveryId represents the y-coordinate on the secp256k1 elliptic curve and can have a value [0, 1].
  let v = hexToNumber(`0x${signature.slice(130)}`);
  if (v === 0 || v === 1) v += 27;

  const publicKey = secp256k1.Signature.fromCompact(signature.substring(2, 130))
    .addRecoveryBit(v - 27)
    .recoverPublicKey(hash.substring(2))
    .toHex(false);
  return `0x${publicKey}`;
};

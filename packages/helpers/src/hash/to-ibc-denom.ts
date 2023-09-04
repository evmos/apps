import { sha256 } from "@noble/hashes/sha256";

/**
 * Converts a base denomination to an IBC denomination.
 *
 * You can learn more about IBC denominations here:
 * https://tutorials.cosmos.network/tutorials/6-ibc-dev/
 */
export const toIBCDenom = (
  portId: string,
  channelId: string,
  baseDenom: string
) => {
  const hashedPart = Buffer.from(sha256(`${portId}/${channelId}/${baseDenom}`))
    .toString("hex")
    .toUpperCase();
  return `ibc/${hashedPart}` as const;
};

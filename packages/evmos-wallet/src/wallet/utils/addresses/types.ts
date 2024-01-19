// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

/**
 * Represents a hexadecimal address with a "0x" prefix.
 */
export type HexAddress = `0x${string}`;

/**
 * Represents an Evmos address with a custom prefix.
 * @template TPrefix - The custom prefix for the Cosmos address.
 */
export type CosmosAddress<TPrefix extends string = string> =
  `${TPrefix}1${string}`;

/**
 * Represents an address that can be either a hexadecimal address or an Evmos address with a custom prefix.
 * @template TPrefix - The custom prefix for the Cosmos address.
 */
export type Address<TPrefix extends string = string> =
  | ("evmos" extends TPrefix ? HexAddress : never)
  | CosmosAddress<TPrefix>;

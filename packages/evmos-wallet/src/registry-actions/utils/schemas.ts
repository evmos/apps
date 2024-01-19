// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";
import { Prefix, TokenRef } from "../types";
import { Hex, isHex } from "viem";
import { isString } from "helpers";
import { Address, isValidCosmosAddress, isValidHexAddress } from "../../wallet";
import { getPrefixes } from "../get-prefixes";
import { getTokens } from "../get-tokens";
import { getChains } from "../get-chain";

export const TokenRefSchema = z.custom<TokenRef>((v) => {
  return getTokens().find((token) => token.ref === v) !== undefined;
});

export const ChainPrefixSchema = z.custom<Prefix>((v) => {
  return getChains().find((chain) => chain.prefix === v) !== undefined;
});

export const HexSchema = z
  .custom<Hex>((v) => {
    if (!isString(v)) return false;

    return isHex(v, { strict: false });
  })
  .transform<Hex>((v) => (v.startsWith("0x") ? v : `0x${v}`));

export const AddressSchema = z.custom<Address<Prefix>>((v) => {
  if (!isString(v)) return false;
  return isValidHexAddress(v) || isValidCosmosAddress(v, [...getPrefixes()]);
});

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { chains } from "@evmosapps/registry";
import { Prefix } from "./types";

export const prefixes = Object.values(chains).reduce((acc, chain) => {
  acc.add(chain.prefix);
  return acc;
}, new Set<Prefix>());
export const getPrefixes = () => prefixes;

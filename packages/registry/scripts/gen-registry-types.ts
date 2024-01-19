// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { writeFile } from "fs/promises";
import path from "path";
import { fetchChains } from "../src/fetch-chains";
import { fetchTokens } from "../src/fetch-tokens";
import { autogenDir } from "./constants";

const types: string[] = [`/* eslint-disable */`];

const genUnion = (name: string, union: string[]) => {
  types.push(
    `export type ${name} = ${union
      .map((value) => JSON.stringify(value))
      .join("\n  | ")};\n`
  );
};

const genChainTypes = async () => {
  const { chains } = await fetchChains();
  const chainPrefixes = chains.map((chain) => chain.prefix);

  genUnion("ChainPrefix", chainPrefixes);

  const chainRefs = chains.map((chain) => chain.identifier);

  genUnion("ChainRef", chainRefs);
};

const genTokenTypes = async () => {
  const { tokens } = await fetchTokens();
  const tokenSymbols = tokens.map((token) => token.coinDenom);

  genUnion("TokenSymbol", tokenSymbols);
};

await genChainTypes();
await genTokenTypes();

await writeFile(path.join(autogenDir, "registry.ts"), types.join("\n"));

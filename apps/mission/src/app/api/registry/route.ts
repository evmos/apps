// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchChainRegistryDir } from "@evmosapps/trpc/procedures/utils/fetch-chain-registry-dir";
import { NextResponse } from "next/server";

export async function GET() {
  const [chains, tokens] = await Promise.all([
    fetchChainRegistryDir<unknown>("chainConfig"),
    fetchChainRegistryDir<unknown>("tokens"),
  ]);

  return NextResponse.json({
    chains,
    tokens,
  });
}

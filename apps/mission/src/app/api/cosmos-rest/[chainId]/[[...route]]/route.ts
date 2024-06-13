// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchPreferredCosmosRestUrl } from "@evmosapps/trpc/procedures/metrics/queries/fetch-preferred-cosmos-rest-url";
import { NextResponse } from "next/server";
import path from "path";

async function handler(
  request: Request,
  {
    params: { chainId, route = [] },
  }: {
    params: {
      chainId: string;
      route: string[];
    };
  },
) {
  const { preferred } = await fetchPreferredCosmosRestUrl(chainId);
  const url = new URL(preferred);

  url.pathname = path.join(url.pathname, ...route);
  url.search = new URL(request.url).search;

  const res = await fetch(url.toString(), {
    method: request.method,
    body: request.body,
    // @ts-expect-error - this prop is required but it's not typed on RequestInit
    duplex: "half",
  });
  return new NextResponse(res.body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "",
    },
  });
}

export const GET = handler;
export const POST = handler;

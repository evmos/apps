// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { z } from "zod";

export const apiBalancedFetch = async <TSuccess extends z.ZodType<unknown>>(
  successSchema: TSuccess,

  hosts: Readonly<[string, ...string[]]>,
  pathname: string,
  init?: RequestInit & {
    timeout?: number;
    millisecondsBetweenCalls?: number;
  },
): Promise<z.infer<TSuccess>> => {
  for (const host of hosts) {
    let response;
    try {
      response = await fetch(`${host}${pathname}`, {
        signal: AbortSignal.timeout(init?.timeout ?? 4000),
        ...init,
      });
    } catch (error) {
      continue;
    }
    const asJson: unknown = await response.json();
    if (response.ok) {
      return successSchema.parse(asJson);
    }

    if (response.status === 404) {
      throw new Error("NotFound", { cause: asJson });
    }

    break;
  }
  throw new Error(`Failed to fetch ${pathname}`);
};

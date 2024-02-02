// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import type { AppRouter } from "./router";
import { httpBatchLink, httpLink } from "@trpc/client";
import { transformer } from "./transformer";
import { createTRPCReact } from "@trpc/react-query";
import { UseQueriesProcedureRecord } from "@trpc/react-query/shared";

import { GetOptions, TRPCBaseOptions } from "./types";

export const trpc = createTRPCReact<AppRouter>();

export const useTrpcQuery = <T extends TRPCBaseOptions>(
  cb: (t: UseQueriesProcedureRecord<AppRouter>) => GetOptions<T>,
) => {
  return trpc.useQueries((t) => {
    try {
      const query = cb(t);
      return [query] as const;
    } catch (e) {
      return [
        {
          queryKey: ["noop"],
          enabled: false,
        },
      ] as never;
    }
  })[0];
};

export const useTrpcSuspenseQuery = <T extends TRPCBaseOptions>(
  cb: (t: UseQueriesProcedureRecord<AppRouter>) => GetOptions<T>,
) => {
  return trpc.useSuspenseQueries((t) => {
    try {
      const query = cb(t);
      return [query] as const;
    } catch (e) {
      return [
        {
          queryKey: ["noop"],
          enabled: false,
        },
      ] as never;
    }
  })[0];
};

export const createTrpcClient = () =>
  trpc.createClient({
    transformer,

    links:
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? [httpLink({ url: "/api/trpc", fetch })]
        : [httpBatchLink({ url: "/api/trpc", fetch })],
  });

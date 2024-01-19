// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import createClient, {
  createFinalURL,
  defaultQuerySerializer,
} from "openapi-fetch";

import { getChain } from "../../registry-actions";
import { Prefixish } from "../../registry-actions/utils/normalize-to-prefix";

import {
  UseQueryOptions,
  UseSuspenseQueryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { omit } from "lodash-es";
import { paths } from "./cosmos-client";

export const cosmosClient = (prefix: Prefixish) =>
  createClient<paths>({
    baseUrl: getChain(prefix).cosmosRest[0],
  });

type Routes = {
  [K in keyof paths]: paths[K] extends { get: infer G } ? G : never;
};

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

const queryFn = async function <T extends keyof Routes>(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(await res.text());

  return (await res.json()) as Routes[T] extends {
    responses: {
      "200": {
        content: {
          "*/*": infer R;
        };
      };
    };
  }
    ? R
    : never;
};

type QueryResponse<T extends keyof Routes> = Routes[T] extends {
  responses: {
    "200": {
      content: {
        "*/*": infer R;
      };
    };
  };
}
  ? R
  : never;

type QueryOptions<
  T extends keyof Routes,
  TSelect = QueryResponse<T>,
  Suspense = false,
> = {
  route: T;
  select?: (data: QueryResponse<T>) => TSelect;

  enabled?: boolean;
} & (Routes[T] extends {
  parameters: infer P;
}
  ? Suspense extends false
    ? DeepPartial<P>
    : P
  : {}) & {
    queryOptions?: Omit<
      Suspense extends false
        ? UseQueryOptions<QueryResponse<T>>
        : UseSuspenseQueryOptions<QueryResponse<T>>,
      "queryFn" | "initialData" | "select" | "queryKey"
    >;
  };

export const useCosmosQuery = <
  T extends keyof Routes,
  TData = QueryResponse<T>,
>(
  prefix: Prefixish,
  options: QueryOptions<T, TData>
) => {
  const { route, enabled, queryOptions, select, ...rest } = options;

  const url = createFinalURL(route, {
    baseUrl: getChain(prefix).cosmosRest[0],
    params: rest,
    querySerializer: defaultQuerySerializer,
  });

  return useQuery({
    queryKey: [prefix, url],
    enabled,
    queryFn: () => queryFn<T>(url),
    select,
    ...queryOptions,
  });
};

export const useCosmosSuspenseQuery = <
  T extends keyof Routes,
  TData = QueryResponse<T>,
>(
  prefix: Prefixish,
  options: QueryOptions<T, TData, true>
) => {
  const { route, queryOptions, select, ...rest } = options;

  const url = createFinalURL(route, {
    baseUrl: getChain(prefix).cosmosRest[0],
    params: omit(rest, ["enabled"]),
    querySerializer: defaultQuerySerializer,
  });

  return useSuspenseQuery({
    queryKey: [prefix, url],
    ...queryOptions,
    queryFn: () => queryFn<T>(url),
    select,
  });
};

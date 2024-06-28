// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import type { UserSession } from "./get-user-session";
import { getSession } from "next-auth/react";
import { getUserById } from "../api";

export const userSessionQueryOptions = queryOptions({
  queryKey: ["user", "session"],
  staleTime: Infinity,
  queryFn: () => getSession() as Promise<UserSession | null>,
});

export const useUserSession = () => {
  return useQuery(userSessionQueryOptions);
};

export const useSuspenseUserSession = () => {
  return useSuspenseQuery(userSessionQueryOptions);
};

export const userProfileQueryOptions = (userId?: string) =>
  queryOptions({
    queryKey: ["user", "profile", userId],
    staleTime: Infinity,
    queryFn: async () => {
      if (!userId) {
        throw new Error("userId is required");
      }
      return await getUserById(userId);
    },
    select: (data) => {
      const defaultWalletAccount = data.walletAccount[0];
      if (!defaultWalletAccount) return null;
      return {
        ...data,
        defaultWalletAccount,
      };
    },
    enabled: !!userId,
  });

export const useUserProfile = () => {
  const { data } = useUserSession();
  return useQuery(userProfileQueryOptions(data?.user.id));
};

export const useSuspenseUserProfile = () => {
  const { data } = useSuspenseUserSession();
  return useSuspenseQuery(userProfileQueryOptions(data?.user.id));
};

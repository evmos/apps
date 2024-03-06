// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";

export const LazyAccountBalance = dynamic(
  () => import("./partials/account-balance").then((m) => m.AccountBalance),
  {
    loading: () => <div />,
    ssr: false,
  },
);

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@evmosapps/ui/skeleton/index.tsx";

export const LazyPriceDisplay = dynamic(
  () => import("./PriceDisplay").then((mod) => mod.PriceDisplay),
  {
    ssr: false,
    loading: () => <Skeleton.Blob className="w-32" />,
  },
);

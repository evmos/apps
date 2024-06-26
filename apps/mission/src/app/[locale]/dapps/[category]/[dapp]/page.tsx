// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { Metadata, ResolvingMetadata } from "next/types";
import { raise } from "helpers";

export default function DappDetailsPage() {
  return null;
}

export const generateStaticParams = async () => {
  const { dApps } = await fetchExplorerData();

  return dApps.map((dapp) => ({
    dapp: dapp.slug,
    category: dapp.categorySlug,
  }));
};

export async function generateMetadata(
  {
    params,
  }: {
    params: { dapp: string };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { dApps } = await fetchExplorerData();
  const dapp =
    dApps.find((c) => c.slug === params.dapp) ?? raise("DApp not found");

  let title = `${dapp.name} dApp | Evmos dApp Store`;
  if (dapp.instantDapp) {
    title = `${dapp.name} Instant dApp | Evmos dApp Store`;
  }

  const resolvedParent = await parent;
  const metadataBase = resolvedParent.metadataBase ?? undefined;

  const { oneLiner: description } = dapp;
  return {
    title,
    description,
    metadataBase,
    twitter: {
      title,
      description,
    },
    openGraph: {
      title,
      description,
    },
  };
}

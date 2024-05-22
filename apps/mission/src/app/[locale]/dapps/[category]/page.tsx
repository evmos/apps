// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";
import { ResolvingMetadata } from "next/types";

export { DappExplorerPage as default } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/dapp-explorer-page";

export const generateStaticParams = async () => {
  const { categories } = await fetchExplorerData();

  return categories.map((category) => ({
    category: category.slug,
  }));
};

export async function generateMetadata(
  {
    params,
  }: {
    params: { category: string };
  },
  parent: ResolvingMetadata,
) {
  const resolvedParent = await parent;
  const description = resolvedParent.description ?? undefined;
  const twitter = resolvedParent.twitter ?? undefined;
  const openGraph = resolvedParent.openGraph ?? undefined;
  const metadataBase = resolvedParent.metadataBase ?? undefined;

  if (!params.category) {
    const title = `All dApps | Evmos dApp Store`;
    return {
      title,
      twitter: {
        title,
      },
      openGraph: {
        title,
      },
    };
  }
  const { categories } = await fetchExplorerData();

  const category =
    categories.find((c) => c.slug === params.category) ??
    raise(`category not found: ${params.category}`);

  const title = `${category.name} dApps | Evmos dApp Store`;
  return {
    title,
    metadataBase,

    description,
    twitter: {
      title,
      description,
      images: twitter?.images,
    },
    openGraph: {
      title,
      description,
      images: openGraph?.images,
    },
  };
}

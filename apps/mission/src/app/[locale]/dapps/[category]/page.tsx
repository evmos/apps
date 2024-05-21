// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";

export { DappExplorerPage as default } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/dapp-explorer-page";

export const generateStaticParams = async () => {
  const { categories } = await fetchExplorerData();

  return categories.map((category) => ({
    category: category.slug,
  }));
};

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
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
    twitter: {
      title,
    },
    openGraph: {
      title,
    },
  };
}

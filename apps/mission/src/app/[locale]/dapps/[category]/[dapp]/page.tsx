// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";
import { Metadata } from "next/types";

export { DappDetailsPage as default } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/dapp-details/dapp-details-page";

export const generateStaticParams = async () => {
  const { dApps } = await fetchExplorerData();

  return dApps
    .filter(({ instantDapp }) => instantDapp)
    .map((dapp) => ({
      dapp: dapp.slug,
      category: dapp.categorySlug,
    }));
};

export async function generateMetadata({
  params,
}: {
  params: { dapp: string };
}): Promise<Metadata> {
  const { dApps } = await fetchExplorerData();

  const dapp =
    dApps.find((c) => c.slug === params.dapp) ?? raise("DApp not found");

  if (dapp.instantDapp) {
    return {
      title: `${dapp.name} Instant dApp | Evmos dApp Store`,
    };
  }

  return {
    title: `${dapp.name} dApp | Evmos dApp Store`,
  };
}

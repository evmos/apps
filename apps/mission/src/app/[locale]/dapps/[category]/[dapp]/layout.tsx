// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";
import React from "react";
import { DappDetailsPage } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/dapp-details/dapp-details-page";
import { WIDGETS } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/partials/widgets-index";

export default function Layout({
  params,
}: {
  params: {
    dapp: string;
    category: string;
    locale: string;
  };
}) {
  const Widget = WIDGETS[params.dapp];
  return (
    <DappDetailsPage widget={Widget ? <Widget /> : undefined} params={params} />
  );
}

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
}) {
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

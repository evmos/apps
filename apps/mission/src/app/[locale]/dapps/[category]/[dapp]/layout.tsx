// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";
import { raise } from "helpers";
import React from "react";
import { DappDetailsPage } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/dapp-details/dapp-details-page";
import { WIDGETS } from "@evmosapps/dappstore-page/src/pages/dapp-explorer/partials/widgets-index";
import { Metadata } from "next/types";

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

  return dApps.map((dapp) => ({
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

  let title = `${dapp.name} dApp | Evmos dApp Store`;
  if (dapp.instantDapp) {
    title = `${dapp.name} Instant dApp | Evmos dApp Store`
  }

  const { oneLiner: description } = dapp;
  return {
    title,
    description,
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

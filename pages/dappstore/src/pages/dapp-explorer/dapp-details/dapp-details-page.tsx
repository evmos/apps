// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { notFound, redirect } from "next/navigation";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import { DescriptiondApp } from "../partials/description-section";
import { ExplorerBreadcrumbs } from "../partials/explorer-breadcrumbs";

export const DappDetailsPage = async ({
  params,
}: {
  params: {
    dapp: string;
    category: string;
    locale: string;
  };
}) => {
  const { dApps } = await fetchExplorerData();

  const dapp = dApps.find((dApp) => dApp.slug === params.dapp);

  const relatedApps = dApps
    .filter(
      (dApp) =>
        dApp.categoryName === dapp?.categoryName && dApp.slug !== dapp?.slug
    )
    .slice(0, 4);

  if (!dapp) {
    notFound();
  }
  if (params.category !== dapp.categorySlug) {
    redirect(`/${params.locale}/dapps/${dapp.categorySlug}/${params.dapp}`);
  }

  return (
    <>
      <ExplorerBreadcrumbs params={params} />
      <DescriptiondApp dapp={dapp} relatedApps={relatedApps} />
    </>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { notFound, redirect } from "next/navigation";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import { DescriptiondApp } from "../partials/description-section";
import { ExplorerBreadcrumbs } from "../partials/explorer-breadcrumbs";
import { sortApps } from "../../../lib/sort/sort-dapps";
import Image from "next/image";
import { cn } from "helpers";

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
        dApp.categoryName === dapp?.categoryName && dApp.slug !== dapp?.slug,
    )
    .slice(0, 4);

  if (!dapp) {
    notFound();
  }
  if (params.category !== dapp.categorySlug) {
    redirect(`/${params.locale}/dapps/${dapp.categorySlug}/${params.dapp}`);
  }
  const { cover } = dapp;
  return (
    <>
      <div>
        <div className="relative h-[250px] w-screen ml-[50%] -translate-x-1/2 content-end mx-auto">
          <div
            className={cn(
              // gradient overlay
              " after:bg-gradient-to-t after:from-[#0b0a09]/100 after:to-transparent after:absolute after:w-full after:h-full after:bottom-0",
            )}
          >
            <Image
              {...(cover
                ? ({
                    src: cover.src,
                    blurDataURL: cover.blurDataURL,
                    placeholder: "blur",
                  } as const)
                : {
                    src: "/ecosystem/galaxy.png",
                  })}
              alt={dapp.name}
              fill={true}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
        <div className="container">
          <div className="hidden md:block absolute -mt-5 w-screen -ml-3">
            <ExplorerBreadcrumbs params={params} />
          </div>
        </div>
      </div>
      <DescriptiondApp
        dapp={dapp}
        relatedApps={sortApps(relatedApps)}
        totalApps={dApps.length}
      />
    </>
  );
};

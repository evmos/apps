// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

import { Breadcrumb } from "@evmosapps/ui-helpers";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import { IconHome } from "../../../../../../packages/ui/src/icons/line";
import { ReactElement } from "react";

interface BreadcrumbItem {
  name: string | ReactElement;
  href: string;
}

export const ExplorerBreadcrumbs = async ({
  params,
}: {
  params: { category?: string; dapp?: string };
}) => {
  const pages: BreadcrumbItem[] = [
    {
      name: <IconHome className="h-5 w-5" />,
      href: "/dapps",
    },
  ];
  const { categories, dApps } = await fetchExplorerData();

  const categoryStep = (() => {
    if (params.category === "instant-dapps") {
      return {
        name: "Instant dApps",
        href: "/dapps/instant-dapps",
      };
    }
    const category = categories.find((c) => c.slug === params.category);
    if (category) {
      return {
        name: category.name,
        href: `/dapps/${category.slug}`,
      };
    }
    return {
      name: "All",
      href: "/dapps",
    };
  })();

  const dappStep = (() => {
    if (params.dapp) {
      const dapp = dApps.find((d) => d.slug === params.dapp);
      if (dapp) {
        return {
          name: dapp.name,
          href: `${categoryStep.href}/${dapp.slug}`,
        };
      }
    }
  })();

  if (categoryStep) {
    pages.push(categoryStep);
  }
  if (dappStep) {
    pages.push(dappStep);
  }

  return <Breadcrumb pages={pages} />;
};

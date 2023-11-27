"use server";
import { Breadcrumb } from "@evmosapps/ui-helpers";
import { fetchExplorerData } from "../../../lib/fetch-explorer-data";

export const ExplorerBreadcrumbs = async ({
  params,
}: {
  params: { category?: string; dapp?: string };
}) => {
  const pages = [
    {
      name: "dApp Store",
      href: "/",
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
          href: `/dapps/${categoryStep.href}/${dapp.slug}`,
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

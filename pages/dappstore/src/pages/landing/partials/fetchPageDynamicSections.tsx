// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { fetchExplorerData } from "../../../lib/fetch-explorer-data";
import {
  fetchDatabaseEntries,
  tryReadPropertyAs,
  tryResolveImageProp,
} from "helpers/src/clients/notion-utils";
import { devMemo } from "helpers/src/dev/dev-memo";
import { EVMOS_LANDING_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";

const fetchEntries = devMemo(async (placement: string) => {
  return await fetchDatabaseEntries({
    id: EVMOS_LANDING_PAGE_NOTION_ID,

    sorts: [
      {
        property: placement,
        direction: "ascending",
      },
    ],
  });
});
const replaceVars = (str: string, vars: Record<string, number | string>) => {
  return str.replace(/\{([^}]+)}/g, (_, key) => {
    const value = vars[key as string];
    return String(value ?? "");
  });
};
type DynamicSectionEntry = Awaited<ReturnType<typeof fetchEntries>>[number];
const parsePageSection = async (
  entry: DynamicSectionEntry,
  placement: string,
) => {
  const orderProp = tryReadPropertyAs(entry, placement, "formula");

  const order =
    "number" in orderProp.formula &&
    typeof orderProp.formula.number === "number"
      ? orderProp.formula.number
      : -1;
  if (order < 0) {
    return [];
  }
  const dapps = await fetchExplorerData().then((data) => data.dApps);
  const dynamicVars = {
    dAppsCount: dapps.length,
  };
  const titleProp = tryReadPropertyAs(entry, "Name", "title");
  const dAppsProp = tryReadPropertyAs(entry, "dApps", "relation");
  const descriptionProp = tryReadPropertyAs(entry, "Description", "rich_text");
  const categoriesProp = tryReadPropertyAs(entry, "Categories", "relation");
  const cardsProp = tryReadPropertyAs(entry, "Cards", "relation");
  const displayTypeProp = tryReadPropertyAs(entry, "Display Type", "select");
  const ctaLabelProp = tryReadPropertyAs(entry, "CTA Label", "rich_text");
  const ctaTargetProp = tryReadPropertyAs(entry, "CTA Target", "url");
  const [mobileBannerImage, desktopBannerImage] = await Promise.all([
    tryResolveImageProp(entry, "Mobile Banner Image"),
    tryResolveImageProp(entry, "Desktop Banner Image"),
  ]);
  return [
    {
      displayType: displayTypeProp.select?.name as
        | "Banner"
        | "DAppListGrid"
        | "DAppListCarousel"
        | "DAppRanking"
        | "CategoryList"
        | "HighlightCards"
        | undefined,
      title: replaceVars(
        titleProp.title.map((prop) => prop.plain_text).join(" "),
        dynamicVars,
      ),
      ctaLabel: ctaLabelProp.rich_text.map((prop) => prop.plain_text).join(" "),
      ctaTarget: ctaTargetProp.url
        ? {
            external: ctaTargetProp.url.startsWith("http"),
            url: ctaTargetProp.url,
          }
        : undefined,
      description: replaceVars(
        descriptionProp.rich_text.map((prop) => prop.plain_text).join(" "),
        dynamicVars,
      ),

      dAppIds: dAppsProp.relation.map((prop) => prop.id),
      categoryIds: categoriesProp.relation.map((prop) => prop.id),
      cardsIds: cardsProp.relation.map((prop) => prop.id),
      mobileBannerImage: mobileBannerImage.at(0),
      desktopBannerImage: desktopBannerImage.at(0),

      order,
      public: order >= 0,
    },
  ];
};
export const fetchPageDynamicSections = async (placement: string) => {
  const entries = await fetchEntries(placement);

  return Promise.all(entries.map((entry) => parsePageSection(entry, placement)))
    .then((sections) => sections.flat())
    .then((sections) => sections.sort((a, b) => a.order - b.order));
};
export type DynamicSection = Awaited<
  ReturnType<typeof fetchPageDynamicSections>
>[number];

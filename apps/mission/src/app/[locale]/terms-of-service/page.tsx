import React from "react";

import { TERMS_OF_SERVICE_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import {
  NotionBlocks,
  NotionPageTitle,
} from "@evmosapps/ui-helpers/src/notion";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Terms of Service",
};
export default function Page() {
  return (
    <section className="mx-auto prose prose-invert">
      <h1>
        <NotionPageTitle id={TERMS_OF_SERVICE_PAGE_NOTION_ID} />
      </h1>
      <NotionBlocks id={TERMS_OF_SERVICE_PAGE_NOTION_ID} />
    </section>
  );
}

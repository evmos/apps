// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React from "react";

import { PRIVACY_POLICY_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Metadata } from "next";
import { NotionPageTitle } from "@evmosapps/ui-helpers/src/notion/NotionPageTitle";
import { NotionBlocks } from "@evmosapps/ui-helpers/src/notion/NotionBlocks";
export const metadata: Metadata = {
  title: "Privacy Policy",
};
export default function Page() {
  return (
    <section className="mx-auto prose prose-invert">
      <h1>
        <NotionPageTitle id={PRIVACY_POLICY_PAGE_NOTION_ID} />
      </h1>
      <NotionBlocks id={PRIVACY_POLICY_PAGE_NOTION_ID} />
    </section>
  );
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import React from "react";

import { COOKIE_POLICY_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import {
  NotionBlocks,
  NotionPageTitle,
} from "@evmosapps/ui-helpers/src/notion";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cookie Policy",
};
export default function Page() {
  return (
    <section className="mx-auto prose prose-invert">
      <h1>
        <NotionPageTitle id={COOKIE_POLICY_PAGE_NOTION_ID} />
      </h1>
      <NotionBlocks id={COOKIE_POLICY_PAGE_NOTION_ID} />
    </section>
  );
}

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { EVMOS_BLOCKED_PROPOSALS_LIST_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { notionWith } from "helpers/src/clients/notion";
import { get } from "lodash-es";

const notion = notionWith({
  revalidate: 60 * 5,
  tags: ["notion-client", "blocked-proposals"],
});
export const fetcEvmosBlockedProposals = async () => {
  const blockedProposalsPage = await notion.pages.retrieve({
    page_id: EVMOS_BLOCKED_PROPOSALS_LIST_NOTION_ID,
  });
  const blockedProposals = get(
    blockedProposalsPage,
    "properties.Description.rich_text[0].plain_text",
  ) as unknown;
  if (typeof blockedProposals !== "string") return [];
  const ids = blockedProposals.match(/\d+/g) || [];
  return [...ids];
};

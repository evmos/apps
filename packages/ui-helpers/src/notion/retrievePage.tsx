// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { notion } from "helpers/src/clients/notion";

export const retrievePage = async (pageId: string) =>
  await notion.pages.retrieve({
    page_id: pageId,
  });

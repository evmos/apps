// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { notion } from "helpers/src/clients/notion";

export const retrieveBlockList = async (blockId: string, cursor?: string) =>
  await notion.blocks.children.list({
    block_id: blockId,
    start_cursor: cursor,
  });

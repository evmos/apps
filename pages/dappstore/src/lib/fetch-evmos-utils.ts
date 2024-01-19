// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EVMOS_UTILS_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { Log, evmosStatusSchema } from "helpers";
import { notion } from "helpers/src/clients/notion";

const fetchNotionEvmosStatus = async () =>
  notion.databases.query({
    database_id: EVMOS_UTILS_PAGE_NOTION_ID,
  });

export const fetchEvmosStatus = async () => {
  const evmosStatus = await fetchNotionEvmosStatus();

  const parsed = evmosStatusSchema.safeParse(evmosStatus);

  if (!parsed.success) {
    Log("notion").error(parsed.error.issues);
    return {};
  }
  return parsed.data.results[0]?.properties;
};

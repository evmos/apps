// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { z } from "zod";
import { EVMOS_UTILS_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import {
  Log,
  checkboxSchema,
  createNotionPropertiesSchema,
  richTextSchema,
  titleSchema,
} from "helpers";
import { notion } from "helpers/src/clients/notion";

const evmosStatusPropertiesSchema = createNotionPropertiesSchema(
  z.object({
    checkbox: checkboxSchema.default(() => ({ checkbox: false })),
    name: titleSchema.default({ title: [{ plain_text: "" }] }),
    description: richTextSchema.default({ rich_text: [{ plain_text: "" }] }),
  }),
);

const evmosStatusSchema = z.object({
  properties: evmosStatusPropertiesSchema,
});

const fetchNotionEvmosStatus = async () =>
  await notion.databases.query({
    database_id: EVMOS_UTILS_PAGE_NOTION_ID,
  });

const fetchEvmosStatus = async () => {
  const evmosStatus = await fetchNotionEvmosStatus();

  return evmosStatus.results.map((result) => {
    const parsed = evmosStatusSchema.safeParse(result);

    if (!parsed.success) {
      Log("notion").error(parsed.error.issues);
      return {
        name: "",
        description: "",
        checkbox: false,
      };
    }

    return parsed.data.properties;
  });
};

export const getServiceDisruptionData = async () => {
  const data = await fetchEvmosStatus();
  const serviceStatus = data.find(
    (item) =>
      item.name.toLocaleLowerCase() ===
      "Service disruption".toLocaleLowerCase(),
  );
  if (serviceStatus === undefined || !serviceStatus?.checkbox) return null;
  return serviceStatus.description;
};

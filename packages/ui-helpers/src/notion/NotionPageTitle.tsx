// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { get } from "lodash-es";
import { retrievePage } from "./retrievePage";

export const NotionPageTitle = async ({ id }: { id: string }) => {
  const page = await retrievePage(id);

  return <>{get(page, "properties.title.title.0.plain_text", "")}</>;
};

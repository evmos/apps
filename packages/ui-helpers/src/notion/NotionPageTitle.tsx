"use server";
import { get } from "lodash-es";
import { retrievePage } from "./retrievePage";

export const NotionPageTitle = async ({ id }: { id: string }) => {
  const page = await retrievePage(id);

  return <>{get(page, "properties.title.title.0.plain_text", "")}</>;
};

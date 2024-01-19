// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";
import { Banner } from "@evmosapps/ui-helpers";
import { getServiceDisruptionData } from "./fetch-service-status";

export const StatefulBanner = async () => {
  const data = await getServiceDisruptionData();
  if (data === null) return null;
  return <Banner>{data}</Banner>;
};

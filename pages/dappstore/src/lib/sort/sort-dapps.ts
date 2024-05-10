// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DApp } from "../fetch-explorer-data";

export const sortApps = (apps: DApp[], sortBy?: string) => {
  // by default, sorty alphabetically (ascending)
  // TODO: when we have more sort options, we can add them here using the sort by parameter
  // on search Params
  if (sortBy === "desc") {
    return sortDesc(apps);
  }
  return sortAsc(apps);
};

const sortAsc = (apps: DApp[]) => {
  return apps.sort((a, b) => a.name.localeCompare(b.name));
};

const sortDesc = (apps: DApp[]) => {
  return apps.sort((a, b) => b.name.localeCompare(a.name));
};

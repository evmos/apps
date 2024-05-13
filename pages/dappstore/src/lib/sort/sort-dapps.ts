// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DApp } from "../fetch-explorer-data";

export const sortApps = (apps: DApp[], sortBy?: string) => {
  if (sortBy === "desc") {
    return sortAlphabeticalDesc(apps);
  }
  if (sortBy === "created-at") {
    return sortCreatedAt(apps);
  }
  return sortAlphabeticalAsc(apps);
};

const sortAlphabeticalAsc = (apps: DApp[]) => {
  return apps.sort((a, b) => a.name.localeCompare(b.name));
};

const sortAlphabeticalDesc = (apps: DApp[]) => {
  return apps.sort((a, b) => b.name.localeCompare(a.name));
};

const sortCreatedAt = (apps: DApp[]) => {
  return apps.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DApp } from "../fetch-explorer-data";

export const sortApps = (apps: DApp[]) => {
  // by default, sorty alphabetically (ascending)
  // TODO: when we have more sort options, we can add them here using the sort by parameter
  // on search Params
  return apps.sort((a, b) => {
    const alphabeticalOrder = a.name.localeCompare(b.name);

    // If both apps have the same instant-dapp property, return alphabetical order
    if (a.instantDapp === b.instantDapp) {
      return alphabeticalOrder;
    }
    // Otherwise, instant-dapp apps come first
    return a.instantDapp ? -1 : 1;
  });
};

import { DApp } from "../fetch-explorer-data";

export const sortApps = (apps: DApp[]) => {
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

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use server";

export const AppsExplorerLayout = ({ children }: React.PropsWithChildren) => {
  return <div className="flex flex-col space-y-8">{children}</div>;
};

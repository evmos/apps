// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

export const TabContent = ({
  id,
  activeTab,
  children,
}: {
  id: string;
  activeTab: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return activeTab === id ? <div className="">{children}</div> : null;
};

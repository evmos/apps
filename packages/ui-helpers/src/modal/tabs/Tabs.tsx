// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Button } from "./Button";
import { TabProps } from "./types";

export const Tabs = ({ tabsProps }: { tabsProps: TabProps[] }) => (
  <div className="grid grid-cols-1 gap-4 text-sm font-medium md:grid-cols-2">
    {tabsProps.map((tab) => (
      <Button key={tab.type} tab={tab} />
    ))}
  </div>
);
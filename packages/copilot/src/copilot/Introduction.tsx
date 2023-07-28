// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosCopilotIcon } from "icons";
export const Introduction = () => {
  return (
    <div className="flex flex-col space-y-3">
      <EvmosCopilotIcon />
      <h3 className="font-bold">Evmos Copilot</h3>
      <h4 className="text-gray1 text-sm">
        Let&apos;s get started with Evmos in 5 minutes
      </h4>
    </div>
  );
};

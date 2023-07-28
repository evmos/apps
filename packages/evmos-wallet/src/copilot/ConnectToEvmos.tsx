// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { EvmosRedIcon } from "icons";

export const ConnectToEvmos = () => {
  return (
    <div className="space-y-3 px-4 pb-4 pt-5 sm:p-6">
      <EvmosRedIcon />
      <h3 className="text-base font-semibold leading-6 text-[#271411]">
        Connect your account
      </h3>

      <p className="text-gray1 text-sm">Get started with Evmos!</p>
      <p className="text-gray1 text-sm">
        We recommend for first-time users to use
        <b> Evmos Copilot</b>.
      </p>
    </div>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IntroductionModal } from "@evmosapps/ui-helpers";

export const ConnectToEvmos = () => {
  return (
    <IntroductionModal
      title="Connect your account"
      description={
        <>
          <p className="text-gray1 text-sm">Get started with Evmos!</p>
          <p className="text-gray1 text-sm">
            We recommend for first-time users to use
            <b> Evmos Copilot</b>.
          </p>
        </>
      }
    />
  );
};

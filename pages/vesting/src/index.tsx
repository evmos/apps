// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { Suspense } from "react";
import { VestingPageContent } from "./components/vesting/VestingPage";

export const VestingPage = () => {
  return (
    <Suspense>
      <VestingPageContent />
    </Suspense>
  );
};

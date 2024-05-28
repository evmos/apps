// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { DynamicSections } from "./partials/DynamicSections";

export const LandingPage = () => {
  return (
    <div className="flex flex-col gap-y-8 max-w-full mx-auto py-8">
      {/* TODO: */}
      {/* <Stories /> */}
      <DynamicSections placement={"Landing Page"} />
    </div>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { PropsWithChildren } from "react";

export const TopBarContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-darkGray2 text-pearl mx-5 mb-5 grid grid-cols-[repeat(auto-fit,186px)] items-center justify-center gap-3 rounded-2xl p-5 px-5 text-center font-display text-sm md:justify-between xl:mx-0">
      {children}
    </div>
  );
};

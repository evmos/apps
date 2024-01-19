// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CheckIcon } from "@evmosapps/icons/CheckIcon";

export const CheckMark = () => (
  <span className="rounded-full bg-red-300 h-4 w-4 flex items-center justify-center">
    <CheckIcon width={"14px"} height={"14px"} className="text-white" />
  </span>
);

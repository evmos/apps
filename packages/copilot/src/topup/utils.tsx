// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { LayerSwapIcon } from "@evmosapps/icons/LayerSwapIcon";
import { SquidIcon } from "@evmosapps/icons/SquidIcon";
import { TransakIcon } from "@evmosapps/icons/TransakIcon";

export type DropdownOption = {
  name: string;
  image: JSX.Element;
  value: string;
};
export const providerOptions = {
  card: [
    {
      name: "Transak",
      image: <TransakIcon width={20} height={20} />,
      value: "Transak",
    },
  ],
  crypto: [
    {
      name: "Squid",
      image: <SquidIcon width={20} height={20} />,
      value: "Squid",
    },
    {
      name: "Layerswap",
      image: <LayerSwapIcon width={20} height={20} />,
      value: "Layerswap",
    },
  ],
} as const;

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { C14Icon } from "@evmosapps/icons/C14Icon";
import { CypherDIcon } from "@evmosapps/icons/CypherDIcon";
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
      name: "C14",
      image: <C14Icon width={20} height={20} />,
      value: "C14",
    },
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
    {
      name: "Cypher Wallet",
      image: <CypherDIcon width={20} height={20} />,
      value: "Cypher Wallet",
    },
  ],
} as const;

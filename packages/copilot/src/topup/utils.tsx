import {
  C14Icon,
  CypherDIcon,
  LayerSwapIcon,
  SquidIcon,
  TransakIcon,
} from "icons";

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

import { NutIcon, CoinIcon, CalculatorIcon, GovernanceIcon } from "icons";
import { EVMOS_PAGE_URL} from "constants-helper"
export type LaunchPadItemsProps = {
  icon: JSX.Element;
  text: string;
  href: string;
};

export const launchPadItems = [
  {
    icon: <NutIcon width="40" height="40" />,
    text: "dAppStore",
    href: EVMOS_PAGE_URL,
  },
  {
    icon: <CoinIcon width="40" height="40" />,
    text: "Assets",
    href: EVMOS_PAGE_URL + "/assets",
  },
  {
    icon: <CalculatorIcon width="40" height="40" />,
    text: "Staking",
    href: EVMOS_PAGE_URL + "/staking",
  },
  {
    icon: <GovernanceIcon width="40" height="40" />,
    text: "Governance",
    href: EVMOS_PAGE_URL + "/governance",
  },
];

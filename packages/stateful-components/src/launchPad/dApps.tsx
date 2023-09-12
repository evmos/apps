import { NutIcon, CoinIcon, CalculatorIcon, GovernanceIcon } from "icons";
import { t } from "../locales/translate";

const localPorts = {
  "/": 3004,
  "/assets": 3002,
  "/staking": 3003,
  "/governance": 3001,
  "/vesting": 3005,
} as const;

const getHref = (path: keyof typeof localPorts) => {
  if (process.env.NODE_ENV !== "development") return path;
  return `http://localhost:${localPorts[path]}${path}`;
};

export const launchPadItems = [
  {
    icon: <NutIcon width="40" height="40" />,
    text: t("launchPad.dApp.title") as string,
    href: getHref("/"),
    mixpanelId: "dAppStore",
  },
  {
    icon: <CoinIcon width="40" height="40" />,
    text: t("launchPad.assets.title") as string,
    href: getHref("/assets"),
    mixpanelId: "Assets",
  },
  {
    icon: <CalculatorIcon width="40" height="40" />,
    text: t("launchPad.staking.title") as string,
    href: getHref("/staking"),
    mixpanelId: "Staking",
  },
  {
    icon: <GovernanceIcon width="40" height="40" />,
    text: t("launchPad.governance.title") as string,
    href: getHref("/governance"),
    mixpanelId: "Governance",
  },
];

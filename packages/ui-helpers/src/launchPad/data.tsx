import { NutIcon, CoinIcon, CalculatorIcon, GovernanceIcon } from "icons";

export type LaunchPadItemsProps = {
  icon: JSX.Element;
  text: string;
  href: string;
};

const localPorts = {
  "/": 3004,
  "/assets": 3002,
  "/staking": 3003,
  "/governance": 3001,
  "/vesting": 3005,
} as const;

const getHref = (path: keyof typeof localPorts) => {
  if (process.env.NODE_ENV !== "development") return path;
  // eslint-disable-next-line security/detect-object-injection
  return `http://localhost:${localPorts[path]}${path}`;
};

export const launchPadItems = [
  {
    icon: <NutIcon width="40" height="40" />,
    text: "dAppStore",
    href: getHref("/"),
  },
  {
    icon: <CoinIcon width="40" height="40" />,
    text: "Assets",
    href: getHref("/assets"),
  },
  {
    icon: <CalculatorIcon width="40" height="40" />,
    text: "Staking",
    href: getHref("/staking"),
  },
  {
    icon: <GovernanceIcon width="40" height="40" />,
    text: "Governance",
    href: getHref("/governance"),
  },
];

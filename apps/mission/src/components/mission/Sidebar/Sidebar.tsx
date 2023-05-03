// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { GaugeIcon, Coins, GrilledSteak, HandShakeIcon } from "icons";
import SideBarItem, { SideBarEntry } from "./SidebarItem";
import metrics from "../LocalTracker";
import { REDIRECTS_MC } from "tracker";

const sideBarItems: SideBarEntry[] = [
  {
    title: "Mission Control",
    icon: <GaugeIcon height={32} width={32} />,
    path: "/",
    handlePreClickAction: () => {
      return metrics?.track(REDIRECTS_MC, { page: "/" });
    },
  },
  {
    title: "Assets",
    icon: <Coins height={32} width={32} />,
    path: "/assets",
    handlePreClickAction: () => {
      return metrics?.track(REDIRECTS_MC, { page: "/assets" });
    },
  },
  {
    title: "Staking",
    icon: <GrilledSteak height={32} width={32} />,
    path: "/staking",
    handlePreClickAction: () => {
      return metrics?.track(REDIRECTS_MC, { page: "/staking" });
    },
  },
  {
    title: "Governance",
    icon: <HandShakeIcon height={32} width={32} />,
    path: "/governance",
    handlePreClickAction: () => {
      return metrics?.track(REDIRECTS_MC, { page: "/governance" });
    },
  },
];

const SideBar = () => {
  function renderMenuElements() {
    return sideBarItems.map((sbi) => (
      <SideBarItem key={sbi.title} item={sbi} />
    ));
  }

  return (
    <div className="col-span-1 flex flex-col justify-center space-y-3 text-pearl lg:min-w-[200px] lg:text-left">
      {renderMenuElements()}
      <Link
        className="text-center text-xs text-darkGray5 lg:text-left"
        href="https://www.coingecko.com"
        target="_blank"
        rel="noreferrer"
      >
        Price Data from Coingecko
      </Link>
    </div>
  );
};

export default SideBar;

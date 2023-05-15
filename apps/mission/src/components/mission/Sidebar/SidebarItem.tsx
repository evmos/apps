// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { useTracker, CLICK_REDIRECTS_MISSION_CONTROL_SIDEBAR } from "tracker";
export type SideBarEntry = {
  title: string;
  path: string;
  icon: JSX.Element;
};

const SideBarItem = ({ item }: { item: SideBarEntry }) => {
  const { handlePreClickAction } = useTracker(
    CLICK_REDIRECTS_MISSION_CONTROL_SIDEBAR,
    {
      page: item.path,
    }
  );
  const isActive = item.title.includes("Mission");
  return (
    <Link
      href={item.path}
      className="flex justify-center lg:justify-start"
      onClick={() => {
        handlePreClickAction();
      }}
    >
      <div
        className={`flex  w-fit cursor-pointer items-center rounded-full px-4 py-3 hover:bg-white hover:bg-opacity-10
          ${isActive ? "text-pearl" : "text-darkGray4"}`}
      >
        {item.icon}
        <span className="text-sm font-semibold">{item.title}</span>
      </div>
    </Link>
  );
};

export default SideBarItem;

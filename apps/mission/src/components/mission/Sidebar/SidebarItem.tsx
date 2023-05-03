// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";

export type SideBarEntry = {
  title: string;
  path: string;
  icon: JSX.Element;
  handlePreClickAction?: React.MouseEventHandler<HTMLAnchorElement>;
};

const SideBarItem = ({ item }: { item: SideBarEntry }) => {
  const isActive = item.title.includes("Mission");
  return (
    <Link
      href={item.path}
      className="flex  justify-center lg:justify-start"
      onClick={item.handlePreClickAction}
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

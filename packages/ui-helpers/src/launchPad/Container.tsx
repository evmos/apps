// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { LaunchIcon } from "icons";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { launchPadItems } from "./data";
import { Item } from "./Item";
import Link from "next/link";
import { ECOSYSTEM_URL } from "constants-helper";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";
import { PingIndicator } from "../PingIndicator";
import { Badge } from "../badges/Badge";
import { usePingIndicator } from "./usePingIndicator";
export const LaunchContainer = () => {
  const { handlePreClickAction } = useTracker(CLICK_ON_DAPP_INSIDE_LAUNCHER);

  const handleEcosystemButton = () => {
    handlePreClickAction({ OtherActions: "View all dApps" });
  };
  const drawItems = () => {
    return launchPadItems.map((item, index) => {
      return <Item key={index} itemProps={item} />;
    });
  };

  const { showPing, handlePingIndicator, showMessage } = usePingIndicator();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <PingIndicator showPing={showPing}>
        <Menu.Button
          className=" flex items-center justify-center rounded-full p-2"
          onClick={handlePingIndicator}
        >
          <LaunchIcon
            width={30}
            height={30}
            className="transtion-all bg-darkGray700 rounded-full duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]"
          />
        </Menu.Button>
      </PingIndicator>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" absolute z-10 mt-2 w-64 origin-top-right rounded-md bg-[#262017] pt-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:right-0 md:w-96">
          {!showMessage && (
            <div className="bg-darkGray700 mx-8 mb-8 cursor-default space-y-1 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xs font-bold">
                  Discover our new navigation
                </h1>
                <Badge
                  text="New"
                  style="bg-red text-pearl ring-red uppercase"
                />
              </div>
              <p className="text-xs text-[#BDBCB9]">
                Navigate across all Evmos dApps using our new app launcher!
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-10  px-8 pb-8">
            {drawItems()}
          </div>
          <Link
            onClick={handleEcosystemButton}
            href={ECOSYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t-darkGray700 text-pearl bg-darkGray2Opacity active:bg-darkGray700 flex justify-center border-t py-5 text-xs transition-all duration-200 ease-in-out hover:bg-[#FFFFFF0F]"
          >
            View all DApps
          </Link>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

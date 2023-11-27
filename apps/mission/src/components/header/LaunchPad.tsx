"use client";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { Menu, Transition } from "@headlessui/react";
import { ECOSYSTEM_URL } from "constants-helper";
import { cn } from "helpers";
import {
  CalculatorIcon,
  CoinIcon,
  GovernanceIcon,
  LaunchIcon,
  NutIcon,
} from "icons";
import { ComponentProps, Fragment, PropsWithChildren } from "react";
import { CLICK_ON_DAPP_INSIDE_LAUNCHER, useTracker } from "tracker";
import { Badge, NetworkModeSelector } from "@evmosapps/ui-helpers";
import { PingIndicator } from "@evmosapps/ui-helpers/src/PingIndicator";
import { usePingIndicator } from "@evmosapps/ui-helpers/src/launchPad/usePingIndicator";

export function LaunchPad({}: { showPing?: boolean }) {
  const { t } = useTranslation();
  const { sendEvent } = useTracker();
  const { showPing, handlePingIndicator } = usePingIndicator();

  const launchPadItems = [
    {
      icon: <NutIcon width="40" height="40" />,
      children: t("launchPad.dApp.title"),
      href: "/",
      mixpanelId: "dAppStore",
    },
    {
      icon: <CoinIcon width="40" height="40" />,
      children: t("launchPad.assets.title"),
      href: "/portfolio",
      mixpanelId: "Assets",
    },
    {
      icon: <CalculatorIcon width="40" height="40" />,
      children: t("launchPad.staking.title"),
      href: "/staking",
      mixpanelId: "Staking",
    },
    {
      icon: <GovernanceIcon width="40" height="40" />,
      children: t("launchPad.governance.title"),
      href: "/governance",
      mixpanelId: "Governance",
    },
  ];

  return (
    <Menu as="div" className="sm:relative">
      <PingIndicator showPing={showPing}>
        <Menu.Button
          aria-label="launchpad"
          className="transtion-all bg-darkGray700 p-2 rounded-full duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]"
          onClick={handlePingIndicator}
        >
          <LaunchIcon width={"1.4em"} height={"1.4em"} />
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
        <Menu.Items
          className={cn(
            "fixed md:absolute w-full left-0 md:right-0 md:left-auto z-10 mt-2 md:w-96 origin-top-right rounded-md bg-[#262017] pt-8 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
          )}
        >
          {showPing && (
            <div className="bg-darkGray700 mx-8 mb-8 cursor-default space-y-1 rounded-lg p-5">
              <div className="flex items-center justify-between">
                <h1 className="text-xs font-bold">{t("launchPad.title")}</h1>
                <Badge variant="danger" className="uppercase">
                  {t("launchPad.badge.text")}
                </Badge>
              </div>
              <p className="text-xs text-[#BDBCB9]">
                {t("launchPad.description")}
              </p>
            </div>
          )}
          <div className="grid grid-cols-3 gap-y-10 px-8 pb-8">
            {launchPadItems.map(({ href, mixpanelId, ...rest }) => (
              <LaunchPadItem
                key={href}
                href={href}
                onClick={() => {
                  sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                    dApp: mixpanelId,
                  });
                }}
                {...rest}
              />
            ))}
          </div>
          {!!process.env.NEXT_PUBLIC_ENABLE_TESTNET && <NetworkModeSelector />}

          <a
            onClick={() => {
              sendEvent(CLICK_ON_DAPP_INSIDE_LAUNCHER, {
                OtherActions: "View all dApps",
              });
            }}
            href={ECOSYSTEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border-t-darkGray700 text-pearl bg-darkGray2Opacity active:bg-darkGray700 flex justify-center border-t py-5 transition-all duration-200 ease-in-out hover:bg-[#FFFFFF0F]"
          >
            {t("launchPad.button")}
          </a>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export const LaunchPadItem = ({
  icon,
  children,
  ...rest
}: ComponentProps<typeof Link> & {
  icon: JSX.Element;
}) => {
  return (
    <Link
      rel="noopener noreferrer"
      className="text-pearl flex flex-col items-center text-center"
      {...rest}
    >
      <div className="bg-red hover:bg-red1 active:bg-red2 flex w-fit items-center justify-center rounded-lg p-2 transition-all duration-150 ease-in hover:scale-105">
        {icon}
      </div>
      <p>{children}</p>
    </Link>
  );
};

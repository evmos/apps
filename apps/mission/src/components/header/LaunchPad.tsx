// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "helpers";
import { LaunchIcon } from "@evmosapps/icons/LaunchIcon";
import { ComponentProps, Fragment } from "react";
import {
  CLICK_ON_DAPP_INSIDE_LAUNCHER,
  CLICK_ON_VIEW_ALL_DAPPS,
} from "tracker";
import {
  ButtonWithLink,
  NetworkModeSelector,
  TrackerEvent,
} from "@evmosapps/ui-helpers";
import Image from "next/image";

export function LaunchPad({}: { showPing?: boolean }) {
  const { t } = useTranslation();

  const launchPadItems = [
    {
      icon: "/ecosystem/home.png",
      children: t("launchPad.dApp.title"),
      href: "/",
      mixpanelId: "dAppStore",
    },
    {
      icon: "/ecosystem/portfolio.png",
      children: t("launchPad.assets.title"),
      href: "/portfolio",
      mixpanelId: "Portfolio",
    },
    {
      icon: "/ecosystem/comingSoon.png",
      children: t("messages.comingSoon"),
      href: "/coming soon 1",
    },
    {
      icon: "/ecosystem/comingSoon.png",
      children: t("messages.comingSoon"),
      href: "/coming_soon",
    },
  ];

  return (
    <Menu as="div" className="sm:relative flex">
      <Menu.Button
        aria-label="launchpad"
        className="transtion-all bg-darkGray700 rounded-full duration-200 ease-in-out hover:bg-[#534d46] active:bg-[#666059]"
      >
        <LaunchIcon width={40} height={40} />
      </Menu.Button>

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
            " fixed shadow-custom md:absolute w-full px-8 top-32 md:top-9 left-0 md:right-0 md:left-auto z-10 mt-2 md:w-96 origin-top-right rounded-md bg-[#262017] py-8 drop-shadow-md drop-shadow-red1 border border-darkGray700 ",
          )}
        >
          <div className="flex pb-6">
            {launchPadItems[0] && (
              <TrackerEvent
                event={CLICK_ON_DAPP_INSIDE_LAUNCHER}
                properties={{ "dApp Name": launchPadItems[0]?.mixpanelId }}
              >
                <LaunchPadItem
                  key={launchPadItems[0].href}
                  href={launchPadItems[0].href}
                  icon={launchPadItems[0].icon}
                >
                  {launchPadItems[0].children}
                </LaunchPadItem>
              </TrackerEvent>
            )}
          </div>
          <p className="text-xs opacity-90">{t("launchPad.subtitle")}</p>
          <div className="flex justify-between pb-6 pt-3">
            {launchPadItems.slice(1).map(({ href, mixpanelId, ...rest }) => {
              const disabled = mixpanelId === undefined;
              return (
                <TrackerEvent
                  key={href}
                  event={CLICK_ON_DAPP_INSIDE_LAUNCHER}
                  properties={{ "dApp Name": mixpanelId }}
                >
                  <LaunchPadItem href={href} disabled={disabled} {...rest} />
                </TrackerEvent>
              );
            })}
          </div>
          {!!process.env.NEXT_PUBLIC_ENABLE_TESTNET && <NetworkModeSelector />}
          <TrackerEvent
            event={CLICK_ON_VIEW_ALL_DAPPS}
            properties={{ Location: "App Launcher" }}
          >
            <ButtonWithLink href="/dapps" className="w-full mt-2">
              {t("launchPad.button")}
            </ButtonWithLink>
          </TrackerEvent>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const LaunchPadItem = ({
  icon,
  disabled,
  children,
  ...rest
}: ComponentProps<typeof Link> & {
  icon: string;
  disabled?: boolean;
}) => {
  return (
    <Menu.Item>
      {({ close }) => (
        <Link
          onClick={close}
          rel="noopener noreferrer"
          className={`text-pearl text-sm flex flex-col space-y-2
      ${disabled && "pointer-events-none opacity-50"}`}
          {...rest}
        >
          <div
            className={cn(
              "relative shrink-0 w-16 h-16 aspect-square overflow-hidden self-center transition-all duration-150 ease-in hover:scale-105",
              "md:w-20 md:h-20",
            )}
          >
            <Image
              src={icon}
              alt={icon}
              fill={true}
              className="object-cover"
              sizes={"400w"}
            />
          </div>
          <p className="text-center">{children}</p>
        </Link>
      )}
    </Menu.Item>
  );
};

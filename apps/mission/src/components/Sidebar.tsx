// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { IconHome3 } from "@evmosapps/ui/icons/line/basic/home-3.tsx";
import { IconPlanet } from "@evmosapps/ui/icons/line/basic/planet.tsx";
import { IconBook } from "@evmosapps/ui/icons/line/basic/book.tsx";
import { IconExternalLink } from "@evmosapps/ui/icons/line/arrows/external-link.tsx";
import { cn } from "helpers";
import { Link, useTranslation } from "@evmosapps/i18n/client";
import {
  DISCORD_EVMOS_URL,
  DOCS_EVMOS_URL,
  GITHUB_EVMOS_URL,
  MEDIUM_URL,
  TELEGRAM_EVMOS_URL,
  TWITTER_EVMOS_URL,
} from "constants-helper";
import { IconX } from "@evmosapps/ui/icons/social/x.tsx";
import { IconGithub } from "@evmosapps/ui/icons/social/github.tsx";
import { IconDiscord } from "@evmosapps/ui/icons/social/discord.tsx";
import { IconTelegram } from "@evmosapps/ui/icons/social/telegram.tsx";
import { IconMedium } from "@evmosapps/ui/icons/social/medium.tsx";

import { FavoriteSection } from "./FavoriteSection";

import { TrackerEvent } from "@evmosapps/ui-helpers";
import { CLICK_ON_FOOTER_CTA, CLICK_ON_NAVIGATION } from "tracker";
import { usePathname } from "next/navigation";
import { Dispatch, createElement, useState } from "react";
import { DApp } from "@evmosapps/dappstore-page/src/lib/fetch-explorer-data";

const normalizePathname = (pathname: string) =>
  "/" + pathname.split("/").filter(Boolean).join("/");

const NavigationSection = ({
  setFavoritesIsOpen,
  favoritesIsOpen,
}: {
  setFavoritesIsOpen: Dispatch<React.SetStateAction<boolean>>;
  favoritesIsOpen: boolean;
}) => {
  const pathname = normalizePathname(usePathname()) || "/";

  const { t } = useTranslation("dappStore");
  return (
    <nav className="flex flex-col relative w-full z-10">
      <h2 className="text-xs px-8 hidden md:block mb-3">
        {t("navigation.title")}
      </h2>
      <ul className="flex md:flex-col w-full max-w-[100vw] md:gap-y-2 overflow-x-auto scrollbar-hidden px-6 md:px-4 -mb-px md:mb-0 ">
        {[
          {
            label: "navigation.options.discover",
            Icon: IconHome3,
            href: "/",
            target: "_self",
            isActive: !favoritesIsOpen && pathname === "/",
          },
          {
            label: "navigation.options.categories",
            Icon: IconPlanet,
            href: "/dapps",
            target: "_self",
            isActive: !favoritesIsOpen && pathname.startsWith("/dapps"),
          },
          {
            label: "navigation.options.develop",
            Icon: IconBook,
            href: DOCS_EVMOS_URL,
            target: "_blank",
            isActive: false,
          },

          {
            label: "navigation.options.favorites",
            className: "md:hidden",
            Icon: IconBook,
            isActive: favoritesIsOpen,
            onClick: () => {
              setFavoritesIsOpen((v) => !v);
            },
          },
        ].map(({ className, label, Icon, target, isActive, href, onClick }) => {
          return (
            <TrackerEvent
              key={label}
              event={CLICK_ON_NAVIGATION}
              properties={{ navigation: t(label) } as { [key: string]: string }}
            >
              <li>
                {createElement(
                  href ? Link : "button",
                  {
                    className: cn(
                      {
                        "border-primary dark:border-primary-container-dark text-primary dark:text-primary-dark bg-primary/10 dark:bg-primary-dark/10":
                          isActive,
                      },
                      "flex hover:bg-primary/10 border-transparent dark:hover:bg-primary-dark/10 hover:dark:text-primary-dark hover:text-primary  h-11 px-4 justify-center items-center text-base rounded-t-lg",
                      "border-b-2 gap-x-3",
                      "md:rounded-full md:border-none md:justify-start",

                      className,
                    ),
                    target,
                    onClick,
                    href: href || "",
                  },
                  <>
                    <Icon className="hidden md:inline-flex w-5 h-5" />
                    {t(label)}
                    {!href?.startsWith("/") && (
                      <IconExternalLink className="hidden md:inline-flex ml-auto h-4 w-4 opacity-60" />
                    )}
                  </>,
                )}
              </li>
            </TrackerEvent>
          );
        })}
      </ul>
    </nav>
  );
};
const socials = [
  {
    name: "X",
    Icon: IconX,
    href: TWITTER_EVMOS_URL,
  },
  {
    name: "Github",
    Icon: IconGithub,
    href: GITHUB_EVMOS_URL,
  },
  {
    name: "Discord",
    Icon: IconDiscord,
    href: DISCORD_EVMOS_URL,
  },
  {
    name: "Telegram",
    Icon: IconTelegram,
    href: TELEGRAM_EVMOS_URL,
  },
  {
    name: "Medium",
    Icon: IconMedium,
    href: MEDIUM_URL,
  },
];

const SocialSection = () => (
  <nav className="px-4 mb-5 mt-auto gap-x-3 hidden md:flex">
    {socials.map(({ name, Icon, href }) => (
      <TrackerEvent
        key={name}
        event={CLICK_ON_FOOTER_CTA}
        properties={{ "Footer Social Type": name }}
      >
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary dark:hover:text-primary-dark"
        >
          <Icon className="w-4 h-4 opacity-60" />
        </a>
      </TrackerEvent>
    ))}
  </nav>
);

export const Sidebar = ({ dApps }: { dApps: DApp[] }) => {
  const [favoritesIsOpen, setFavoritesIsOpen] = useState(false);

  return (
    <div className="bg-surface dark:bg-surface-dark w-full z-10 sticky top-0 md:col-span-1 md:row-start-2 md:row-span-1 h-full md:top-auto md:pt-5">
      <div className="border-b border-outline-variant dark:border-outline-variant-dark md:border-none flex flex-col h-full">
        <NavigationSection
          setFavoritesIsOpen={setFavoritesIsOpen}
          favoritesIsOpen={favoritesIsOpen}
        />
        <FavoriteSection
          setFavoritesIsOpen={setFavoritesIsOpen}
          favoritesIsOpen={favoritesIsOpen}
          dApps={dApps}
        />
        <SocialSection />
      </div>
    </div>
  );
};

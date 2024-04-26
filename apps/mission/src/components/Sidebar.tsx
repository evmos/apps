// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IconHome3 } from "@evmosapps/ui/icons/line/basic/home-3.tsx";
import { IconPlanet } from "@evmosapps/ui/icons/line/basic/planet.tsx";
import { IconWrench } from "@evmosapps/ui/icons/line/basic/wrench.tsx";
import { IconBook } from "@evmosapps/ui/icons/line/basic/book.tsx";
import { IconExternalLink } from "@evmosapps/ui/icons/line/arrows/external-link.tsx";
import { cn } from "helpers";
import { Link } from "@evmosapps/i18n/client";
import {
  // COMMONWEALTH_URL,
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

const NavigationSection = () => (
  <nav>
    <h2 className="text-xs px-4 hidden md:block">dApp Store</h2>
    <ul className="flex md:flex-col md:gap-y-2">
      {[
        {
          label: "Discovery",
          Icon: IconHome3,
          active: true,
          href: "/",
        },
        { label: "Categories", Icon: IconPlanet, href: "/dapps" },
        { label: "Develop", Icon: IconWrench, href: "#" },
        { label: "Learn", Icon: IconBook, href: DOCS_EVMOS_URL },
      ].map(({ label, Icon, active, href }) => (
        <li key={label}>
          <Link
            href={href}
            className={cn(
              "flex hover:bg-primary/10 border-transparent dark:hover:bg-primary-dark/10 h-11 px-4 justify-center items-center text-base rounded-t-lg",
              "border-b-2 -mb-px md:mb-0 gap-x-2",
              "md:rounded-full md:border-none md:justify-start ",
              {
                "border-primary dark:border-primary-container-dark text-primary dark:text-primary-dark":
                  active,
              },
            )}
          >
            <Icon className="hidden md:inline-flex w-5 h-5" />
            {label}
            {!href.startsWith("/") && (
              <IconExternalLink className="hidden md:inline-flex ml-auto h-4 w-4 opacity-60" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);
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
  <nav className="px-4 mt-auto gap-x-3 hidden md:flex">
    {socials.map(({ name, Icon, href }) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="hover:text-primary dark:hover:text-primary-dark"
      >
        <Icon className="w-4 h-4 opacity-60" />
      </a>
    ))}
  </nav>
);

export const Sidebar = () => (
  <div className="border-b border-outline-variant dark:border-outline-variant-dark px-6 md:px-4 md:border-none flex flex-col h-full">
    <NavigationSection />
    <SocialSection />
  </div>
);

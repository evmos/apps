// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import pkg from "../../../package.json";
import {
  COINGECKO_URL,
  COMMONWEALTH_URL,
  DISCORD_EVMOS_URL,
  DOCS_EVMOS_URL,
  GITHUB_EVMOS_URL,
  MEDIUM_URL,
  TELEGRAM_EVMOS_URL,
  TWITTER_EVMOS_URL,
} from "constants-helper";

import { CodeIcon } from "@evmosapps/icons/CodeIcon";
import { CommonWealthIcon } from "@evmosapps/icons/CommonWealthIcon";
import { DiscordIcon } from "@evmosapps/icons/DiscordIcon";
import { GithubIcon } from "@evmosapps/icons/GithubIcon";
import { MediumIcon } from "@evmosapps/icons/MediumIcon";
import { TelegramIcon } from "@evmosapps/icons/TelegramIcon";
import { TwitterIcon } from "@evmosapps/icons/TwitterIcon";

import { Link } from "@evmosapps/i18n/client";
import { Container, TrackerEvent } from "@evmosapps/ui-helpers";

import { CLICK_ON_FOOTER_CTA } from "tracker";
import { translation } from "@evmosapps/i18n/server";
import { CookiesSettings } from "./cookies-settings";

export const Footer = async () => {
  const { t } = await translation();

  return (
    <Container full className="mt-auto pt-10">
      <footer className="text-gray-700 text-xs mb-10 mt-10 space-y-2 lg:space-y-0 flex lg:justify-between flex-col lg:flex-row items-center">
        <div className="flex flex-col items-center space-y-3 lg:flex-row lg:space-x-10 lg:space-y-0">
          <TrackerEvent
            event={CLICK_ON_FOOTER_CTA}
            properties={{ "Footer Social Type": "Build with evmos" }}
          >
            <a
              href={DOCS_EVMOS_URL}
              className="flex items-center space-x-3 "
              target="_blank"
              rel="noreferrer"
            >
              <CodeIcon
                width={18}
                height={18}
                className="text-gray-700 hover:text-gray-700"
              />
              <p>{t("footer.buildWithUs")}</p>
            </a>
          </TrackerEvent>
          <div className="flex flex-col lg:flex-row space-x-2 text-center lg:text-left items-center space-y-2 lg:space-y-0">
            <h1>Version: main - {pkg.version}</h1>
            <p>
              <a target="_blank" rel="noreferrer" href={COINGECKO_URL}>
                {t("footer.coingeckoAttribution")}
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-2 lg:space-y-0">
          <div className="flex items-center space-x-5 mt-2 lg:mt-0">
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Github" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={GITHUB_EVMOS_URL}
                aria-label="github evmos"
              >
                <GithubIcon width={18} height={18} />
              </a>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "X" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={TWITTER_EVMOS_URL}
                aria-label="twitter evmos"
              >
                <TwitterIcon width={15} height={15} />
              </a>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Discord" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={DISCORD_EVMOS_URL}
                aria-label="discord evmos"
              >
                <DiscordIcon width={18} height={18} />
              </a>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Telegram" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={TELEGRAM_EVMOS_URL}
                aria-label="telegram evmos"
              >
                <TelegramIcon width={18} height={18} />
              </a>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Medium" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={MEDIUM_URL}
                aria-label="medium evmos"
              >
                <MediumIcon width={24} height={24} />
              </a>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Commonwealth" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={COMMONWEALTH_URL}
                aria-label="commonwealth evmos"
              >
                <CommonWealthIcon width={18} height={18} />
              </a>
            </TrackerEvent>
          </div>

          <div className="flex flex-grow flex-col items-center space-y-2 lg:flex-row lg:space-x-5 lg:space-y-0 lg:px-2">
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Terms of service" }}
            >
              <Link href="/terms-of-service">
                <p>{t("footer.termsOfService")}</p>
              </Link>
            </TrackerEvent>
            <TrackerEvent
              event={CLICK_ON_FOOTER_CTA}
              properties={{ "Footer Social Type": "Privacy Statement" }}
            >
              <Link href={"/privacy-policy"}>
                <p>{t("footer.privacyPolicy")}</p>
              </Link>
            </TrackerEvent>
            <CookiesSettings />
          </div>
        </div>
      </footer>
    </Container>
  );
};

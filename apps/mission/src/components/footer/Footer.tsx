// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import {
  COINGECKO_URL,
  FEEDBACK_URL,
  DISCORD_EVMOS_URL,
  MEDIUM_URL,
  TELEGRAM_EVMOS_URL,
  TWITTER_EVMOS_URL,
  GITHUB_EVMOS_URL,
  ENABLE_TESTNET,
} from "@evmosapps/constants";

import { DiscordIcon } from "@evmosapps/icons/DiscordIcon";
import { MediumIcon } from "@evmosapps/icons/MediumIcon";
import { TelegramIcon } from "@evmosapps/icons/TelegramIcon";
import { TwitterIcon } from "@evmosapps/icons/TwitterIcon";

import { Link } from "@evmosapps/i18n/client";
import {
  Container,
  NetworkModeSelector,
  TrackerEvent,
} from "@evmosapps/ui-helpers";
import { CLICK_ON_FOOTER_CTA } from "tracker";
import { translation } from "@evmosapps/i18n/server";
import { IconComment2Info } from "@evmosapps/ui/icons/line/chat/comment-2-info.tsx";
import { CookiesSettings } from "./cookies-settings";
import { GithubIcon } from "@evmosapps/icons/GithubIcon";

export const Footer = async () => {
  const { t } = await translation();

  return (
    <Container full className="mt-auto px-5 md:px-14 pt-5">
      {ENABLE_TESTNET && <NetworkModeSelector />}
      <footer className="text-subheading dark:text-subheading-dark text-base space-y-5 mt-10 mb-14 lg:space-y-0 flex lg:justify-between flex-col lg:flex-row items-center">
        <div className="flex lg:w-1/3 justify-start items-center lg:mb-0">
          <TrackerEvent
            event={CLICK_ON_FOOTER_CTA}
            properties={{ "Footer Social Type": "Give Feedback" }}
          >
            <a
              target="_blank"
              href={FEEDBACK_URL}
              className="flex items-center space-x-2"
            >
              <IconComment2Info className="h-5 w-5" />
              <p>{t("footer.shareFeedback")}</p>
            </a>
          </TrackerEvent>
        </div>

        {/* social networks */}
        <div className="md:hidden flex flex-row">
          <div className="flex items-center space-x-10 mt-2 lg:mt-0">
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
              properties={{ "Footer Social Type": "Github" }}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={GITHUB_EVMOS_URL}
                aria-label="github evmos"
              >
                <GithubIcon width={15} height={15} />
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
          </div>
        </div>

        {/* Terms - Privacy - Cookies */}
        <div className="flex flex-row lg:flex-row items-center lg:space-x-10 space-y-2 lg:space-y-0 lg:w-1/3 justify-center">
          <div className="flex items-center space-x-5 mt-2 lg:mt-0">
            <div className="flex flex-grow flex-row items-center space-x-6 space-y-0 lg:px-2">
              <TrackerEvent
                event={CLICK_ON_FOOTER_CTA}
                properties={{ "Footer Social Type": "Privacy Statement" }}
              >
                <Link href="/privacy-policy">
                  <p>{t("footer.privacyPolicy")}</p>
                </Link>
              </TrackerEvent>

              <TrackerEvent
                event={CLICK_ON_FOOTER_CTA}
                properties={{ "Footer Social Type": "Terms of service" }}
              >
                <Link href="/terms-of-service">
                  <p>{t("footer.termsOfService")}</p>
                </Link>
              </TrackerEvent>

              <CookiesSettings />
            </div>
          </div>
        </div>

        {/* CoinGecko */}
        <div className="flex lg:w-1/3 lg:justify-end">
          <p>
            {t("footer.dataProvided")}
            <a
              target="_blank"
              rel="noreferrer"
              className="font-bold text-heading dark:text-heading-dark"
              href={COINGECKO_URL}
            >
              {t("footer.coingecko")}
            </a>
          </p>
        </div>
      </footer>
    </Container>
  );
};

import pkg from "../../../package.json";
import { COMMONWEALTH_URL, DOCS_SMART_CONTRACTS_URL } from "constants-helper";
import {
  CodeIcon,
  CommonWealthIcon,
  DiscordIcon,
  GithubIcon,
  TelegramIcon,
  TwitterIcon,
} from "icons";

import { translation } from "@evmosapps/i18n/server";
import { ConsentModalButton } from "stateful-components/src/modals/ConsentModal/ConsentModal";
import { Container } from "@evmosapps/ui-helpers";
import { Link } from "@evmosapps/i18n/client";
import { Suspense } from "react";

export const Footer = async () => {
  const { t } = await translation();
  return (
    <Container full className="mt-auto">
      <footer className="text-gray-700 mb-10 mt-10 space-y-2 lg:space-y-0 flex lg:justify-between flex-col lg:flex-row items-center">
        <div className="flex flex-col items-center space-y-3 lg:flex-row lg:space-x-10 lg:space-y-0">
          <p>
            <a
              href={DOCS_SMART_CONTRACTS_URL}
              className="flex items-center space-x-3 text-sm"
              target="_blank"
              rel="noreferrer"
            >
              <CodeIcon
                width={30}
                height={30}
                className="text-gray-700 hover:text-gray-700"
              />
              <span>{t("footer.buildWithUs")}</span>
            </a>
          </p>
          <div className="flex flex-col lg:flex-row space-x-2 text-center lg:text-left items-center space-y-2 lg:space-y-0">
            <h1>Version: main - {pkg.version}</h1>
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.coingecko.com"
                aria-label="coingecko"
                className="text-sm"
              >
                {t("footer.coingeckoAttribution")}
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center lg:space-x-10 space-y-2 lg:space-y-0">
          <div className="flex items-center space-x-5 mt-2 lg:mt-0">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/tharsis/evmos"
              aria-label="github evmos"
            >
              <GithubIcon />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/evmosorg"
              aria-label="twitter evmos"
            >
              <TwitterIcon width={20} height={20} />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.com/invite/evmos"
              aria-label="discord evmos"
            >
              <DiscordIcon />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://t.me/EvmosOrg"
              aria-label="discord telegram"
            >
              <TelegramIcon />
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href={COMMONWEALTH_URL}
              aria-label="commonwealth evmos"
            >
              <CommonWealthIcon />
            </a>
          </div>

          <div className="flex flex-grow flex-col items-center space-y-2 lg:flex-row lg:space-x-5 lg:space-y-0 lg:px-2">
            <p>
              <Link href="/terms-of-service" aria-label="terms of services">
                {t("footer.termsOfService")}
              </Link>
            </p>
            <p>
              <Link href={"/privacy-policy"} aria-label="privacy policy">
                {t("footer.privacyPolicy")}
              </Link>
            </p>

            <ConsentModalButton>
              <p>{t("footer.cookiesSettings")}</p>
            </ConsentModalButton>
          </div>
        </div>
      </footer>
    </Container>
  );
};

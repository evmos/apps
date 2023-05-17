// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
const COMMONWEALTH_URL = "https://commonwealth.im/evmos";
import {
  TwitterIcon,
  TelegramIcon,
  GithubIcon,
  DiscordIcon,
  CommonWealthIcon,
} from "icons";

export const Footer = ({
  onClickFeedback,
  version,
}: {
  onClickFeedback?: React.MouseEventHandler<HTMLAnchorElement>;
  version: string;
}) => {
  function getVersion() {
    const app_env = process.env.NEXT_PUBLIC_EVMOS_APP_ENV ?? "staging";
    if (app_env === "production") {
      return version;
    }
    return "main - " + version;
  }

  return (
    <footer className=" mb-10 mt-10 flex w-full flex-col items-center space-y-2 text-pearl xl:justify-between">
      <div className="flex items-center space-x-5">
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://github.com/tharsis/evmos"
          aria-label="github evmos"
        >
          <GithubIcon />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/evmosorg"
          aria-label="twitter evmos"
        >
          <TwitterIcon />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/invite/evmos"
          aria-label="discord evmos"
        >
          <DiscordIcon />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://t.me/EvmosOrg"
          aria-label="discord telegram"
        >
          <TelegramIcon />
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={COMMONWEALTH_URL}
          aria-label="commonwealth evmos"
        >
          <CommonWealthIcon />
        </Link>
      </div>
      <div className="flex w-full items-center justify-center space-x-5 px-2">
        <p>Version: {getVersion()}</p>
        <p>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://evmos.org/terms-of-service"
            aria-label="terms of services"
          >
            Terms of Service
          </Link>
        </p>
        <p>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://evmos.org/privacy-policy"
            aria-label="privacy policy"
          >
            Privacy Policy
          </Link>
        </p>
        <p>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://evmos.canny.io/feedback"
            aria-label="feedback"
            onClick={onClickFeedback}
          >
            Feedback
          </Link>
        </p>
      </div>
    </footer>
  );
};

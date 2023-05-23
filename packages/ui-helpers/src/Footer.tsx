// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
const VERSION_TAG = "c549d8f";
const COMMONWEALTH_URL = "https://commonwealth.im/evmos";
import {
  TwitterIcon,
  TelegramIcon,
  GithubIcon,
  DiscordIcon,
  CommonWealthIcon,
} from "icons";
import { PRIVACY_POLICY_URL } from "constants-helper";

export const Footer = ({
  onClickFeedback,
  handleCookies,
}: {
  onClickFeedback?: React.MouseEventHandler<HTMLAnchorElement>;
  handleCookies?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
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
        <p>Version: {VERSION_TAG}</p>
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
            href={PRIVACY_POLICY_URL}
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
        <button onClick={handleCookies}>Cookies Settings</button>
      </div>
    </footer>
  );
};

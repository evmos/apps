import dynamic from "next/dynamic";
import Link from "next/link";
import { VERSION_TAG, COMMONWEALTH_URL } from "constants-helper";

import TwitterIcon from "./icons/Twitter";
import TelegramIcon from "./icons/Telegram";
import GithubIcon from "./icons/GitHub";
import DiscordIcon from "./icons/Discord";
import CommonWealthIcon from "./icons/CommonWealth";

export const Footer = () => {
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
          >
            Feedback
          </Link>
        </p>
      </div>
    </footer>
  );
};

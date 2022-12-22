import dynamic from "next/dynamic";
import Link from "next/link";

const TwitterIcon = dynamic(() => import("./icons/Twitter"));
const TelegramIcon = dynamic(() => import("./icons/Telegram"));
const GithubIcon = dynamic(() => import("./icons/GitHub"));
const DiscordIcon = dynamic(() => import("./icons/Discord"));
const CommonWealthIcon = dynamic(() => import("./icons/CommonWealth"));

const Footer = () => {
  return (
    <footer className=" mb-10 flex lg:justify-between text-pearl w-full mt-10 flex-col items-center space-y-2">
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
          href="https://commonwealth.im/evmos"
          aria-label="commonwealth evmos"
        >
          <CommonWealthIcon />
        </Link>
      </div>
      <div className="flex items-center space-x-5">
        <p>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://evmos.notion.site/Terms-of-Service-2a064953c56741a79331f7f767e3634d"
            aria-label="terms of services"
          >
            Terms of Service
          </Link>
        </p>
        <p>
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://evmos.notion.site/PRIVACY-NOTICE-1e9a3346e3d343eb9fd3e61527d28d62"
            aria-label="privacy policy"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { EvmosRedIcon, Logo, PriceDown, PriceUp } from "icons";
import { EVMOS_PAGE_URL } from "constants-helper";
import { LaunchContainer } from "./launchPad/Container";
import { LaunchPadProps } from "./launchPad/types";
import { NetworkModeSelector } from "./NetworkModeSelector";

export const Header = ({
  walletConnectionButton,
  onClick,
  price,
  pageName,
  launchPad,
  evmosPriceChange,
}: {
  walletConnectionButton?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  price?: string;
  pageName: string;
  launchPad: LaunchPadProps;
  evmosPriceChange: number;
}) => {
  return (
    <div className="mt-5 md:mt-0 text-pearl mb-3 flex flex-col md:mx-0 md:h-32 md:flex-row md:items-center md:justify-between">
      <Link
        href={EVMOS_PAGE_URL}
        rel="noreferrer"
        className="flex justify-center items-center h-7 md:h-8 lg:h-9"
        aria-label="home"
        onClick={onClick}
      >
        <Logo className="h-7 md:h-8 lg:h-9 w-auto mr-2 lg:mr-3" />
        <p className="text-red relative top-[6px] text-[24px] md:text-[30px] lg:text-[36px] font-bold ">
          <span className="text-pearl mr-4 md:mr-5 lg:mr-6">Evmos</span>
          {pageName}
        </p>
      </Link>
      {!!process.env.NEXT_PUBLIC_ENABLE_TESTNET && <NetworkModeSelector />}
      <div className="flex items-center justify-center md:space-x-16">
        <div className="font-sm text-pearl bg-darGray800 hidden cursor-default items-center justify-center space-x-3 rounded-full px-4 py-2 font-bold md:flex">
          <EvmosRedIcon width={"20"} height={"20"} />
          <span>{price}</span>

          <div className="flex items-center gap-1">
            {evmosPriceChange > 0 ? <PriceUp /> : <PriceDown />}
            <span
              className={`${
                evmosPriceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"
              } font-normal`}
            >
              {evmosPriceChange.toFixed(2)}%
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <LaunchContainer launchPad={launchPad} />
          {walletConnectionButton}
        </div>
      </div>
    </div>
  );
};

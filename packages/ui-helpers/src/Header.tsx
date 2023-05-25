// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Logo } from "icons";
import { Button } from "./Button";
import { EVMOS_PAGE_URL } from "constants-helper";
export const Header = ({
  pageName,
  setShowSidebar,
  walletConnectionButton,
  onClick,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
  walletConnectionButton?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}) => {
  const handleClick = useCallback(() => {
    if (setShowSidebar !== undefined) {
      setShowSidebar(true);
    }
  }, [setShowSidebar]);

  return (
    <div className="mx-5 mb-3 flex flex-col text-pearl xl:mx-0 xl:h-32 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center justify-between xl:justify-start">
        <Link
          href={EVMOS_PAGE_URL}
          rel="noreferrer"
          className="xl:pr-14"
          aria-label="home"
          onClick={onClick}
        >
          <Logo className="h-20 w-32 xl:w-36" />
        </Link>
        <div className="flex items-center space-x-2">
          <p className="text-base font-bold lg:text-xl">{pageName}</p>
          {pageName.includes("Mission") && (
            <Button className="lg:hidden" onClick={handleClick}>
              <span>Menu</span>
            </Button>
          )}
        </div>
      </div>
      {walletConnectionButton}
    </div>
  );
};

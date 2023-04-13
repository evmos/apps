import Link from "next/link";
import { ButtonWalletConnection, StoreType } from "evmos-wallet";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "button";

import { Logo } from "icons";

const Header = ({
  pageName,
  setShowSidebar,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleClick = useCallback(() => {
    if (setShowSidebar !== undefined) {
      setShowSidebar(true);
    }
  }, [setShowSidebar]);

  const value = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();
  return (
    <div className="mx-5 mb-3 flex flex-col text-pearl xl:mx-0 xl:h-32 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center justify-between xl:justify-start">
        <Link
          href="https://app.evmos.org"
          rel="noreferrer"
          className="xl:pr-14"
          aria-label="home"
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
      <ButtonWalletConnection walletExtension={value} dispatch={dispatch} />
    </div>
  );
};

export default Header;

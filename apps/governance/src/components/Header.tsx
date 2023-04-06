import dynamic from "next/dynamic";
import Link from "next/link";
import { ButtonWalletConnection, StoreType } from "evmos-wallet";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "./common/Button";

const Logo = dynamic(() => import("./common/images/Logo"));


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
    <div className="xl:h-32 mb-3 text-pearl flex flex-col xl:flex-row xl:items-center xl:justify-between mx-5 xl:mx-0">
      <div className="flex items-center justify-between xl:justify-start">
        <Link
          href="https://app.evmos.org"
          rel="noreferrer"
          className="xl:pr-14"
          aria-label="home"
        >
          <Logo className="w-32 xl:w-36 h-20" />
        </Link>
        <div className="flex items-center space-x-2">
          <p className="text-base lg:text-xl font-bold">{pageName}</p>
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

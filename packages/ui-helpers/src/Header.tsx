import Link from "next/link";
import { ButtonWalletConnection } from "evmos-wallet";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Logo } from "icons";
import { WalletExtension } from "evmos-wallet/src/internal/wallet/functionality/wallet";
import { Button } from "./Button";
export const Header = ({
  pageName,
  setShowSidebar,
  wallet,
  dispatch,
}: {
  pageName: string;
  setShowSidebar?: Dispatch<SetStateAction<boolean>>;
  wallet: WalletExtension;
  dispatch: any;
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
      <ButtonWalletConnection walletExtension={wallet} dispatch={dispatch} />
    </div>
  );
};

import dynamic from "next/dynamic";
import Link from "next/link";
import { ButtonWalletConnection, StoreType } from "evmos-wallet";
import { useDispatch, useSelector } from "react-redux";

const Logo = dynamic(() => import("./common/images/Logo"));

const Header = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);
  const dispatch = useDispatch();

  return (
    <div className="mx-5 mb-3 flex flex-col text-white xl:mx-0 xl:h-32 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center justify-between xl:justify-start">
        <Link
          href="https://app.evmos.org"
          rel="noreferrer"
          className="xl:pr-14"
          aria-label="home"
        >
          <Logo className="h-20 w-32 xl:w-36" />
        </Link>
        <p className="text-xl font-bold">Assets</p>
      </div>
      <ButtonWalletConnection walletExtension={value} dispatch={dispatch} />
    </div>
  );
};

export default Header;

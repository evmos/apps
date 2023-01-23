import dynamic from "next/dynamic";
import Link from "next/link";

const Logo = dynamic(() => import("./common/images/Logo"));
const ButtonWalletConnection = dynamic(
  () => import("./wallet/ButtonWalletConnection")
);

const Header = () => {
  return (
    <div className="xl:h-32 mb-3 text-white flex flex-col xl:flex-row xl:items-center xl:justify-between mx-5 xl:mx-0">
      <div className="flex items-center justify-between xl:justify-start ">
        <Link href={"/"} className="xl:pr-14" aria-label="home">
          <Logo className="w-32 xl:w-36 h-20" />
        </Link>
        <p className="text-xl font-bold">
          Assets{" "}
          <span className="text-sm bg-red rounded-xl px-3 py-1 ml-2 items-center">
            BETA
          </span>
        </p>
      </div>
      <ButtonWalletConnection />
    </div>
  );
};

export default Header;

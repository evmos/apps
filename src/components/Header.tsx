import dynamic from "next/dynamic";
import Link from "next/link";
import ButtonWalletConnection from "./ButtonWalletConnection";

const Logo = dynamic(() => import("./images/Logo"));

const Header = () => {
  return (
    <div className="h-32 text-white flex items-center justify-between">
      <div className="flex items-center">
        <Link href={"/"} className="pb-[0.35rem] pr-14">
          <Logo width={150} />
        </Link>
        <p className="text-xl font-bold">Assets</p>
      </div>
      <ButtonWalletConnection />
    </div>
  );
};

export default Header;

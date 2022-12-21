import dynamic from "next/dynamic";
import Link from "next/link";

const Logo = dynamic(() => import("./common/images/Logo"));
const ButtonWalletConnection = dynamic(
  () => import("./wallet/ButtonWalletConnection")
);

const Header = () => {
  return (
    <div className="md:h-32 mb-3 text-white flex flex-col md:flex-row md:items-center md:justify-between ">
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

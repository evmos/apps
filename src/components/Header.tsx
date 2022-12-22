import dynamic from "next/dynamic";
import Link from "next/link";

const Logo = dynamic(() => import("./common/images/Logo"));
const ButtonWalletConnection = dynamic(
  () => import("./wallet/ButtonWalletConnection")
);

const Header = () => {
  return (
    <div className="md:h-32 mb-3 text-white flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center justify-between md:justify-start">
        <Link href={"/"} className="md:pr-14" aria-label="home">
          <Logo className="w-32 md:w-36 h-20" />
        </Link>
        <p className="text-xl font-bold">Assets</p>
      </div>
      <ButtonWalletConnection />
    </div>
  );
};

export default Header;

import dynamic from "next/dynamic";
import Link from "next/link";
import { truncateAddress } from "../internal/wallet/style/format";

// Components
const Button = dynamic(() => import("./Button"));

// Images
// import WalletIcon from '@/images/icons/WalletIcon'
const Logo = dynamic(() => import("./images/Logo"));
const WalletIcon = dynamic(() => import("./images/icons/WalletIcon"));
const MetamaskIcon = dynamic(() => import("./images/icons/MetamaskIcon"));
const KeplrIcon = dynamic(() => import("./images/icons/KeplrIcon"));
const WalletConnectIcon = dynamic(
  () => import("./images/icons/WalletConnectIcon")
);

const Header = () => {
  const address = "evmos1c8wgcmqde5jzymrjrflpp8j20ss000c00zd0ak";
  const truncatedAddress = truncateAddress(address);

  return (
    <div className="h-32 text-white flex items-center justify-between">
      <div className="flex items-center">
        <Link href={"/"} className="pb-[0.35rem] pr-14">
          <Logo width={150} />
        </Link>
        <p className="text-xl font-bold">Assets</p>
      </div>
      <div className="flex items-center space-x-3">
        <KeplrIcon />
        <span className="text-lg font-bold">{truncatedAddress}</span>
      </div>
      {/* <Button
        onClick={() => {
          
        }}
      >
        <div className="flex items-center space-x-2">
          <WalletIcon />
          <span>Connect wallet</span>
        </div>
      </Button> */}
      {/* .secondary {
  border-color: currentColor;

  @media (--has-hover) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
 */}
    </div>
  );
};

export default Header;

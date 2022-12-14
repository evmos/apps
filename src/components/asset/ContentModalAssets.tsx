import { truncateAddress } from "../../internal/wallet/style/format";
import DownArrowHollowIcon from "../common/images/icons/DownArrowHollowIcon";
import KeplrIcon from "../common/images/icons/KeplrIcon";
import MetamaskIcon from "../common/images/icons/MetamaskIcon";
import ConfirmButton from "./ConfirmButton";
import GetButtonAddress from "./GetAddressButton";

const ContentModalAssets = ({
  token,
  address,
  amount,
}: {
  token: string;
  address: string;
  amount: number;
}) => {
  return (
    <div className="">
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        <div className="flex items-center space-x-10">
          <span>FROM</span>
          <div className="flex items-center space-x-3">
            <MetamaskIcon />
            <span>{token}</span>
          </div>
          <span className="opacity-80">{truncateAddress(address)}</span>
        </div>
        {/* TODO: sacar el borde tan fuerte del input */}
        <div className="pr-5 flex items-center space-x-5 bg-white hover:border-black focus-visible:border-black focus-within:border-black border rounded-lg">
          <input className="w-full p-3 border-none" />
          <span className="opacity-80">{token}</span>
          <button className="border border-black rounded-lg px-2 py-1 opacity-80">
            MAX
          </button>
        </div>
        <div>
          Balance: {amount} {token}
        </div>
        <div>
          0.01 GRAV is reserved for transaction fees on the Evmos network.
        </div>
      </div>

      <div className="relative h-8">
        <div className="border w-14 h-14 border-pearl bg-darkGray2 rounded-[50%] flex items-center justify-center z-10 absolute left-1/2 top-[-10px] -translate-x-1/2 ">
          <DownArrowHollowIcon />
        </div>
      </div>
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5">
        <div className="flex items-center space-x-10">
          <span>TO</span>
          <div className="flex items-center space-x-3">
            <KeplrIcon />
            <span>{token}</span>
          </div>
        </div>
        <button className="flex items-center border border-red text-darkGray4 bg-pearl rounded-lg px-5 space-x-2">
          <MetamaskIcon width={20} />
          <span className="uppercase ">add {token}</span>
        </button>
        <div className="flex items-center space-x-5">
          <GetButtonAddress onClick={() => {}}>
            <div className="flex items-center space-x-3">
              <MetamaskIcon width={25} />
              <span className="uppercase">Get Address</span>
            </div>
          </GetButtonAddress>
          <GetButtonAddress onClick={() => {}}>
            <div className="flex items-center space-x-3">
              <KeplrIcon width={25} />
              <span className="uppercase">Get Address</span>
            </div>
          </GetButtonAddress>
        </div>
      </div>

      <ConfirmButton text="Deposit" />
    </div>
  );
};

export default ContentModalAssets;

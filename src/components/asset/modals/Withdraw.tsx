import { getReservedForFee } from "../../../internal/asset/style/format";
import KeplrIcon from "../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../common/images/icons/MetamaskIcon";
import ConfirmButton from "../ConfirmButton";
import GetButtonAddress from "../GetAddressButton";
import Arrow from "./common/Arrow";
import FromContainer from "./common/FromContainer";
import ToContainer from "./common/ToContainer";

const Withdraw = ({
  token,
  address,
  amount,
  title,
  network,
}: {
  token: string;
  address: string;
  amount: number;
  title: string;
  network: string;
}) => {
  return (
    <div className="text-darkGray3">
      <p className="text-sm max-w-[500px] pb-3 italic">
        At this time, only IBC coins can be withdrawn. Existing ERC-20 coins
        must be converted back to IBC coins before being transferable to other
        IBC chains
      </p>
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        <FromContainer token={token} address={address} amount={amount} />
        <div className="text-xs font-bold opacity-80">
          {getReservedForFee(amount, token, network)}{" "}
        </div>
      </div>
      <Arrow />

      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5">
        <ToContainer token={token} />

        <div className="flex items-center space-x-5">
          <GetButtonAddress onClick={() => {}}>
            <div className="flex items-center space-x-3">
              <MetamaskIcon width={25} height={25} />
              <span className="uppercase">Get Address</span>
            </div>
          </GetButtonAddress>
          <GetButtonAddress onClick={() => {}}>
            <div className="flex items-center space-x-3">
              <KeplrIcon width={25} height={25} />
              <span className="uppercase">Get Address</span>
            </div>
          </GetButtonAddress>
        </div>
      </div>

      <ConfirmButton text={title} onClick={() => {}} />
    </div>
  );
};

export default Withdraw;

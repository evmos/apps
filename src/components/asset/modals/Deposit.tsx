import { getReservedForFee } from "../../../internal/asset/style/format";
import { truncateAddress } from "../../../internal/wallet/style/format";
import DownArrowHollowIcon from "../../common/images/icons/DownArrowHollowIcon";
import KeplrIcon from "../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../common/images/icons/MetamaskIcon";
import ConfirmButton from "../ConfirmButton";
import GetButtonAddress from "../GetAddressButton";
import Arrow from "./common/Arrow";
import FromContainer from "./common/FromContainer";
import ToContainer from "./common/ToContainer";

const Deposit = ({
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

export default Deposit;

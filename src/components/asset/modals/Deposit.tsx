import { BigNumber } from "ethers";
import { getReservedForFee } from "../../../internal/asset/style/format";
import KeplrIcon from "../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../common/images/icons/MetamaskIcon";
import ConfirmButton from "../ConfirmButton";
import GetButtonAddress from "../GetAddressButton";
import Arrow from "./common/Arrow";
import FromContainer from "./common/FromContainer";
import ToContainer from "./common/ToContainer";

const Deposit = ({
  token,
  tokenTo,
  address,
  amount,
  title,
  network,
  imgFrom,
  imgTo,
  fee,
  feeDenom,
  decimals,
}: {
  token: string;
  tokenTo: string;
  address: string;
  amount: BigNumber;
  title: string;
  network: string;
  imgFrom: string;
  imgTo: string;
  fee: BigNumber;
  feeDenom: string;
  decimals: number;
}) => {
  return (
    <div className="text-darkGray3">
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        <FromContainer
          token={token}
          address={address}
          amount={amount}
          img={imgFrom}
          fee={fee}
          decimals={decimals}
          feeDenom={feeDenom}
        />
        <div className="text-xs font-bold opacity-80">
          {getReservedForFee(fee, feeDenom, network)}
        </div>
      </div>
      <Arrow />
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={tokenTo} img={imgTo} />
        <div className="flex sm:items-center sm:space-x-5 flex-col sm:flex-row space-y-4 sm:space-y-0 w-fit">
          <GetButtonAddress
            onClick={() => {
              // TODO: implement function
              throw "Not implemented!";
            }}
          >
            <div className="flex items-center space-x-3">
              <MetamaskIcon width={25} height={25} />
              <span className="uppercase">Get Address</span>
            </div>
          </GetButtonAddress>
          <GetButtonAddress
            onClick={() => {
              // TODO: implement function
              throw "Not implemented!";
            }}
          >
            <div className="flex items-center space-x-3">
              <KeplrIcon width={25} height={25} />
              <span className="uppercase">Get Address</span>
            </div>
          </GetButtonAddress>
        </div>
      </div>
      <ConfirmButton
        text={title}
        onClick={() => {
          // TODO: implement function
          throw "Not implemented!";
        }}
      />
    </div>
  );
};

export default Deposit;

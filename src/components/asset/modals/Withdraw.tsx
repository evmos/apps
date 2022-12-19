import { BigNumber } from "ethers";
import { getReservedForFee } from "../../../internal/asset/style/format";
import KeplrIcon from "../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../common/images/icons/MetamaskIcon";
import ConfirmButton from "../ConfirmButton";
import GetButtonAddress from "../GetAddressButton";
import Arrow from "./common/Arrow";
import FromContainer from "./common/FromContainer";
import ToContainer from "./common/ToContainer";

export interface IBCChainParams {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  dstChain: string;
  token: string;
  gas?: number;
}

const Withdraw = ({
  token,
  tokenTo,
  address,
  amount,
  decimals,
  fee,
  feeDenom,
  title,
  network,
  imgFrom,
  imgTo,
}: {
  token: string;
  tokenTo: string;
  address: string;
  // receiver: string;
  amount: BigNumber;
  decimals: number;
  fee: BigNumber;
  feeDenom: string;
  title: string;
  network: string;
  imgFrom: string;
  imgTo: string;
  pubkey: string;
}) => {
  return (
    <div className="text-darkGray3">
      <p className="text-sm max-w-[500px] pb-3 italic">
        At this time, only IBC coins can be withdrawn. Existing ERC-20 coins
        must be converted back to IBC coins before being transferable to other
        IBC chains
      </p>
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-2 ">
        <FromContainer
          token={token}
          address={address}
          amount={amount}
          fee={fee}
          decimals={decimals}
          feeDenom={feeDenom}
          img={imgFrom}
        />
        <div className="text-xs font-bold opacity-80">
          {getReservedForFee(fee, feeDenom, network)}
        </div>
      </div>
      <Arrow />

      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={tokenTo} img={imgTo} />

        <div className="flex items-center space-x-5">
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
          throw "not implemented";
        }}
      />
    </div>
  );
};

export default Withdraw;

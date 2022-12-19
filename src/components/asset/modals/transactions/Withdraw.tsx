import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";
import GetButtonAddress from "../../utils/GetAddressButton";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";

export interface IBCChainParams {
  sender: string;
  receiver: string;
  amount: string;
  srcChain: string;
  dstChain: string;
  token: string;
  gas?: number;
}

const Withdraw = ({ values }: ModalProps) => {
  return (
    <div className="text-darkGray3">
      <p className="text-sm max-w-[500px] pb-3 italic">
        At this time, only IBC coins can be withdrawn. Existing ERC-20 coins
        must be converted back to IBC coins before being transferable to other
        IBC chains
      </p>
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-2 ">
        <FromContainer
          token={values.token}
          address={values.address}
          amount={values.amount}
          fee={values.fee}
          decimals={values.decimals}
          feeDenom={values.feeDenom}
          img={values.imgFrom}
        />
        <div className="text-xs font-bold opacity-80">
          {getReservedForFeeText(values.fee, values.feeDenom, values.network)}
        </div>
      </div>
      <Arrow />

      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={values.tokenTo} img={values.imgTo} />

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
        text={values.title}
        onClick={() => {
          throw "not implemented";
        }}
      />
    </div>
  );
};

export default Withdraw;

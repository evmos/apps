import { getReservedForFeeText } from "../../../../internal/asset/style/format";
import ConfirmButton from "../../../common/ConfirmButton";
import KeplrIcon from "../../../common/images/icons/KeplrIcon";
import MetamaskIcon from "../../../common/images/icons/MetamaskIcon";
import GetButtonAddress from "../../utils/GetAddressButton";
import Arrow from "../common/Arrow";
import FromContainer from "../common/FromContainer";
import ToContainer from "../common/ToContainer";
import { ModalProps } from "./types";

const Deposit = ({ values }: ModalProps) => {
  return (
    <div className="text-darkGray3">
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        <FromContainer
          token={values.token}
          address={values.address}
          amount={values.amount}
          img={values.imgFrom}
          fee={values.fee}
          decimals={values.decimals}
          feeDenom={values.feeDenom}
        />
        <div className="text-xs font-bold opacity-80">
          {getReservedForFeeText(values.fee, values.feeDenom, values.network)}
        </div>
      </div>
      <Arrow />
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={values.tokenTo} img={values.imgTo} />
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
        text={values.title}
        onClick={() => {
          // TODO: implement function
          throw "Not implemented!";
        }}
      />
    </div>
  );
};

export default Deposit;

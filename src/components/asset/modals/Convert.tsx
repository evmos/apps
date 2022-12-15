import { getReservedForFee } from "../../../internal/asset/style/format";
import ConfirmButton from "../ConfirmButton";
import Arrow from "./common/Arrow";
import FromContainer from "./common/FromContainer";
import Tabs from "./common/Tabs";
import ToContainer from "./common/ToContainer";

const Convert = ({
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
        <div>
          <span className="font-bold">Select balance:</span>
          <Tabs />
        </div>
        <div className="text-xs font-bold opacity-80">
          {getReservedForFee(amount, token, network)}
        </div>
      </div>
      <Arrow />
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5">
        <ToContainer token={token} />
      </div>
      <ConfirmButton
        onClick={() => {
          // TODO: implement function
          throw "Not implemented!";
        }}
        text={title}
      />
    </div>
  );
};

export default Convert;

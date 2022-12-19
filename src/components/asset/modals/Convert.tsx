import { BigNumber } from "ethers";
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
  imgFrom,
  imgTo,
  fee,
  feeDenom,
  decimals,
  erc20Balance,
}: {
  token: string;
  address: string;
  amount: BigNumber;
  title: string;
  network: string;
  imgFrom: string;
  imgTo: string;
  fee: BigNumber;
  feeDenom: string;
  decimals: number;
  erc20Balance: BigNumber;
}) => {
  console.log("erc20Balance");

  console.log(erc20Balance);
  return (
    <div className="text-darkGray3">
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-3 ">
        <FromContainer
          token={token}
          address={address}
          amount={amount}
          img={imgFrom}
          text="IBC Coin"
          fee={fee}
          feeDenom={feeDenom}
          decimals={decimals}
        />
        <div>
          <span className="font-bold">Select balance:</span>
          <Tabs
            cosmosBalance={amount}
            decimals={decimals}
            erc20Balance={erc20Balance}
          />
        </div>
        <div className="text-xs font-bold opacity-80">
          {getReservedForFee(fee, feeDenom, network)}
        </div>
      </div>
      <Arrow />
      <div className="bg-skinTan px-8 py-4 rounded-lg space-y-5 mb-8">
        <ToContainer token={token} img={imgTo} text="ERC-20" />
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

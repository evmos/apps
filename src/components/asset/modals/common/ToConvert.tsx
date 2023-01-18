import { BigNumber } from "ethers";
import Image from "next/image";
import {
  convertFromAtto,
  formatNumber,
} from "../../../../internal/asset/style/format";
import { Token } from "../../../../internal/wallet/functionality/metamask/metamaskHelpers";
import AddTokenMetamask from "../transactions/AddTokenMetamask";

const ToConvert = ({
  token,
  img,
  balance,
  decimals,
  addToken,
}: {
  token: string;
  img: string;
  balance: BigNumber;
  decimals: number;
  addToken: Token;
}) => {
  return (
    <>
      <div className="pr-5 pl-4 flex items-center space-x-3 bg-white hover:border-darkGray5 focus-visible:border-darkGray5 focus-within:border-darkGray5 border border-darkGray5 rounded">
        <Image src={img} width={20} height={20} alt="" />
        <span className="font-bold">{token}</span>
        <input
          className="w-full p-3 border-none hover:border-none focus-visible:outline-none text-right"
          type="text"
          disabled
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">
          Available Balance:{" "}
          <span className="font-normal opacity-80">
            {formatNumber(convertFromAtto(balance, decimals))}
          </span>
        </span>
        <AddTokenMetamask token={addToken} />
      </div>
    </>
  );
};

export default ToConvert;

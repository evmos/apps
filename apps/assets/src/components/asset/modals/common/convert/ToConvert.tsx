import { BigNumber } from "ethers";
import Image from "next/image";
import {
  convertFromAtto,
  formatNumber,
} from "../../../../../internal/asset/style/format";
import { Token } from "evmos-wallet";
import AddTokenMetamask from "../../transactions/AddTokenMetamask";
import ContainerInput from "../ContainerInput";

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
      <ContainerInput>
        <>
          <Image
            src={img}
            width={20}
            height={20}
            alt={img}
            className="w-auto"
          />
          <span className="font-bold">{token}</span>
          <input
            className="w-full border-none hover:border-none focus-visible:outline-none text-right"
            type="text"
            disabled
          />
        </>
      </ContainerInput>
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

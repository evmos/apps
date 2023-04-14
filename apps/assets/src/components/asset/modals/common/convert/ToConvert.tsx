import { BigNumber } from "ethers";
import Image from "next/image";

import { convertFromAtto, formatNumber } from "helpers";

import { Token } from "evmos-wallet";
import AddTokenMetamask from "../../transactions/AddTokenMetamask";
import { ContainerInput } from "ui-helpers";

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
            className="w-full border-none text-right hover:border-none focus-visible:outline-none"
            type="text"
            disabled
          />
        </>
      </ContainerInput>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold">
          Available Balance:{" "}
          <span className="font-normal opacity-80">
            {formatNumber(convertFromAtto(balance, decimals), 6)}
          </span>
        </span>
        <AddTokenMetamask token={addToken} />
      </div>
    </>
  );
};

export default ToConvert;

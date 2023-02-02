import Image from "next/image";
import { DescriptionProps } from "./types";

export const Description = ({
  symbol,
  description,
  subRow = false,
}: DescriptionProps) => {
  return (
    <div
      className={`flex items-center space-x-5 w-[50%] ${
        subRow ? "pl-[55px]" : ""
      } `}
    >
      <Image
        src={`/assets/tokens/${symbol.toLocaleLowerCase()}.png`}
        alt={symbol}
        width={35}
        height={35}
      />
      <div className="flex flex-col items-start ">
        <span className="font-bold">{symbol}</span>
        <span className="text-sm text-darkGray5">{description}</span>
      </div>
    </div>
  );
};

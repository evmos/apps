import Image from "next/image";
import { DescriptionProps } from "./types";

export const Description = ({
  symbol,
  description,
  imageSrc = undefined,
  subRow = false,
}: DescriptionProps) => {
  return (
    <div
      className={`flex items-center space-x-3 lg:space-x-5 w-[50%] ${
        subRow ? "pl-5 md:pl-14" : ""
      } `}
    >
      <Image
        src={
          imageSrc
            ? imageSrc
            : `/assets/tokens/${symbol.toLocaleLowerCase()}.png`
        }
        alt={symbol}
        width={30}
        height={30}
        className=""
      />
      <div className="flex flex-col items-start">
        <span className="font-bold">{symbol}</span>
        <span className="text-xs text-darkGray5 lowercase first-letter:capitalize">
          {description}
        </span>
      </div>
    </div>
  );
};

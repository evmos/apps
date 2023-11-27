// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { DescriptionProps } from "./types";
import { kebabCase } from "lodash-es";
export const Description = ({
  symbol,
  description,
  imageSrc = undefined,
  subRow = false,
}: DescriptionProps) => {
  return (
    <div
      className={`flex w-[50%] items-center space-x-3 lg:space-x-5 ${
        subRow ? "pl-5 md:pl-14" : ""
      } `}
    >
      <Image
        src={
          imageSrc ? imageSrc : `/tokens/${kebabCase(symbol.toLowerCase())}.png`
        }
        alt={symbol}
        width={30}
        height={30}
        className="rounded-full"
      />
      <div className="flex flex-col items-start">
        <span className="font-bold">{symbol}</span>
        <span className="text-xs text-darkGray5">{description}</span>
      </div>
    </div>
  );
};

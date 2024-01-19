// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import { formatUnits } from "viem";

export function AmountBox({
  amount,
  token,
  amountInUsd,
}: {
  amount: bigint;
  token: {
    denom: string;
    name: string;
    decimals: number;
  };
  amountInUsd: string | null;
}) {
  return (
    <div className="tracking-wider flex rounded-md bg-gray-500 py-3 px-4 items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          className="h-8 w-8 md:h-10 md:w-10 rounded-full"
          src={`/tokens/${token.denom}.png`}
          alt={token.denom}
          width={38}
          height={38}
        />
        <span className="font-medium text-xs md:text-base capitalize">
          {token.name.toLowerCase()}
        </span>
      </div>

      <div className="font-medium flex flex-col justify-between pl-4 text-white">
        <div className="text-xs md:text-base">
          <div>{formatUnits(amount, token.decimals)}</div>
        </div>
        <div className="text-gray-400 text-xxxs md:text-xs">
          {amountInUsd !== null && `≈${amountInUsd}`}
        </div>
      </div>
    </div>
  );
}

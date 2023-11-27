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
          className="h-10 w-10 md:h-12 md:w-12 rounded-full"
          src={`/tokens/${token.denom}.png`}
          alt={token.denom}
          width={48}
          height={48}
        />
        <span className="font-medium text-sm md:text-lg capitalize">
          {token.name.toLowerCase()}
        </span>
      </div>

      <div className="font-medium flex flex-col justify-between pl-4 text-white">
        <div className="text-sm md:text-lg">
          <div>{formatUnits(amount, token.decimals)}</div>
        </div>
        <div className="text-gray-400 text-xxs md:text-sm">
          {amountInUsd !== null && `≈${amountInUsd}`}
        </div>
      </div>
    </div>
  );
}

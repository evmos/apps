"use client";
import { EvmosRedIcon, PriceDown, PriceUp } from "icons";
import { fetchCoingeckoTokenPrices } from "./fetchTokenPrice";
import { useQuery } from "@tanstack/react-query";
import { cn } from "helpers";
const usdFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const EvmosPrice = () => {
  const { data, error } = useQuery({
    queryKey: ["tokenPrices"],
    queryFn: () => fetchCoingeckoTokenPrices(),
  });
  const token = data?.evmos;

  const priceChange = token?.usd24hChange ?? 0;
  if (error) return null;
  return (
    <div className="text-pearl bg-darGray800 cursor-default items-center justify-center gap-3 rounded-full px-4 py-2 font-bold flex lg:mr-8">
      <EvmosRedIcon width={"1.4em"} height={"1.4em"} />
      <div
        className={cn("flex gap-3", {
          "w-[13ch] h-[1lh] bg-gray2/20 rounded-md animate-pulse ": !token,
        })}
      >
        {token && (
          <>
            <span>{usdFormat.format(token?.usd ?? 0)}</span>
            <div className="flex items-center gap-1">
              {priceChange >= 0 ? <PriceUp /> : <PriceDown />}
              <span
                className={`${
                  priceChange > 0 ? "text-[#31B886]" : "text-[#ED4E33]"
                }`}
              >
                {priceChange.toFixed(2)}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

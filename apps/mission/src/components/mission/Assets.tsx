import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import useAssets from "../../internal/functionality/hooks/useAssets";
import { StoreType } from "evmos-wallet";
import { BannerMessages, Button } from "ui-helpers";
import MissionContainer from "./MissionContainer";

const Assets = () => {
  const router = useRouter();
  const value = useSelector((state: StoreType) => state.wallet.value);

  const { assets, loading, error } = useAssets();

  const drawAssets = useCallback(() => {
    if (!value.active) {
      return (
        <p className="mt-10 text-center text-darkGray5">
          Please connect your wallet to see your assets
        </p>
      );
    }

    if (loading) {
      return <BannerMessages text="Loading assets..." spinner={true} />;
    }

    if (error) {
      return <BannerMessages text="No results..." />;
    }
    return (
      <div className="mt-5 space-y-5">
        <div className="grid grid-cols-2 text-lg font-bold text-pearl">
          <p>Asset</p>
          <p className="mr-10 text-right">Total Balance</p>
        </div>
        {assets.map((item) => {
          return (
            <div
              key={item.symbol}
              className="border-b border-darkGray5 pb-5 text-pearl last:border-b-0"
            >
              <div className="grid w-full grid-cols-2 ">
                <div className="flex items-center space-x-5">
                  <Image
                    src={`/tokens/${item.symbol.toLocaleLowerCase()}.png`}
                    alt={item.symbol}
                    width={30}
                    height={30}
                  />
                  <div>
                    <p className="text-lg font-bold">{item.symbol}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>

                <div className="mr-10 text-right">
                  <p className="text-xl font-bold ">{item.valueInTokens}</p>
                  <p className="text-xs">$ {item.valueInDollars}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [error, loading, value, assets]);
  return (
    <MissionContainer>
      <section>
        <div className="flex w-full justify-between">
          <span className="font-[GreyCliff] text-xl font-bold text-pearl">
            ASSETS
          </span>
          <Button
            onClick={async () => {
              await router.push("/assets");
            }}
          >
            <span>VIEW ALL ASSETS</span>
          </Button>
        </div>
        {drawAssets()}
      </section>
    </MissionContainer>
  );
};

export default Assets;

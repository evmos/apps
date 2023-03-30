import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import useAssets from "../../../internal/common/mission/functionality/hooks/useAssets";
import { StoreType } from "../../../redux/Store";
import BannerMessages from "../../common/banners/BannerMessages";
import Button from "../../common/Button";
import MissionContainer from "../MissionContainer";

const Assets = () => {
  const router = useRouter();
  const value = useSelector((state: StoreType) => state.wallet.value);

  const { assets, loading, error } = useAssets();

  const drawAssets = useCallback(() => {
    if (!value.active) {
      return (
        <p className="text-center text-pearl mt-10">
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
      <div className="space-y-5 mt-5">
        <div className="grid grid-cols-2 font-bold text-lg text-pearl">
          <p>Asset</p>
          <p className="text-right mr-10">Total Balance</p>
        </div>
        {assets.map((item) => {
          return (
            <div key={item.symbol} className="text-pearl">
              <div className="grid grid-cols-2 w-full border-b border-darkGray5 pb-5">
                <div className="flex items-center space-x-5">
                  <Image
                    src={`/assets/tokens/${item.symbol.toLocaleLowerCase()}.png`}
                    alt={item.symbol}
                    width={30}
                    height={30}
                  />
                  <div>
                    <p className="font-bold text-xl ">{item.symbol}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </div>

                <div className="text-right mr-10">
                  <p className="font-bold text-xl ">{item.valueInTokens}</p>
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
          <span className="text-lg text-pearl font-semibold">ASSETS</span>
          <Button
            onClick={async () => {
              // TODO: update this redirection to assets
              await router.push("/");
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

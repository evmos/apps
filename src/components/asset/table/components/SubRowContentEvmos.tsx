import { BigNumber } from "ethers";
import { EVMOSIBCBalances } from "../../../../internal/asset/functionality/fetch";
import {
  amountToDollars,
  convertAndFormat,
} from "../../../../internal/asset/style/format";
import { Description } from "./Description";

const SubRowContentEvmos = ({ values }: { values: EVMOSIBCBalances }) => {
  return (
    <div className="flex w-full">
      <div className="w-[5%]"></div>
      <Description
        symbol="EVMOS"
        description={`Evmos tokens on the chain ${values.chain}`}
        subRow={true}
        imageSrc={`/assets/chains/${values.chain}.png`}
      />
      <div className="flex items-center uppercase w-[50%]">
        <div className="flex flex-col">
          <span className="font-bold">
            {convertAndFormat(
              BigNumber.from(values.evmosBalance ? values.evmosBalance : "0"),
              18
            )}
          </span>

          <span className="text-sm text-darkGray5">
            $
            {amountToDollars(
              BigNumber.from(values.evmosBalance ? values.evmosBalance : "0"),
              18,
              values?.coingeckoPrice ? values.coingeckoPrice : 0
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
export default SubRowContentEvmos;

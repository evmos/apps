import AssetsGuide from "../../modals/AssetsGuide";
import { Container } from "./Container";

const TopBar = ({
  totalAssets,
  totalStaked,
  evmosPrice,
}: {
  totalAssets: string;
  totalStaked: string;
  evmosPrice: number;
}) => {
  return (
    <div className="mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white grid grid-cols-2 sm:grid-cols-4 text-center items-center">
      <Container text="Total Assets" value={`$${totalAssets}`} href="" />
      <Container
        text="Total Staked"
        value={totalStaked}
        href="https://app.evmos.org/staking"
      />
      <Container
        text="EVMOS Price"
        value={evmosPrice === undefined ? "--" : `$${evmosPrice.toString()}`}
        href=""
      />
      <div className="mt-5 sm:mt-0">
        <AssetsGuide />
      </div>
    </div>
  );
};

export default TopBar;

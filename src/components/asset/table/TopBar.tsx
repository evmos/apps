import AssetsGuide from "../../asset/modals/AssetsGuide";

const TopBar = ({
  totalAssets,
  evmosPrice,
}: {
  totalAssets: string;
  evmosPrice: number;
}) => {
  return (
    <div className="mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white flex flex-col sm:flex-row space-y-2 sm:space-y-0 text-center sm:text-left sm:justify-between items-center">
      <div>
        <h5 className="opacity-80">Total Assets</h5>
        <h2 className="text-2xl font-bold font-[GreyCliff]">${totalAssets}</h2>
      </div>
      <div>
        <h5 className="opacity-80">EVMOS Price</h5>
        <h2 className="text-2xl font-bold font-[GreyCliff]">
          ${evmosPrice === undefined ? "--" : evmosPrice}
        </h2>
      </div>
      <div>
        <AssetsGuide />
      </div>
    </div>
  );
};

export default TopBar;

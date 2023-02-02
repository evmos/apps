// import AssetsGuide from "../../modals/AssetsGuide";
import ButtonsActions from "./ButtonsActions";
import { Container } from "./Container";
import { TopBarProps } from "./types";

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  const actionsProps = {
    setShow: topProps.setShow,
    setModalContent: topProps.setModalContent,
    tableData: topProps.tableData,
  };
  return (
    <div className="mx-5 xl:mx-0 mb-5 bg-darkGray2 p-5 rounded-2xl font-[IBM] text-sm px-5 text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 space-y-2 sm:space-y-0 text-center items-center">
      <Container
        text="Total Assets"
        value={`$${topProps.totalAssets}`}
        href=""
      />
      <Container
        text="Total Staked"
        value={topProps.totalStaked}
        href="https://app.evmos.org/staking"
      />
      <Container
        text="EVMOS Price"
        value={
          topProps.evmosPrice === undefined
            ? "--"
            : `$${topProps.evmosPrice.toString()}`
        }
        href=""
      />
      <ButtonsActions actionsProps={actionsProps} />
    </div>
  );
};

export default TopBar;

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
    <div className="mx-5 mb-5 grid grid-cols-1 items-center space-y-2 rounded-2xl bg-darkGray2 p-5 px-5 text-center font-[IBM] text-sm text-white sm:grid-cols-2 sm:space-y-0 md:grid-cols-4 xl:mx-0">
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

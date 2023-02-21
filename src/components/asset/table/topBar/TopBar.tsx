import TopBarContainer from "../../../common/TopBarContainer";
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
    <TopBarContainer>
      <>
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
      </>
    </TopBarContainer>
  );
};

export default TopBar;

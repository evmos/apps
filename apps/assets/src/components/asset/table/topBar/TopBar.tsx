import { TopBarContainer } from "top-bar-container";
import ButtonsActions from "./ButtonsActions";
import { Container } from "../../../common/topBar/Container";
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
        <Container text="Total Assets" value={`$${topProps.totalAssets}`} />
        <Container
          text="EVMOS Price"
          value={
            topProps.evmosPrice === undefined
              ? "--"
              : `$${topProps.evmosPrice.toString()}`
          }
        />
        <ButtonsActions actionsProps={actionsProps} />
      </>
    </TopBarContainer>
  );
};

export default TopBar;

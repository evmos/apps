import TopBarContainer from "../common/TopBarContainer";
import { Container } from "../common/topBar/Container";

type TopBarProps = {
  totalAssets: string;
  totalStaked: string;
  evmosPrice: number;
};

const TopBar = ({ topProps }: { topProps: TopBarProps }) => {
  return (
    <TopBarContainer>
      <>
        <Container text="Total Assets" value={`$${topProps.totalAssets}`} />
        <Container text="Total EVMOS" value={`${topProps.totalAssets} EVMOS`} />

        <Container
          text="Total Rewards Received"
          value={`${topProps.totalAssets} EVMOS`}
        />

        <Container
          text="Total Staked"
          value={`${topProps.totalStaked} EVMOS`}
          href="https://app.evmos.org/staking"
        />
        <Container
          text="EVMOS Price"
          value={
            topProps.evmosPrice === undefined
              ? "--"
              : `$${topProps.evmosPrice.toString()}`
          }
        />
      </>
    </TopBarContainer>
  );
};

export default TopBar;

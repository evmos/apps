import TopBarContainer from "../common/TopBarContainer";
import { Container } from "../common/topBar/Container";
import { convertFromAtto } from "../../internal/asset/style/format";
import { useHeaderInfo } from "../../internal/mission/functionality/hooks/useHeaderInfo";
import { useEvmosBalance } from "../../internal/common/functionality/hooks/useEvmosBalance";
import useAssets from "../../internal/common/functionality/hooks/useAssets";

const TopBarMissionControl = () => {
  const { totalStaked } = useHeaderInfo();
  const { evmosBalance } = useEvmosBalance();

  const { totalAssets, evmosPrice } = useAssets();
  const totalEvmos = evmosBalance.add(totalStaked);

  return (
    <TopBarContainer>
      <>
        <Container
          // it shows the total amount of ALL assets including
          // cosmosBalance and erc20Balance
          text="Total Assets"
          value={`$${totalAssets.toFixed(2)}`}
        />

        <Container
          // it shows the total amount of evmos + wevmos + stakedEvmos
          text="Total EVMOS"
          value={`${Number(convertFromAtto(totalEvmos)).toFixed(2)} EVMOS`}
        />

        <Container
          // it shows the total amount of delegations
          text="Total Staked"
          value={`
          ${Number(convertFromAtto(totalStaked)).toFixed(2)} EVMOS`}
          href="https://app.evmos.org/staking"
        />
        {/* not sure what we have to display here */}
        <Container text="Total Rewards Received" value={``} />

        <Container text="EVMOS Price" value={evmosPrice} />
      </>
    </TopBarContainer>
  );
};

export default TopBarMissionControl;

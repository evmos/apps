import { useSelector } from "react-redux";
import { convertAndFormat } from "../../../internal/asset/style/format";
import { useEpochDay } from "../../../internal/common/api/hooks/useEpochDay";
import { useStakedEvmos } from "../../../internal/common/api/hooks/useStakedEvmos";
import { useEvmosBalance } from "../../../internal/staking/functionality/hooks/useEvmosBalance";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { StoreType } from "../../../redux/Store";
import { Container } from "../../asset/table/topBar/Container";
import ConfirmButton from "../../common/ConfirmButton";
import { Countdown } from "../../common/Countdown";
import TopBarContainer from "../../common/TopBarContainer";

const FULL_DAY_MINUS_ONE_SECOND = 86399000;

const TopBarStaking = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { totalStaked } = useStakedEvmos();
  const { totalUndelegations, totalRewards } = useStakingInfo();
  const { evmosBalance } = useEvmosBalance();
  const { epochs } = useEpochDay();

  return (
    <TopBarContainer>
      <>
        <Container
          text="Available"
          value={`${convertAndFormat(evmosBalance)} EVMOS`}
        />
        <Container text="Total Staked" value={`${totalStaked} EVMOS`} />
        <Container
          text="Total Unbonding"
          value={`${convertAndFormat(totalUndelegations)} EVMOS`}
        />
        <Container
          text="Reward Distribution"
          value={
            <Countdown
              epochs={
                epochs > 1000
                  ? epochs + FULL_DAY_MINUS_ONE_SECOND
                  : "Loading..."
              }
            />
          }
        />
        <div className=" ">
          <ConfirmButton
            className="w-fit text-sm px-4"
            text={`Claim Rewards: ${totalRewards.toFixed(2)} EVMOS`}
            onClick={() => {
              // TODO: add claim all rewards enpoint
            }}
            disabled={
              !value.active || !totalRewards || totalRewards < 0.005 // insure that small residual is covered
            }
          />
        </div>
      </>
    </TopBarContainer>
  );
};

export default TopBarStaking;

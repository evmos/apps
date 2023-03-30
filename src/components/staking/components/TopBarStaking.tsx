import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { FULL_DAY_MINUS_ONE_SECOND } from "../../../internal/asset/Helpers";
import { convertFromAtto } from "../../../internal/asset/style/format";
import { useEpochDay } from "../../../internal/common/api/hooks/useEpochDay";
import { useEvmosBalance } from "../../../internal/staking/functionality/hooks/useEvmosBalance";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { StoreType } from "../../../redux/Store";
import { Container } from "../../common/topBar/Container";
import { Countdown } from "../../common/Countdown";
import { useRewards } from "../modals/hooks/useRewards";

const TopBarContainer = dynamic(() => import("../../common/TopBarContainer"));
const ConfirmButton = dynamic(() => import("../../common/ConfirmButton"));

const TopBarStaking = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { totalDelegations, totalUndelegations, totalRewards } =
    useStakingInfo();
  const { evmosBalance } = useEvmosBalance();
  const { epochs } = useEpochDay();
  const { handleConfirmButton } = useRewards(value);

  return (
    <TopBarContainer>
      <>
        <Container
          text="Available"
          value={`${Number(convertFromAtto(evmosBalance)).toFixed(2)} EVMOS`}
        />
        <Container
          text="Total Staked"
          value={`${Number(convertFromAtto(totalDelegations)).toFixed(
            2
          )} EVMOS`}
        />
        <Container
          text="Total Unstaked"
          value={`${Number(convertFromAtto(totalUndelegations)).toFixed(
            2
          )} EVMOS`}
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
            onClick={handleConfirmButton}
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

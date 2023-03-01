import { useCallback } from "react";
import { useSelector } from "react-redux";
import { convertAndFormat } from "../../../internal/asset/style/format";
import { useStakedEvmos } from "../../../internal/common/api/useStakedEvmos";
import { useEvmosBalance } from "../../../internal/staking/functionality/hooks/useEvmosBalance";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { StoreType } from "../../../redux/Store";
import { Container } from "../../asset/table/topBar/Container";
import ConfirmButton from "../../common/ConfirmButton";
import TopBarContainer from "../../common/TopBarContainer";

const TopBarStaking = () => {
  const handleClaimRewards = useCallback(
    // TODO: logic for claim rewards
    () => console.log("handleClaimRewards"),
    []
  );

  const value = useSelector((state: StoreType) => state.wallet.value);
  const { totalStaked } = useStakedEvmos();
  const { totalUndelegations } = useStakingInfo();
  const { evmosBalance } = useEvmosBalance();
  // const { rewards } = useClaimRewards();

  return (
    <TopBarContainer>
      <>
        {/* TODO: remove href if it is not necessary */}
        <Container
          text="Available"
          value={`${convertAndFormat(evmosBalance)} EVMOS`}
        />
        <Container text="Total Staked" value={`${totalStaked} EVMOS`} />
        <Container
          text="Total Unbonding"
          value={`${convertAndFormat(totalUndelegations)} EVMOS`}
        />
        <Container text="Reward Distribution" value="..." />
        <div className=" ">
          <ConfirmButton
            className="w-fit text-sm px-4"
            text="Claim Rewards: 0 EVMOS"
            onClick={handleClaimRewards}
            disabled={
              !value.active
              // !Number(totalClaimableReward) ||
              // Number(totalClaimableReward) < 0.005 // insure that small residual is covered
            }
          />
        </div>
      </>
    </TopBarContainer>
  );
};

export default TopBarStaking;

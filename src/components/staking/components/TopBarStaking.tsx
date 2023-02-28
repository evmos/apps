import { useCallback } from "react";
import { convertAndFormat } from "../../../internal/asset/style/format";
import { useStakedEvmos } from "../../../internal/common/api/useStakedEvmos";
import { useEvmosBalance } from "../../../internal/staking/functionality/hooks/useEvmosBalance";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { Container } from "../../asset/table/topBar/Container";
import ConfirmButton from "../../common/ConfirmButton";
import TopBarContainer from "../../common/TopBarContainer";

const TopBarStaking = () => {
  const handleClaimRewards = useCallback(
    () => console.log("handleClaimRewards"),
    []
  );

  const { totalStaked } = useStakedEvmos();
  const { totalUndelegations } = useStakingInfo();
  const { evmosBalance } = useEvmosBalance();

  return (
    <TopBarContainer>
      <>
        {/* TODO: remove href if it is not necessary */}
        <Container
          text="Available"
          value={`${convertAndFormat(evmosBalance)} EVMOS`}
          href=""
        />
        <Container text="Total Staked" value={`${totalStaked} EVMOS`} href="" />
        <Container
          text="Total Unbonding"
          value={`${convertAndFormat(totalUndelegations)} EVMOS`}
          href=""
        />
        <Container text="Reward Distribution" value="3H ..." href="" />
        <div className="w-full flex justify-center">
          <ConfirmButton
            className="w-fit"
            text="Claim Rewards: 0 EVMOS"
            onClick={handleClaimRewards}
          />
        </div>
      </>
    </TopBarContainer>
  );
};

export default TopBarStaking;

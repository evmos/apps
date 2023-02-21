import { useCallback } from "react";
import { useStakedEvmos } from "../../../internal/common/api/useStakedEvmos";
import { Container } from "../../asset/table/topBar/Container";
import ConfirmButton from "../../common/ConfirmButton";
import TopBarContainer from "../../common/TopBarContainer";

const TopBarStaking = () => {
  const handleClaimRewards = useCallback(
    () => console.log("handleClaimRewards"),
    []
  );

  const { totalStaked } = useStakedEvmos();
  return (
    <TopBarContainer>
      <>
        <Container text="Available" value="0 EVMOS" href="" />
        <Container text="Total Staked" value={`${totalStaked} EVMOS`} href="" />
        <Container text="Total Unbonding" value="0 EVMOS" href="" />
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

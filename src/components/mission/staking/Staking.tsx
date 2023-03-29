import { useSelector } from "react-redux";
import { useStakingInfo } from "../../../internal/staking/functionality/hooks/useStakingInfo";
import { StoreType } from "../../../redux/Store";
import MissionContainer from "../MissionContainer";
import Header from "./Header";
import StakingTable from "./StakingTable";

const Staking = () => {
  const value = useSelector((state: StoreType) => state.wallet.value);
  const { delegations, rewards } = useStakingInfo();
  return (
    <MissionContainer>
      <>
        <Header />
        {value.active === true ? (
          <StakingTable rewards={rewards} delegations={delegations} />
        ) : (
          <div className="text-darkGray5 flex flex-1 justify-center text-center">
            Please connect your wallet to view your staking details.
          </div>
        )}
      </>
    </MissionContainer>
  );
};

export default Staking;

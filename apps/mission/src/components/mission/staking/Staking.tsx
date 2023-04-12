import { useSelector } from "react-redux";
import { StoreType } from "evmos-wallet";
import MissionContainer from "../MissionContainer";
import Header from "./Header";
import StakingTable from "./StakingTable";
import { useStakingInfo } from "../../../internal/functionality/hooks/useStakingInfo";

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
          <div className="flex flex-1 justify-center text-center text-darkGray5">
            Please connect your wallet to view your staking details.
          </div>
        )}
      </>
    </MissionContainer>
  );
};

export default Staking;

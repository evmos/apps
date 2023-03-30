import dynamic from "next/dynamic";
import HalfLifeContainer from "./HalfLifeContainer";
import Assets from "./sections/Assets";
import NewsFeed from "./feeds/NewsFeed";
import Governance from "./Governance/Governance";
import Staking from "./staking/Staking";
import EvmosApps from "./apps/EvmosApps";

const TopBarMissionControl = dynamic(() => import("./TopBarMissionControl"));

const Content = () => {
  return (
    <div className="pt-4 flex flex-col">
      <TopBarMissionControl />
      <div className="grid gap-6 grid-cols-6">
        <div className="flex col-span-4 gap-4 flex-col">
          <Assets />
          <Governance />
          <Staking />
        </div>
        <div className="flex col-span-6 lg:col-span-2 flex-col space-y-5">
          <HalfLifeContainer />
          <NewsFeed />
          <EvmosApps />
        </div>
      </div>
    </div>
  );
};

export default Content;

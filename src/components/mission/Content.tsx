import dynamic from "next/dynamic";
import HalfLifeContainer from "./HalfLifeContainer";
import Assets from "./sections/Assets";
import NewsFeed from "./feeds/NewsFeed";
import Governance from "./Governance/Governance";
import Staking from "./staking/Staking";

const TopBar = dynamic(() => import("./TopBar"));

const Content = () => {
  return (
    <div className="pt-4 flex flex-col overflow-auto">
      <TopBar
        topProps={{ totalAssets: "0", totalStaked: "0", evmosPrice: 0 }}
      />
      <div className="grid gap-6 grid-cols-6">
        <div className="flex col-span-4 gap-4 flex-col">
          <Assets />
          <Governance />
          <Staking />
        </div>
        <div className="flex col-span-6 lg:col-span-2 flex-col space-y-5">
          <HalfLifeContainer />
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default Content;

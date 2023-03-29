import dynamic from "next/dynamic";
import HalfLifeContainer from "./HalfLifeContainer";
import MissionContainer from "./MissionContainer";
import NewsFeed from "./feeds/NewsFeed";
import Staking from "./staking/Staking";

const TopBarMissionControl = dynamic(() => import("./TopBarMissionControl"));
const Button = dynamic(() => import("../common/Button"));

const Content = () => {
  return (
    <div className="pt-4 flex flex-col">
      <TopBarMissionControl />
      <div className="grid gap-6 grid-cols-6">
        <div className="flex col-span-4 gap-4 flex-col">
          <MissionContainer>
            <div className="flex w-full justify-between">
              <span className="text-lg text-pearl font-semibold">ASSETS</span>
              <Button
                onClick={() => {
                  console.log("click");
                }}
              >
                <div className="flex items-center space-x-2 ">
                  <span>VIEW ALL ASSETS</span>
                </div>
              </Button>
            </div>
          </MissionContainer>
          <MissionContainer>
            <div className="flex w-full justify-between">
              <span className="text-lg text-pearl font-semibold">
                GOVERNANCE
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <div className="flex items-center space-x-2 ">
                    <span>VOTE</span>
                  </div>
                </Button>
                <Button
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  <div className="flex items-center space-x-2 ">
                    <span>DOCS</span>
                  </div>
                </Button>
              </div>
            </div>
          </MissionContainer>
          <Staking />
        </div>
        <div className="flex col-span-2 flex-col space-y-5">
          <HalfLifeContainer />
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default Content;

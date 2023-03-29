import dynamic from "next/dynamic";
import HalfLifeContainer from "./HalfLifeContainer";
import MissionContainer from "./MissionContainer";
import Assets from "./sections/Assets";
import NewsFeed from "./feeds/NewsFeed";

const TopBar = dynamic(() => import("./TopBar"));
const Button = dynamic(() => import("../common/Button"));

const Content = () => {
  return (
    <div className="pt-4 flex flex-col">
      <TopBar
        topProps={{ totalAssets: "0", totalStaked: "0", evmosPrice: 0 }}
      />
      <div className="grid gap-6 grid-cols-6">
        <div className="flex col-span-4 gap-4 flex-col">
          <Assets />
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

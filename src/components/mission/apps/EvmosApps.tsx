import MissionContainer from "../MissionContainer";
import AppsContainer from "./AppsContainer";
import Header from "./Header";

const EvmosApps = () => {
  return (
    <MissionContainer>
      <>
        <Header />
        <AppsContainer />
      </>
    </MissionContainer>
  );
};

export default EvmosApps;

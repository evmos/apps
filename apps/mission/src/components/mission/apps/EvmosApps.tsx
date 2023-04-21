// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

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

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { StatefulHeader } from "./StatefulHeader";
import { StatefulFooter } from "./StatefulFooter";
import { ContentDappStore } from "./dappStore/ContentDappStore";

const MainContainer = () => {
  return (
    <>
      <StatefulHeader />
      <div className="container mx-auto mb-auto overflow-auto">
        <ContentDappStore />
      </div>
      <StatefulFooter />
    </>
  );
};

export default MainContainer;

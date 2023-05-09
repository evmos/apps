// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import HalfLifeContainer from "./HalfLifeContainer";
import Assets from "./Assets";
import NewsFeed from "./feeds/NewsFeed";
import Governance from "./governance/Governance";
import Staking from "./staking/Staking";
import EvmosApps from "./apps/EvmosApps";
import { InformationBanner } from "ui-helpers";

const TopBarMissionControl = dynamic(() => import("./TopBarMissionControl"));

const Content = () => {
  return (
    <div className="flex flex-col pt-4">
      <InformationBanner
        dismissible={true}
        localStorageId="dora-hacks-banner"
        text="Extend the EVM with Dorahacks - live until June 2! Build now 🚀"
      />
      <TopBarMissionControl />
      <div className="mx-5 grid grid-cols-6 gap-6 xl:mx-0">
        <div className="col-span-6 flex flex-col gap-4 lg:col-span-4">
          <Assets />
          <Governance />
          <Staking />
        </div>
        <div className="col-span-6 flex flex-col space-y-5 lg:col-span-2">
          <HalfLifeContainer />
          <NewsFeed />
          <EvmosApps />
        </div>
      </div>
    </div>
  );
};

export default Content;

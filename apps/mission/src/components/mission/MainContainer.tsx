// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import dynamic from "next/dynamic";
import { useState } from "react";

const Content = dynamic(() => import("../mission/Content"));
const SideBar = dynamic(() => import("./Sidebar/Sidebar"));
const SidebarMobile = dynamic(() => import("./Sidebar/SidebarMobile"));
import { StatefulHeader } from "./StatefulHeader";
import { StatefulFooter } from "./StatefulFooter";
const MainContainer = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <StatefulHeader
        pageName="Mission Control"
        setShowSidebar={setShowSidebar}
      />

      <div className="block lg:hidden ">
        <SidebarMobile
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>
      <div className="grid grid-cols-8 space-x-5">
        <div className="hidden lg:block ">
          <SideBar />
        </div>
        <div className="col-span-8 flex flex-1 flex-col lg:col-span-7">
          <div className="container mx-auto mb-auto overflow-auto">
            <Content />
          </div>
          <StatefulFooter />
        </div>
      </div>
    </>
  );
};

export default MainContainer;

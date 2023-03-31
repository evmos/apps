import dynamic from "next/dynamic";
import { useState } from "react";

const Header = dynamic(() => import("../Header"));
const Footer = dynamic(() => import("../footer/Footer"));
const Content = dynamic(() => import("../mission/Content"));
const SideBar = dynamic(() => import("./SideBar/SideBar"));
const SidebarMobile = dynamic(() => import("./SideBar/SidebarMobile"));

const MainContainer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <Header pageName="Mission Control " setShowSidebar={setShowSidebar} />
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
        <div className="flex col-span-8 lg:col-span-7 flex-1 flex-col">
          <div className="container mx-auto overflow-auto mb-auto">
            <Content />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainContainer;

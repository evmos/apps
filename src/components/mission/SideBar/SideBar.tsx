import CoinsIcon from "../../../images/icons/CoinsIcon";
import GaugeIcon from "../../../images/icons/GaugeIcon";
import GrilledSteakIcon from "../../../images/icons/GrilledSteakIcon";
import HandShakeIcon from "../../../images/icons/ShakeIcon";
import SideBarItem, { SideBarEntry } from "./SideBarItem";

const sideBarItems: SideBarEntry[] = [
  {
    title: "Mission Control",
    icon: <GaugeIcon height={32} width={32} />,
    path: "/",
  },
  {
    title: "Assets",
    icon: <CoinsIcon height={32} width={32} />,
    path: "/assets",
  },
  {
    title: "Staking",
    icon: <GrilledSteakIcon height={32} width={32} />,
    path: "/staking",
  },
  {
    title: "Governance",
    icon: <HandShakeIcon height={32} width={32} />,
    path: "/governance",
  },
];

const SideBar = () => {
  function renderMenuElements() {
    return sideBarItems.map((sbi) => (
      <SideBarItem key={sbi.title} item={sbi} />
    ));
  }

  return (
    <div className="lg:flex col-span-1 hidden text-white flex-col min-w-[200px] space-y-3">
      {renderMenuElements()}
    </div>
  );
};

export default SideBar;

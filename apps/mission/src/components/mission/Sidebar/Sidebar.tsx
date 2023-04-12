import Link from "next/link";
import CoinsIcon from "../../common/images/icons/CoinsIcon";
import GaugeIcon from "../../common/images/icons/GaugeIcon";
import GrilledSteakIcon from "../../common/images/icons/GrilledSteakIcon";
import HandShakeIcon from "../../common/images/icons/ShakeIcon";
import SideBarItem, { SideBarEntry } from "./SidebarItem";

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
    <div className="col-span-1 flex flex-col justify-center space-y-3 text-pearl lg:min-w-[200px] lg:text-left">
      {renderMenuElements()}
      <Link
        className="text-center text-xs text-darkGray5 lg:text-left"
        href="https://www.coingecko.com"
        target="_blank"
        rel="noreferrer"
      >
        Price Data from Coingecko
      </Link>
    </div>
  );
};

export default SideBar;

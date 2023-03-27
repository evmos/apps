import dynamic from "next/dynamic";
import Link from "next/link";
import CoinsIcon from "../../../images/icons/CoinsIcon";
import GaugeIcon from "../../../images/icons/GaugeIcon";
import GrilledSteakIcon from "../../../images/icons/GrilledSteakIcon";
import HandShakeIcon from "../../../images/icons/ShakeIcon";
import SideBarItem, { SideBarEntry } from "./SideBarItem";

const Logo = dynamic(() => import("../../common/images/Logo"));

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
    <div
      style={{ minWidth: "178.5px" }}
      className="md:flex col-span-1 hidden text-white h-72 flex-col"
    >
      <Link
        href="https://app.evmos.org"
        rel="noreferrer"
        className="xl:pr-14 pl-4"
        aria-label="home"
      >
        <Logo className="w-32 xl:w-36 h-20" />
      </Link>
      {renderMenuElements()}
    </div>
  );
};

export default SideBar;

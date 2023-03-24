import Link from "next/link";
import LeftArrowIcon from "../images/icons/LeftArrowIcon";

const NavToMissionControl = () => {
  return (
    <Link
      href="https://app.evmos.org/"
      className="text-white flex items-center space-x-3 mb-2 font-bold mx-5 xl:mx-0 justify-center xl:justify-start hover:opacity-80"
    >
      <LeftArrowIcon width={15} height={15} />
      <p>Back to Mission Control</p>
    </Link>
  );
};

export default NavToMissionControl;

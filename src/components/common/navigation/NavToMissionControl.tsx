import Link from "next/link";
import LeftArrowIcon from "../images/icons/LeftArrowIcon";

const NavToMissionControl = ({
  href,
  text,
}: {
  href: string;
  text: string;
}) => {
  return (
    <Link
      href={href}
      className="text-white flex items-center space-x-3 mb-2 font-bold mx-5 xl:mx-0 justify-center xl:justify-start hover:opacity-80"
    >
      <LeftArrowIcon width={15} height={15} />
      <p>{text}</p>
    </Link>
  );
};

export default NavToMissionControl;

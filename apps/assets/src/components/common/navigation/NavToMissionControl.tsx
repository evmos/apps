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
      className="mx-5 mb-2 flex items-center justify-center space-x-3 font-bold text-white hover:opacity-80 xl:mx-0 xl:justify-start"
    >
      <LeftArrowIcon width={15} height={15} />
      <p>{text}</p>
    </Link>
  );
};

export default NavToMissionControl;

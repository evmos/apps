import Link from "next/link";
import QuestionMarkIcon from "../../../common/images/icons/QuestionMarkIcon";
import Tooltip from "../../../common/Tooltip";

export const Container = ({
  text,
  value,
  href,
  tooltip,
}: {
  text: string;
  value: string;
  href: string;
  tooltip?: boolean;
}) => {
  return (
    <Link href={href} className={` ${href === "" ? "cursor-default" : ""} `}>
      <div className="flex items-center justify-center space-x-2">
        <h5 className="opacity-80">{text}</h5>
        {tooltip !== undefined ? (
          <Tooltip
            element={<QuestionMarkIcon width={20} height={20} />}
            text="Redirects to app.evmos.org/staking"
          />
        ) : (
          ""
        )}
      </div>
      <h2 className="text-2xl font-bold font-[GreyCliff]">{value}</h2>
    </Link>
  );
};

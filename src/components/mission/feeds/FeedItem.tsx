import Link from "next/link";
import { useCallback } from "react";
import { formatDate } from "../../../internal/common/helpers/style";
import { RecordsResponse } from "../../../internal/mission/types";

const FeedItem = ({ annoucement }: { annoucement: RecordsResponse }) => {
  const getColor = useCallback(() => {
    if (annoucement.fields.Type === "Discussions") {
      return "bg-red text-pearl";
    } else if (annoucement.fields.Type === "Guides") {
      return "bg-yellow text-darkGray2";
    }

    return "bg-green text-pearl";
  }, [annoucement.fields.Type]);
  return (
    <Link
      href={annoucement.fields["Web Link"]}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="space-y-2 text-pearl">
        <p className="text-lg font-bold font-[GreyCliff]">
          {annoucement.fields.Name}
        </p>
        <p className="text-sm">{annoucement.fields.Description}</p>
        <div className="flex items-center space-x-2">
          <p
            className={`${getColor()} uppercase text-[10px] px-4 py-0.5 rounded font-bold`}
          >
            {annoucement.fields.Type}
          </p>
          <p className="opacity-80 text-sm">
            {annoucement.fields["Start Date Time"] !== undefined &&
              formatDate(annoucement.fields["Start Date Time"])}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;

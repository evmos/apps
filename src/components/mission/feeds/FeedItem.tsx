import { useCallback } from "react";
import { formatDate } from "../../../internal/common/helpers/style";
import { RecordsResponse } from "../../../internal/mission/types";

const FeedItem = ({ annoucement }: { annoucement: RecordsResponse }) => {
  const getColor = useCallback(() => {
    if (annoucement.fields.Type === "News") {
      return "bg-red text-pearl";
    } else if (annoucement.fields.Type === "Asset") {
      return "bg-yellow text-darkGray2";
    }

    return "bg-green text-pearl";
  }, [annoucement.fields.Type]);
  return (
    <div className="space-y-2 text-pearl">
      <p className="text-xl font-bold ">{annoucement.fields.Name}</p>
      <p>{annoucement.fields.Description}</p>
      <div className="flex items-center space-x-2">
        <p
          className={`${getColor()} uppercase text-[10px] px-4 py-0.5 rounded font-bold`}
        >
          {annoucement.fields.Type}
        </p>
        <p className="opacity-80 text-sm">
          {formatDate(annoucement.fields["Start Date Time"])}
        </p>
      </div>
    </div>
  );
};

export default FeedItem;

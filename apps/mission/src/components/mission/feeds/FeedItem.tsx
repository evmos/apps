// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Link from "next/link";
import { useCallback } from "react";
import { formatDate } from "helpers";
import { RecordsResponse } from "../../../internal/types";

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
        <p className="font-[GreyCliff] text-lg font-bold">
          {annoucement.fields.Name}
        </p>
        <p className="text-sm">{annoucement.fields.Description}</p>
        <div className="flex items-center space-x-2">
          <p
            className={`${getColor()} rounded px-4 py-0.5 text-[10px] font-bold uppercase`}
          >
            {annoucement.fields.Type}
          </p>
          <p className="text-sm opacity-80">
            {annoucement.fields["Start Date Time"] !== undefined &&
              formatDate(annoucement.fields["Start Date Time"])}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default FeedItem;

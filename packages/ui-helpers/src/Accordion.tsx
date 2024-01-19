// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useState } from "react";
import { DownArrowIcon } from "@evmosapps/icons/DownArrowIcon";
import { UpArrowIcon } from "@evmosapps/icons/UpArrowIcon";

export const Accordion = ({
  title,
  content,
}: {
  title: JSX.Element;
  content: JSX.Element | null;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion w-full text-base">
      <div className="accordion-item py-3">
        <div
          className={`flex items-center ${
            content !== null ? "cursor-pointer" : "cursor-default"
          } `}
          onClick={() => setIsActive(!isActive)}
        >
          <div className="mx-4 flex w-[5%] justify-center lg:mx-0">
            {content !== null ? (
              isActive ? (
                <UpArrowIcon width={15} height={15} />
              ) : (
                <DownArrowIcon width={15} height={15} />
              )
            ) : (
              ""
            )}
          </div>
          {title}
        </div>
        {content !== null && isActive && (
          <div className="mt-5 flex border-t-2 border-t-black pt-5 ">
            <div className="flex w-full justify-between">{content}</div>
          </div>
        )}
      </div>
    </div>
  );
};

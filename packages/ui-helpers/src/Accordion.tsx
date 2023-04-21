// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { useState } from "react";
import { DownArrowIcon, UpArrowIcon } from "icons";

export const Accordion = ({
  title,
  content,
}: {
  title: JSX.Element;
  content: JSX.Element | null;
}) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-item border-b-2 border-b-black bg-darkGray2 py-5">
        <div
          className={`flex items-center ${
            content !== null ? "cursor-pointer" : "cursor-default"
          } `}
          onClick={() => setIsActive(!isActive)}
        >
          <div className="mx-4 flex w-[5%] justify-center lg:mx-0">
            {content !== null ? (
              isActive ? (
                <UpArrowIcon />
              ) : (
                <DownArrowIcon />
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

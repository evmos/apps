// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CloseIcon } from "icons";
import { useEffect, useState } from "react";

export const InformationBanner = ({
  text,
  title,
  dismissible,
  className,
  localStorageId,
}: {
  text: string | React.ReactNode;
  title?: string;
  dismissible?: boolean;
  className?: string;
  localStorageId?: string;
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  function saveDismissInLocalStorage() {
    localStorage.setItem(localStorageId ?? "", "true");
  }

  function getDismissFromLocalStorage() {
    return localStorage.getItem(localStorageId ?? "") === "true";
  }

  function handleOnClick() {
    saveDismissInLocalStorage();
    setIsDismissed(true);
  }

  useEffect(() => {
    const _isDismissed = getDismissFromLocalStorage();
    setIsDismissed(_isDismissed);
  }, []);

  return isDismissed ? null : (
    <div
      className={`rounded-md flex items-center justify-between space-x-2 bg-pearl p-3 px-5 font-[GreyCliff] text-sm font-medium text-black ${
        className !== undefined ? className : ""
      }`}
    >
      <div className="flex flex-1 self-center text-center flex-col gap-2">
        {title && <span className="font-bold">{title}</span>}
        {typeof text === "string" ? <p>{text}</p> : text}
      </div>

      <CloseIcon
        height={22}
        width={22}
        onClick={handleOnClick}
        className="cursor-pointer self-end text-black"
      />
    </div>
  );
};

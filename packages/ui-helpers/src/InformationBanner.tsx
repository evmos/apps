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
  text: string;
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
    setIsDismissed(true)
  }

  useEffect(() => {
    const _isDismissed = getDismissFromLocalStorage();
    setIsDismissed(_isDismissed);
  }, []);

  console.log("is dis", isDismissed);

  return isDismissed ? null : (
    <div
      className={`mx-5 mb-5 flex items-center justify-between space-x-2 rounded-2xl bg-red p-5 px-5 font-[GreyCliff] text-sm font-medium text-pearl md:col-span-2 md:mx-0 ${
        className !== undefined ? className : ""
      }`}
    >
      <div className="flex flex-col gap-2">
        {title && <span className="font-bold">{title}</span>}
        <p>{text}</p>
      </div>

      <CloseIcon
        height={20}
        width={20}
        onClick={handleOnClick}
        className="cursor-pointer text-pearl"
      />
    </div>
  );
};

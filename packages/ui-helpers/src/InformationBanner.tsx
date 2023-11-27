"use client";
// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { CloseIcon } from "icons";
import { useCallback, useEffect, useState } from "react";

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

  const saveDismissInLocalStorage = useCallback(
    function saveDismissInLocalStorage() {
      localStorage.setItem(localStorageId ?? "", "true");
    },
    [localStorageId]
  );

  const getDismissFromLocalStorage = useCallback(
    function getDismissFromLocalStorage() {
      return localStorage.getItem(localStorageId ?? "") === "true";
    },
    [localStorageId]
  );

  function handleOnClick() {
    saveDismissInLocalStorage();
    setIsDismissed(true);
  }

  useEffect(() => {
    const _isDismissed = getDismissFromLocalStorage();
    setIsDismissed(_isDismissed);
  }, [getDismissFromLocalStorage]);

  return isDismissed ? null : (
    <div
      className={`bg-pearl flex items-center justify-between space-x-2 rounded-md p-3 px-5 text-sm font-medium text-black ${
        className !== undefined ? className : ""
      }`}
    >
      <div className="flex flex-1 flex-col gap-2 self-center text-center">
        {title && <span className="font-bold">{title}</span>}
        {typeof text === "string" ? <p>{text}</p> : text}
      </div>
      {dismissible && (
        <CloseIcon
          height={22}
          width={22}
          onClick={handleOnClick}
          className="cursor-pointer self-end text-black"
        />
      )}
    </div>
  );
};

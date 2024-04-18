// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { useState, useEffect, useRef } from "react";

export default function useComponentVisible() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(!isComponentVisible);
    }
  };
  const closeOnEscapePressed = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsComponentVisible(!isComponentVisible);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, !isComponentVisible);
    document.addEventListener(
      "keydown",
      closeOnEscapePressed,
      !isComponentVisible,
    );
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside,
        !isComponentVisible,
      );
      document.removeEventListener(
        "keydown",
        closeOnEscapePressed,
        !isComponentVisible,
      );
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

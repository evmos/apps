// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import Link from "next/link";
import { MISSION_CONTROL_DATA } from "./AppsData";
import { useEffect, useRef, useState } from "react";
import { LISTEN_MISSION_CONTROL_SCROLL_ECOSYSTEM, useTracker } from "tracker";

const AppsContainer = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [percentageScrolled, setPercentageScrolled] = useState(0);
  const { handlePreClickAction } = useTracker(
    LISTEN_MISSION_CONTROL_SCROLL_ECOSYSTEM,
    {
      percentageScrolled: percentageScrolled,
    }
  );
  useEffect(() => {
    const divRefCurrent = divRef.current;
    function handleScroll() {
      if (divRefCurrent === null) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = divRefCurrent;
      const percentageScrolled = Math.floor(
        (scrollTop / (scrollHeight - clientHeight)) * 100
      );
      setPercentageScrolled(percentageScrolled);

      handlePreClickAction();
    }

    if (divRefCurrent !== null) {
      divRefCurrent.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divRefCurrent !== null) {
        divRefCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [percentageScrolled, handlePreClickAction]);
  return (
    <div
      ref={divRef}
      style={{ maxHeight: "225px", overflowY: "auto" }}
      className="flex flex-col gap-4"
    >
      {MISSION_CONTROL_DATA.appsOnEvmos.map((a) => (
        <Link
          target="_blank"
          rel="noreferrer"
          href={a.twitter}
          aria-label={a.name}
          key={a.name}
          className="flex gap-5"
        >
          <Image
            width={44}
            height={44}
            className="rounded-full"
            alt={a.name}
            src={a.image}
          />
          <div className="flex flex-col">
            <span className="font-[GreyCliff] font-bold">{a.name}</span>
            <span
              style={{ fontSize: "12px" }}
              className="font-extralight uppercase text-pearl"
            >
              {a.category}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AppsContainer;

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import Image from "next/image";
import Link from "next/link";
import { MISSION_CONTROL_DATA } from "./AppsData";
import { useEffect, useRef } from "react";
import metrics from "../LocalTracker";
import { MC_SCROLL_ECOSYSTEM } from "tracker";

const AppsContainer = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (divRef.current === null) {
        return;
      }

      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      const percentageScrolled = Math.floor(
        (scrollTop / (scrollHeight - clientHeight)) * 100
      );

      metrics?.track(MC_SCROLL_ECOSYSTEM, { percentageScrolled });
    }

    if (divRef.current !== null) {
      divRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (divRef.current !== null) {
        divRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
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

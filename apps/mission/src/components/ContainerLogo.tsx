// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { CLICK_EVMOS_LOGO } from "tracker";
import { SignIn } from "./header/signin/SignIn";
import useWindowResize from "./useResize";
import { ComponentProps, useEffect, useState } from "react";
import { cn } from "helpers/src/classnames";
import { Search } from "./search/Search";

export const ContainerLogo = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  const { windowSize, isDesktop } = useWindowResize();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    const fn = () => {
      setIsActive(true);
    };
    window.addEventListener("open-search", fn);
    return () => window.removeEventListener("open-search", fn);
  }, []);

  return (
    <div
      className={cn(
        "w-full px-6 md:px-4 bg-surface h-full dark:bg-surface-dark",
        {
          "fixed md:relative top-0 left-0 z-50": isActive,
        },
        className,
      )}
      onClick={() => setIsActive(false)}
      {...props}
    >
      <div className="px-0 flex justify-between items-center py-6 md:col-span-1 md:row-span-1 md:px-4">
        <TrackerEvent event={CLICK_EVMOS_LOGO}>
          <Link href="/">
            <Logo className="h-6" />
          </Link>
        </TrackerEvent>

        {!isDesktop && windowSize !== 0 && <SignIn />}
      </div>
      <Search
        isActive={isActive}
        setIsActive={setIsActive}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

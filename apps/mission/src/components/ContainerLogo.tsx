// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import Link from "next/link";
import { Logo } from "../components/Logo";
import { CLICK_EVMOS_LOGO } from "tracker";
import { SignIn } from "./header/signin/SignIn";
import useWindowResize from "./useResize";
export const ContainerLogo = () => {
  const { isDesktop } = useWindowResize();

  return (
    <div className="flex justify-between items-center">
      <TrackerEvent event={CLICK_EVMOS_LOGO}>
        <Link href="/">
          <Logo className="h-6" />
        </Link>
      </TrackerEvent>

      {!isDesktop && <SignIn />}
    </div>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";

import { useTranslation, Link } from "@evmosapps/i18n/client";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@evmosapps/i18n";
import Image from "next/image";
import { TrackerEvent } from "@evmosapps/ui-helpers";
import { CLICK_EVMOS_LOGO } from "tracker";

export const Branding = () => {
  const { t } = useTranslation();
  const pathname = usePathname() || "";
  const locale = getLocaleFromPath(pathname);

  const pageRoute = usePathname()?.split("/")[locale ? 2 : 1] || "dappstore";
  const secondaryTitleKey = t(`header.titles.${pageRoute}`, {
    defaultValue: "",
  });

  return (
    <TrackerEvent event={CLICK_EVMOS_LOGO}>
      <Link
        href={"/"}
        rel="noreferrer"
        className="flex justify-center items-center h-7 md:h-8 lg:h-7"
        aria-label="home"
      >
        <Image
          src="/evmos_logo.png"
          alt="evmos logo"
          width={50}
          height={50}
          className="mr-2 lg:mr-3 w-auto"
        />
        <p className="text-red-300 relative top-[3px] lg:top-[5px] text-[24px] lg:text-[1.8rem] font-evmos">
          <span className="text-pearl mr-4 md:mr-5 lg:mr-6 font-brand">
            Evmos
          </span>
          {secondaryTitleKey}
        </p>
      </Link>
    </TrackerEvent>
  );
};

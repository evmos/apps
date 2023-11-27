"use client";
import { Logo } from "icons";

import { useTranslation, Link } from "@evmosapps/i18n/client";
import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "@evmosapps/i18n";

export const Branding = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  const pageRoute = usePathname()?.split("/")[locale ? 2 : 1] || "dappstore";
  const secondaryTitleKey = t(`header.titles.${pageRoute}`, {
    defaultValue: "",
  });

  return (
    <Link
      href={"/"}
      rel="noreferrer"
      className="flex justify-center items-center h-7 md:h-8 lg:h-9"
      aria-label="home"
    >
      <Logo className="h-7 md:h-8 lg:h-9 w-auto mr-2 lg:mr-3" />
      <p className="text-red relative top-[6px] text-[24px] md:text-[30px] lg:text-[36px] font-evmos">
        <span className="text-pearl mr-4 md:mr-5 lg:mr-6 font-brand">
          Evmos
        </span>
        {secondaryTitleKey}
      </p>
    </Link>
  );
};

// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { IconUser } from "../../../packages/ui/src/icons/line/users";
import { useTranslation } from "@evmosapps/i18n/client";

export const ConnectionRequired = ({
  bgUrl,
  dappName,
  children,
}: {
  bgUrl: string;
  dappName: string;
  children?: React.ReactNode;
}) => {
  const { t } = useTranslation("dappStore");
  return (
    <div className="rounded-3xl overflow-hidden">
      <div
        className={`relative blur-image after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-10 after:bg-[rgba(0,0,0,.3)] z-[8] h-[450px] bg-center bg-no-repeat bg-cover ${bgUrl} flex flex-col justify-center`}
      >
        <div className="z-[9999] text-center flex flex-col items-center space-y-6 px-8">
          <IconUser />
          <div className="space-y-2">
            <h6 className="text-heading dark:text-heading-dark text-xl">
              {t("instantdApp.signRequired")}
            </h6>
            <p className="text-subheading dark:text-subheading-dark text-sm">
              {t("instantdApp.singInToInteract")}
              {dappName} {t("instantdApp.IdApp")}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

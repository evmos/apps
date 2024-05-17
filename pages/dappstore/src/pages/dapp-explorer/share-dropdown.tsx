// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconExport2 } from "@evmosapps/ui/icons/line/arrows/export-2.tsx";
import { IconX } from "@evmosapps/ui/icons/social/x.tsx";
import { IconTelegram } from "@evmosapps/ui/icons/social/telegram.tsx";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import { Container, CopyButton } from "@evmosapps/ui-helpers";
import { useTranslation } from "@evmosapps/i18n/client";
import { Dropdown } from "@evmosapps/ui/components/dropdown/Dropdown.tsx";
import { CLICK_COPY_ON_SHARE, CLICK_SHARE, sendEvent } from "tracker";
export const ShareDropdown = ({
  dapp,
}: {
  dapp: {
    categorySlug: string;
    slug: string;
  };
}) => {
  const urlShare = `https://store.evmos.org/dapps/${dapp.categorySlug}/${dapp.slug}`;

  const { t } = useTranslation("dappStore");
  const utmParams = `?utm_source=store.evmos.org&utm_medium=share&utm_campaign=dapp-`;

  return (
    <div className="relative">
      {/* Button share */}
      <Dropdown.Menu>
        {({ close }) => (
          <>
            <Dropdown.Button>
              <IconButton variant={"low-emphasis"} outlined as="div">
                <IconExport2 />
              </IconButton>
            </Dropdown.Button>

            <Dropdown.Items className="w-56 h-48 left-1/2 mt-2 transform -translate-x-1/2  ">
              <div className="flex justify-center">
                {/* Social media */}
                <div className="flex justify-center mt-4 gap-8">
                  <TwitterShareButton
                    url={urlShare+utmParams+"twitter"}
                    title={t("share.description")}
                  >
                    <div
                      className="block p-4 mt-2 rounded-[20px] text-on-background dark:text-on-background-dark bg-surface-container-high dark:bg-surface-container-high-dark hover:bg-surface-container-highest hover:dark:bg-surface-container-highest-dark transition-all ease-in-out duration-200"
                      onClick={() => {
                        sendEvent(CLICK_SHARE, { "Share Social Type": "X" });
                        close();
                      }}
                    >
                      <IconX className="h-6 w-6" />
                    </div>
                    <p className="text-paragraph dark:text-paragraph-dark text-xs mt-2">
                      {t("share.options.twitter")}
                    </p>
                  </TwitterShareButton>
                  <TelegramShareButton
                    url={urlShare+utmParams+"telegram"}
                    title={t("share.description")}
                  >
                    <div
                      className="block p-4 mt-2 rounded-[20px] text-on-background dark:text-on-background-dark bg-surface-container-high dark:bg-surface-container-high-dark hover:bg-surface-container-highest hover:dark:bg-surface-container-highest-dark transition-all ease-in-out duration-200"
                      onClick={() => {
                        sendEvent(CLICK_SHARE, {
                          "Share Social Type": "Telegram",
                        });
                        close();
                      }}
                    >
                      <IconTelegram className="h-6 w-6" />
                    </div>
                    <p className="text-paragraph dark:text-paragraph-dark text-xs mt-2">
                      {t("share.options.telegram")}
                    </p>
                  </TelegramShareButton>
                </div>
              </div>
              {/* Campo de input y botón para copiar */}
              <Container>
                <div className="mt-5 p-2 rounded-[8px] border-[1px] border-surface-container-highest dark:border-surface-container-highest-dark text-sm">
                  <div className="flex items-center bg-none text-paragraph dark:text-paragraph-dark">
                    <p className="flex-grow overflow-hidden truncate">
                      {urlShare}
                    </p>
                    <CopyButton event={CLICK_COPY_ON_SHARE} text={urlShare} />
                  </div>
                </div>
              </Container>
            </Dropdown.Items>
          </>
        )}
      </Dropdown.Menu>
    </div>
  );
};

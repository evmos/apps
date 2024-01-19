// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import { ADD_DAPP_FORM_URL, DOCS_EVMOS_URL } from "constants-helper";
import { Frameline, PrimaryButton, TrackerEvent } from "@evmosapps/ui-helpers";
import { translation } from "@evmosapps/i18n/server";
import {
  CLICK_LEARN_BUTTON,
  CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM,
} from "tracker";

import { UpRightArrowIcon } from "@evmosapps/icons/UpRightArrowIcon";

export const HeroSectionFrameline = async () => {
  const { t } = await translation("dappStore");
  const textStyle =
    "font-evmos font-light text-2xl lg:text-4xl  tracking-wide text-pearl leading-none";
  return (
    <Frameline variant="secondary">
      <div className="w-full flex flex-col py-5 space-y-5 mx-auto sm:px-16 md:px-0 xl:px-14 2xl:px-32">
        <div className={`flex justify-between ${textStyle}`}>
          <p>{t("ecosystem.title.word")}</p>
          <p>{t("ecosystem.title.word2")}</p>
          <p>{t("ecosystem.title.word3")}</p>
          <p>{t("ecosystem.title.word4")}</p>
        </div>

        <div className={`flex justify-between items-center ${textStyle}`}>
          <div
            className="relative before:content-[''] before:absolute before:top-[50%] before:left-0 
        before:-translate-y-1/2 before:w-[15px] before:h-[15px] before:lg:w-[20px] before:lg:h-[20px] before:animate-pulse before:bg-[#9F05FE] before:rounded-full"
          />
          <UpRightArrowIcon
            width={20}
            height={20}
            strokeWidth={4}
            className="text-[#A4A189] w-4 h-4 lg:w-5 lg:h-5"
          />
          <UpRightArrowIcon
            width={20}
            height={20}
            strokeWidth={4}
            className="text-[#A4A189] w-4 h-4 lg:w-5 lg:h-5"
          />
          <UpRightArrowIcon
            width={20}
            height={20}
            strokeWidth={4}
            className="text-[#A4A189] w-4 h-4 lg:w-5 lg:h-5"
          />

          <p>{t("ecosystem.title.word5")}</p>
          <p>{t("ecosystem.title.word6")}</p>
        </div>
        <p className="border-b border-t border-pearl border-opacity-40 py-2 text-xs text-pearl w-full">
          {t("ecosystem.description")}
        </p>
        <div className="flex flex-col md:flex-row items-center space-x-0 space-y-4 md:space-y-0 md:space-x-2 w-full">
          <TrackerEvent event={CLICK_ON_APPLY_TO_BE_PART_OF_THE_ECOSYSTEM}>
            <PrimaryButton
              className="flex-1 font-normal rounded w-full self-stretch text-center"
              as={"a"}
              href={ADD_DAPP_FORM_URL}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              {t("ecosystem.addAppButton")}
            </PrimaryButton>
          </TrackerEvent>
          <TrackerEvent event={CLICK_LEARN_BUTTON}>
            <PrimaryButton
              as={"a"}
              className="flex-1 font-normal rounded w-full text-center text-sm"
              variant="secondary"
              href={DOCS_EVMOS_URL}
              target="_blank"
              referrerPolicy="no-referrer"
            >
              {t("ecosystem.buildButton")}
            </PrimaryButton>
          </TrackerEvent>
        </div>
      </div>
    </Frameline>
  );
};

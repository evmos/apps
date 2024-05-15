// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { IconButton } from "@evmosapps/ui/button/icon-button.tsx";
import { IconExport2 } from "@evmosapps/ui/icons/line/arrows/export-2.tsx";
import { IconX } from "@evmosapps/ui/icons/social/x.tsx";
import { IconTelegram } from "@evmosapps/ui/icons/social/telegram.tsx";
import { useState } from "react";
import { TwitterShareButton, TelegramShareButton } from "react-share";
import { Container, CopyButton } from "@evmosapps/ui-helpers";

export const ShareDropdown = ({
  dapp,
}: {
  dapp: {
    categorySlug: string;
    slug: string;
  };
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const urlShare = `https://store.evmos.org/dapps/${dapp.categorySlug}/${dapp.slug}`;

  return (
    <div className="relative">
      {/* Button share */}
      <div className="cursor-pointer" onClick={toggleDropdown}>
        <IconButton variant={"low-emphasis"} outlined>
          <IconExport2 />
        </IconButton>
      </div>
      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-2 left-1/2 transform -translate-x-1/2 w-56 h-48 gap-4 align-middle items-center rounded-3xl border-[1px] border-surface-container-highest-dark shadow-lg bg-surface-container-low dark:bg-surface-container-low-dark ring-1 ring-black ring-opacity-5">
          <div className="flex justify-center">
            {/* Opciones de redes sociales */}
            <div className="flex justify-center mt-4 gap-8">
              <TwitterShareButton url={urlShare}>
                <div
                  className="block p-4 mt-2 rounded-[20px] text-on-background dark:text-on-background-dark bg-surface-container-highest dark:bg-surface-container-highest-dark hover:bg-gray-100 hover:text-gray-900"
                  onClick={closeDropdown}
                >
                  <IconX className="h-6 w-6" />
                </div>
                <p className="text-paragraph dark:text-paragraph-dark text-xs mt-2">
                  X
                </p>
              </TwitterShareButton>
              <TelegramShareButton url={urlShare}>
                <div
                  className="block p-4 mt-2 rounded-[20px] text-on-background dark:text-on-background-dark bg-surface-container-highest dark:bg-surface-container-highest-dark hover:bg-gray-100 hover:text-gray-900"
                  onClick={closeDropdown}
                >
                  <IconTelegram className="h-6 w-6" />
                </div>
                <p className="text-paragraph dark:text-paragraph-dark text-xs mt-2">
                  Telegram
                </p>
              </TelegramShareButton>
            </div>
          </div>
          {/* Campo de input y botón para copiar */}
          <Container>
            <div className="mt-5 p-2 rounded-[8px] border-[1px] border-surface-container-highest-dark text-sm">
              <div className="flex items-center bg-none text-paragraph dark:text-paragraph-dark">
                <p className="flex-grow overflow-hidden truncate">{urlShare}</p>
                <CopyButton text={urlShare} />
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

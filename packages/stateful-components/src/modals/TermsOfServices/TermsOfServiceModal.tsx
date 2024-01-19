// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

"use client";
import { TermsOfServicesModalController } from "./TermsOfServiceController";

import { NotionBlocks } from "@evmosapps/ui-helpers/src/notion/NotionBlocks";
import { TERMS_OF_SERVICE_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";

export const TermsOfServiceModal = () => {
  return (
    <TermsOfServicesModalController>
      <NotionBlocks id={TERMS_OF_SERVICE_PAGE_NOTION_ID} />
    </TermsOfServicesModalController>
  );
};

import { TERMS_OF_SERVICE_PAGE_NOTION_ID } from "@evmosapps/evmos-wallet/src/internal/wallet/functionality/networkConfig";
import { TermsOfServicesModalController } from "./TermsOfServiceController";
import { NotionBlocks } from "@evmosapps/ui-helpers/src/notion";

export const TermsOfServiceModal = () => {
  return (
    <TermsOfServicesModalController>
      <NotionBlocks id={TERMS_OF_SERVICE_PAGE_NOTION_ID} />
    </TermsOfServicesModalController>
  );
};

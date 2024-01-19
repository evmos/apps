// Copyright Tharsis Labs Ltd.(Evmos)
// SPDX-License-Identifier:ENCL-1.0(https://github.com/evmos/apps/blob/main/LICENSE)

import AssetsTable from "./asset/table/AssetsTable";
import { TransferModal } from "./modals/transfer/TransferModal";
import { RequestModal } from "./modals/request/RequestModal";
import { PayModal } from "./modals/pay/Modal";
import { Suspense } from "react";
import { ReceiptModal } from "./modals/receipt/ReceiptModal";
import { ConvertModal } from "./modals/convert/ConvertModal";

export const PortfolioPage = () => {
  return (
    <>
      <AssetsTable />
      <Suspense>
        <TransferModal />
        <RequestModal />
        <PayModal />
        <ReceiptModal />
        <ConvertModal />
      </Suspense>
    </>
  );
};

import AssetsTable from "./asset/table/AssetsTable";
import { TransferModal } from "./modals/transfer/TransferModal";
import { RequestModal } from "./modals/request/RequestModal";
import { PayModal } from "./modals/pay/Modal";
import { Suspense } from "react";

export const PortfolioPage = () => {
  return (
    <>
      <AssetsTable />
      <Suspense>
        <TransferModal />
        <RequestModal />
        <PayModal />
      </Suspense>
    </>
  );
};

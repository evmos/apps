import Link from "next/link";

import {
  KEPLR_KEY,
  METAMASK_KEY,
  WALLECT_CONNECT_KEY,
  EVMOS_SYMBOL,
  StoreType,
} from "evmos-wallet";
import { Button } from "button";
import { ExternalLinkIcon } from "icons";

import Withdraw from "../../modals/transactions/Withdraw";
import Deposit from "../../modals/transactions/Deposit";
import {
  TableData,
  TableDataElement,
} from "../../../../internal/asset/functionality/table/normalizeData";
import { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import Convert from "../../modals/transactions/Convert";

type actionsProps = {
  item: TableDataElement;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
  tableData: TableData;
};

// TODO: delete once STR is fully working
export const ButtonActions = ({
  actionsProps,
}: {
  actionsProps: actionsProps;
}) => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  return (
    <>
      {actionsProps.item.handledByExternalUI !== null ? (
        <Button
          onClick={() => {
            // noop, redirect handled by the Link element
          }}
        >
          <div>
            <Link
              target="_blank"
              rel="noreferrer"
              href={actionsProps.item.handledByExternalUI.url}
              className="flex flex-row items-center"
            >
              <span className="px-2">Deposit</span>
              <ExternalLinkIcon width={18} height={18} />
            </Link>
          </div>
        </Button>
      ) : (
        <Button
          disabled={
            !value.active ||
            value.extensionName === METAMASK_KEY ||
            value.extensionName === WALLECT_CONNECT_KEY
          }
          onClick={() => {
            actionsProps.setShow(true);
            actionsProps.setModalContent(
              <Deposit
                item={actionsProps.item}
                feeBalance={actionsProps.tableData.feeBalance}
                address={value.evmosAddressCosmosFormat}
                setShow={actionsProps.setShow}
              />
            );
          }}
        >
          <div className="flex flex-row items-center">
            <div className="min-h-[9px] min-w-[9px]" />
            <span className="px-2">Deposit</span>
            <div className="min-h-[9px] min-w-[9px]" />
          </div>
        </Button>
      )}
      {actionsProps.item.handledByExternalUI !== null ? (
        <Button
          onClick={() => {
            // noop, redirect handled by the Link element
          }}
        >
          <div>
            <Link
              target="_blank"
              rel="noreferrer"
              href={actionsProps.item.handledByExternalUI.url}
              className="flex flex-row items-center"
            >
              <span className="px-2">Withdraw</span>
              <ExternalLinkIcon width={18} height={18} />
            </Link>
          </div>
        </Button>
      ) : (
        <Button
          disabled={!value.active}
          onClick={() => {
            actionsProps.setShow(true);
            actionsProps.setModalContent(
              <Withdraw
                item={actionsProps.item}
                feeBalance={actionsProps.tableData.feeBalance}
                address={value.evmosAddressCosmosFormat}
                setShow={actionsProps.setShow}
              />
            );
          }}
        >
          <div className="flex flex-row items-center">
            <div className="min-h-[9px] min-w-[9px]" />
            <span className="px-2">Withdraw</span>
            <div className="min-h-[9px] min-w-[9px]" />
          </div>
        </Button>
      )}
      <Button
        disabled={
          !value.active ||
          (value.extensionName === KEPLR_KEY &&
            actionsProps.item.symbol === EVMOS_SYMBOL)
        }
        onClick={() => {
          actionsProps.setShow(true);
          actionsProps.setModalContent(
            <Convert
              item={actionsProps.item}
              feeBalance={actionsProps.tableData.feeBalance}
              address={value.evmosAddressCosmosFormat}
              setShow={actionsProps.setShow}
            />
          );
        }}
      >
        <div className="flex flex-row items-center">
          <div className="min-h-[9px] min-w-[9px]" />
          <span className="px-2">Convert</span>
          <div className="min-h-[9px] min-w-[9px]" />
        </div>
      </Button>
    </>
  );
};

import dynamic from "next/dynamic";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../internal/asset/style/format";
import { METAMASK_KEY } from "../../../internal/wallet/functionality/wallet";
const Button = dynamic(() => import("../../common/Button"));
const ExternalLinkIcon = dynamic(
  () => import("../../common/images/icons/ExternalLink")
);
import { TableData } from "../../../internal/asset/functionality/table/normalizeData";
import Image from "next/image";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/Store";
import Convert from "../modals/transactions/Convert";
import Withdraw from "../modals/transactions/Withdraw";
import Deposit from "../modals/transactions/Deposit";

const ContentCard = ({
  tableData,
  setShow,
  setModalContent,
}: {
  tableData: TableData;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalContent: Dispatch<SetStateAction<JSX.Element>>;
}) => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  return (
    <div className="space-y-5 w-fit mx-auto">
      {tableData?.table.map((item, index: number) => {
        return (
          <div
            className="p-5 bg-darkGray2 rounded-lg space-y-3 w-[350px] sm:w-[450px] md:w-[600px]"
            key={index}
          >
            <div className="flex items-center space-x-5 ">
              <Image
                src={`/tokens/${item.symbol.toLocaleLowerCase()}.png`}
                alt={item.symbol}
                width={35}
                height={35}
              />
              <div className="flex flex-col items-start ">
                <span className="font-bold">{item.symbol}</span>
                <span className="text-sm text-darkGray5">{item.name}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex w-full">
                <p className="opacity-80 w-full">IBC Balance</p>
                <div className="flex justify-between w-full">
                  <p className="font-bold">
                    {convertAndFormat(item.cosmosBalance, item.decimals)}
                  </p>
                  <p>
                    $
                    {amountToDolars(
                      item.cosmosBalance,
                      item.decimals,
                      item.coingeckoPrice
                    )}
                  </p>
                </div>
              </div>
              <div className="flex">
                <p className="opacity-80 w-full">ERC-20 Balance</p>
                <div className="flex justify-between w-full">
                  <p className="font-bold">
                    {convertAndFormat(item.erc20Balance, item.decimals)}
                  </p>
                  <p>
                    $
                    {amountToDolars(
                      item.erc20Balance,
                      item.decimals,
                      item.coingeckoPrice
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between flex-col space-y-2">
              {item.handledByExternalUI !== null ? (
                <Button
                  onClick={() => {
                    // noop, redirect handled by the Link element
                  }}
                >
                  <div>
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={item.handledByExternalUI.url}
                      className="flex flex-row items-center"
                    >
                      <span className="px-2">Deposit</span>
                      <ExternalLinkIcon width={18} height={18} />
                    </Link>
                  </div>
                </Button>
              ) : (
                <Button
                  disabled={value.extensionName === METAMASK_KEY}
                  onClick={() => {
                    setShow(true);
                    setModalContent(
                      <Deposit
                        item={item}
                        feeBalance={tableData.feeBalance}
                        address={value.evmosAddressCosmosFormat}
                        setShow={setShow}
                      />
                    );
                  }}
                >
                  <div className="flex flex-row items-center">
                    <div className="min-w-[9px] min-h-[9px]" />
                    <span className="px-2">Deposit</span>
                    <div className="min-w-[9px] min-h-[9px]" />
                  </div>
                </Button>
              )}
              {item.handledByExternalUI !== null ? (
                <Button
                  onClick={() => {
                    // noop, redirect handled by the Link element
                  }}
                >
                  <div>
                    <Link
                      target="_blank"
                      rel="noreferrer"
                      href={item.handledByExternalUI.url}
                      className="flex flex-row items-center"
                    >
                      <span className="px-2">Withdraw</span>
                      <ExternalLinkIcon width={18} height={18} />
                    </Link>
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setShow(true);
                    setModalContent(
                      <Withdraw
                        item={item}
                        feeBalance={tableData.feeBalance}
                        address={value.evmosAddressCosmosFormat}
                        setShow={setShow}
                      />
                    );
                  }}
                >
                  <div className="flex flex-row items-center">
                    <div className="min-w-[9px] min-h-[9px]" />
                    <span className="px-2">Withdraw</span>
                    <div className="min-w-[9px] min-h-[9px]" />
                  </div>
                </Button>
              )}
              <Button
                onClick={() => {
                  setShow(true);
                  setModalContent(
                    <Convert
                      item={item}
                      feeBalance={tableData.feeBalance}
                      address={value.evmosAddressCosmosFormat}
                      setShow={setShow}
                    />
                  );
                }}
              >
                <div className="flex flex-row items-center">
                  <div className="min-w-[9px] min-h-[9px]" />
                  <span className="px-2">Convert</span>
                  <div className="min-w-[9px] min-h-[9px]" />
                </div>
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentCard;

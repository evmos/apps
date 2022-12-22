import dynamic from "next/dynamic";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import {
  amountToDolars,
  convertAndFormat,
} from "../../../internal/asset/style/format";
import { METAMASK_KEY } from "../../../internal/wallet/functionality/wallet";
import { DataModal } from "../modals/types";
const Button = dynamic(() => import("../../common/Button"));
const ExternalLinkIcon = dynamic(
  () => import("../../common/images/icons/ExternalLink")
);
import { TableData } from "../../../internal/asset/functionality/table/normalizeData";
import Image from "next/image";
import { BigNumber } from "ethers";
import { useSelector } from "react-redux";
import { StoreType } from "../../../redux/Store";

const Content = ({
  tableData,
  setShow,
  setModalValues,
}: {
  tableData: TableData;
  setShow: Dispatch<SetStateAction<boolean>>;
  setModalValues: Dispatch<SetStateAction<DataModal>>;
}) => {
  const value = useSelector((state: StoreType) => state.wallet.value);

  return (
    <tbody>
      {tableData?.table.map((item, index: number) => {
        return (
          <tr
            className={`${
              tableData?.table.length > 2 ? "asset" : "assetOneItem"
            }`}
            key={index}
          >
            <td>
              <div className="flex items-center space-x-5">
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
            </td>
            <td>
              <div className="flex flex-col items-start uppercase">
                <span className="font-bold">
                  {convertAndFormat(item.cosmosBalance, item.decimals)}
                </span>
                <span className="text-sm text-darkGray5">
                  {amountToDolars(
                    item.cosmosBalance,
                    item.decimals,
                    item.coingeckoPrice
                  )}
                </span>
              </div>
            </td>
            <td>
              <div className="flex flex-col items-start uppercase">
                <span className="font-bold">
                  {convertAndFormat(item.erc20Balance, item.decimals)}
                  {item.symbol.toUpperCase() === "EVMOS" ? " WEVMOS" : ""}
                </span>
                <span className="text-sm text-darkGray5">
                  {amountToDolars(
                    item.erc20Balance,
                    item.decimals,
                    item.coingeckoPrice
                  )}
                </span>
              </div>
            </td>
            <td>
              <div className="space-x-3 flex justify-center">
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
                      setModalValues({
                        token: item.symbol,
                        address: value.evmosAddressCosmosFormat,
                        amount: item.cosmosBalance,
                        title: "Deposit",
                        network: "EVMOS",
                        decimals: item?.decimals,
                        feeDenom: "aevmos",
                        pubkey: value.evmosPubkey,
                        fee: BigNumber.from("1"),
                        erc20Balance: item.erc20Balance,
                        feeBalance: BigNumber.from("1"),
                        networkTo: item.chainIdentifier,
                        chainId: item.chainId,
                      });
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
                      setModalValues({
                        token: item.symbol,
                        address: value.evmosAddressCosmosFormat,
                        amount: item?.cosmosBalance,
                        decimals: item?.decimals,
                        fee: BigNumber.from("20000000000000000"),
                        feeDenom: "EVMOS",
                        title: "Withdraw",
                        network: "EVMOS",
                        pubkey: value.evmosPubkey,
                        erc20Balance: item.erc20Balance,
                        feeBalance: tableData.feeBalance,
                        networkTo: item.chainIdentifier,
                        chainId: item.chainId,
                      });
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
                    setModalValues({
                      token: item.symbol,
                      address: value.evmosAddressCosmosFormat,
                      amount: item.cosmosBalance,
                      decimals: item?.decimals,
                      feeDenom: "EVMOS",
                      title: "Convert",
                      network: "EVMOS",
                      pubkey: value.evmosPubkey,
                      fee: BigNumber.from("300000000000000000"),
                      erc20Balance: item.erc20Balance,
                      feeBalance: tableData.feeBalance,
                      networkTo: item.chainIdentifier,
                      chainId: item.chainId,
                    });
                  }}
                >
                  <div className="flex flex-row items-center">
                    <div className="min-w-[9px] min-h-[9px]" />
                    <span className="px-2">Convert</span>
                    <div className="min-w-[9px] min-h-[9px]" />
                  </div>
                </Button>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default Content;

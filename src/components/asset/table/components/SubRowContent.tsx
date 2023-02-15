import { BigNumber } from "ethers";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  amountToDollars,
  convertAndFormat,
} from "../../../../internal/asset/style/format";
import { BIG_ZERO } from "../../../../internal/common/math/Bignumbers";
import { EVMOS_SYMBOL } from "../../../../internal/wallet/functionality/networkConfig";
import { KEPLR_KEY } from "../../../../internal/wallet/functionality/wallet";
import { StoreType } from "../../../../redux/Store";
import Button from "../../../common/Button";
import QuestionMarkIcon from "../../../common/images/icons/QuestionMarkIcon";
import Tooltip from "../../../common/Tooltip";
import Convert from "../../modals/transactions/Convert";
import { ConvertSTR } from "../../modals/transactions/ConvertSTR";
import { Description } from "./Description";
import { SubRowProps } from "./types";

export const SubRowContent = ({
  item,
  setShow,
  setModalContent,
  isIBCBalance = false,
  feeBalance,
}: SubRowProps) => {
  const wallet = useSelector((state: StoreType) => state.wallet.value);

  let balance = item.erc20Balance;
  let symbol = item.symbol;
  if (isIBCBalance) {
    balance = item.cosmosBalance;
  } else {
    if (item.symbol === EVMOS_SYMBOL) {
      symbol = "WEVMOS";
    }
  }

  const openModalConvertEvmos = () => {
    setShow(true);
    setModalContent(
      <ConvertSTR
        item={item}
        address={wallet.evmosAddressCosmosFormat}
        setShow={setShow}
        isIBCBalance={isIBCBalance}
        feeBalance={feeBalance}
      />
    );
  };

  const openModalConvert = () => {
    setShow(true);
    setModalContent(
      <Convert
        item={item}
        feeBalance={feeBalance}
        address={wallet.evmosAddressCosmosFormat}
        setShow={setShow}
      />
    );
  };

  const v10Link =
    "https://commonwealth.im/evmos/discussion/8501-evmos-software-upgrade-v10";
  return (
    <div className="flex w-full text-xs md:text-base">
      <div className="md:w-[5%] md:mx-2"></div>
      <Description
        symbol={symbol}
        description={item.description}
        subRow={true}
      />
      <div className="flex items-center uppercase w-[50%] pl-4 md:pl-0 ">
        <div className="flex flex-col w-full ">
          <span className="font-bold break-all">
            {convertAndFormat(balance, item.decimals)}
          </span>
          <div
            className={` ${
              item.cosmosBalance.eq(BigNumber.from("0")) ||
              item.symbol === EVMOS_SYMBOL
                ? "hidden"
                : ""
            } font-bold flex items-center space-x-1`}
          >
            <Tooltip
              className="capitalize"
              element={
                <p className="break-all opacity-80">
                  {convertAndFormat(item.cosmosBalance, item.decimals)}{" "}
                </p>
              }
              text="IBC Balance"
            />
            <div
              className={`text-xs capitalize ${
                item.cosmosBalance.eq(BigNumber.from("0")) ||
                item.symbol === EVMOS_SYMBOL
                  ? "hidden"
                  : ""
              }`}
            >
              <Tooltip
                className="w-24 "
                element={<QuestionMarkIcon width={16} height={16} />}
                text={
                  <>
                    Since{" "}
                    <Link
                      className="text-red"
                      href={v10Link}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      v10
                    </Link>{" "}
                    upgrade, all withdraws will pull first from IBC token
                    balance before ERC-20. Deposits are autoconverted to ERC-20
                  </>
                }
              />
            </div>
          </div>
          <span className="text-xs md:text-sm text-darkGray5">
            ${amountToDollars(balance, item.decimals, item.coingeckoPrice)}
          </span>
        </div>
        {item.symbol === EVMOS_SYMBOL && (
          <div className="justify-end w-full flex pr-2 md:pr-8">
            <Button
              disabled={
                !wallet.active ||
                (wallet.extensionName === KEPLR_KEY &&
                  item.symbol === EVMOS_SYMBOL)
              }
              onClick={openModalConvertEvmos}
            >
              <div className="flex flex-row items-center">
                <span className="px-2">Convert</span>
              </div>
            </Button>
          </div>
        )}
        {item.symbol !== EVMOS_SYMBOL && !item.cosmosBalance.eq(BIG_ZERO) && (
          <div className="justify-end w-full flex pr-2 md:pr-8">
            <Button onClick={openModalConvert}>
              <div className="flex flex-row items-center">
                <span className="px-2">Convert</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
